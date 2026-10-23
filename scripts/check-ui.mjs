// Dependency-free UI checks using an installed Chrome/Chromium and its DevTools
// protocol. Run `npm run check:ui` with the local preview already running.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const chrome = process.env.CHROME_PATH || [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome", "/usr/bin/chromium",
].find(existsSync);
if (!chrome) throw new Error("Set CHROME_PATH to an installed Chrome/Chromium executable.");
const base = process.env.PREVIEW_URL || "http://localhost:3000";
const output = process.env.QA_OUTPUT || join(tmpdir(), "opencode", "wts-nova-qa");
mkdirSync(output, { recursive: true });
const profile = join(output, `browser-${Date.now()}`);
const browser = spawn(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
let socket;
const failures = [];
const errors = [];
const results = [];
try {
  const endpoint = await new Promise((resolve, reject) => {
    let stderr = "";
    browser.stderr.on("data", chunk => {
      stderr += chunk;
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) resolve(match[1]);
    });
    browser.once("error", reject);
    browser.once("exit", code => reject(new Error(`Chrome exited: ${code}`)));
  });
  socket = new WebSocket(endpoint);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let nextId = 0;
  const pending = new Map();
  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.text);
    if (!message.id) return;
    const request = pending.get(message.id);
    if (!request) return;
    clearTimeout(request.timer);
    pending.delete(message.id);
    if (message.error) request.reject(new Error(JSON.stringify(message.error)));
    else request.resolve(message.result);
  };
  const call = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++nextId;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timed out: ${method}`)); }, 45000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
  const { targetId } = await call("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await call("Target.attachToTarget", { targetId, flatten: true });
  const page = (method, params) => call(method, params, sessionId);
  const evaluate = async expression => {
    const response = await page("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails));
    return response.result.value;
  };
  const check = (condition, description) => { if (!condition) failures.push(description); };
  const viewport = async (width, height = 900) => {
    const mobile = width < 768 || (height < 500 && width < 1024);
    await page("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: mobile ? 2 : 1, mobile });
    await page("Emulation.setTouchEmulationEnabled", { enabled: mobile, maxTouchPoints: 1 });
    await delay(250);
  };
  const capture = async (name, selector) => {
    await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({behavior:'instant',block:'start'})`);
    await delay(850);
    const image = await page("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    writeFileSync(join(output, `${name}.png`), Buffer.from(image.data, "base64"));
  };
  await page("Page.enable");
  await page("Runtime.enable");
  await viewport(1440);
  await page("Page.navigate", { url: base });
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await evaluate(`!!document.querySelector('.agency-footer') && document.readyState === 'complete'`)) break;
    await delay(200);
  }
  await evaluate("document.fonts.ready.then(()=>true)");
  await delay(700);

  for (const [width, height] of [[320,568],[360,640],[375,667],[390,844],[414,896],[430,932],[540,720],[600,960],[640,900],[667,375],[767,900],[768,1024],[812,375],[896,414],[900,900],[1023,900],[1024,900],[1440,900],[1920,1080]]) {
    await viewport(width, height);
    const metrics = await evaluate(`(() => ({
      width:innerWidth,
      height:innerHeight,
      touch:matchMedia('(pointer:coarse)').matches,
      pageOverflow:document.documentElement.scrollWidth>innerWidth,
      overflowDetails:[...document.body.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return r.right>innerWidth+.1&&!e.closest('.trust-track');}).slice(0,8).map(e=>({className:typeof e.className==='string'?e.className:e.tagName,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right})),
      textOverflow:[...document.querySelectorAll('h1,h2,h3,p,.service-copy,.audience-copy,.why-nova-benefit-copy,.founder-feature,.founder-stat,.agency-footer-links')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.className||e.tagName),
      headings:[...document.querySelectorAll('.section-heading')].map(e=>parseFloat(getComputedStyle(e).fontSize)),
      heroSize:parseFloat(getComputedStyle(document.querySelector('.headline-business')).fontSize),
      seamlessIntro:(()=>{const shell=getComputedStyle(document.querySelector('.site-shell')),hero=getComputedStyle(document.querySelector('.hero')),header=getComputedStyle(document.querySelector('.nav-wrap'));return shell.backgroundColor==='rgb(11, 25, 51)'&&shell.backgroundColor===hero.backgroundColor&&header.backgroundColor==='rgba(0, 0, 0, 0)';})(),
      heroArcOverlapsContent:(()=>{const path=document.querySelector('.hero-horizon path'),matrix=path?.getScreenCTM();if(!path||!matrix)return false;const targets=[...document.querySelectorAll('.hero-heading,.hero-description,.hero-actions .button')].map(e=>e.getBoundingClientRect());for(let i=0;i<=80;i++){const point=path.getPointAtLength(path.getTotalLength()*i/80).matrixTransform(matrix);if(targets.some(r=>point.x>=r.left&&point.x<=r.right&&point.y>=r.top-8&&point.y<=r.bottom+8))return true;}return false;})(),
      sectionHeights:[...document.querySelectorAll('section,footer')].map(e=>[e.className,Math.round(e.getBoundingClientRect().height)]),
      brokenLinks:[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(h=>!['#our-work','#about','#contact'].includes(h)&&!document.querySelector(h)),
      equalServices:new Set([...document.querySelectorAll('.service-capsule')].map(e=>e.offsetHeight)).size===1,
      mobileCapsules:(()=>{if(innerWidth>=640)return {equal:true,linear:true,rounded:true};const groups=['.service-capsule','.audience-capsule'].map(selector=>[...document.querySelectorAll(selector)]);return {equal:groups.every(cards=>new Set(cards.map(card=>card.offsetHeight)).size===1),linear:groups.every(cards=>cards.every(card=>{const r=card.getBoundingClientRect(),i=card.querySelector('img').getBoundingClientRect(),text=card.querySelector('h3').getBoundingClientRect();return Math.abs(r.left-cards[0].getBoundingClientRect().left)<1&&Math.abs(r.width-cards[0].getBoundingClientRect().width)<1&&i.left>text.left&&text.right<=i.left+1;})),rounded:groups.every(cards=>cards.every(card=>parseFloat(getComputedStyle(card).borderTopLeftRadius)>=60))};})(),
      desktopAudienceAligned:(()=>{if(innerWidth<640)return true;const cards=[...document.querySelectorAll('.audience-capsule')];const first=cards[0].getBoundingClientRect();return cards.every(card=>{const r=card.getBoundingClientRect(),image=card.querySelector('img').getBoundingClientRect(),heading=card.querySelector('h3').getBoundingClientRect();return Math.abs(r.left-first.left)<1&&Math.abs(r.width-first.width)<1&&image.left<heading.left;});})(),
      clippedNavControls:[...document.querySelectorAll('.navbar .button,.navbar .menu-button')].filter(e=>{const b=e.getBoundingClientRect(),n=document.querySelector('.navbar').getBoundingClientRect();return b.width>0&&(b.left<n.left||b.right>n.right);}).length,
      navLogoLoaded:(()=>{const img=document.querySelector('.brand-logo');return !!img&&img.complete&&img.naturalWidth>0&&img.getAttribute('src')==='/images/wts-nova-logo-nav.webp';})(),
      contactFormReady:(()=>{const form=document.querySelector('.contact-form'),submit=form?.querySelector('button[type="submit"]'),fields=form?[...form.querySelectorAll('input:not([type="hidden"]):not(.contact-honeypot),select,textarea')]:[];return !!form&&form.method==='post'&&form.action==='https://formsubmit.co/wtsnova.agency@gmail.com'&&!!submit&&!submit.disabled&&submit.textContent.includes('Submit inquiry')&&fields.length===5&&fields.every(field=>field.id&&form.querySelector('label[for="'+field.id+'"]'));})(),
      noComingSoonCopy:!document.body.innerText.toLowerCase().includes('coming soon'),
      optimizedEditorialImages:[...document.querySelectorAll('.services-section img,.audience-section img')].every(img=>img.getAttribute('src')?.includes('.webp')),
      mobileBlurDisabled:innerWidth>=640||getComputedStyle(document.querySelector('.service-capsule')).backdropFilter==='none',
      narrowFooterTwoColumns:innerWidth>359||getComputedStyle(document.querySelector('.agency-footer-grid')).gridTemplateColumns.split(' ').length===2,
      founderPlaceholderOverlap:(()=>{const n=document.querySelector('.founder-placeholder-note'),c=document.querySelector('.founder-caption');return !!n&&n.getBoundingClientRect().bottom>c.getBoundingClientRect().top-8;})(),
      whyImageCount:document.querySelectorAll('#why-wts-nova img').length,
      whyColumnsAligned:innerWidth<900||Math.abs(document.querySelector('.why-nova-editorial').getBoundingClientRect().top-document.querySelector('.why-nova-benefits').getBoundingClientRect().top)<1,
      bodySize:getComputedStyle(document.querySelector('.hero-description')).fontSize,
      pinCount:document.querySelectorAll('.pin-spacer').length,
      servicesFollowsTrust:document.querySelector('.site-shell').nextElementSibling===document.querySelector('#our-services'),
      desktopFirstScreen:(()=>{if(innerWidth<1024)return {trustAtBottom:true,nextBelowFold:true,contentClear:true};const trust=document.querySelector('.trust-bar').getBoundingClientRect(),next=document.querySelector('#our-services').getBoundingClientRect(),actions=document.querySelector('.hero-actions').getBoundingClientRect();return {trustAtBottom:Math.abs(trust.bottom-innerHeight)<2,nextBelowFold:next.top>=innerHeight-2,contentClear:actions.bottom<trust.top-16};})(),
      smallTargets:[...document.querySelectorAll('.nav-cta,.menu-button,.hero-actions a,.agency-footer-links a,.agency-footer-bottom a')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height<43;}).map(e=>e.className),
      seamlessTicker:(()=>{const track=document.querySelector('.trust-track'),sets=[...track.querySelectorAll('.trust-set')],viewport=document.querySelector('.trust-viewport').getBoundingClientRect(),widths=sets.map(e=>e.getBoundingClientRect().width);return {valid:sets.length===2&&widths.every(w=>w>=viewport.width-1)&&Math.abs(widths[0]-widths[1])<1&&Math.abs(track.getBoundingClientRect().width-widths[0]*2)<1&&getComputedStyle(track).animationIterationCount==='infinite'&&!document.querySelector('.trust-bar button'),widths,viewport:viewport.width,track:track.getBoundingClientRect().width,iteration:getComputedStyle(track).animationIterationCount};})(),
      logoCentered:(()=>{const p=document.querySelector('.agency-footer-panel').getBoundingClientRect(),l=document.querySelector('.agency-footer-logo').getBoundingClientRect();return Math.abs((l.left+l.width/2)-(p.left+p.width/2))<1;})(),
      pageHeight:document.documentElement.scrollHeight
    }))()`);
    results.push(metrics);
    check(!metrics.pageOverflow, `Horizontal overflow at ${width}px`);
    check(!metrics.textOverflow.length, `Text overflow at ${width}px: ${metrics.textOverflow}`);
    check(!metrics.smallTargets.length, `Small touch targets at ${width}px: ${metrics.smallTargets}`);
    check(metrics.seamlessTicker.valid, `Gap-free infinite trust bar at ${width}px`);
    const centeredStars = await evaluate(`(()=>{const items=[...document.querySelectorAll('.trust-item')];return items.slice(0,-1).every((item,i)=>{const label=item.querySelector('.trust-name').getBoundingClientRect(),star=item.querySelector('svg').getBoundingClientRect(),next=items[i+1].querySelector('.trust-name').getBoundingClientRect();return Math.abs((star.left+star.right)/2-(label.right+next.left)/2)<1;});})()`);
    check(centeredStars, `Trust bar stars centered between labels at ${width}px`);
    check(metrics.pinCount === 0 && metrics.servicesFollowsTrust, `Services must follow the Trust Bar without a pinned section at ${width}px`);
    check(Object.values(metrics.desktopFirstScreen).every(Boolean), `Hero and Trust Bar must fill the desktop viewport at ${width}x${height}px`);
    check(!metrics.brokenLinks.length, `Broken anchors at ${width}px`);
    check(metrics.equalServices, `Unequal service capsules at ${width}px`);
    check(Object.values(metrics.mobileCapsules).every(Boolean), `Mobile capsules are not equal, linear, or rounded at ${width}px`);
    check(metrics.desktopAudienceAligned, `Who We Work With capsules must align image-first at ${width}px`);
    check(metrics.clippedNavControls === 0, `Clipped navigation controls at ${width}px`);
    check(metrics.navLogoLoaded, `Navbar logo failed to load at ${width}px`);
    check(metrics.contactFormReady && metrics.noComingSoonCopy, `Contact form must be usable and no dead-link notices shown at ${width}px`);
    check(metrics.optimizedEditorialImages && metrics.mobileBlurDisabled, `Editorial image or mobile blur optimization at ${width}px`);
    check(metrics.narrowFooterTwoColumns, `Footer links should remain compact side-by-side columns at ${width}px`);
    check(!metrics.founderPlaceholderOverlap, `Portrait placeholder overlaps caption at ${width}px`);
    check(metrics.whyImageCount === 0 && metrics.whyColumnsAligned, `Text-only Why Nova alignment at ${width}px`);
    check(metrics.logoCentered, `Footer logo not centered at ${width}px`);
    check(!metrics.heroArcOverlapsContent, `Hero arc overlaps content at ${width}px`);
    check(metrics.seamlessIntro, `Navbar / hero background continuity at ${width}px`);
    check(metrics.headings.every(size => size <= 44.1), `Oversized section heading at ${width}px`);
  }
  const desktopFirstScreens = [];
  for (const [width, height] of [[1024,600],[1280,720],[1366,768],[1440,900],[1920,1080]]) {
    await viewport(width,height);
    const layout = await evaluate(`(()=>{scrollTo({top:0,behavior:'instant'});const shell=document.querySelector('.site-shell').getBoundingClientRect(),trust=document.querySelector('.trust-bar').getBoundingClientRect(),services=document.querySelector('#our-services').getBoundingClientRect(),actions=document.querySelector('.hero-actions').getBoundingClientRect();return {viewport:innerHeight,shellBottom:shell.bottom,trustBottom:trust.bottom,servicesTop:services.top,actionsClear:actions.bottom<trust.top-16};})()`);
    desktopFirstScreens.push({width,height,...layout});
    check(Math.abs(layout.trustBottom-height)<2&&layout.servicesTop>=height-2&&layout.actionsClear, `Desktop first-screen fit at ${width}x${height}px`);
  }
  await viewport(1920, 1080);
  const tickerLoop = await evaluate(`(async()=>{const track=document.querySelector('.trust-track'),animation=track.getAnimations()[0],duration=animation.effect.getTiming().duration,viewport=document.querySelector('.trust-viewport').getBoundingClientRect();animation.pause();const samples=[];for(const progress of [0,.25,.5,.75,.999999,1,1.25]){animation.currentTime=duration*progress;const sets=[...track.querySelectorAll('.trust-set')].map(e=>e.getBoundingClientRect());samples.push(sets[0].left<=viewport.left+1&&sets[1].right>=viewport.right-1&&Math.abs(sets[0].right-sets[1].left)<1);}animation.currentTime=0;const start=track.getBoundingClientRect().left;animation.currentTime=duration;const seamlessReset=Math.abs(track.getBoundingClientRect().left-start)<1;animation.play();return {covered:samples.every(Boolean),seamlessReset};})()`);
  check(tickerLoop.covered && tickerLoop.seamlessReset, "Trust bar coverage through the animation loop boundary");
  await evaluate("document.querySelector('.trust-bar').scrollIntoView({behavior:'instant',block:'center'})");
  const tickerPoint = await evaluate("(()=>{const r=document.querySelector('.trust-bar').getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};})()");
  await page("Input.dispatchMouseEvent", { type: "mouseMoved", ...tickerPoint });
  const tickerHover = await evaluate(`(async()=>{const track=document.querySelector('.trust-track'),animation=track.getAnimations()[0],before=animation.currentTime;await new Promise(r=>setTimeout(r,150));return {hovered:document.querySelector('.trust-bar').matches(':hover'),running:getComputedStyle(track).animationPlayState==='running'&&animation.currentTime>before};})()`);
  check(tickerHover.hovered && tickerHover.running, "Trust bar keeps scrolling while hovered");
  const sticky = [];
  for (const width of [375, 1440]) {
    await viewport(width, width === 375 ? 812 : 900);
    const positions = await evaluate(`(async()=>{const out=[];for(const top of [0,300,2500]){scrollTo({top,behavior:'instant'});await new Promise(r=>setTimeout(r,100));const header=document.querySelector('.nav-wrap'),nav=document.querySelector('.navbar');out.push({scrollY,position:getComputedStyle(header).position,headerTop:header.getBoundingClientRect().top,navTop:nav.getBoundingClientRect().top});}scrollTo({top:0,behavior:'instant'});const h=document.querySelector('.hero-content').getBoundingClientRect(),n=document.querySelector('.navbar').getBoundingClientRect();return {positions:out,contentClearance:h.top-n.bottom};})()`);
    sticky.push({ width, ...positions });
    check(positions.positions.every(p=>p.position === "sticky" && Math.abs(p.headerTop)<1), `Page-wide sticky navbar at ${width}px`);
    check(positions.contentClearance >= 40, `Navbar / hero content spacing at ${width}px`);
  }
  await viewport(1440);
  for (const [name, selector] of Object.entries({ hero: "#home", services: "#our-services", audience: "#who-we-work-with", why: "#why-wts-nova", founder: "#about-wts-nova", cta: "#get-in-touch", footer: "#footer" })) await capture(`desktop-${name}`, selector);
  check(await evaluate("[...document.querySelectorAll('.services-section img,.audience-section img')].every(img => img.complete && img.naturalWidth > 0)"), "Optimized editorial photos failed to load");
  check(await evaluate("document.querySelector('.agency-footer-original-logo').complete && document.querySelector('.agency-footer-original-logo').naturalWidth > 0 && document.querySelector('.agency-footer-original-logo').getAttribute('src') === '/images/wts-nova-logo-nav.webp'"), "Footer logo failed to load after scrolling into view");

  await viewport(375, 812);
  for (const [name, selector] of Object.entries({ hero: "#home", services: "#our-services", audience: "#who-we-work-with", why: "#why-wts-nova", founder: "#about-wts-nova", cta: "#get-in-touch", footer: "#footer" })) await capture(`mobile-${name}`, selector);
  await viewport(320, 568);
  await capture("small-phone-services", "#our-services");
  await capture("small-phone-founder", "#about-wts-nova");
  await viewport(768, 1024);
  await capture("tablet-services", "#our-services");
  await capture("tablet-founder", "#about-wts-nova");
  await viewport(375, 812);

  const interactions = await evaluate(`(async()=>{const menu=document.querySelector('.menu-button');menu.click();await new Promise(r=>setTimeout(r,80));const opens=menu.getAttribute('aria-expanded')==='true';document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));await new Promise(r=>setTimeout(r,80));const closes=menu.getAttribute('aria-expanded')==='false';return {opens,closes};})()`);
  check(Object.values(interactions).every(Boolean), "Mobile navigation interactions");

  const menuChecks = [];
  for (const [width, height] of [[320,568],[390,844],[667,375],[812,375],[896,414]]) {
    await viewport(width, height);
    await evaluate("scrollTo({top:0,behavior:'instant'})");
    // Wait for the compositor's sticky position after returning from the footer;
    // DOM coordinates update before Chrome's touch hit-test surface does.
    await delay(150);
    const tap = await evaluate(`(()=>{const r=document.querySelector('.menu-button').getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};})()`);
    await page("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [tap] });
    await page("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await delay(120);
    const menuState = await evaluate(`(()=>{const menu=document.querySelector('.mobile-menu');if(!menu)return {opens:false};const r=menu.getBoundingClientRect();menu.scrollTop=menu.scrollHeight;const last=menu.querySelector('a:last-child').getBoundingClientRect();return {opens:true,insideViewport:r.top>=0&&r.bottom<=innerHeight-8,lastItemReachable:last.bottom<=r.bottom,scrollable:menu.scrollHeight>menu.clientHeight};})()`);
    check(menuState.opens && menuState.insideViewport && menuState.lastItemReachable, `Touch menu usability at ${width}x${height}`);
    menuChecks.push({ width, height, ...menuState });
    await page("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await delay(100);
    check(await evaluate("document.querySelector('.menu-button').getAttribute('aria-expanded')==='false'"), `Menu resets across desktop breakpoint at ${width}px`);
  }
  await viewport(390, 844);
  const safeArea = await evaluate(`(()=>{const root=document.documentElement;root.style.setProperty('--safe-top','30px');root.style.setProperty('--safe-left','44px');root.style.setProperty('--safe-right','44px');root.style.setProperty('--safe-bottom','20px');scrollTo({top:0,behavior:'instant'});const n=document.querySelector('.navbar').getBoundingClientRect(),h=document.querySelector('.hero-content').getBoundingClientRect();const result={navInset:n.top>=30,sideInsets:n.left>=44&&n.right<=innerWidth-44,contentClearance:h.top-n.bottom>=40,zoomAllowed:!document.querySelector('meta[name=viewport]').content.match(/user-scalable=no|maximum-scale=1/)};['--safe-top','--safe-left','--safe-right','--safe-bottom'].forEach(p=>root.style.removeProperty(p));return result;})()`);
  check(Object.values(safeArea).every(Boolean), "Notch-safe layout and pinch zoom");

  await page("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await delay(350);
  const reducedMotion = await evaluate(`({pinSpacers:document.querySelectorAll('.pin-spacer').length,pendingReveals:document.querySelectorAll('[data-reveal-state="pending"]').length,tickerAnimation:getComputedStyle(document.querySelector('.trust-track')).animationName})`);
  check(reducedMotion.pinSpacers === 0 && reducedMotion.pendingReveals === 0 && reducedMotion.tickerAnimation === "none", "Reduced-motion fallback");
  await page("Emulation.setEmulatedMedia", { features: [] });
  await page("Emulation.setScriptExecutionDisabled", { value: true });
  await page("Page.reload");
  await delay(1200);
  const noScript = await evaluate(`({pending:document.querySelectorAll('[data-reveal-state="pending"]').length,servicesOpacity:getComputedStyle(document.querySelector('.services-header')).opacity})`);
  check(noScript.pending === 0 && noScript.servicesOpacity === "1", "No-JavaScript readability");
  check(!errors.length, `Browser runtime errors: ${errors.join(', ')}`);
  const report = { base, results, desktopFirstScreens, tickerLoop, tickerHover, sticky, interactions, menuChecks, safeArea, reducedMotion, noScript, errors, failures };
  writeFileSync(join(output, "report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ checks: failures.length ? "FAILED" : "PASSED", viewports: results.map(r=>r.width), screenshots: output, failures, errors }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  socket?.close();
  browser.kill();
}

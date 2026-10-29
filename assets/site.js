document.addEventListener('DOMContentLoaded',()=>{let menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');menu?.addEventListener('click',()=>{let open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close menu ✕':'Menu ☰'});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));if('IntersectionObserver' in window){let observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.fadein').forEach(e=>observer.observe(e))}else document.querySelectorAll('.fadein').forEach(e=>e.classList.add('visible'));const tabs=[...document.querySelectorAll('[data-path]')],panel=document.querySelector('#path-result');const info={prepare:['Prepare the investment narrative','Translate the opportunity into a clear business case, with assumptions, uses of capital, decision points and a disciplined information package.'],engage:['Structure investor communication','Map stakeholders and their information needs. Organise introductions, the question-and-answer process and appropriate disclosure checkpoints.'],evaluate:['Coordinate due diligence','Maintain consistent document versions, track requests, bring subject-matter teams into the process and make unresolved matters visible.'],steward:['Build long-term investor confidence','Create a predictable communication rhythm, acknowledge changes promptly and connect commitments to reporting and governance.']};function show(key){tabs.forEach(b=>b.setAttribute('aria-selected',String(b.dataset.path===key)));if(panel&&info[key])panel.innerHTML='<div class="kicker">Investor relations pathway</div><h3>'+info[key][0]+'</h3><p style="color:#5c7065;margin-top:15px">'+info[key][1]+'</p>'}tabs.forEach(b=>b.addEventListener('click',()=>show(b.dataset.path)));if(tabs.length)show('prepare');let form=document.querySelector('#enquiry-form');form?.addEventListener('submit',async e=>{e.preventDefault();let st=form.querySelector('.form-status'),btn=form.querySelector('[type=submit]');if(!form.reportValidity())return;st.textContent='Submitting your enquiry…';btn.disabled=true;try{let r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form).entries()))});let data=await r.json();if(!r.ok)throw Error(data.error||'Submission failed.');st.textContent='Thank you. Your enquiry has been received.';form.reset()}catch(err){st.textContent=err.message||'Enquiry delivery is unavailable. Please try again later.'}finally{btn.disabled=false}})});

/* TU / Global Executive Edition — accessible progressive enhancements */
document.addEventListener('DOMContentLoaded',()=>{
  const $=(q,root=document)=>root.querySelector(q);
  const $$=(q,root=document)=>[...root.querySelectorAll(q)];
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress=document.createElement('div');
  progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.appendChild(progress);
  let scrollScheduled=false;
  const updateProgress=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.style.width=(Math.min(1,scrollY/max)*100)+'%';scrollScheduled=false};
  addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateProgress)}},{passive:true});
  updateProgress();
  $$('.hero').forEach(hero=>{
    const spot=document.createElement('div');spot.className='ambient-spotlight';spot.setAttribute('aria-hidden','true');hero.appendChild(spot);
    if(!reduce)hero.addEventListener('pointermove',e=>{
      const box=hero.getBoundingClientRect();
      spot.style.setProperty('--mouse-x',((e.clientX-box.left)/box.width*100)+'%');
      spot.style.setProperty('--mouse-y',((e.clientY-box.top)/box.height*100)+'%');
    },{passive:true});
  });
  if(!reduce&&matchMedia('(pointer:fine)').matches){
    $$('.architecture-visual,.lens-stage,.visual-panel').forEach(el=>{
      el.setAttribute('data-tilt','');
      el.addEventListener('pointermove',e=>{const b=el.getBoundingClientRect();const x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;el.style.setProperty('--tilt-x',(-y*2)+'deg');el.style.setProperty('--tilt-y',(x*2)+'deg')},{passive:true});
      el.addEventListener('pointerleave',()=>{el.style.setProperty('--tilt-x','0deg');el.style.setProperty('--tilt-y','0deg')});
    });
  }
  const lensContent={
    institutional:['Institutional investor','Where is the evidence behind the opportunity?','Understand the business model, risk framework, supporting assumptions and path to accountable reporting.',['Investment thesis','Risk','Disclosure']],
    strategic:['Strategic partner','What is the basis for long-term alignment?','Explore shared objectives, complementary strengths, operating dependencies and ways to structure informed dialogue.',['Strategic fit','Operations','Continuity']],
    leadership:['Executive leadership','How do we communicate our priorities consistently?','Bring the right leadership teams together around the narrative, documentation, open questions and next-step ownership.',['Strategy','Accountability','Readiness']],
    governance:['Governance stakeholder','How are key decisions and risks overseen?','Clarify decision rights, information controls, approval pathways and expectations for responsible reporting.',['Oversight','Controls','Transparency']]
  };
  const lens=$('#lens-stage');
  $$('[data-lens]').forEach(btn=>btn.addEventListener('click',()=>{
    const a=lensContent[btn.dataset.lens];if(!a||!lens)return;
    $$('[data-lens]').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-selected',String(b===btn))});
    lens.innerHTML='<span class="kicker">'+a[0]+'</span><h3>'+a[1]+'</h3><p>'+a[2]+'</p><div class="lens-tags">'+a[3].map(t=>'<span>'+t+'</span>').join('')+'</div>';
  }));
  const ready=$$('[data-ready]'),count=$('#ready-count'),meter=$('#ready-meter'),title=$('#ready-title'),copy=$('#ready-copy');
  const renderReady=()=>{
    if(!ready.length)return;
    const n=ready.filter(x=>x.checked).length;
    count.innerHTML=n+' <small>/ 6</small>';meter.style.width=(100*n/ready.length)+'%';
    title.textContent=n===0?'Start with the fundamentals.':n<3?'The foundations are taking shape.':n<6?'Build on the preparation.':'A useful starting checklist is complete.';
    copy.textContent=n===0?'Select the statements that describe your preparation. Your inputs stay in this browser session and are not submitted anywhere.':n===6?'All six items selected. A fuller independent diligence process may still be necessary.':'Review the unchecked items with the relevant finance, operations and governance owners.';
  };
  ready.forEach(x=>x.addEventListener('change',renderReady));
  $('#ready-reset')?.addEventListener('click',()=>{ready.forEach(x=>{x.checked=false});renderReady()});renderReady();
  const principles={
    listen:['PRINCIPLE 01','Listen before proposing solutions.','Understanding a stakeholder’s objectives is the foundation of an informed dialogue.'],
    clarify:['PRINCIPLE 02','Make complex information understandable.','Define terms, explain assumptions and separate evidence from expectation.'],
    coordinate:['PRINCIPLE 03','Bring the right people into the conversation.','Finance, leadership, operations and advisers should each answer the questions they own.'],
    follow:['PRINCIPLE 04','Build continuity through follow-through.','Clear actions and considered updates matter after the meeting has ended.']
  };
  const values=$('#values-display');
  $$('[data-value]').forEach(btn=>btn.addEventListener('click',()=>{
    const a=principles[btn.dataset.value];if(!a||!values)return;
    $$('[data-value]').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-selected',String(b===btn))});
    values.innerHTML='<span class="label-slab">'+a[0]+'</span><h3>'+a[1]+'</h3><p>'+a[2]+'</p>';
  }));
  const deskContent={
    investor:['Investor engagement','Build a decision-useful information trail.','Organise commercial context, performance assumptions, governance, risks and responses to diligence questions.',['Opportunity and operating context','Information and disclosure owners','Clear response and follow-up cadence']],
    partners:['Strategic partnerships','Begin with business alignment.','Understand the partnership case, complementary capability, commercial dependencies and meaningful next steps.',['Shared objectives and scope','Roles and responsibilities','Relevant market considerations']],
    internal:['Executive leadership','Equip leadership with a coherent narrative.','Connect stakeholder questions to the responsible internal teams, approved information and follow-up actions.',['Narrative and business priorities','Decision-making owners','Communication and escalation process']]
  };
  $$('[data-desk]').forEach(btn=>btn.addEventListener('click',()=>{
    const a=deskContent[btn.dataset.desk],panel=$('#desk-panel');if(!a||!panel)return;
    $$('[data-desk]').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-selected',String(b===btn))});
    panel.innerHTML='<div class="kicker">'+a[0]+'</div><h3>'+a[1]+'</h3><p>'+a[2]+'</p><ul class="checklist">'+a[3].map(x=>'<li>'+x+'</li>').join('')+'</ul>';
  }));
  const glossaryInput=$('#glossary-search');
  glossaryInput?.addEventListener('input',()=>{
    const q=glossaryInput.value.toLowerCase().trim();let visible=0;
    $$('.glossary-term').forEach(el=>{const match=el.textContent.toLowerCase().includes(q);el.hidden=!match;if(match)visible++});
    const empty=$('#glossary-empty');if(empty)empty.hidden=visible>0;
  });
  $$('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
    const link=location.origin+location.pathname+'#'+encodeURIComponent(button.dataset.copy);
    const status=$('#copy-status');
    try{
      if(!navigator.clipboard?.writeText)throw Error('Unavailable');
      await navigator.clipboard.writeText(link);
      if(status)status.textContent='Article link copied to clipboard.';
    }catch{
      if(status){status.textContent='Select and copy this article URL: '+link;}
    }
  }));
  $$('[data-enquiry]').forEach(btn=>btn.addEventListener('click',()=>{
    const select=$('select[name="interest"]');if(select){select.value=btn.dataset.enquiry;select.dispatchEvent(new Event('change',{bubbles:true}))}
    const form=$('#enquiry-form');
    if(form){form.scrollIntoView({behavior:reduce?'instant':'smooth',block:'center'});const msg=$('textarea[name="message"]',form);setTimeout(()=>msg?.focus({preventScroll:true}),reduce?0:450)}
  }));
  const toggle=$('.menu-toggle'),nav=$('.nav');
  if(toggle&&nav){
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu ☰';toggle.focus()}});
    document.addEventListener('pointerdown',e=>{if(nav.classList.contains('open')&&!nav.contains(e.target)&&!toggle.contains(e.target)){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu ☰'}});
  }
});


/* IAG capital-intelligence desk — content is informational, never an investment offer */
document.addEventListener('DOMContentLoaded',()=>{
  const sectors={
    inputs:{n:'01 / 04',title:'Capital meets the distribution network.',copy:"IAG's agri-input model raises questions about the financial performance of inventory, regulated distribution and agricultural demand.",capital:'Working-capital discipline',risk:'Inventory and receivables',questions:['How do seasonal demand and cash conversion interact?','What controls govern inventory, partner credit and quality?','How does distribution growth translate into durable economics?']},
    trade:{n:'02 / 04',title:'Trading discipline follows every shipment.',copy:'Commodity supply chains bring procurement, logistics and counterparties into the financial picture. Investor dialogue must consider the cash cycle and the operational conditions of delivery.',capital:'Trade-finance alignment',risk:'Market and counterparty exposure',questions:['How are commodity, foreign-exchange and logistics exposures managed?','How are counterparty credit terms assessed and documented?','Which controls support traceability and delivery performance?']},
    technology:{n:'03 / 04',title:'Technology needs measurable operating value.',copy:'Data-led agricultural tools are most compelling when adoption, measurable field usefulness and recurring operating economics can be examined together.',capital:'Scalable adoption economics',risk:'Execution and measurable impact',questions:['What field outcomes does the technology help improve?','How does adoption translate to commercial value and repeatability?','What data controls and implementation costs are relevant?']},
    resilience:{n:'04 / 04',title:'Long-term resilience needs long-term reasoning.',copy:'Sustainable agriculture programs involve physical risks, resource efficiency, outcomes verification and longer investment horizons.',capital:'Patient-capital fit',risk:'Climate and implementation uncertainty',questions:['Which environmental and operational outcomes can be verified?','What is the appropriate capital horizon for program development?','How are climate, resource and regulatory exposures considered?']}
  };
  const tabs=[...document.querySelectorAll('[data-iag-sector]')],stage=document.getElementById('tu-lens-output');
  if(!stage||!tabs.length)return;
  const escape=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const render=k=>{
    const d=sectors[k];if(!d)return;
    tabs.forEach(b=>{const active=b.dataset.iagSector===k;b.classList.toggle('on',active);b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1});
    stage.innerHTML='<div class="tu-lens-brow"><span>INVESTOR’S VIEW</span><span>'+d.n+'</span></div><h3>'+escape(d.title)+'</h3><p>'+escape(d.copy)+'</p><div class="tu-lens-metrics"><div><span>Capital priority</span><b>'+escape(d.capital)+'</b></div><div><span>Principal exposure</span><b>'+escape(d.risk)+'</b></div></div><h4>Questions to test</h4><ul>'+d.questions.map(q=>'<li>'+escape(q)+'</li>').join('')+'</ul><p class="tu-lens-disclaimer">Illustrative due-diligence questions. No funding offer, forecast or assurance of returns.</p>';
  };
  tabs.forEach((b,i)=>{b.addEventListener('click',()=>render(b.dataset.iagSector));b.addEventListener('keydown',e=>{
    if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;
    e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowDown'?1:-1)+tabs.length)%tabs.length;
    tabs[next].focus();render(tabs[next].dataset.iagSector);
  })});
  render('inputs');
});


/* Investor questions board, editorial hub search and investor briefing checklist */
document.addEventListener('DOMContentLoaded',()=>{
 const board={
 growth:{label:'01',title:'Does growth translate into durable business value?',copy:'Examine the relationship between demand, operating margins, reinvestment and the conditions needed to deliver repeatable results.',tags:['Commercial economics','Operating evidence','Growth assumptions'],link:'/journal/capital-allocation-agri-value-chain.html'},
 cash:{label:'02',title:'What does the cash cycle reveal about the business?',copy:'Look at procurement, inventory, collection terms and how much capital remains committed through the operating season.',tags:['Cash conversion','Inventory','Capital timing'],link:'/journal/working-capital-agriculture.html'},
 risk:{label:'03',title:'Which assumptions could materially change the outcome?',copy:'Consider commodity price shifts, counterparties, regulatory requirements, currency and the practical constraints of execution.',tags:['Risk sensitivity','Operating resilience','Counterparties'],link:'/journal/investment-readiness-agri-business.html'},
 governance:{label:'04',title:'How will information stay reliable after the first conversation?',copy:'Clarify who approves disclosures, how open questions are tracked and how reporting supports accountable stakeholder relationships.',tags:['Disclosure','Governance','Stewardship'],link:'/journal/cross-border-investor-trust.html'}
 };
 const stage=document.querySelector('#question-stage'),tabs=[...document.querySelectorAll('[data-board]')];
 const safe=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const renderBoard=id=>{
  const a=board[id];if(!a||!stage)return;
  tabs.forEach(b=>{let on=b.dataset.board===id;b.classList.toggle('is-active',on);b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1});
  stage.innerHTML='<div class="question-stage-top"><span>CAPITAL QUESTION / '+a.label+'</span><span>INVADE AGRO GLOBAL</span></div><h3>'+safe(a.title)+'</h3><p>'+safe(a.copy)+'</p><div class="question-pills">'+a.tags.map(t=>'<span>'+safe(t)+'</span>').join('')+'</div><a href="'+a.link+'">Read the related perspective ↗</a>';
 };
 tabs.forEach((b,i)=>{b.addEventListener('click',()=>renderBoard(b.dataset.board));b.addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();let next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowDown'?1:-1)+tabs.length)%tabs.length;tabs[next].focus();renderBoard(tabs[next].dataset.board)})});
 const cards=[...document.querySelectorAll('[data-journal-card]')],filterButtons=[...document.querySelectorAll('[data-filter]')],query=document.querySelector('#journal-query'),empty=document.querySelector('#journal-empty');
 let active='all';
 const renderCards=()=>{const search=(query?.value||'').trim().toLowerCase();let total=0;cards.forEach(card=>{const show=(active==='all'||card.dataset.category===active)&&(!search||card.dataset.search.includes(search));card.hidden=!show;if(show)total++});if(empty)empty.hidden=total>0;};
 filterButtons.forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.filter;filterButtons.forEach(b=>{let on=b===btn;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});renderCards()}));
 query?.addEventListener('input',renderCards);
 const items=[...document.querySelectorAll('[data-briefing-check]')],count=document.querySelector('#briefing-count'),bar=document.querySelector('#briefing-progress'),message=document.querySelector('#briefing-message');
 const update=()=>{if(!items.length)return;const n=items.filter(x=>x.checked).length;if(count)count.innerHTML=n+' <small>/ 5</small>';if(bar)bar.style.width=(n/items.length*100)+'%';if(message)message.textContent=n===0?'Build a clearer discussion.':n<5?'Keep connecting the evidence.':'All five preparation areas reviewed.'};
 items.forEach(x=>x.addEventListener('change',update));
 document.querySelector('#briefing-reset')?.addEventListener('click',()=>{items.forEach(x=>x.checked=false);update()});
 update();
 document.querySelectorAll('[data-copy-article]').forEach(btn=>btn.addEventListener('click',async()=>{
   const status=btn.parentElement.querySelector('.copy-result');
   try{await navigator.clipboard.writeText(location.href);if(status)status.textContent='Link copied.'}catch{if(status)status.textContent='Copy this URL: '+location.href}
 }));
});

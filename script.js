const body=document.body;
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');

const setMenu=(open)=>{
  nav?.classList.toggle('is-open',open);
  toggle?.classList.toggle('is-active',open);
  toggle?.setAttribute('aria-expanded',String(open));
  toggle?.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');
  body.classList.toggle('menu-open',open);
};

toggle?.addEventListener('click',()=>setMenu(!nav?.classList.contains('is-open')));

document.querySelectorAll('.nav a[href^="#"]').forEach(link=>{
  link.addEventListener('click',event=>{
    const targetId=link.getAttribute('href');
    const target=targetId ? document.querySelector(targetId) : null;
    if(!target) return;
    event.preventDefault();
    setMenu(false);
    window.requestAnimationFrame(()=>{
      target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
});

window.addEventListener('resize',()=>{
  if(window.innerWidth>760 && nav?.classList.contains('is-open')) setMenu(false);
});

const form=document.getElementById('appealForm');
const notice=document.getElementById('formNotice');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  notice.textContent='Форма работает в демонстрационном режиме. Для отправки обращений подключим серверную обработку.';
});

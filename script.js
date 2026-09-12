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

// Фотогалерея
const galleryModal=document.getElementById('galleryModal');
const galleryModalImage=document.getElementById('galleryModalImage');
const galleryClose=galleryModal?.querySelector('.gallery-modal__close');
const galleryItems=document.querySelectorAll('[data-gallery]');
function openGallery(src){if(!galleryModal||!galleryModalImage)return;galleryModalImage.src=src;galleryModal.classList.add('is-open');galleryModal.setAttribute('aria-hidden','false');document.body.classList.add('gallery-lock');}
function closeGallery(){if(!galleryModal)return;galleryModal.classList.remove('is-open');galleryModal.setAttribute('aria-hidden','true');document.body.classList.remove('gallery-lock');setTimeout(()=>{if(!galleryModal.classList.contains('is-open'))galleryModalImage.src=''},250);}
galleryItems.forEach(item=>item.addEventListener('click',()=>openGallery(item.dataset.gallery)));
galleryClose?.addEventListener('click',closeGallery);
galleryModal?.addEventListener('click',e=>{if(e.target===galleryModal)closeGallery()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&galleryModal?.classList.contains('is-open'))closeGallery()});

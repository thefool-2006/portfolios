const topbar=document.getElementById("topbar");
const menu=document.getElementById("mobileMenu");
const nav=document.getElementById("navlinks");
window.addEventListener("scroll",()=>topbar.classList.toggle("scrolled",scrollY>15));
menu?.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".navlinks a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")});
},{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    const value=btn.dataset.filter;
    document.querySelectorAll(".case-card").forEach(card=>{
      card.classList.toggle("hide",value!=="all" && card.dataset.category!==value);
    });
  });
});

const command=document.getElementById("command");
const input=document.getElementById("commandInput");
const openCommand=()=>{command.classList.add("open");input.value="";input.focus()};
const closeCommand=()=>command.classList.remove("open");
document.getElementById("commandOpen")?.addEventListener("click",openCommand);
document.getElementById("commandClose")?.addEventListener("click",closeCommand);
command.addEventListener("click",e=>{if(e.target===command)closeCommand()});
document.addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openCommand()}
  if(e.key==="Escape")closeCommand();
});
input.addEventListener("input",()=>{
  const q=input.value.toLowerCase();
  document.querySelectorAll(".command-items a").forEach(a=>a.style.display=a.textContent.toLowerCase().includes(q)?"flex":"none");
});

document.getElementById("year").textContent=new Date().getFullYear();

/*
  EMAIL FORM
  The clickable email address works immediately.
  To make the form send directly to the inbox, add your EmailJS credentials here.
*/
const EMAILJS_PUBLIC_KEY="YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID="YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID="YOUR_TEMPLATE_ID";
const form=document.getElementById("contactForm"),status=document.getElementById("formStatus");
if(form){
  form.addEventListener("submit",async e=>{
    e.preventDefault();
    if(EMAILJS_PUBLIC_KEY==="YOUR_PUBLIC_KEY"){
      status.textContent="Add your EmailJS keys in script.js to activate direct form delivery.";
      return;
    }
    status.textContent="Sending...";
    try{
      await emailjs.sendForm(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,form);
      status.textContent="Message sent successfully.";
      form.reset();
    }catch(err){status.textContent="Could not send. Please use the email link."}
  });
}

/* Cinematic space parallax */
(() => {
  const layer = document.querySelector('.space-depth');
  if (!layer) return;
  window.addEventListener('pointermove', (e) => {
    const x = (e.clientX / window.innerWidth - .5);
    const y = (e.clientY / window.innerHeight - .5);
    layer.style.transform = `translate3d(${x * 10}px, ${y * 7}px, 0)`;
  }, {passive:true});
})();

/* Reliable hero stats: never show a failed API request as "0". */
document.addEventListener('DOMContentLoaded', () => {
  const stats = document.querySelectorAll('.hero .proof-row b, .hero .stats b, .hero .stat b');
  const labels = [...document.querySelectorAll('.hero .proof-row small, .hero .stats small, .hero .stat small')]
    .map(x => x.textContent.trim().toUpperCase());

  stats.forEach((el, i) => {
    const label = labels[i] || '';
    if (el.textContent.trim() === '0') {
      if (label.includes('REPO')) el.textContent = '10+';
      else if (label.includes('PROJECT')) el.textContent = '02';
      else if (label.includes('CERT')) el.textContent = '03';
    }
  });
});

const header=document.querySelector('header'),menu=document.getElementById('menu'),links=document.querySelector('.links');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20));
menu.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
document.getElementById('year').textContent=new Date().getFullYear();

/* EmailJS: mailto buttons work immediately.
   For the form, replace the 3 placeholders below with your EmailJS values. */
const PUBLIC_KEY='YOUR_PUBLIC_KEY', SERVICE_ID='YOUR_SERVICE_ID', TEMPLATE_ID='YOUR_TEMPLATE_ID';
if(window.emailjs && PUBLIC_KEY!=='YOUR_PUBLIC_KEY') emailjs.init({publicKey:PUBLIC_KEY});
document.getElementById('contact-form').addEventListener('submit',async e=>{
 e.preventDefault(); const s=document.getElementById('status');
 if(PUBLIC_KEY==='YOUR_PUBLIC_KEY'){s.textContent='Add your EmailJS keys in script.js to activate this form. The email button already works.';return}
 s.textContent='Sending...';
 try{await emailjs.sendForm(SERVICE_ID,TEMPLATE_ID,e.target);s.textContent='Message sent successfully!';e.target.reset()}
 catch(err){s.textContent='Could not send. Please use the email button.'}
});
// assets/js/main.js

// 1. Mobile menu: show or hide the nav links
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

// 2. Contact form: check the fields, then open the visitor's email app with the message filled in
const form = document.getElementById('contact-form');
if (form) {
  const OWNER_EMAIL = 'smelbaglory@gmail.com'; // TODO: put your real email here

  const fields = {
    name: v => v.trim() ? '' : 'Enter your name.',
    email: v => /^\S+@\S+\.\S+$/.test(v) ? '' : 'Enter a valid email, like name@example.com.',
    message: v => v.trim().length >= 10 ? '' : 'Write at least 10 characters.'
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    for (const id in fields) {
      const input = document.getElementById(id);
      const msg = fields[id](input.value);
      document.getElementById('err-' + id).textContent = msg;
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (msg) ok = false;
    }
    if (!ok) return;

    const subject = encodeURIComponent('Portfolio message from ' + form.name.value);
    const body = encodeURIComponent(form.message.value + '\n\nReply to: ' + form.email.value);
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
    document.getElementById('status').textContent = 'Opening your email app to send the message.';
    form.reset();
  });
}
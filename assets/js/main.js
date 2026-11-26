// assets/js/main.js

// 1. Mobile menu: show or hide the nav links
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
}

// 2. Contact form: check the fields, then open the visitor's own mail with the message filled in
const form = document.getElementById('contact-form');
if (form) {
  const OWNER_EMAIL = 'mohanaprasath1735@gmail.com';
  const status = document.getElementById('status');

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

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent('Portfolio message from ' + name);
    const body = encodeURIComponent(message + '\n\n' + name + '\n' + email);
    const isPhone = /Android|iPhone|iPad/i.test(navigator.userAgent);

    if (isPhone) {
      window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
    } else {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${OWNER_EMAIL}&su=${subject}&body=${body}`,
        '_blank',
        'noopener'
      );
    }

    status.textContent = 'Your mail is ready. Press Send in the mail window to deliver your message.';
    form.reset();
  });
}
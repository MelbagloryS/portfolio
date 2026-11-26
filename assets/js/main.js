// assets/js/main.js

// 1. Mobile menu: show or hide the nav links
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

// 2. Contact form: check the fields, then send the message to your email
const form = document.getElementById('contact-form');
if (form) {
  const OWNER_EMAIL = 'smelbaglory@gmail.com'; // TODO: put your real email here
  const status = document.getElementById('status');

  const fields = {
    name: v => v.trim() ? '' : 'Enter your name.',
    email: v => /^\S+@\S+\.\S+$/.test(v) ? '' : 'Enter a valid email, like name@example.com.',
    message: v => v.trim().length >= 10 ? '' : 'Write at least 10 characters.'
  };

  form.addEventListener('submit', async e => {
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

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.textContent = 'Sending your message...';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
      const res = await fetch('https://formsubmit.co/ajax/' + OWNER_EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Portfolio message from ' + name,
          _replyto: email,
          name: name,
          email: email,
          message: message
        })
      });
      const data = await res.json();
      if (data.success === 'true' || data.success === true) {
        status.textContent = 'Message sent. Thank you, I will reply soon.';
        form.reset();
      } else {
        throw new Error('Send failed');
      }
    } catch (err) {
      status.textContent = 'Could not send the message. Please try again, or contact me on GitHub or LinkedIn.';
    } finally {
      button.disabled = false;
    }
  });
}
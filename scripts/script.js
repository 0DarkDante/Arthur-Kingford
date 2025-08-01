const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');

burger.addEventListener('click', () => {
mobileMenu.classList.toggle('open');
});

// forms
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;
  const status = document.getElementById('form-status');

  const gotchaField = form.elements['_gotcha'];

  // honeypot check
  if (gotchaField && gotchaField.value !== '') {
    status.textContent = 'Виявлено спам. Повідомлення не надіслано.';
    status.style.color = 'red';
    return;
  }

  // зібрати дані з новими полями
  const data = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    message: form.message.value
  };

  // відключити кнопку
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  status.textContent = 'Надсилаємо...';
  status.style.color = '#999';

  try {
    const response = await fetch('https://formspree.io/f/xovlwyzn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      status.textContent = 'Sent successfully!';
      status.style.color = 'green';
      form.reset();
    } else {
      throw new Error('Something went wrong. 😞');
    }
  } catch (error) {
    status.textContent = 'Error sending. Please try again.';
    status.style.color = 'red';
  }

  // увімкнути кнопку через 5 сек
  setTimeout(() => {
    submitBtn.disabled = false;
  }, 5000);
});

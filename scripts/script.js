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

  // honeypot check
  if (form._gotcha.value !== '') {
    status.textContent = 'Виявлено спам. Повідомлення не надіслано.';
    status.style.color = 'red';
    return;
  }

  // зібрати дані
  const data = {
    email: form.email.value,
    message: form.message.value
  };

  // відключити кнопку
  form.querySelector('button').disabled = true;
  status.textContent = 'Надсилаємо...';
  status.style.color = '#999';

  try {
    const response = await fetch('https://formspree.io/f/xzzvgjpr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      status.textContent = 'Надіслано успішно!';
      status.style.color = 'green';
      form.reset();
    } else {
      throw new Error('Щось пішло не так 😞');
    }
  } catch (error) {
    status.textContent = 'Помилка при надсиланні. Спробуйте ще раз.';
    status.style.color = 'red';
  }

  // увімкнути кнопку через 5 сек
  setTimeout(() => {
    form.querySelector('button').disabled = false;
  }, 5000);
});
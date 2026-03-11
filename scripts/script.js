const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');

burger.addEventListener('click', () => {
mobileMenu.classList.toggle('open');
});

// forms
const contactForm = document.getElementById('contact-form');

if (contactForm) {
contactForm.addEventListener('submit', async function(e) {
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
}

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / scrollHeight) * 100;

  progressBar.style.width = progress + "%";
});

const fadeElements = document.querySelectorAll(
  ".works-text-container p, .works-text-container ul, .about-text-container p"
);

if (fadeElements.length > 0) {

  const observer = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.15
    }
  );

  fadeElements.forEach(el => observer.observe(el));

}
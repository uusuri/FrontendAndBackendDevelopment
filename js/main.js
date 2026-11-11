const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
  const updateHeaderHeight = () => {
    document.documentElement.style.setProperty('--header-height', `${siteHeader.offsetHeight}px`);
  };
  updateHeaderHeight();
  new ResizeObserver(updateHeaderHeight).observe(siteHeader);
}

const modal = document.getElementById('reserve');
modal?.addEventListener('show.bs.modal', (event) => {
  const button = event.relatedTarget;
  const item = button.closest('article');
  document.getElementById('chosen').textContent = item.querySelector('h2, h3').textContent;
  document.getElementById('continue').href = 'order.html?plant=' + encodeURIComponent(button.dataset.product);
});
const select = document.getElementById('selected-product');
const plant = new URLSearchParams(location.search).get('plant');
if (select && plant && Array.from(select.options).some(option => option.value === plant)) select.value = plant;

const orderForm = document.getElementById('order-form');

const successMessage = document.getElementById('success-message');

orderForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formElements = Array.from(orderForm.elements);

  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });

  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute('aria-invalid', 'true');
      }
    });

    orderForm.reportValidity();
    return;
  }

  successMessage.hidden = false;

  orderForm.reset();

  successMessage.scrollIntoView();
});

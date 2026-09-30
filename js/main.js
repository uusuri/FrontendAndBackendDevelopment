const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('[data-product]');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderDialog) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedProductInput.value = button.dataset.product;
      successMessage.hidden = true;
      orderDialog.showModal();
    });
  });

  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    // Сервер не подключён: проверяем форму без отправки данных.
    event.preventDefault();
    successMessage.hidden = true;
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
    if (orderDialog) {
      orderDialog.close();
    }
    successMessage.scrollIntoView({ block: 'center' });
  });
}

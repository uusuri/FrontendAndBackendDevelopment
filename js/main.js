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
const panels = document.querySelectorAll('[data-panel]');
document.querySelectorAll('[data-group]').forEach(button => {
  button.addEventListener('click', () => {
    panels.forEach(panel => panel.hidden = panel.dataset.panel !== button.dataset.group);
    document.querySelectorAll('[data-group]').forEach(tab => {
      tab.classList.toggle('active', tab === button);
      tab.setAttribute('aria-pressed', String(tab === button));
    });
  });
});
const picker = document.querySelector('#specimen');
if (picker) {
  const selectSpecies = () => {
    const slug = location.hash.slice(1);
    if ([...picker.options].some(o => o.value === slug)) picker.value = slug;
    document.querySelectorAll('[data-species]').forEach(article => article.hidden = article.dataset.species !== picker.value);
    if (slug === picker.value) document.querySelector('#inside').scrollIntoView();
  };
  picker.addEventListener('change', () => {location.hash = picker.value;});
  window.addEventListener('hashchange', selectSpecies);
  selectSpecies();
}
const footer = document.querySelector('.foot');
new ResizeObserver(() => document.documentElement.style.setProperty('--footer-height', footer.offsetHeight + 'px')).observe(footer);

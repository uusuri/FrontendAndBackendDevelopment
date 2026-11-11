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
const search = document.getElementById('plant-search');
if (search) {
  const cards = [...document.querySelectorAll('[data-category]')];
  const scopes = [...document.querySelectorAll('[data-scope]')];
  const key = 'green-room:favorites';
  let saved = new Set();
  try {
    const stored = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(stored)) saved = new Set(stored.filter(id => cards.some(c => c.querySelector('[data-save]').dataset.save === id)));
  } catch { /* Storage may be unavailable in private browsing. */ }
  let scope = '0';
  const normalize = text => text.toLocaleLowerCase('ru').replaceAll('ё', 'е').trim();
  function render() {
    const query = normalize(search.value);
    let count = 0;
    for (const card of cards) {
      const button = card.querySelector('[data-save]');
      const name = card.querySelector('h3').textContent;
      const marked = saved.has(button.dataset.save);
      button.textContent = marked ? '♥' : '♡';
      button.setAttribute('aria-pressed', String(marked));
      button.setAttribute('aria-label', (marked ? 'Убрать из избранного: ' : 'В избранное: ') + name);
      const inScope = scope === 'all' || scope === card.dataset.category || (scope === 'saved' && marked);
      card.hidden = !inScope || !normalize(name + ' ' + card.querySelector('small').textContent).includes(query);
      if (!card.hidden) count++;
    }
    scopes.forEach(b => {
      b.classList.toggle('active', b.dataset.scope === scope);
      b.setAttribute('aria-pressed', String(b.dataset.scope === scope));
    });
    document.getElementById('saved-count').textContent = saved.size;
    document.getElementById('search-status').textContent = count ? 'Найдено: ' + count : scope === 'saved' && !saved.size ? 'Пока пусто. Нажмите сердце на фото растения.' : 'Ничего не найдено. Попробуйте другое название или категорию.';
  }
  scopes.forEach(b => b.addEventListener('click', () => {
    scope = b.dataset.scope;
    document.querySelector('.catalog-deck').scrollLeft = 0;
    render();
  }));
  search.addEventListener('input', () => {
    if (scope !== 'saved') scope = 'all';
    document.querySelector('.catalog-deck').scrollLeft = 0;
    render();
  });
  cards.forEach(card => card.querySelector('[data-save]').addEventListener('click', event => {
    const id = event.currentTarget.dataset.save;
    if (saved.has(id)) saved.delete(id); else saved.add(id);
    try { localStorage.setItem(key, JSON.stringify([...saved])); } catch { /* Keep the selection for this visit. */ }
    render();
    if (scope === 'saved' && card.hidden) document.querySelector('[data-scope="saved"]').focus();
  }));
  render();
}
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

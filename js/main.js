
/* =========================================
   ЗЕЛЕНАЯ КОМНАТА — MAIN.JS
========================================= */

const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
  const updateHeaderHeight = () => {
    document.documentElement.style.setProperty(
      '--header-height',
      `${siteHeader.offsetHeight}px`
    );
  };

  updateHeaderHeight();

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(updateHeaderHeight).observe(siteHeader);
  }
}


/* =========================================
   ОБЩИЙ ФУТЕР
========================================= */

function renderFooter() {
  const footer = document.querySelector('.foot');

  if (!footer) return;

  footer.innerHTML = `
        <div class="container wrap footer-layout">

            <div>
                <div class="footer-brand">
                    <span class="footer-mark">✳</span>
                    Зеленая комната
                </div>

                <p class="footer-description">
                    Магазин комнатных растений для дома
                    и рабочего пространства. Помогаем
                    создавать уютные интерьеры и находить
                    растения, которые подходят именно вам.
                </p>

                <p class="footer-description">
                    Природа ближе, чем кажется.
                </p>
            </div>

            <div>
                <h3 class="footer-heading">Магазин</h3>

                <nav class="footer-links"
                     aria-label="Навигация в футере">

                    <a href="index.html">Главная</a>
                    <a href="catalog.html">Каталог растений</a>
                    <a href="guide.html">Гид</a>
                    <a href="diagnostic.html">Диагностика</a>
                    <a href="about.html">О нас</a>
                    <a href="contacts.html">Контакты</a>

                </nav>
            </div>

            <div>
                <h3 class="footer-heading">Покупателям</h3>

                <div class="footer-links">
                    <a href="catalog.html">Ассортимент</a>
                    <a href="order.html">Оформить заявку</a>
                    <a href="guide.html">Советы по уходу</a>
                    <a href="about.html#inside">
                        Авторы фотографий
                    </a>
                    <a href="about.html">
                        Лицензии и авторские права
                    </a>
                </div>
            </div>

            <div>
                <h3 class="footer-heading">
                    Связаться с нами
                </h3>

                <div class="footer-contact">

                    <div class="footer-contact-item">
                        <span class="footer-label">
                            Телефон
                        </span>

                        <a href="tel:+74950000000">
                            +7 (495) 000-00-00
                        </a>
                    </div>

                    <div class="footer-contact-item">
                        <span class="footer-label">
                            Электронная почта
                        </span>

                        <a href="mailto:hello@greenroom.example">
                            hello@greenroom.example
                        </a>
                    </div>

                    <div class="footer-contact-item">
                        <span class="footer-label">
                            Режим работы
                        </span>

                        <span>
                            Ежедневно, 10:00–20:00
                        </span>
                    </div>

                    <div class="footer-contact-item">
                        <span class="footer-label">
                            Регион обслуживания
                        </span>

                        <span>
                            Москва и Московская область
                        </span>
                    </div>

                </div>
            </div>

        </div>

        <div class="footer-bottom">
            <div class="container wrap footer-bottom-inner">

                <p>
                    © 2026 Зеленая комната.
                    Все права на фирменные материалы защищены.
                </p>

                <div class="footer-bottom-links">
                    <a href="about.html">
                        Правовая информация
                    </a>

                    <a href="#top">
                        Наверх ↑
                    </a>
                </div>

            </div>
        </div>
    `;

  const updateFooterHeight = () => {
    document.documentElement.style.setProperty(
      '--footer-height',
      `${footer.offsetHeight}px`
    );
  };

  updateFooterHeight();

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(updateFooterHeight).observe(footer);
  }
}

renderFooter();


/* =========================================
   ПАРАМЕТРЫ URL
========================================= */

const plant = new URLSearchParams(window.location.search)
  .get('plant');

const selectedProduct = document.getElementById(
  'selected-product'
);

function selectProductFromUrl() {
  if (!selectedProduct || !plant) return;

  const exists = [...selectedProduct.options]
    .some(option => option.value === plant);

  if (exists) {
    selectedProduct.value = plant;
  }
}


/* =========================================
   ИНФОРМАЦИЯ ПО УХОДУ
========================================= */

const careNotes = {
  ficus: [
    'Яркий рассеянный свет',
    'Поливайте, когда верхние 3–4 см грунта просохли.',
    'Протирайте крупные листья влажной салфеткой.'
  ],

  fern: [
    'Рассеянный свет',
    'Не давайте земляному кому пересыхать полностью.',
    'Любит повышенную влажность воздуха.'
  ],

  pothos: [
    'Рассеянный свет',
    'Поливайте после подсыхания верхнего слоя.',
    'Направляйте побеги на опору или дайте им свисать.'
  ],

  aloe: [
    'Яркий свет',
    'Поливайте только после полного просыхания грунта.',
    'Не оставляйте воду в розетке листьев.'
  ],

  echeveria: [
    'Яркий свет',
    'Поливайте редко, только в сухой грунт.',
    'Берегите розетку от застоя воды.'
  ],

  jade: [
    'Яркий свет',
    'Поливайте после просыхания грунта.',
    'Поворачивайте горшок, чтобы крона росла ровно.'
  ],

  anthurium: [
    'Яркий рассеянный свет',
    'Поддерживайте грунт слегка влажным.',
    'Не ставьте под прямое полуденное солнце.'
  ],

  violet: [
    'Рассеянный свет',
    'Поливайте по краю горшка или через поддон.',
    'Не мочите опушённые листья.'
  ],

  peace: [
    'Рассеянный свет',
    'Поливайте после лёгкого подсыхания почвы.',
    'Поникшие листья обычно подсказывают, что пора полить.'
  ],

  monstera: [
    'Яркий рассеянный свет',
    'Поливайте после подсыхания верхнего слоя.',
    'По мере роста добавьте устойчивую опору.'
  ],

  snake: [
    'От яркого до умеренного света',
    'Поливайте редко, когда грунт полностью сухой.',
    'Это один из самых неприхотливых видов.'
  ],

  zamioculcas: [
    'Рассеянный или умеренный свет',
    'Поливайте редко: клубни запасают воду.',
    'Лучше недолить, чем перелить.'
  ],

  chlorophytum: [
    'Рассеянный свет',
    'Поливайте после подсыхания верхнего слоя.',
    'Регулярно удаляйте сухие кончики листьев.'
  ],

  dracaena: [
    'Рассеянный свет',
    'Поливайте после подсыхания примерно трети горшка.',
    'Не ставьте рядом с холодным сквозняком.'
  ],

  begonia: [
    'Яркий рассеянный свет',
    'Поливайте, не заливая листья и клубень.',
    'Дайте грунту слегка просохнуть между поливами.'
  ]
};


/* =========================================
   ДОПОЛНИТЕЛЬНЫЕ РАСТЕНИЯ
========================================= */

const extraPlants = [
  [
    'monstera',
    'Монстера деликатесная',
    'Monstera deliciosa',
    'Крупные резные листья для просторной комнаты.',
    '2 790 ₽',
    '0',
    'ficus'
  ],

  [
    'snake',
    'Сансевиерия',
    'Dracaena trifasciata',
    'Строгие вертикальные листья для солнечного угла.',
    '1 390 ₽',
    '0',
    'jade'
  ],

  [
    'zamioculcas',
    'Замиокулькас',
    'Zamioculcas zamiifolia',
    'Глянцевые побеги, которые хорошо переносят редкий полив.',
    '1 890 ₽',
    '0',
    'ficus'
  ],

  [
    'chlorophytum',
    'Хлорофитум',
    'Chlorophytum comosum',
    'Лёгкая розетка с длинными дугообразными листьями.',
    '1 090 ₽',
    '0',
    'fern'
  ],

  [
    'dracaena',
    'Драцена маргината',
    'Dracaena marginata',
    'Графичный силуэт с узкими листьями и тонким стволом.',
    '2 190 ₽',
    '0',
    'pothos'
  ],

  [
    'begonia',
    'Бегония рекс',
    'Begonia rex-cultorum',
    'Декоративная листва с выразительным рисунком.',
    '1 490 ₽',
    '2',
    'violet'
  ]
];


/* =========================================
   СОЗДАНИЕ КАРТОЧКИ РАСТЕНИЯ
========================================= */

function makePlantCard([
  id,
  name,
  latin,
  description,
  price,
  category,
  photo
]) {
  const card = document.createElement('div');

  card.className = 'col-12 col-md-6 col-lg-4';
  card.dataset.category = category;

  card.innerHTML = `
        <article class="card h-100 product-card">

            <div class="plate">
                <img
                    class="card-img-top care-photo"
                    src="images/photos/${photo}.jpg"
                    alt="${name}"
                    width="500"
                    height="360"
                    loading="lazy"
                    data-care="${id}"
                    tabindex="0"
                    role="button"
                    aria-label="Открыть уход за растением: ${name}"
                >

                <button
                    class="save-plant"
                    type="button"
                    data-save="${id}"
                    aria-pressed="false"
                    aria-label="В избранное: ${name}"
                >
                    ♡
                </button>
            </div>

            <div class="card-body d-flex flex-column">
                <small>${latin}</small>

                <h3 class="card-title">
                    <a href="product.html#${id}">
                        ${name}
                    </a>
                </h3>

                <p>${description}</p>

                <div class="mt-auto">
                    <p class="price">${price}</p>
                </div>
            </div>

        </article>
    `;

  return card;
}


/* =========================================
   МОДАЛЬНОЕ ОКНО УХОДА
========================================= */

function addCareModal() {
  if (document.getElementById('care-modal')) return;

  document.body.insertAdjacentHTML(
    'beforeend',
    `
        <div
            class="modal fade"
            id="care-modal"
            tabindex="-1"
            aria-labelledby="care-title"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-header">
                        <div>
                            <p class="kicker mb-1">
                                Карточка ухода
                            </p>

                            <h2
                                class="modal-title fs-4"
                                id="care-title"
                            >
                                Уход за растением
                            </h2>
                        </div>

                        <button
                            class="btn-close"
                            type="button"
                            data-bs-dismiss="modal"
                            aria-label="Закрыть"
                        ></button>
                    </div>

                    <div
                        class="modal-body"
                        id="care-content"
                    ></div>

                </div>
            </div>
        </div>
        `
  );
}


function showCare(event) {
  const image = event.target.closest('[data-care]');

  if (!image) return;

  const id = image.dataset.care;
  const notes = careNotes[id];

  if (!notes) return;

  const article = image.closest('article');

  const name = article
    ?.querySelector('h2, h3')
    ?.textContent
    ?.trim() || image.alt;

  const [light, water, tip] = notes;

  addCareModal();

  document.getElementById('care-title').textContent = name;

  document.getElementById('care-content').innerHTML = `
        <dl class="care-list">
            <dt>Свет</dt>
            <dd>${light}</dd>

            <dt>Полив</dt>
            <dd>${water}</dd>

            <dt>Подсказка</dt>
            <dd>${tip}</dd>
        </dl>
    `;

  bootstrap.Modal
    .getOrCreateInstance(
      document.getElementById('care-modal')
    )
    .show();
}


function prepareCarePhoto(image, id) {
  image.dataset.care = id;

  image.classList.add('care-photo');

  image.tabIndex = 0;

  image.setAttribute('role', 'button');

  image.setAttribute(
    'aria-label',
    `Открыть уход за растением: ${image.alt}`
  );
}


function enableCareInteraction(container) {
  if (!container) return;

  container.addEventListener('click', showCare);

  container.addEventListener('keydown', event => {
    const isActivationKey =
      event.key === 'Enter' ||
      event.key === ' ';

    if (
      isActivationKey &&
      event.target.matches('[data-care]')
    ) {
      event.preventDefault();
      showCare(event);
    }
  });
}


/* =========================================
   ДОБАВЛЕНИЕ РАСТЕНИЙ НА СТРАНИЦЫ
========================================= */

function addExtraOptions() {
  const productPicker = document.getElementById('specimen');

  const productSection = productPicker?.closest('section');

  const orderPicker = document.getElementById(
    'selected-product'
  );

  extraPlants.forEach(([
    id,
    name,
    latin,
    description,
    price,
    ,
    photo
  ]) => {

    if (
      orderPicker &&
      !orderPicker.querySelector(`option[value="${id}"]`)
    ) {
      orderPicker.insertAdjacentHTML(
        'beforeend',
        `<option value="${id}">${name}</option>`
      );
    }

    if (
      productPicker &&
      productSection &&
      !productPicker.querySelector(`option[value="${id}"]`)
    ) {
      productPicker.insertAdjacentHTML(
        'beforeend',
        `<option value="${id}">${name}</option>`
      );

      productSection.insertAdjacentHTML(
        'beforeend',
        `
                <article
                    class="detail row g-0"
                    data-species="${id}"
                    hidden
                >
                    <div class="col-md-5">
                        <img
                            src="images/photos/${photo}.jpg"
                            alt="${name}"
                            width="500"
                            height="360"
                            class="care-photo"
                            data-care="${id}"
                            tabindex="0"
                            role="button"
                        >
                    </div>

                    <div class="col-md-7 p-4">
                        <p class="eyebrow">
                            Новый вид / коллекция
                        </p>

                        <h2>${name}</h2>

                        <p>${description}</p>

                        <table class="table">
                            <tbody>
                                <tr>
                                    <th scope="row">Вид</th>
                                    <td>${latin}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Уход</th>
                                    <td>
                                        Откройте фото, чтобы
                                        увидеть условия.
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <p class="price">${price}</p>
                    </div>
                </article>
                `
      );
    }
  });

  selectProductFromUrl();

  enableCareInteraction(productSection);
}

addExtraOptions();


/* =========================================
   ФОРМА ЗАЯВКИ
========================================= */

const orderForm = document.getElementById('order-form');

const successMessage = document.getElementById(
  'success-message'
);

if (orderForm) {
  orderForm.addEventListener('submit', event => {
    event.preventDefault();

    const elements = [...orderForm.elements];

    elements.forEach(element => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderForm.checkValidity()) {
      elements.forEach(element => {
        if (
          element.willValidate &&
          !element.checkValidity()
        ) {
          element.setAttribute(
            'aria-invalid',
            'true'
          );
        }
      });

      orderForm.reportValidity();
      return;
    }

    // Отправку на сервер нужно подключить отдельно.
    if (successMessage) {
      successMessage.hidden = false;
      successMessage.textContent =
        'Форма заполнена корректно. ' +
        'Отправка заявки пока не настроена.';

      successMessage.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  });
}


/* =========================================
   КАТАЛОГ: ПОИСК, ФИЛЬТРЫ, ИЗБРАННОЕ
========================================= */

const search = document.getElementById('plant-search');

if (search) {
  const deck = document.querySelector('.catalog-deck');

  if (deck) {
    document.querySelectorAll(
      '.catalog-deck .plate img'
    ).forEach(image => {
      const saveButton = image
        .closest('.plate')
        ?.querySelector('[data-save]');

      if (saveButton) {
        prepareCarePhoto(
          image,
          saveButton.dataset.save
        );
      }
    });

    extraPlants.forEach(plantData => {
      deck.append(makePlantCard(plantData));
    });

    enableCareInteraction(deck);

    const cards = [
      ...deck.querySelectorAll('[data-category]')
    ];

    const scopes = [
      ...document.querySelectorAll('[data-scope]')
    ];

    const storageKey = 'green-room:favorites';

    let saved = new Set();

    try {
      const stored = JSON.parse(
        localStorage.getItem(storageKey)
      );

      if (Array.isArray(stored)) {
        saved = new Set(
          stored.filter(id =>
            cards.some(card =>
              card.querySelector('[data-save]')
                ?.dataset.save === id
            )
          )
        );
      }
    } catch {
      // LocalStorage может быть недоступен.
    }

    let scope = '0';

    const normalize = text =>
      text.toLocaleLowerCase('ru')
        .replaceAll('ё', 'е')
        .trim();


    function renderCatalog() {
      const query = normalize(search.value);

      let count = 0;

      cards.forEach(card => {
        const button = card.querySelector('[data-save]');

        if (!button) return;

        const name = card
          .querySelector('h3')
          .textContent
          .trim();

        const latin = card
          .querySelector('small')
          ?.textContent || '';

        const id = button.dataset.save;

        const marked = saved.has(id);

        button.textContent = marked ? '♥' : '♡';

        button.setAttribute(
          'aria-pressed',
          String(marked)
        );

        button.setAttribute(
          'aria-label',
          (marked
            ? 'Убрать из избранного: '
            : 'В избранное: '
          ) + name
        );

        const inScope =
          scope === 'all' ||
          scope === card.dataset.category ||
          (scope === 'saved' && marked);

        const matchesSearch = normalize(
          name + ' ' + latin
        ).includes(query);

        card.hidden = !inScope || !matchesSearch;

        if (!card.hidden) {
          count++;
        }
      });

      scopes.forEach(button => {
        const active =
          button.dataset.scope === scope;

        button.classList.toggle('active', active);

        button.setAttribute(
          'aria-pressed',
          String(active)
        );
      });

      const savedCount = document.getElementById(
        'saved-count'
      );

      if (savedCount) {
        savedCount.textContent = saved.size;
      }

      const status = document.getElementById(
        'search-status'
      );

      if (status) {
        status.textContent = count
          ? `Найдено: ${count}`
          : scope === 'saved' && !saved.size
            ? 'Пока пусто. Нажмите сердце на фото растения.'
            : 'Ничего не найдено. Попробуйте другое название или категорию.';
      }
    }


    scopes.forEach(button => {
      button.addEventListener('click', () => {
        scope = button.dataset.scope;

        renderCatalog();
      });
    });


    search.addEventListener('input', () => {
      if (scope !== 'saved') {
        scope = 'all';
      }

      renderCatalog();
    });


    cards.forEach(card => {
      const button = card.querySelector('[data-save]');

      if (!button) return;

      button.addEventListener('click', event => {
        const id = event.currentTarget.dataset.save;

        if (saved.has(id)) {
          saved.delete(id);
        } else {
          saved.add(id);
        }

        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify([...saved])
          );
        } catch {
          // Сохраняем выбор только на время сессии.
        }

        renderCatalog();

        if (scope === 'saved' && card.hidden) {
          document.querySelector(
            '[data-scope="saved"]'
          )?.focus();
        }
      });
    });

    renderCatalog();
  }
}


/* =========================================
   СТРАНИЦА ОТДЕЛЬНОГО РАСТЕНИЯ
========================================= */

const picker = document.querySelector('#specimen');

if (picker) {
  const selectSpecies = () => {
    const slug = location.hash.slice(1);

    if (
      [...picker.options].some(
        option => option.value === slug
      )
    ) {
      picker.value = slug;
    }

    document.querySelectorAll(
      '[data-species]'
    ).forEach(article => {
      article.hidden =
        article.dataset.species !== picker.value;
    });

    if (slug === picker.value) {
      document.querySelector('#inside')
        ?.scrollIntoView();
    }
  };

  picker.addEventListener('change', () => {
    location.hash = picker.value;
  });

  window.addEventListener(
    'hashchange',
    selectSpecies
  );

  selectSpecies();
}


/* =========================================
   СТАРАЯ МОДАЛЬНАЯ ФОРМА
   (Для страниц, где есть #reserve)
========================================= */

function orderOptions() {
  const options = new Map();

  document.querySelectorAll(
    '[data-save]'
  ).forEach(button => {
    const article = button.closest('article');

    const name = article
      ?.querySelector('h3')
      ?.textContent
      ?.trim();

    if (name) {
      options.set(button.dataset.save, name);
    }
  });

  const productPicker = document.getElementById('specimen');

  if (productPicker) {
    [...productPicker.options].forEach(option => {
      if (option.value) {
        options.set(
          option.value,
          option.textContent.trim()
        );
      }
    });
  }

  extraPlants.forEach(([id, name]) => {
    options.set(id, name);
  });

  return [...options]
    .map(([id, name]) => (
      `<option value="${id}">${name}</option>`
    ))
    .join('');
}


function setupOrderModal() {
  const modal = document.getElementById('reserve');

  if (!modal) return;

  modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">

                <div class="modal-header">
                    <div>
                        <p class="kicker mb-1">
                            Зеленая комната
                        </p>

                        <h2 class="modal-title fs-4">
                            Заявка на растение
                        </h2>
                    </div>

                    <button
                        class="btn-close"
                        type="button"
                        data-bs-dismiss="modal"
                        aria-label="Закрыть"
                    ></button>
                </div>

                <div class="modal-body">

                    <div
                        id="modal-success"
                        class="alert alert-info"
                        role="status"
                        hidden
                    ></div>

                    <form id="order-modal-form" novalidate>

                        <div class="mb-3">
                            <label
                                class="form-label"
                                for="modal-product"
                            >
                                Растение *
                            </label>

                            <select
                                class="form-select"
                                id="modal-product"
                                required
                            >
                                <option value="">
                                    Выберите растение
                                </option>

                                ${orderOptions()}
                            </select>
                        </div>

                        <div class="mb-3">
                            <label
                                class="form-label"
                                for="modal-name"
                            >
                                Имя *
                            </label>

                            <input
                                class="form-control"
                                id="modal-name"
                                type="text"
                                minlength="2"
                                autocomplete="given-name"
                                required
                            >
                        </div>

                        <div class="mb-3">
                            <label
                                class="form-label"
                                for="modal-email"
                            >
                                E-mail *
                            </label>

                            <input
                                class="form-control"
                                id="modal-email"
                                type="email"
                                autocomplete="email"
                                required
                            >
                        </div>

                        <div class="mb-3">
                            <label
                                class="form-label"
                                for="modal-phone"
                            >
                                Телефон *
                            </label>

                            <input
                                class="form-control"
                                id="modal-phone"
                                type="tel"
                                placeholder="+7 (900) 000-00-00"
                                pattern="\\+7 \\([0-9]{3}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}"
                                required
                            >
                        </div>

                        <div class="form-check mb-3">
                            <input
                                class="form-check-input"
                                id="modal-agreement"
                                type="checkbox"
                                required
                            >

                            <label
                                class="form-check-label"
                                for="modal-agreement"
                            >
                                Я согласен на обработку данных *
                            </label>
                        </div>

                        <button
                            class="btn btn-success"
                            type="submit"
                        >
                            Отправить заявку
                        </button>

                    </form>
                </div>
            </div>
        </div>
    `;

  modal.addEventListener('show.bs.modal', event => {
    const id = event.relatedTarget?.dataset.product;

    const select = modal.querySelector('#modal-product');

    if (id && select) {
      select.value = id;
    }
  });

  const form = modal.querySelector('#order-modal-form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const message = modal.querySelector('#modal-success');

    message.textContent =
      'Форма заполнена корректно. ' +
      'Отправка данных пока не настроена.';

    message.hidden = false;
  });
}


function renderBreadcrumbs() {
  const pages = {
    'index.html': [],
    'catalog.html': [
      ['Каталог', null]
    ],
    'category.html': [
      ['Каталог', 'catalog.html'],
      ['Лиственные', null]
    ],
    'guide.html': [
      ['Гид по уходу', null]
    ],
    'about.html': [
      ['О нас', null]
    ],
    'diagnostic.html': [
      ['Диагностика растений', null]
    ],
    'product.html': [
      ['Каталог', 'catalog.html'],
      ['Растения', null]
    ],
    'order.html': [
      ['Оформление заявки', null]
    ],
    'contacts.html': [
      ['Контакты', null]
    ]
  };

  const page = location.pathname.split('/').pop() || 'index.html';

  if (page === 'index.html') return;

  const items = pages[page];
  if (!items) return;

  const main = document.querySelector('main');
  if (!main) return;

  const breadcrumb = document.createElement('nav');
  breadcrumb.className = 'breadcrumbs container wrap';
  breadcrumb.setAttribute('aria-label', 'Хлебные крошки');

  breadcrumb.innerHTML = `
        <a href="index.html">Главная</a>
        ${items.map(([name, href]) => `
            <span class="breadcrumb-separator">/</span>
            ${href
      ? `<a href="${href}">${name}</a>`
      : `<span aria-current="page">${name}</span>`
    }
        `).join('')}
    `;

  main.prepend(breadcrumb);
}

renderBreadcrumbs();


setupOrderModal();

const siteSearchItems = [
  ['Главная', 'Знакомство с Зеленой комнатой', 'index.html'],
  ['Каталог', 'Все растения, поиск и избранное', 'catalog.html#inside'],
  ['Гид по уходу', 'Свет, полив и выбор кашпо', 'guide.html'],
  ['Диагностика растений', 'Помощник по симптомам и уходу', 'diagnostic.html'],
  ['О нас', 'Источники и лицензии фотографий', 'about.html'],
  ['Контакты', 'Обратная связь', 'contacts.html'],
  ['Фикус эластика', 'Ficus elastica · лиственное растение', 'product.html#ficus'],
  ['Нефролепис', 'Nephrolepis exaltata · папоротник', 'product.html#fern'],
  ['Эпипремнум', 'Epipremnum aureum · лиана', 'product.html#pothos'],
  ['Алоэ вера', 'Aloe vera · суккулент', 'product.html#aloe'],
  ['Эхеверия', 'Echeveria elegans · суккулент', 'product.html#echeveria'],
  ['Крассула', 'Crassula ovata · суккулент', 'product.html#jade'],
  ['Антуриум', 'Anthurium andraeanum · цветущее растение', 'product.html#anthurium'],
  ['Узамбарская фиалка', 'Streptocarpus ionanthus · цветущее растение', 'product.html#violet'],
  ['Спатифиллум', 'Spathiphyllum · цветущее растение', 'product.html#peace'],
  ['Монстера', 'Monstera deliciosa · лиственное растение', 'catalog.html#inside'],
  ['Сансевиерия', 'Dracaena trifasciata · лиственное растение', 'catalog.html#inside'],
  ['Замиокулькас', 'Zamioculcas zamiifolia · лиственное растение', 'catalog.html#inside'],
  ['Хлорофитум', 'Chlorophytum comosum · лиственное растение', 'catalog.html#inside'],
  ['Драцена маргината', 'Dracaena marginata · лиственное растение', 'catalog.html#inside'],
  ['Бегония рекс', 'Begonia rex-cultorum · цветущее растение', 'catalog.html#inside'],
];

function normalizeSearch(value) {
  return value.toLocaleLowerCase('ru').replaceAll('ё', 'е').trim();
}

function setupSiteSearch() {
  const navbar = document.querySelector('.site-header .navbar');
  if (!navbar || document.getElementById('site-search')) return;

  const launch = document.createElement('button');
  launch.type = 'button';
  launch.className = 'site-search-toggle';
  launch.setAttribute('aria-label', 'Открыть поиск по сайту');
  launch.innerHTML = '<span aria-hidden="true">⌕</span><span class="site-search-toggle__text">Поиск</span><kbd>/</kbd>';
  navbar.append(launch);

  document.body.insertAdjacentHTML('beforeend', `
    <div class="modal fade" id="site-search" tabindex="-1" aria-labelledby="site-search-title">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content site-search-modal">
          <div class="modal-header">
            <div>
              <p class="kicker mb-1">Зеленая комната</p>
              <h2 class="modal-title fs-4" id="site-search-title">Поиск по сайту</h2>
            </div>
            <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Закрыть"></button>
          </div>
          <div class="modal-body">
            <label class="visually-hidden" for="site-search-input">Что вы ищете?</label>
            <input class="form-control site-search-input" id="site-search-input" type="search" placeholder="Растение, раздел или симптом" autocomplete="off">
            <p class="site-search-hint">Например: «фикус», «полив» или «диагностика».</p>
            <div class="site-search-results" id="site-search-results" role="list"></div>
          </div>
        </div>
      </div>
    </div>
  `);

  const modal = document.getElementById('site-search');
  const input = document.getElementById('site-search-input');
  const results = document.getElementById('site-search-results');
  const modalApi = bootstrap.Modal.getOrCreateInstance(modal);

  function renderSearch() {
    const query = normalizeSearch(input.value);
    const found = siteSearchItems.filter(item =>
      !query || normalizeSearch(`${item[0]} ${item[1]}`).includes(query)
    );
    results.innerHTML = found.length
      ? found.map(([title, detail, href]) => `<a class="site-search-result" role="listitem" href="${href}"><strong>${title}</strong><span>${detail}</span><b aria-hidden="true">↗</b></a>`).join('')
      : '<p class="site-search-empty">Ничего не найдено. Попробуйте другое слово.</p>';
  }

  launch.addEventListener('click', () => modalApi.show());
  modal.addEventListener('shown.bs.modal', () => input.focus());
  input.addEventListener('input', renderSearch);
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      event.preventDefault();
      modalApi.show();
    }
  });
  renderSearch();
}

function setupReveals() {
  const elements = document.querySelectorAll('.product-card, .diagnostic-step, .site-license, .note');
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16 });
  elements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 70}ms`);
    observer.observe(element);
  });
}

setupSiteSearch();
setupReveals();

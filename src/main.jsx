import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Index from './index.jsx';
import Catalog from './catalog.jsx';
import Category from './category.jsx';
import Product from './product.jsx';
import Order from './order.jsx';
import About from './about.jsx';
import Guide from './guide.jsx';
import Contacts from './contacts.jsx';

const pages = { index: Index, catalog: Catalog, category: Category, product: Product, order: Order, about: About, guide: Guide, contacts: Contacts };
const key = location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';
const Page = pages[key] || Index;

function App() {
  useEffect(() => {
    const header = document.querySelector('.site-header');
    const resize = new ResizeObserver(() => document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`));
    if (header) resize.observe(header);
    const dialog = document.getElementById('order-dialog');
    const form = document.getElementById('order-form');
    const success = document.getElementById('success-message');
    const click = event => {
      const button = event.target.closest('button[data-product]');
      if (button && dialog) { document.getElementById('selected-product').value = button.dataset.product; dialog.showModal(); }
      if (event.target.closest('#close-order-dialog')) dialog?.close();
    };
    const submit = event => {
      event.preventDefault();
      for (const field of form.elements) if (field.willValidate) field.removeAttribute('aria-invalid');
      if (!form.checkValidity()) { for (const field of form.elements) if (field.willValidate && !field.checkValidity()) field.setAttribute('aria-invalid', 'true'); form.reportValidity(); return; }
      success.hidden = false; form.reset(); dialog?.close();
    };
    document.addEventListener('click', click);
    form?.addEventListener('submit', submit);
    return () => { resize.disconnect(); document.removeEventListener('click', click); form?.removeEventListener('submit', submit); };
  }, []);
  return <Page />;
}
createRoot(document.getElementById('root')).render(<App />);

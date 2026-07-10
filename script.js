// ===========================================================
// TORRA — dados do cardápio
// ===========================================================
const MENU = [
  { id: 1,  category: 'espresso', name: 'Espresso Tradicional', notes: 'Chocolate meio amargo, caramelo, castanha-do-pará', origin: 'Sul de Minas · torra média', price: 7.00,  tags: ['mais-pedido'] },
  { id: 2,  category: 'espresso', name: 'Espresso Duplo', notes: 'Encorpado, doçura de rapadura', origin: 'Sul de Minas · torra média', price: 9.00,  tags: [] },
  { id: 3,  category: 'espresso', name: 'Cappuccino Cremoso', notes: 'Espuma de leite integral, canela moída na hora', origin: 'Blend da casa', price: 12.00, tags: ['mais-pedido'] },
  { id: 4,  category: 'espresso', name: 'Flat White', notes: 'Leite vaporizado em microespuma, dose dupla', origin: 'Blend da casa', price: 13.00, tags: [] },
  { id: 5,  category: 'espresso', name: 'Mocha', notes: 'Cacau 70%, espresso, chantilly leve', origin: 'Blend da casa', price: 14.00, tags: [] },

  { id: 6,  category: 'filtrados', name: 'V60 Fazenda Sertão', notes: 'Frutas vermelhas, mel, floral', origin: 'Mantiqueira de Minas · natural', price: 16.00, tags: ['mais-pedido'] },
  { id: 7,  category: 'filtrados', name: 'Prensa Francesa', notes: 'Corpo denso, notas de nozes', origin: 'Cerrado Mineiro · lavado', price: 14.00, tags: [] },
  { id: 8,  category: 'filtrados', name: 'Cold Brew 12h', notes: 'Extração lenta a frio, doçura natural', origin: 'Blend da casa', price: 15.00, tags: ['gelado'] },
  { id: 9,  category: 'filtrados', name: 'Chemex Fazenda Recreio', notes: 'Cítrico, notas de jasmim', origin: 'Chapada Diamantina · honey', price: 17.00, tags: [] },

  { id: 10, category: 'gelados', name: 'Affogato', notes: 'Espresso quente sobre sorvete de creme', origin: 'Sobremesa da casa', price: 16.00, tags: ['mais-pedido'] },
  { id: 11, category: 'gelados', name: 'Café com Leite de Coco Gelado', notes: 'Espresso duplo, leite de coco, gelo', origin: 'Sem lactose', price: 15.00, tags: ['vegano', 'sem-lactose', 'gelado'] },
  { id: 12, category: 'gelados', name: 'Frappé de Caramelo', notes: 'Café batido com gelo, calda de caramelo salgado', origin: 'Blend da casa', price: 16.00, tags: ['gelado'] },

  { id: 13, category: 'doces', name: 'Pão de Queijo', notes: 'Assado na hora, casquinha crocante', origin: 'Receita mineira', price: 8.00,  tags: [] },
  { id: 14, category: 'doces', name: 'Croissant de Amêndoas', notes: 'Massa folhada, creme de amêndoas', origin: 'Padaria própria', price: 12.00, tags: ['mais-pedido'] },
  { id: 15, category: 'doces', name: 'Bolo de Fubá com Goiabada', notes: 'Fubá cremoso, goiabada artesanal', origin: 'Receita da casa', price: 10.00, tags: [] },
  { id: 16, category: 'doces', name: 'Sanduíche Natural de Frango', notes: 'Pão integral, frango desfiado, ricota', origin: 'Opção salgada', price: 18.00, tags: [] },
  { id: 17, category: 'doces', name: 'Tapioca Vegana de Coco', notes: 'Recheio de coco fresco e leite condensado vegano', origin: 'Sem glúten', price: 14.00, tags: ['vegano'] },

  { id: 18, category: 'chas', name: 'Chá Gelado de Hibisco', notes: 'Floral, levemente ácido, servido com gelo', origin: 'Blend de ervas', price: 10.00, tags: ['vegano', 'gelado'] },
  { id: 19, category: 'chas', name: 'Chocolate Quente 70%', notes: 'Cacau intenso, leite vaporizado', origin: 'Receita da casa', price: 13.00, tags: [] },
  { id: 20, category: 'chas', name: 'Chá de Camomila', notes: 'Calmante, floral suave', origin: 'Ervas selecionadas', price: 9.00,  tags: ['vegano'] },
];

const CATEGORY_LABELS = {
  espresso:  'Cafés Especiais',
  filtrados: 'Filtrados',
  gelados:   'Gelados & Especiais',
  doces:     'Doces & Salgados',
  chas:      'Chás & Outros',
};

const CATEGORY_ORDER = ['espresso', 'filtrados', 'gelados', 'doces', 'chas'];

const TAG_LABELS = {
  'vegano': '🌱 Vegano',
  'sem-lactose': 'Sem lactose',
  'gelado': 'Gelado',
  'mais-pedido': '★ Mais pedido',
};

// ===========================================================
// Estado
// ===========================================================
let activeCategory = 'todos';
let activeDiet = 'todos';
const cart = {}; // { itemId: quantidade }

// ===========================================================
// Renderização do cardápio
// ===========================================================
const menuEl = document.getElementById('menu');

function formatPrice(value) {
  return 'R$ ' + value.toFixed(2).replace('.', ',');
}

function getFilteredItems() {
  return MENU.filter(item => {
    const matchesCategory = activeCategory === 'todos' || item.category === activeCategory;
    const matchesDiet = activeDiet === 'todos' || item.tags.includes(activeDiet);
    return matchesCategory && matchesDiet;
  });
}

function renderMenu() {
  const items = getFilteredItems();
  menuEl.innerHTML = '';

  if (items.length === 0) {
    menuEl.innerHTML = '<p class="empty-state">Nenhum item encontrado com esses filtros.<br>Toque em "Sem restrição" para ver tudo de novo.</p>';
    return;
  }

  CATEGORY_ORDER.forEach(category => {
    const itemsInCategory = items.filter(item => item.category === category);
    if (itemsInCategory.length === 0) return;

    const section = document.createElement('section');
    section.className = 'section';
    section.innerHTML = `
      <div class="section__head">
        <h2 class="section__title">${CATEGORY_LABELS[category]}</h2>
        <span class="section__count">${itemsInCategory.length} ${itemsInCategory.length === 1 ? 'item' : 'itens'}</span>
      </div>
      <div class="grid">
        ${itemsInCategory.map(renderCard).join('')}
      </div>
    `;
    menuEl.appendChild(section);
  });

  // religa os botões "Adicionar" recém-criados
  menuEl.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(Number(btn.dataset.id)));
  });
}

function renderCard(item) {
  const tagsHtml = item.tags.map(tag => `<span class="tag">${TAG_LABELS[tag] || tag}</span>`).join('');
  return `
    <article class="card">
      <div class="card__top">
        <h3 class="card__name">${item.name}</h3>
        <span class="card__price">${formatPrice(item.price)}</span>
      </div>
      <p class="card__notes">${item.notes}</p>
      <p class="card__origin">${item.origin}</p>
      <div class="card__bottom">
        <div class="card__tags">${tagsHtml}</div>
        <button class="add-btn" data-id="${item.id}">Adicionar</button>
      </div>
    </article>
  `;
}

// ===========================================================
// Filtros (categoria e restrição alimentar)
// ===========================================================
document.getElementById('categoryTabs').addEventListener('click', e => {
  const btn = e.target.closest('.chip--tab');
  if (!btn) return;
  activeCategory = btn.dataset.category;
  document.querySelectorAll('.chip--tab').forEach(c => c.classList.toggle('is-active', c === btn));
  renderMenu();
});

document.getElementById('dietTags').addEventListener('click', e => {
  const btn = e.target.closest('.chip--diet');
  if (!btn) return;
  activeDiet = btn.dataset.diet;
  document.querySelectorAll('.chip--diet').forEach(c => c.classList.toggle('is-active', c === btn));
  renderMenu();
});

// ===========================================================
// Comanda (carrinho)
// ===========================================================
const cartFab = document.getElementById('cartFab');
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
  const item = MENU.find(i => i.id === id);
  showToast(`${item.name} adicionado à comanda`);
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  updateCartUI();
}

function removeFromCart(id) {
  delete cart[id];
  updateCartUI();
}

function clearCart() {
  Object.keys(cart).forEach(id => delete cart[id]);
  updateCartUI();
  showToast('Comanda limpa');
}

function updateCartUI() {
  const ids = Object.keys(cart);
  const totalCount = ids.reduce((sum, id) => sum + cart[id], 0);
  cartCountEl.textContent = totalCount;

  if (ids.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-panel__empty">Sua comanda está vazia.<br>Toque em "Adicionar" em qualquer item do cardápio.</p>';
    cartTotalEl.textContent = formatPrice(0);
    return;
  }

  let total = 0;
  cartItemsEl.innerHTML = ids.map(id => {
    const item = MENU.find(i => i.id === Number(id));
    const lineTotal = item.price * cart[id];
    total += lineTotal;
    return `
      <div class="cart-line">
        <span class="cart-line__name">${item.name}</span>
        <span class="cart-line__qty">
          <button class="qty-btn" data-action="dec" data-id="${id}">−</button>
          ${cart[id]}
          <button class="qty-btn" data-action="inc" data-id="${id}">+</button>
        </span>
        <span class="cart-line__total">${formatPrice(lineTotal)}</span>
        <button class="cart-line__remove" data-action="remove" data-id="${id}" aria-label="Remover">🗑</button>
      </div>
    `;
  }).join('');

  cartTotalEl.textContent = formatPrice(total);
}

cartItemsEl.addEventListener('click', e => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  if (btn.dataset.action === 'inc') changeQty(id, 1);
  if (btn.dataset.action === 'dec') changeQty(id, -1);
  if (btn.dataset.action === 'remove') removeFromCart(id);
});

function openCart() {
  cartPanel.classList.add('is-open');
  cartOverlay.classList.add('is-visible');
  cartFab.setAttribute('aria-expanded', 'true');
}

function closeCart() {
  cartPanel.classList.remove('is-open');
  cartOverlay.classList.remove('is-visible');
  cartFab.setAttribute('aria-expanded', 'false');
}

cartFab.addEventListener('click', () => {
  cartPanel.classList.contains('is-open') ? closeCart() : openCart();
});
document.getElementById('cartClose').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.getElementById('cartClear').addEventListener('click', clearCart);
document.getElementById('cartCall').addEventListener('click', () => {
  if (Object.keys(cart).length === 0) {
    showToast('Adicione itens à comanda antes de chamar o garçom');
    return;
  }
  showToast('Garçom chamado! Ele já vai até sua mesa ☕');
  closeCart();
});

// ===========================================================
// Toast
// ===========================================================
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

// ===========================================================
// Status "aberto agora" com base no horário real do dispositivo
// ===========================================================
function updateOpenStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = domingo ... 6 = sábado
  const hour = now.getHours() + now.getMinutes() / 60;

  let opensAt, closesAt;
  if (day === 0) { opensAt = 8; closesAt = 14; }        // domingo
  else if (day === 6) { opensAt = 8; closesAt = 19; }   // sábado
  else { opensAt = 7; closesAt = 19; }                  // seg-sex

  const isOpen = hour >= opensAt && hour < closesAt;

  const statusEl = document.getElementById('status');
  const statusText = document.getElementById('statusText');
  statusEl.classList.toggle('is-open', isOpen);
  statusEl.classList.toggle('is-closed', !isOpen);
  statusText.textContent = isOpen ? 'Aberto agora' : 'Fechado no momento';
}

// ===========================================================
// Inicialização
// ===========================================================
renderMenu();
updateCartUI();
updateOpenStatus();
setInterval(updateOpenStatus, 60000);

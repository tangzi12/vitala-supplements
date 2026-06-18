// ============ localStorage-backed reactive store ============

const KEYS = {
  users: 'supp_store_users',
  currentUser: 'supp_store_current_user',
  cart: 'supp_store_cart',
  orders: 'supp_store_orders',
};

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}
function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

let listeners = [];
export function subscribe(fn) {
  listeners.push(fn);
  return () => { listeners = listeners.filter(f => f !== fn); };
}
function notify() { listeners.forEach(fn => fn()); }

// ============ Products (static catalog) ============
export const products = [
  {
    id: 'ashwagandha-gummies',
    name: '南非醉茄软糖',
    nameEn: 'Ashwagandha Gummies',
    category: '软糖',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop',
    badge: '热卖',
    rating: 4.8,
    reviews: 2341,
    stock: 156,
    description: '每粒含 600mg 高纯度 KSM-66® 南非醉茄根提取物。支持身体应对日常压力，促进情绪平衡与深度睡眠。天然草莓口味，不含人工色素和防腐剂。',
    benefits: ['缓解压力与焦虑', '提升睡眠质量', '增强专注力', '支持运动恢复'],
    ingredients: 'KSM-66® 南非醉茄根提取物 (600mg)、有机蔗糖、果胶、柠檬酸、天然草莓香料',
    directions: '每日 2 粒，随餐或空腹服用均可。建议睡前 1 小时服用效果更佳。',
    specs: { '规格': '60粒/瓶', '剂型': '素食软糖', '原产地': '印度原料/美国制造', '认证': 'GMP, USDA Organic' },
    ogImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&h=630&fit=crop',
  },
  {
    id: 'creatine-gummies',
    name: '肌酸软糖',
    nameEn: 'Creatine Monohydrate Gummies',
    category: '软糖',
    price: 34.99,
    originalPrice: 44.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop',
    badge: '新品',
    rating: 4.9,
    reviews: 1823,
    stock: 89,
    description: '每粒含 1g 德国 Creapure® 一水肌酸。告别传统粉末的繁琐，即食软糖让肌酸补充变得简单美味。支持肌肉力量、运动表现和训练恢复。',
    benefits: ['提升肌肉力量', '加速训练恢复', '改善运动表现', '支持认知功能'],
    ingredients: 'Creapure® 一水肌酸 (1000mg/粒)、有机蔗糖、果胶、柠檬酸、天然混合莓果香料',
    directions: '训练日：训练前 30 分钟服用 3 粒。非训练日：早晨随餐服用 3 粒。建议搭配足量饮水。',
    specs: { '规格': '90粒/瓶 (30天量)', '剂型': '素食软糖', '原产地': '德国原料/美国制造', '认证': 'GMP, Creapure® Certified' },
    ogImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=630&fit=crop',
  },
  {
    id: 'ashwagandha-capsules',
    name: '南非醉茄胶囊',
    nameEn: 'Ashwagandha Capsules',
    category: '胶囊',
    price: 24.99,
    originalPrice: 32.99,
    image: 'https://images.unsplash.com/photo-1550572017-edd951b5d8a4?w=600&h=600&fit=crop',
    badge: null,
    rating: 4.7,
    reviews: 3156,
    stock: 213,
    description: '每粒含 1300mg 有机南非醉茄根粉。经典胶囊剂型适合传统补充方式，高性价比长期服用方案。支持肾上腺健康、压力管理和整体活力。',
    benefits: ['肾上腺支持', '压力管理', '免疫调节', '抗疲劳'],
    ingredients: '有机南非醉茄根粉 (1300mg/2粒)、植物纤维素胶囊',
    directions: '每日 2 粒，随餐服用。建议早晚各 1 粒以维持全天稳定效果。',
    specs: { '规格': '120粒/瓶 (60天量)', '剂型': '素食胶囊', '原产地': '印度原料/美国制造', '认证': 'GMP, USDA Organic' },
    ogImage: 'https://images.unsplash.com/photo-1550572017-edd951b5d8a4?w=1200&h=630&fit=crop',
  },
  {
    id: 'creatine-powder',
    name: '肌酸粉剂',
    nameEn: 'Creatine Monohydrate Powder',
    category: '粉剂',
    price: 39.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1579722821273-0f67a2c10564?w=600&h=600&fit=crop',
    badge: '性价比',
    rating: 4.9,
    reviews: 4872,
    stock: 342,
    description: '500g 纯 Creapure® 一水肌酸微粉。实验室级纯度 99.99%，微粒化处理溶解更快。无味配方可混入任何饮品，健身爱好者的终极选择。',
    benefits: ['爆发力提升', '肌肉耐力', '训练容量增加', '脑力支持'],
    ingredients: 'Creapure® 一水肌酸微粉 (99.99%纯度)',
    directions: '每日 5g (一勺)，混入 200-300ml 水或运动饮料。加载期：前 5 天每日 20g 分 4 次服用，之后维持每日 5g。',
    specs: { '规格': '500g/瓶 (100天量)', '剂型': '微粒化粉末', '原产地': '德国原料/美国制造', '认证': 'GMP, Creapure® Certified' },
    ogImage: 'https://images.unsplash.com/photo-1579722821273-0f67a2c10564?w=1200&h=630&fit=crop',
  },
];

// ============ Auth ============
export function register(name, email, password) {
  const users = load(KEYS.users, []);
  if (users.find(u => u.email === email)) return { ok: false, error: '该邮箱已注册' };
  const user = { id: Date.now(), name, email, password, createdAt: new Date().toISOString() };
  users.push(user);
  save(KEYS.users, users);
  save(KEYS.currentUser, { id: user.id, name: user.name, email: user.email });
  notify();
  return { ok: true, user: { id: user.id, name: user.name, email: user.email } };
}

export function login(email, password) {
  const users = load(KEYS.users, []);
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return { ok: false, error: '邮箱或密码错误' };
  save(KEYS.currentUser, { id: user.id, name: user.name, email: user.email });
  notify();
  return { ok: true, user: { id: user.id, name: user.name, email: user.email } };
}

export function logout() {
  localStorage.removeItem(KEYS.currentUser);
  notify();
}

export function getCurrentUser() {
  return load(KEYS.currentUser, null);
}

// ============ Cart ============
export function getCart() {
  return load(KEYS.cart, []);
}

export function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.productId === productId);
  if (existing) existing.qty += qty;
  else cart.push({ productId, qty });
  save(KEYS.cart, cart);
  notify();
}

export function updateCartItem(productId, qty) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.productId === productId);
  if (idx === -1) return;
  if (qty <= 0) cart.splice(idx, 1);
  else cart[idx].qty = qty;
  save(KEYS.cart, cart);
  notify();
}

export function removeFromCart(productId) {
  save(KEYS.cart, getCart().filter(i => i.productId !== productId));
  notify();
}

export function clearCart() {
  save(KEYS.cart, []);
  notify();
}

export function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const p = products.find(p => p.id === item.productId);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

export function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

// ============ Orders ============
export function getOrders() {
  const user = getCurrentUser();
  if (!user) return [];
  return load(KEYS.orders, []).filter(o => o.userId === user.id);
}

export function placeOrder(shippingInfo, paymentInfo) {
  const user = getCurrentUser();
  if (!user) return { ok: false, error: '请先登录' };
  const cart = getCart();
  if (cart.length === 0) return { ok: false, error: '购物车为空' };

  const items = cart.map(item => {
    const p = products.find(p => p.id === item.productId);
    return { productId: item.productId, name: p.name, price: p.price, qty: item.qty };
  });
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const order = {
    id: 'ORD-' + Date.now().toString(36).toUpperCase(),
    userId: user.id,
    items,
    total,
    shipping: shippingInfo,
    payment: { last4: paymentInfo.cardNumber.slice(-4), method: paymentInfo.method },
    status: 'paid',
    statusText: '已支付',
    createdAt: new Date().toISOString(),
  };

  const orders = load(KEYS.orders, []);
  orders.unshift(order);
  save(KEYS.orders, orders);
  clearCart();
  notify();
  return { ok: true, order };
}

// ============ Seed demo user (first run) ============
(function seed() {
  const users = load(KEYS.users, []);
  if (users.length === 0) {
    save(KEYS.users, [{ id: 1, name: 'Demo User', email: 'demo@example.com', password: 'demo123', createdAt: new Date().toISOString() }]);
  }
})();

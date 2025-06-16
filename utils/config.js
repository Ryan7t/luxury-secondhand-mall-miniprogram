// API基础URL配置
const API_BASE_URL = 'http://localhost:3000';

// 图片基础URL
const IMAGE_BASE_URL = 'http://localhost:3000';

// 接口路径
const API = {
  // 商品相关
  PRODUCTS: '/api/products',
  PRODUCT_DETAIL: '/api/products/', // + id
  
  // 购物车相关
  CART: '/api/cart',
  CART_ADD: '/api/cart/add',
  CART_UPDATE: '/api/cart/update',
  CART_REMOVE: '/api/cart/remove',
  
  // 订单相关
  ORDERS: '/api/orders',
  ORDER_DETAIL: '/api/orders/', // + id
  ORDER_CREATE: '/api/orders/create',
  ORDER_UPDATE: '/api/orders/update',
  
  // 用户相关
  USER_INFO: '/api/user/info',
  USER_LOGIN: '/api/user/login',
};

module.exports = {
  API_BASE_URL,
  IMAGE_BASE_URL,
  API
};
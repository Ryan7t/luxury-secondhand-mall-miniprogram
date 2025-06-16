const { API_BASE_URL, IMAGE_BASE_URL, API } = require('./config');

/**
 * 封装wx.request为Promise
 * @param {Object} options - 请求配置
 * @returns {Promise} Promise对象
 */
const request = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: API_BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        ...options.header
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject({
            code: res.statusCode,
            message: res.data.message || '请求失败'
          });
        }
      },
      fail: (err) => {
        reject({
          code: -1,
          message: err.errMsg || '网络错误'
        });
      }
    });
  });
};

/**
 * 处理图片URL
 * @param {String} url - 图片路径
 * @returns {String} 完整的图片URL
 */
const getImageUrl = (url) => {
  if (!url) return '/static/images/product_default.jpg';
  
  // 如果已经是完整URL则直接返回
  if (url.startsWith('http')) return url;
  
  // 否则拼接基础URL
  return IMAGE_BASE_URL + (url.startsWith('/') ? url : '/' + url);
};

/**
 * 获取商品列表
 * @param {Object} params - 查询参数
 * @returns {Promise} Promise对象
 */
const getProducts = (params = {}) => {
  return request({
    url: API.PRODUCTS,
    data: params
  });
};

/**
 * 获取商品详情
 * @param {String|Number} id - 商品ID
 * @returns {Promise} Promise对象
 */
const getProductDetail = (id) => {
  return request({
    url: API.PRODUCT_DETAIL + id
  });
};

/**
 * 获取购物车列表
 * @returns {Promise} Promise对象
 */
const getCart = () => {
  return request({
    url: API.CART
  });
};

/**
 * 添加商品到购物车
 * @param {Object} data - 购物车数据
 * @returns {Promise} Promise对象
 */
const addToCart = (data) => {
  return request({
    url: API.CART_ADD,
    method: 'POST',
    data
  });
};

/**
 * 更新购物车商品数量
 * @param {Object} data - 更新数据
 * @returns {Promise} Promise对象
 */
const updateCartItem = (data) => {
  return request({
    url: API.CART_UPDATE,
    method: 'PUT',
    data
  });
};

/**
 * 从购物车移除商品
 * @param {String|Number} id - 购物车项ID
 * @returns {Promise} Promise对象
 */
const removeCartItem = (id) => {
  return request({
    url: API.CART_REMOVE,
    method: 'DELETE',
    data: { id }
  });
};

/**
 * 获取订单列表
 * @param {Object} params - 查询参数
 * @returns {Promise} Promise对象
 */
const getOrders = (params = {}) => {
  return request({
    url: API.ORDERS,
    data: params
  });
};

/**
 * 创建订单
 * @param {Object} data - 订单数据
 * @returns {Promise} Promise对象
 */
const createOrder = (data) => {
  return request({
    url: API.ORDER_CREATE,
    method: 'POST',
    data
  });
};

/**
 * 上传图片
 * @param {String} filePath - 本地图片路径
 * @returns {Promise} Promise对象
 */
const uploadImage = (filePath) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: API_BASE_URL + '/api/upload',
      filePath,
      name: 'image',
      success: (res) => {
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data);
          resolve(data);
        } else {
          reject({
            code: res.statusCode,
            message: '上传失败'
          });
        }
      },
      fail: (err) => {
        reject({
          code: -1,
          message: err.errMsg || '上传失败'
        });
      }
    });
  });
};

module.exports = {
  request,
  getImageUrl,
  getProducts,
  getProductDetail,
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  getOrders,
  createOrder,
  uploadImage
};
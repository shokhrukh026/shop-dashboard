import Vue from 'vue';
import axios from "axios";
import lodash from 'lodash'; 
import shop from "../api/shop";


export default {
  mutations: {
    SET_BUSSINESS_PRODUCTS: (state, payload) => {
      state.products = payload;
      state.products.results.forEach((row, index) => {
        row.index = index + 1;
      });
    },
    SET_NEXT_PAGE_ALL_PRODUCTS: (state, payload) => {
      let final = false;
      state.products.links = payload.links;
      state.products.count = payload.count;

      for (let i = 0; i < payload.results.length; i++) {
        for (let k = 0; k < state.products.results.length; k++) {
          let answer = lodash.isEqual(state.products.results[k], payload.results[i]);
          if (answer) {
            final = answer;
          }
        }

        if (!final) {
          // payload.results[i].index
          state.products.results.push(payload.results[i]);
        }
        final = false;
      }
      state.products.results.forEach((row, index) => {
        row.index = index + 1
      })
    },
    SET_NEXT_PAGE_PRODUCTS_INFO: (state, payload) => {
      let final = false;
      state.productInfo.links = payload.links;
      state.productInfo.count = payload.count;

      for (let i = 0; i < payload.results.length; i++) {
        for (let k = 0; k < state.productInfo.results.length; k++) {
          let answer = lodash.isEqual(state.productInfo.results[k], payload.results[i]);
          if (answer) {
            final = answer;
          }
        }

        if (!final) {
          // payload.results[i].index
          state.productInfo.results.push(payload.results[i]);
        }
        final = false;
      }
      state.productInfo.results.forEach((row, index) => {
        row.index = index + 1
      })
    },
    SET_SEARCH_RESULT_ALL_PRODUCTS: (state, payload) => {
      state.products.results.forEach((row, index) => {
        delete row.index;
      });

      let results = payload.results;
      if (results.length !== 0) {
        state.products.results.forEach((row, index) => {
          for (let a = 0; a < results.length; a++) {
            if (lodash.isEqual(row, results[a])) {
              console.log('it is equal!');
              results.splice(a, 1);
            }
          }
        });
        if (results) {
          for (let i = 0; i < results.length; i++) {
            Vue.set(state.products.results, state.products.results.length, results[i]);
          }
        }
      } else {
        console.log('Array is empty!');
      }

      state.products.results.forEach((row, index) => {
        row.index = index + 1;
      });

    },
    SET_BUSSINESS_PRODUCT: (state, payload) => {
      state.productDetail = payload;
    },
    SET_BUSSINESS_PRODUCT_INFO: (state, payload) => {
      state.productInfo = payload;
      state.productInfo.results.forEach((row, index) => {
        row.index = index + 1;
      });
    },

    SET_BUSSINESS_PRODUCT_IN_BRANCH: (state, payload) => {
      state.productInBranch = payload;
      state.productInBranch.forEach((row, index) => {
        row.index = index + 1
      })
    },
  },
  actions: {
    async FETCH_BUSSINESS_PRODUCT_LIST({ commit, getters }) {
      try {
        const response = await shop.get("business/products/", {
          headers: {
            Authorization: getters.getUser.token,
          },
        });
        commit("SET_BUSSINESS_PRODUCTS", response.data);
      } catch (e) {
        console.log("watch to FETCH_ALL_BUSSINESS_PRODUCT_LIST");
      }
    },

    async FETCH_BUSSINESS_PRODUCT({ commit, getters }, id) {
      try {
        const response = await shop.get(`business/products/detail/${id}/`, {
          headers: {
            Authorization: getters.getUser.token,
            'Content-Type': 'application/x-www-form-urlencoded',
          },

        });
        commit("SET_BUSSINESS_PRODUCT", response.data);
        return  response.data;
      } catch (e) {
        console.log(e + " FETCH_BUSSINESS_PRODUCT");
      }
    },

    async FETCH_BUSSINESS_PRODUCT_INFO({ commit, getters }, id) {
      try {
        const response = await shop.get(
          `business/products/detail/info/${id}/`,
          {
            headers: {
              Authorization: getters.getUser.token,
            },
          }
        );
        commit("SET_BUSSINESS_PRODUCT_INFO", response.data);
        return response.data;
      } catch (e) {
        console.log(e.data)
      }
    },

    async FETCH_BUSSINESS_PRODUCT_IN_BRANCH({ commit, getters }, id) {
      try {
        const response = await shop.get(
          `business/product/${id}/branches/`,
          {
            headers: {
              Authorization: getters.getUser.token,
            },
          }
        );
        commit("SET_BUSSINESS_PRODUCT_IN_BRANCH", response.data);

        return response;

      } catch (e) {
        console.log(e + "FETCH_BUSSINESS_PRODUCT_INFO")
      }
    },

    async ADD_PRODUCT_INFO({commit, getters}, payload)
    {
       try {
         const response = await shop.post('/business/product/info/add/', {
             business_product_id: payload.business_product_id,
             quantity: payload.quantity,
             purchase_price: payload.purchase_price,
             selling_price: payload.selling_price,
             expire_date: payload.expire_date,
         },
         {
             headers: {
               Authorization: getters.getUser.token,
             },
         });
         return response.data;
       }catch (e) {
         console.log("In ADD_PRODUCT_INFO " + e);
       }

    },
    async ADD_PRODUCT({commit, getters}, payload)
    {
       try {
          let response = await shop.post('/business/product/add/', {
            title: payload.title,
            barcode: payload.barcode,
            type: payload.type,
            country: payload.country,
            manufacture: payload.manufacture,
            category_id: payload.category_id,
            quantity: payload.quantity,
            vat: payload.vat,
            description: payload.description,
            purchase_price: payload.purchase_price,
            selling_price: payload.selling_price,
            expire_date: payload.expire_date
          }, 
          {
            headers: { Authorization: getters.getUser.token},
          });
          return response.data;
       }catch (e) {
         console.log("In ADD_PRODUCT " + e);
       }

    },
    async FETCH_NEXT_PAGE_ALL_PRODUCTS({ commit, getters }, payload) {
      let url = getters.getProducts.links.next;
      return await axios({
        method: "GET",
        url: url,
        headers: { Authorization: getters.getUser.token },
      })
      .then((e) => {
        commit("SET_NEXT_PAGE_ALL_PRODUCTS", e.data);
        //return e;
      })
      .catch((error) => {
        console.log(error);
        //   return error;
      });
    },
    async FETCH_NEXT_PAGE_PRODUCTS_INFO({ commit, getters }, payload) {
      let url = getters.getProductInfo.links.next;
      return await axios({
        method: "GET",
        url: url,
        headers: { Authorization: getters.getUser.token },
      })
      .then((e) => {
        commit("SET_NEXT_PAGE_PRODUCTS_INFO", e.data);
        //return e;
      })
      .catch((error) => {
        console.log(error);
        //   return error;
      });
    },
    async GET_SEARCH_RESULT_ALL_PRODUCTS({ commit, getters }, payload) {
      try {
        const response = await shop.get("business/products/?search=" + payload.value, {
          headers: {
            Authorization: getters.getUser.token,
          },
        });
        commit('SET_SEARCH_RESULT_ALL_PRODUCTS', response.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
  state: {
    products: [],
    productDetail: [],
    productInfo: [],
    productInBranch: []
  },
  getters: {
    getProducts: (state) => state.products,
    getProductDetail: (state) => state.productDetail,
    getProductInfo: (state) => state.productInfo,
    getProductInBranch: (state) => state.productInBranch,
  },
};

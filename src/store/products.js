import shop from "../api/shop";
import axios from "axios";
import ca from "quasar/lang/ca";

export default {
  mutations: {
    SET_BUSSINESS_PRODUCTS: (state, payload) => {
      state.products = payload;
      state.products.results.forEach((row, index) => {
        row.index = index + 1;
      });
    },

    SET_NEXT_PAGE: (state, payload) => {
      let final = false;
      state.products.links = payload.links;
      state.products.count = payload.count;

      for (let i = 0; i < payload.results.length; i++) {
        for (let k = 0; k < state.products.results.length; k++) {
          let answer = lodash.isEqual(
            state.products.results[k],
            payload.results[i]
          );
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
              console.log("it is equal!");
              results.splice(a, 1);
            }
          }
        });
        if (results) {
          for (let i = 0; i < results.length; i++) {
            Vue.set(
              state.products.results,
              state.products.results.length,
              results[i]
            );
          }
        }
      } else {
        console.log("Array is empty! SET_SEARCH_RESULT_ALL_PRODUCTS");
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
        return  response;
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

        return response;

      } catch (e) {
        console.log(e + "FETCH_BUSSINESS_PRODUCT_INFO")
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


    async GET_NEXT_PAGE({ commit, getters }, payload) {
      let url = getters.getProducts.links.next;
      return await axios({
        method: "GET",
        url: url,
        headers: { Authorization: getters.getUser.token },
      })
        .then((e) => {
          commit("SET_NEXT_PAGE", e.data);
          //return e;
        })
        .catch((error) => {
          console.log(error + "WATCH NEXT PAGE");
          //   return error;
        });
    },

    async GET_SEARCH_RESULT_ALL_PRODUCTS({ commit, getters }, payload) {
      console.log(payload.value);
      try {
        const response = await shop.get("products/?search=" + payload.value, {
          headers: {
            Authorization: getters.getUser.token,
          },
        });
        commit("SET_SEARCH_RESULT_ALL_PRODUCTS", response.data);
      } catch (e) {
        console.log(e + " GET_SEARCH_RESULT_ALL_PRODUCTS");
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

import Vue from 'vue';
import axios from "axios";
import lodash from 'lodash'; 
import shop from "../api/shop";

export default {
  mutations: {
    SET_PRODUCT_INFO_IN_BRANCH: (state, payload)=>{
      state.product_info_in_branch = payload;
      state.product_info_in_branch.results.forEach((row, index) => {
        row.index = index + 1
      })
  },
    SET_PRODUCT_DETAIL_IN_BRANCH: (state, payload)=>{
        state.product_detail_in_branch = payload;
    },
    SET_PRODUCTS_INSIDE_BRANCH: (state, payload)=>{
        state.productsInsideBranch = payload;
        state.productsInsideBranch.results.forEach((row, index) => {
          row.index = index + 1
        })
    },
    SET_BRANCHES: (state, payload)=>{
       state.branches = payload;
       state.branches.forEach((row, index) => {
        row.index = index + 1

        if(row.status === false){
          row.status = 'Неактивный'
        }else if(row.status === true){
          row.status = 'Активный'
        }
      })
    },
    SET_ONE_BRANCH: (state, payload) => {
      state.oneBranch = payload;

      state.branches.forEach((row, index) => {
        row.index = index + 1

        if(row.status === false){
          row.status = 'Неактивный'
        }else if(row.status === true){
          row.status = 'Активный'
        }
      })
    },
    SET_NEXT_PAGE_PRODUCTS_IN_BRANCHES: (state, payload) => {
      let final = false;
      state.productsInsideBranch.links = payload.links;
      state.productsInsideBranch.count = payload.count;

      for (let i = 0; i < payload.results.length; i++) {
        for (let k = 0; k < state.productsInsideBranch.results.length; k++) {
          let answer = lodash.isEqual(state.productsInsideBranch.results[k], payload.results[i]);
          if (answer) {
            final = answer;
          }
        }

        if (!final) {
          // payload.results[i].index
          state.productsInsideBranch.results.push(payload.results[i]);
        }
        final = false;
      }
      state.productsInsideBranch.results.forEach((row, index) => {
        row.index = index + 1
      })
    },
    SET_NEXT_PAGE_PRODUCTS_INFO_IN_BRANCHES: (state, payload) => {
      let final = false;
      state.product_info_in_branch.links = payload.links;
      state.product_info_in_branch.count = payload.count;

      for (let i = 0; i < payload.results.length; i++) {
        for (let k = 0; k < state.product_info_in_branch.results.length; k++) {
          let answer = lodash.isEqual(state.product_info_in_branch.results[k], payload.results[i]);
          if (answer) {
            final = answer;
          }
        }

        if (!final) {
          // payload.results[i].index
          state.product_info_in_branch.results.push(payload.results[i]);
        }
        final = false;
      }
      state.product_info_in_branch.results.forEach((row, index) => {
        row.index = index + 1
      })
    },
    SET_SEARCH_RESULT_BY_BRANCH: (state, payload) => {
      state.productsInsideBranch.results.forEach((row, index) => {
        delete row.index;
      });

      let results = payload.results;
      if (results.length !== 0) {
        state.productsInsideBranch.results.forEach((row, index) => {
          for (let a = 0; a < results.length; a++) {
            if (lodash.isEqual(row, results[a])) {
              console.log('it is equal!');
              results.splice(a, 1);
            }
          }
        });
        if (results) {
          for (let i = 0; i < results.length; i++) {
            Vue.set(state.productsInsideBranch.results, state.productsInsideBranch.results.length, results[i]);
          }
        }
      } else {
        console.log('Array is empty!');
      }

      state.productsInsideBranch.results.forEach((row, index) => {
        row.index = index + 1;
      });

    },
  },
  actions: {
    async GET_SEARCH_RESULT_BY_BRANCH({ commit, getters }, payload) {
      try {
        const response = await shop.get('branch/' + payload.virtual_number + '/products/?search=' + payload.value, {
          headers: {
            Authorization: getters.getUser.token,
          },
        });
        commit('SET_SEARCH_RESULT_BY_BRANCH', response.data);
      } catch (e) {
        console.log(e);
      }
    },
    async FETCH_NEXT_PAGE_PRODUCTS_IN_BRANCHES({ commit, getters }, payload) {
      let url = getters.getProductsInsideBranch.links.next;
      return await axios({
        method: "GET",
        url: url,
        headers: { Authorization: getters.getUser.token },
      })
      .then((e) => {
        commit("SET_NEXT_PAGE_PRODUCTS_IN_BRANCHES", e.data);
        //return e;
      })
      .catch((error) => {
        console.log(error);
        //   return error;
      });
    },
    async FETCH_NEXT_PAGE_PRODUCTS_INFO_IN_BRANCHES({ commit, getters }, payload) {
      let url = getters.getProductInfoInBranch.links.next;
      return await axios({
        method: "GET",
        url: url,
        headers: { Authorization: getters.getUser.token },
      })
      .then((e) => {
        commit("SET_NEXT_PAGE_PRODUCTS_INFO_IN_BRANCHES", e.data);
        //return e;
      })
      .catch((error) => {
        console.log(error);
        //   return error;
      });
    },
    async FETCH_PRODUCT_INFO_IN_BRANCH({ commit, getters}, payload) {
      try {
        const response = await shop.get('branch/' + payload.branch_id + '/business_product/' + payload.business_product_id + '/branch_product_info/', {
          headers: {
            Authorization: getters.getUser.token
          },
        });
        commit('SET_PRODUCT_INFO_IN_BRANCH', response.data);
      } catch (e) {
        console.log(e.data);
      }
    },
    async FETCH_PRODUCT_DETAIL_IN_BRANCH({ commit, getters}, payload) {
      try {
        const response = await shop.get('branch/' + payload.branch_id + '/business_product/' + payload.business_product_id + '/branch_product_detail/', {
          headers: {
            Authorization: getters.getUser.token
          },
        });
        commit('SET_PRODUCT_DETAIL_IN_BRANCH', response.data);
      } catch (e) {
        console.log(e);
      }
    },
    async FETCH_PRODUCTS_INSIDE_BRANCH({ commit, getters}, id) {
      try {
        const response = await shop.get(`branch/${id}/products/`, {
          headers: {
            Authorization: getters.getUser.token
          },
        });
        commit('SET_PRODUCTS_INSIDE_BRANCH', response.data);
      } catch (e) {
        console.log(e.data);
      }
    },

    async FETCH_ALL_BRANCHES({ commit, getters}) {
      try {
        const response = await shop.get("business/branches/", {
          headers: {
            Authorization: getters.getUser.token
          },
        });
        commit('SET_BRANCHES', response.data);
      } catch (e) {
        console.log(e.data);
      }
    },
    async FETCH_ONE_BRANCHES ({commit}, getters, id) {
      try{
        const response = await shop.get(`business/branches/${id}`, {
          headers: {
            Authorization: getters.getUser.token,
          }
        });
        commit('SET_ONE_BRANCH', response.data);
      }catch (e) {
        console.log(e.data)
      }
    },

  },
  state: {
    branches: [],
    oneBranch: [],
    productsInsideBranch: [],
    product_detail_in_branch: [],
    product_info_in_branch: []
  },
  getters: {
    GET_ALL_BRANCHES: state => state.branches,
    GET_ONE_BRANCH:  state => state.oneBranch,
    getProductsInsideBranch: state => state.productsInsideBranch,
    getProductDetailInBranch: state => state.product_detail_in_branch,
    getProductInfoInBranch: state => state.product_info_in_branch
  },
};

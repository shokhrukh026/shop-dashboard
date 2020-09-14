import shop from "../api/shop";

export default {
  mutations: {
    SET_PRODUCT_INFO_IN_BRANCH: (state, payload)=>{
      state.product_info = payload;
      state.product_info.results.forEach((row, index) => {
        row.index = index + 1
      })
  },
    SET_PRODUCT_DETAIL_IN_BRANCH: (state, payload)=>{
        state.product_detail = payload;
        state.product_detail.forEach((row, index) => {
          row.index = index + 1
        })
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

    }

  },
  actions: {
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
        console.log(e.data);
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
        console.log(e + "check branches request FETCH_ALL_BRANCHES");
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
        console.log(e + "ckeck branches FETCH_ONE_BRANCHES")
      }
    },

  },
  state: {
    branches: [],
    oneBranch: [],
    productsInsideBranch: [],
    product_detail: [],
    product_info: []
  },
  getters: {
    GET_ALL_BRANCHES: state => state.branches,
    GET_ONE_BRANCH:  state => state.oneBranch,
    getProductsInsideBranch: state => state.productsInsideBranch,
    getProductDetail: state => state.product_detail,
    getProductInfo: state => state.product_info
  },
};

import shop from "../api/shop";

export default{
  mutations:{
    SET_REFUNDS: (state, payload)=>{
      state.refunds = payload;
      state.refunds.forEach((row, index) => {
        row.index = index + 1
      })
    },
    SET_CHECK_FOR_REFUND: (state, payload)=>{
      state.check_refunds = payload;
    }
  },
  actions:{
    async FETCH_CHECK_FOR_REFUND({commit, getters}, payload) {
      try {
        const response = await shop.get('refund/branch/'+ payload.branch_id +'/product/info/'+ payload.business_product_info_id +'/check/',
         {
          headers: {
            Authorization: getters.getUser.token
          },
        });
        commit('SET_CHECK_FOR_REFUND', response.data);
        return response.data;
      } catch (e) {
        return e.data;
      }
    },
    async FETCH_REFUNDS({commit, getters}, payload) {
      try {
        const response = await shop.get('refund_list_front/' + payload.branch_id + '/', {
          headers: {
            Authorization: getters.getUser.token
          },
        });
        commit('SET_REFUNDS', response.data);
        return  response.data;
      } catch (e) {
        return {error: "Error"}
      }
    },
    async ADD_REFUND({commit, getters}, payload )
    {
      try {
        const response = await shop.post('refund/add/',
        {
            business_product_info_id: payload.business_product_info_id,
            quantity: payload.quantity,
            branch_id: payload.branch_id
        },
        {
            headers: {Authorization: getters.getUser.token},
        });
        return response.data;
      }catch (e) {
        return e.data;
      }
    }

  },
  state:{
    refunds: [],
    check_refunds: [],
  },
  getters:{
    getRefunds: state => state.refunds,
    getCheckRefunds: state => state.check_refunds
  }
}

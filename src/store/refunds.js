import shop from "../api/shop";
import ca from "quasar/lang/ca";

export default{
  mutations:{
    SET_REFUNDS: (state, payload)=>{
      state.refunds = payload;
    //   state.refunds.forEach((row, index) => {
    //     row.index = index + 1
    //   })
    }
  },
  actions:{
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
    async DELETE_ARRIVAL_FROM_HISTORY({commit, getters}, arrival_id) {
      try {
        const response = await shop.post('branch/arrival/delete/', {
            arrival_id: arrival_id
        },
        {
          headers: {Authorization: getters.getUser.token},
        });
        return  response.data;
      }catch (e) {
        return {
          success: false
        }
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
        return e;
      }
    }

  },
  state:{
    refunds: [],
  },
  getters:{
    getRefunds : state => state.refunds,
  }
}

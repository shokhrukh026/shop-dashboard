import shop from "../api/shop";
export default{
  state:{
    cartList: [],
    isAdded: "",
  },
  mutations:{

    SET_CARD_LIST: (state, payload)=> {
      state.cartList = payload;

      state.cartList.forEach((row, index) => {
        row.index = index + 1
      })
    },

    SET_ADD_TO_CARD: (state, payload) =>{
      state.isAdded = payload;
    },
  },
  actions: {
    async FETCH_CART_LIST({commit, getters}) {
      try {
        const response = await shop.get("business/cart/", {
          headers: {
            Authorization: getters.getUser.token,
          },
        });
        commit("SET_CARD_LIST", response.data);

        return response.data;
      } catch (e) {
        console.log(e + "watch to FETCH_CART_LIST");
      }
    },

    async DELETE_CART_ITEM({commit, getters}, card_id){
      try {
        const response = await shop.post("business/cart/delete/",
          {
            cart_id: card_id,
          },
          {
            headers: {
              Authorization: getters.getUser.token,
              'Content-Type': 'application/json',
            },
          });

        commit("SET_CARD_LIST", response.data);
        return response.data;
      }catch (e) {
        console.log(e);
        return {error: "error"};
      }

    },

    async ADD_TO_CARD({commit, getters}, payload)
    {
      try {
        const response = await shop.post("business/cart/add/",
          {
            business_product_info_id: payload.business_product_info_id,
            quantity: payload.quantity,
            branch_id: payload.business_product_info_id,
          },
          {
            headers: {
              Authorization: getters.getUser.token,
            },
          });
            commit("SET_ADD_TO_CARD", response.data);
        return response.data();
      }catch (e) {
        commit("SET_ADD_TO_CARD", e + "SET_ADD_TO_CARD");
        return {error: "error in request"};
      }
    },

  },
  getters:{
    getCartList: state => state.cartList,

  }
}


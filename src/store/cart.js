import shop from "../api/shop";

export default{
  mutations:{
    SET_CARD_LIST: (state, payload) => {
      state.cardList = payload;
    }
  },
  actions:{
    /**
     * @return {boolean}
     */
    async AddToCard({commit, getters}, payload)
    {
      console.log(payload);

      try {
        const response = shop.post('v1/business/cart/add/',
          {
            business_product_info_id: payload.business_product_info_id,
            quantity: payload.quantity,
            branch_id: payload.branch_id,
          },
          {
          headers: {
            Authorization: getters.getUser.token
          },
        });

        return true;
      }catch (e) {

        console.log(e + "AddToCard");
        return false;
      }
    }
  },

  async deleteFromCart({commit, getters}, payload)
  {
    try {
      const response = shop.post('v1/business/cart/delete/', {
        headers: {
          Authorization: getters.getUser.token
        },
        cart_id: payload.cart_id
      });

      return payload.status === "SUCCESS";

    }catch (e) {
        console.log(e + " deleteFromCart");
      return  false;
    }
  },

  async cartList({coomit, getters}, payload)
  {
    try {
      const response = shop.get('v1/business/cart/delete/', {
        headers: {
          Authorization: getters.getUser.token
        },
      });

      coomit('SET_CARD_LIST', response.data);

      return payload.status === "SUCCESS";

    }catch (e) {
      console.log(e + "deleteFromCart");
      return  false;
    }
  },

  state:{
    cardList: [],
  },

  getters:{
    getCardList: state => state.cardList,
  }
}

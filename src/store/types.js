import shop from "src/api/shop";

export default{
  mutations:{
    SET_ALL_TYPES: (state, payload) => {
        state.types = payload;
        // state.types.forEach((row, index) => {
        //   row.index = index + 1
        // })
    },
  },
  actions: {
    async FETCH_ALL_TYPES({commit, getters}) {
      try {
        const response = await shop.get("business/list/product/type/", {
          headers: {
            Authorization: getters.getUser.token,
          },
        });
        commit("SET_ALL_TYPES", response.data);
      }catch (e) {
        console.log(e);
      }
    },
    /**
     * @return {boolean}
     */
    async ADD_TYPE({commit, getters},payload) {
      try {
        const response = await shop.post("business/add/product/type/",
          {

            name: payload.name,
            is_countable: payload.is_countable
          },
          {
          headers: {
            Authorization: getters.getUser.token,
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      }catch (e) {
        console.log(e);
        return false;
      }
    },

  },
  state:{
    types: [],
  },
  getters:{
    getAllTypes: state => state.types,
  }
}

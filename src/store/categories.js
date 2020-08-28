import shop from "src/api/shop";

export default{
  mutations:{
    SET_ALL_CATEGORIES: (state, payload) => {
        state.categories = payload;
    },

    SET_ADD_CATEGORY: (state, payload) =>{
       state.newCategoryAdded = payload;
    }

  },
  actions: {
    async FETCH_ALL_CATEGORIES({commit}) {
      try {
        const response = await shop.get("business/categories/", {
          headers: {
            Authorization: getters.getUser.token,
          },
        });
        commit("SET_ALL_CATEGORIES", response.data);
      } catch (e) {
        console.log("watch to FETCH_ALL_CATEGORIES");
      }
    },

    /**
     * @return {boolean}
     */
    async ADD_CATEGORY({commit}, category_title) {
      try {
        const response = await shop.post("business/add/category/", {
          headers: {
            Authorization: getters.getUser.token,
          },
          category_title: category_title,
        });

        return true;
      } catch (e) {
        console.log(e + "SET_ADD_CATEGORY")
        return false;
      }
    },

  },
  state:{
    categories: [],
    newCategoryAdded: "",
  },
  getters:{
    GET_ALL_CATEGORIES : state => state.categories,
    GET_IS_ADDED: state => state.newCategoryAdded,
  }
}

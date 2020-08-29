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
    async FETCH_ALL_CATEGORIES({commit, getters}) {
      try {
        const response = await shop.get("business/categories/", {
          headers: {
            Authorization: getters.getUser.token,
          },
        });
        commit("SET_ALL_CATEGORIES", response.data);
      } catch (e) {
        console.log(e + "watch to FETCH_ALL_CATEGORIES");
      }
    },

    /**
     * @return {boolean}
     */
    async ADD_CATEGORY({commit, getters},category_title) {
      try {
        const response = await shop.post("business/add/category/",
          {

            category_title: category_title,
          },
          {
          headers: {
            Authorization: getters.getUser.token,
            'Content-Type': 'application/json',
          },
        });
        commit("SET_ADD_CATEGORY", response.data);
        return response.data;
      } catch (e) {
        console.log(e + "ADD_CATEGORY");
        return false;
      }
    },

  },
  state:{
    categories: [],
    newCategoryAdded: "",
  },
  getters:{
    get_all_categories : state => state.categories,
    get_is_added: state => state.newCategoryAdded,
  }
}

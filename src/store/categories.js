import shop from "src/api/shop";

export default{
  mutations:{
    SET_ALL_CATEGORIES: (state, payload) => {
        state.categories = payload;
        // state.categories.forEach((row, index) => {
        //   row.index = index + 1
        // })
    },
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
        return response.data;
      } catch (e) {
        console.log(e + "ADD_CATEGORY");
        return false;
      }
    },

  },
  state:{
    categories: [],
  },
  getters:{
    getAllCategories : state => state.categories,
  }
}

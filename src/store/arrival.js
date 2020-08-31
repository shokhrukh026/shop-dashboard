import shop from "../api/shop";

export default{
  mutations:{
    SET_ARRIVAL_ALL: (state, payload) => {
      state.arrivalAll = payload;
    }
  },
  actions:{
    /**
     * @return {boolean}
     */

    async FETCH_ARRIVAL_ALL({commit, getters}) {
      try {
        const response = await shop.get("branch/arrivals/info/", {
          headers: {
            Authorization: getters.getUser.token
          },
        });
        commit('SET_ARRIVAL_ALL', response.data);
        return  response.data;
      } catch (e) {
        console.log(e + "check branches request FETCH_ALL_BRANCHES");
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

    /**
     * @return {boolean}
     */
    async ADD_ARRIVAL_ALL({commit, getters})
    {
      try {
        const response = await shop.post('branch/arrival/add/',
          {
            send: 'True'
          },
          {
            headers: {Authorization: getters.getUser.token},
          });
        return true;
      }catch (e) {
        return false;
      }

    }

  },


  state:{
    arrivalAll: [],
  },

  getters:{
    get_arrival_all : state => state.categories,
  }
}

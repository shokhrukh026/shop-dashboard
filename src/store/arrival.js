import shop from "../api/shop";
import ca from "quasar/lang/ca";

export default{
  mutations:{
    SET_ARRIVAL_ALL: (state, payload) => {
      state.arrivalAll = payload;
      state.arrivalAll.forEach((row, index) => {

        if(row.is_received === false){
          row.is_received = 'Непринято'
        }else if(row.is_received === true){
          row.is_received = 'Принято'
        }
      })
    },
    SET_ARRIVAL_ALL_INFO: (state, payload)=>{
      state.arrival_all_info = payload;
      state.arrival_all_info.forEach((row, index) => {
        row.index = index + 1
      })
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

    async FETCH_ARRIVAL_ALL_INFO({commit, getters}, id)
    {
      try {
        const response = await shop.get(`branch/products/arrival/${id}/info/`,
        {
            headers: {
              Authorization: getters.getUser.token
            },
        });
        commit("SET_ARRIVAL_ALL_INFO", response.data);
        return response.data;
      }catch (e) {
        console.log(e + "FETCH_ARRIVAL_ALL_INFO");
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
    arrival_all_info: [],
  },

  getters:{
    getArrivalAll : state => state.arrivalAll,
    getArrivalAllInfo: state => state.arrival_all_info,
  }
}

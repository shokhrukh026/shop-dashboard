import shop from "../api/shop";

export default {
  mutations: {
    SET_BRANCHES: (state, payload)=>{
       state.branches = payload;
       state.branches.forEach((row, index) => {
        row.index = index + 1

        if(row.status === false){
          row.status = 'Неактивный'
        }else if(row.status === true){
          row.status = 'Активный'
        }
      })
    },

    SET_ONE_BRANCH: (state, payload) => {
      state.oneBranch = payload;

      state.branches.forEach((row, index) => {
        row.index = index + 1

        if(row.status === false){
          row.status = 'Неактивный'
        }else if(row.status === true){
          row.status = 'Активный'
        }
      })

    }

  },
  actions: {
    async FETCH_ALL_BRANCHES({ commit, getters}) {
      try {
        const response = await shop.get("business/branches/", {
          headers: {
            Authorization: getters.getUser.token
          },
        });
        commit('SET_BRANCHES', response.data);
      } catch (e) {
        console.log(e + "check branches request FETCH_ALL_BRANCHES");
      }
    },
    async FETCH_ONE_BRANCHES ({commit}, getters, id) {
      try{
        const response = await shop.get(`business/branches/${id}`, {
          headers: {
            Authorization: getters.getUser.token,
          }
        });
        commit('SET_ONE_BRANCH', response.data);
      }catch (e) {
        console.log(e + "ckeck branches FETCH_ONE_BRANCHES")
      }
    },

  },
  state: {
    branches: [],
    oneBranch: [],
  },
  getters: {
    GET_ALL_BRANCHES: state => state.branches,
    GET_ONE_BRANCH:  state => state.oneBranch,
  },
};

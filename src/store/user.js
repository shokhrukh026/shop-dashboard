import shop from "../api/shop";

const baseUrl = "/api/v1/user/login/";
export default {
  state: {
    user: { token: "", user_id: "", business_id: "" },
  },
  mutations: {
    SET_USER_TO_STATE: (state, payload) => {
      state.user = payload;
    },
    UNSET_USER_FROM_STATE: (state) => {
      state.user = { token: "" , user_id: "", business_id: ""};
    },
    LOG_OUT: (state) => {
      sessionStorage.clear();
    },
  },
  actions: {
    /**
     * @return {string}
     */
    async AUTHORIZATION({ commit }, payload) {
      console.log(payload.username, payload.password);
      try {
        const response = await shop.post("user/login/", {
            username: payload.username,
            password: payload.password,
        });
       //password admin new_admin

        commit("SET_USER_TO_STATE", response.data);
        sessionStorage.setItem("user", JSON.stringify(response.data));
        payload.router.push({ path: "/main" });
      } catch (e) {
        console.log(e + " AUTHORIZATION actions");
        return "error";
      }

    },

    async STATE_CHANGED({commit}, payload){
      commit('SET_USER_TO_STATE', payload);
    },

    async LOGOUT({commit}){
      commit('LOG_OUT');
    }

    // AUTHORIZATION({commit}, payload) {
    //   return axios({
    //       method: "POST",
    //       url: baseUrl,
    //       data: {
    //         username: payload.username,
    //         password: payload.password
    //       },
    //     })
    //     .then((e) => {
    //       commit('SET_USER_TO_STATE', e.data);
    //       sessionStorage.setItem('user', JSON.stringify(e.data));
    //       payload.router.push({path: '/main'});
    //     //   return e;
    //     })
    //     .catch((error) => {
    //       return 'error';
    //     })
    //
    //   const data = {token: 14212414124412, user_id: 1, business_id: 2};
    //   commit('SET_USER_TO_STATE', data);
    //   payload.router.push({path: '/main'})
    //
    // },
    // STATE_CHANGED({commit}, payload){
    //     commit('SET_USER_TO_STATE', payload);
    // },
    // LOGOUT({commit}){
    //   commit('LOG_OUT');
    // }
  },
  getters: {
    getUser: (state) => state.user,
  },
};

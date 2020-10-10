import shop from "../api/shop";

const baseUrl = "/api/v1/user/login/";
export default {
  state: {
    user: { token: '', user_id: '', business_id: '' },
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
    async AUTHORIZATION({ commit, getters }, payload) {
      try {
        const response = await shop.post("user/login/", {
            username: payload.username,
            password: payload.password,
        });
        commit("SET_USER_TO_STATE", response.data);
        sessionStorage.setItem("user", JSON.stringify(response.data));
        payload.router.push({ path: "/main" });
      } catch (e) {
        console.log(e + " AUTHORIZATION actions");
        return "error";
      }

      // console.log(payload);
      // console.log(getters.getUser);
      // commit("SET_USER_TO_STATE", { token: 'Token 0f37f804f4090de8a64c404ed833b8c834b21b8c', user_id: '1', business_id: '3' });
      // sessionStorage.setItem('user', JSON.stringify({ token: 'Token 0f37f804f4090de8a64c404ed833b8c834b21b8c', user_id: '1', business_id: '3' }));
      // payload.router.push({ path: "/main" });

    },
    async STATE_CHANGED({commit}, payload){
      commit('SET_USER_TO_STATE', payload);
    },

    async LOGOUT({commit}){
      commit('LOG_OUT');
    }
  },
  getters: {
    getUser: (state) => state.user,
  },
};

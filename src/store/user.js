import axios from 'axios';

const baseUrl = 'http://dev.epos.uz/v1/user/login/';
export default{
    state:{
        user: {}
    },
    mutations:{
        SET_USER_TO_STATE: (state, payload) => {
          state.user = payload
        }
    },
    actions: {
        AUTHORIZATION({commit}, payload) {
          return axios({
              method: "POST",
              url: baseUrl,
              data: {
                username: payload.username,
                password: payload.password
              },
            })
            .then((e) => {
              payload.router.push({path: '/main'});
              commit('SET_USER_TO_STATE', e.data);
            //   return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
            
        }
    },
    getters:{
        getUser: state => state.user
    }
}
import axios from 'axios';

const baseUrl = 'http://dev.epos.uz/v1/user/login/';
export default{
    state:{
        user: {token: ''}
    },
    mutations:{
        SET_USER_TO_STATE: (state, payload) => {
          state.user = payload
        }
    },
    actions: {
        AUTHORIZATION({commit}, payload) {
          // return axios({
          //     method: "POST",
          //     url: baseUrl,
          //     data: {
          //       username: payload.username,
          //       password: payload.password
          //     },
          //   })
          //   .then((e) => {
          //     payload.router.push({path: '/main'});
          //     commit('SET_USER_TO_STATE', e.data);
          //   //   return e;
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //     return 'error';
          //   })



          
          //Used when above code not works
          const data = {token: 14212414124412, user_id: 1, business_id: 2}
          commit('SET_USER_TO_STATE', data);
          payload.router.push({path: '/main'})
            
        }
    },
    getters:{
        getUser: state => state.user
    }
}
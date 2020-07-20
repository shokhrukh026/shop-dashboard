import axios from 'axios';

const baseUrl = 'http://dev.epos.uz/v1/business/';
export default{
    state:{
        branches: []
    },
    mutations:{
        SET_BRANCHES_INFO: (state, payload) => {
          state.branches = payload
        }
    },
    actions: {
        GET_BRANCHES({commit, getters}) {
          return axios({
              method: "GET",
              url: baseUrl + getters.getUser.business_id + '/branches/',
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_BRANCHES_INFO', e.data);
            //   return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
            
        }
    },
    getters:{
        getBranches: state => state.branches
    }
}
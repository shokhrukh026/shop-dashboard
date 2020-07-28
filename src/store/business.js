import axios from 'axios';

const baseUrl = 'http://dev.epos.uz/v1/business/';
export default{
    state:{
        branches: [],
        medicines: [],
        search_result: [],
        comments: []
    },
    mutations:{
        SET_BRANCHES_INFO: (state, payload) => {
          state.branches = payload
        },
        SET_MEDICINES_INFO: (state, payload) => {
          state.medicines = payload
        },
        SET_SEARCH_RESULT_INFO: (state, payload) =>{
          state.search_result = payload
        },
        SET_COMMENTS_INFO: (state, payload) => {
          state.comments = payload
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
            
        },
        GET_MEDICINES({commit, getters}) {
          return axios({
              method: "GET",
              url: baseUrl + getters.getUser.business_id + '/medicines/',
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_MEDICINES_INFO', e.data);
            //   return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        GET_COMMENTS({commit, getters}) {
          return axios({
              method: "GET",
              url: 'https://jsonplaceholder.typicode.com/photos',
            })
            .then((e) => {
              commit('SET_COMMENTS_INFO', e.data);
            //   return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        GET_SEARCH_RESULT({commit, getters},payload) {
          return axios({
              method: "GET",
              url: 'http://dev.epos.uz/v1/medicine/list?title='+payload.title,
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_SEARCH_RESULT_INFO', e.data);
               return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        ADD_MEDICINES({commit, getters}, payload) {
          return axios({
              method: "POST",
              url: baseUrl + 'medicines/add/',
              headers: {Authorization: getters.getUser.token},
              data:{
                title: payload.title,
                barcode: payload.barcode,
                country: payload.country,
                manufacture: payload.manufacture,
                serial_code: payload.serial_code,
                quantity: payload.quantity,
                capacity: payload.capacity,
                vat: payload.vat,
                description: payload.description,
                purchase_price: payload.purchase_price,
                selling_price: payload.selling_price,
                expire_date: '2020-08-30',
              }
            })
            .then((e) => {
              console.log('Successfully added medicines!')
            //   return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        ADD_MEDICINE_INFO({commit, getters}, payload) {
          return axios({
              method: "POST",
              url: baseUrl + 'medicines/info/add/',
              headers: {Authorization: getters.getUser.token},
              data:{
                business_medicine_id: payload.business_medicine_id  ,
                quantity: payload.quantity,
                purchase_price: payload.purchase_price,
                selling_price: payload.selling_price,
                expire_date: payload.expire_date
              }
            })
            .then((e) => {
              console.log('Successfully added info about medicines!')
            //   return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        
    },
    getters:{
        getBranches: state => state.branches,
        getMedicines: state => state.medicines,
        getComments: state => state.comments,
        getSearchResult: state => state.search_result,
    }
}
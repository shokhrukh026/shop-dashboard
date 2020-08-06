import axios from 'axios';
import lodash from 'lodash'; 

const baseUrl = 'http://dev.epos.uz/v1/business/';
export default{
    state:{
        branches: [],
        medicines: [],
        medicines_by_branch: [],
        medicine_info: [],
        medicine_details: [],
        search_result: [],
    },
    mutations:{
        MEDICINE_COMMIT: (state, payload) => {  
            for(let i = 0; i < state.medicines.length; i++){
                Vue.set(state.medicines, payload.name, payload.amount[i]);
                console.log(state.medicines);
            }          
            // state.medicines.forEach((row, index) => {
            //     row.total_quantity_med = payload.amount[index]
            //     // Vue.set(row, payload.name, payload.amount[index]);
            // })
        },
        SET_BRANCHES: (state, payload) => {
          state.branches = payload;
        },
        SET_MEDICINES: (state, payload) => {
          state.medicines = payload;
        },
        SET_MEDICINES_BY_BRANCH: (state, payload) => {
          state.medicines_by_branch = payload;
        },
        SET_MEDICINES_DETAIL_INFO: (state, payload) => {
          state.medicine_info = payload;
        },
        SET_MEDICINE_DETAILS: (state, payload) => {
          state.medicine_details = payload;
        },
        SET_NEXT_PAGE: (state, payload) => {
          let final;
          state.medicines.links = payload.links;
          state.medicines.count = payload.count;
          for(let i = 0; i<payload.results.length; i++){
            for(let k = 0; k<state.medicines.results.length; k++){
              let answer = lodash.isEqual(state.medicines.results[k], payload.results[i]);
              if(answer){
                final = answer;
              }
            }
            if(!final)
              state.medicines.results.push(payload.results[i]);
            
    
          }
        },
        SET_SEARCH_RESULT: (state, payload) =>{
          state.search_result = payload;
        },

    },
    actions: {
        GET_BRANCHES({commit, getters}) {
          return axios({
              method: "GET",
              url: baseUrl + getters.getUser.business_id + '/branches/',
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_BRANCHES', e.data);
              return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        GET_MEDICINES_IN_BRANCHES({commit, getters}, payload) {
          return axios({
              method: "GET",
              url: baseUrl + getters.getUser.business_id + '/branches/', // http://dev.epos.uz/v1/business/medicine/1/branches/
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_BRANCHES', e.data);
              return e;
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
              commit('SET_MEDICINES', e.data);
            //   return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        GET_MEDICINES_BY_BRANCH({commit, getters}, payload) {
          return axios({
              method: "GET",
              url: 'http://dev.epos.uz/v1/branches/' + payload.virtual_number + '/medicines/',
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_MEDICINES_BY_BRANCH', e.data);
               return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        GET_MEDICINE_DETAIL({commit, getters}, payload) {
          return axios({
              method: "GET",
              url: baseUrl + getters.getUser.business_id + '/medicines/detail/' + payload.id + '/',  // payload.business_medicine_id
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_MEDICINE_DETAILS', e.data);
               return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        GET_MEDICINE_INFO({commit, getters}, payload) {
          return axios({
              method: "GET",
              url: baseUrl + getters.getUser.business_id + '/medicines/detail/info/' + payload.id + '/',  // payload.business_medicine_id
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_MEDICINES_DETAIL_INFO', e.data);
               return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
    
        async GET_SEARCH_RESULT({commit, getters},payload) {
          return await axios({
              method: "GET",
              url: 'http://dev.epos.uz/v1/medicine/list?' + payload.type + '=' + payload.value,
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_SEARCH_RESULT', e.data);
               return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        // business/{business_id}/medicines?key=value&key=value

        GET_NEXT_PAGE({commit, getters},payload) {
          return axios({
              method: "GET",
              url: getters.getMedicines.links.next,
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_NEXT_PAGE', e.data);
               //return e;
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
               return true;
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
        getMedicineDetails: state => state.medicine_details,
        getMedicinesByBranch: state => state.medicines_by_branch,
        getMedicinesInfo: state => state.medicine_info,
        getSearchResult: state => state.search_result,
    }
}

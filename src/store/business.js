import Vue from 'vue';
import axios from 'axios';
import lodash from 'lodash'; 

const baseUrl = '/api/v1/business/';
export default{
    state:{
        branches: [],
        medicines: [],
        medicines_by_branch: [],
        medicine_info: [],
        medicine_details: [],
        branches_in_med_info_page: [],
        branch_medicine_detail: [],
        branch_medicine_info: [],
        shopping_cart: [],
        arrival_all: [],
        arrival_all_info: [],
    },
    mutations:{
        // MEDICINE_COMMIT: (state, payload) => {
        //   // console.log(payload.amount);
        //   // console.log(payload.name);

        //     state.medicines.results.forEach((row, index) => {
        //       Vue.set(row, payload.name, payload.amount[index]);
        //     })
        // },
        SET_ARRIVAL_ALL: (state, payload) => {
          state.arrival_all = payload
          state.arrival_all.forEach((row, index) => {
            row.index = index + 1

            if(row.is_received == false){
              row.is_received = 'ложь'
            }else if(row.is_received == true){
              row.is_received = 'правда'
            }
          })
        },
        SET_ARRIVAL_ALL_INFO: (state, payload) => {
          state.arrival_all_info = payload
        },
        SET_SHOPPING_CART_MEDICINES: (state, payload) => {
          state.shopping_cart = payload;
          state.shopping_cart.forEach((row, index) => {
            row.index = index + 1
          })
        },
        SET_BRANCHES: (state, payload) => {
          state.branches = payload;
        },
        SET_MEDICINES: (state, payload) => {
          // let array = payload;
          // console.log(array.results);
          // let array2 = array.results.map()
          state.medicines = payload;
          state.medicines.results.forEach((row, index) => {
            row.index = index + 1
          })
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
        SET_BRANCHES_IN_MED_INFO_PAGE: (state, payload) => {
          state.branches_in_med_info_page = payload;
        },
        SET_BRANCH_MEDICINE_DETAIL: (state, payload) => {
          state.branch_medicine_detail = payload;
        },
        SET_BRANCH_MEDICINE_INFO: (state, payload) => {
          state.branch_medicine_info = payload;
        },
        SET_NEXT_PAGE: (state, payload) => {
          let final = false;
          state.medicines.links = payload.links;
          state.medicines.count = payload.count;
          
          for(let i = 0; i<payload.results.length; i++){
            for(let k = 0; k<state.medicines.results.length; k++){
              let answer = lodash.isEqual(state.medicines.results[k], payload.results[i]);
              if(answer){
                final = answer;
              }
            }
     
            if(!final){
              // payload.results[i].index
              state.medicines.results.push(payload.results[i]);
            }
            final = false;
    
          }
          // payload.results.forEach((row, index) => {
          //   row.index = index + 1
          // })

          //O'zgartirish kerak bo'lishi mumkun
          state.medicines.results.forEach((row, index) => {
            row.index = index + 1
          })
        },
        SET_SEARCH_RESULT_ADD_MEDICINE: (state, payload) =>{
          // let same = false;
          
          let results = payload

          if(results.length != 0){
            console.log(state.medicines);
            // if(state.medicines == []){
            //   state.medicines = 
            // }

            state.medicines.results.forEach((row, index) => {
              // console.log(row);
              
              for(let a = 0; a < results.length; a++){
                if(lodash.isEqual(row, results[a])){
                  // same = true;
                  results.splice(a, 1);
                  console.log(results);
                }
              }
              
            
            })
            
             if(results){
              for(let i = 0; i < results.length; i++){
                Vue.set(state.medicines.results, state.medicines.results.length, results[i]);
              }
             }
          }else{
            console.log('Array is empty!')
          }
        },
        SET_SEARCH_RESULT_ALL_MEDICINES: (state, payload) =>{
          state.medicines.results.forEach((row, index) => {
            delete row.index;
          })

          let results = payload.results

          if(results.length != 0){
            state.medicines.results.forEach((row, index) => {
              
              for(let a = 0; a < results.length; a++){
                if(lodash.isEqual(row, results[a])){
                  console.log('it is equal!');
                  results.splice(a, 1);
                }
              }
              
            
            })
             if(results){
              for(let i = 0; i < results.length; i++){
                Vue.set(state.medicines.results, state.medicines.results.length, results[i]);
              }
             }
          }else{
            console.log('Array is empty!')
          }

          state.medicines.results.forEach((row, index) => {
            row.index = index + 1
          })
        },
        SET_SEARCH_RESULT_BY_BRANCH: (state, payload) =>{
          let same = false;
          // console.log(payload.results);

          if(payload.results.length != 0){
            state.medicines_by_branch.results.forEach((row, index) => {
              console.log(row);
              
              for(let a = 0; a < payload.results.length; a++){
                if(lodash.isEqual(row, payload.results[a])){
                  same = true;
                }
              }
              // if(lodash.isEqual(row, payload.results.forEach((item  ) => {
              //   console.log(item);
              //   return item
              // }))){
              //   console.log('They are same!');
              //   same = true;
              // }
            })
            if(!same){
              state.medicines_by_branch.results.push(JSON.parse(JSON.stringify(payload.results[0])));
            }
            // state.search_result = payload;
          }else{
            console.log('Array is empty!')
          }
        },

    },
    actions: {
        async GET_BRANCHES({commit, getters}) {
          return await axios({
              method: "GET",
              url: baseUrl + 'branches/',
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
        // GET_MEDICINES_IN_BRANCHES({commit, getters}, payload) {
        //   return axios({
        //       method: "GET",
        //       url: baseUrl + getters.getUser.business_id + '/branches/', // http://dev.epos.uz/v1/business/medicine/1/branches/
        //       headers: {Authorization: getters.getUser.token}
        //     })
        //     .then((e) => {
        //       commit('SET_BRANCHES', e.data);
        //       return e;
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     //   return error;
        //     })    
        // },
        
        async GET_MEDICINES({commit, getters}) {
          return await axios({
              method: "GET",
              url: baseUrl + 'medicines/',
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
        async GET_MEDICINES_BY_BRANCH({commit, getters}, payload) {
          return await axios({
              method: "GET",
              url: '/api/v1/branch/' + payload.virtual_number + '/medicines/',
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
        async GET_SEARCH_RESULT_BY_BRANCH({commit, getters},payload) {
          return await axios({
              method: "GET",
              url: '/api/v1/branches/' + payload.virtual_number + '/medicines/?search=' + payload.title,
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_SEARCH_RESULT_BY_BRANCH', e.data);
               //return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        async GET_MEDICINE_DETAIL({commit, getters}, payload) {
          return await axios({
              method: "GET",
              url: baseUrl + 'medicines/detail/' + payload.id + '/',  // payload.business_medicine_id
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
        async GET_MEDICINE_INFO({commit, getters}, payload) {
          return await axios({
              method: "GET",
              url: baseUrl + 'medicines/detail/info/' + payload.id + '/',  // payload.business_medicine_id
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
        async GET_BRANCHES_IN_MED_INFO_PAGE({commit, getters}, payload) {
          return await axios({
              method: "GET",
              url: baseUrl + 'medicine/' + payload.id + '/branches/',  // payload.business_medicine_id   
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_BRANCHES_IN_MED_INFO_PAGE', e.data);
               return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        async GET_BRANCH_MEDICINE_DETAIL({commit, getters}, payload) {
          return await axios({
              method: "GET",
              url: '/api/v1/branch/' + payload.branch_id + '/business_medicine/' + payload.business_medicine_id + '/branch_medicine_detail/',
              // url: baseUrl + getters.getUser.business_id + '/medicine/' + payload.id + '/branches/',  // payload.business_medicine_id   
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_BRANCH_MEDICINE_DETAIL', e.data);
               return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        async GET_BRANCH_MEDICINE_INFO({commit, getters}, payload) {
          return await axios({
              method: "GET",
              url: '/api/v1/branch/' + payload.branch_id + '/business_medicine/' + payload.business_medicine_id + '/branch_medicine_info/',
              // url: baseUrl + getters.getUser.business_id + '/medicine/' + payload.id + '/branches/',  // payload.business_medicine_id   
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_BRANCH_MEDICINE_INFO', e.data);
               return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        // http://127.0.0.1:8000/v1/branch/2333/business_medicine/1/branch_medicine_info/
    
        async GET_SEARCH_RESULT_ADD_MEDICINE({commit, getters},payload) {
           return await axios({
              method: "GET",
              // url: baseUrl + getters.getUser.business_id + '/medicines/?search=' + payload.title,
              url: '/api/v1/medicine/list/?' + payload.type + '=' + payload.value,
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              console.log(e.data.data);
              //commit('SET_SEARCH_RESULT_ADD_MEDICINE', e.data.data);
               return e.data.data;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        async GET_SEARCH_RESULT_ALL_MEDICINES({commit, getters},payload) {
          return await axios({
             method: "GET",
             url: baseUrl + 'medicines/?search=' + payload.value,
             //url: 'http://dev.epos.uz/v1/medicine/list?' + payload.type + '=' + payload.value,
             headers: {Authorization: getters.getUser.token}
           })
           .then((e) => {
             //console.log(e.data);
             commit('SET_SEARCH_RESULT_ALL_MEDICINES', e.data);
             return e.data;
           })
           .catch((error) => {
             console.log(error);
           //   return error;
           })
       },

        async GET_NEXT_PAGE({commit, getters},payload) {
          return await axios({
              method: "GET",
              url: getters.getMedicines.links.next,
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_NEXT_PAGE', e.data);
               //return e;
            })
            .catch((error) => {
              console.log(getters.getMedicines.links.next);
              console.log(error);
              //   return error;
            })
        },
        async GET_SHOPPING_CART_MEDICINES({commit, getters},payload) {
          return await axios({
              method: "GET",
              url: baseUrl + 'cart/',
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_SHOPPING_CART_MEDICINES', e.data);
                return e.data;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        async GET_ARRIVAL_ALL({commit, getters},payload) {
          return await axios({
              method: "GET",
              url: baseUrl + 'arrivals/info/',
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_ARRIVAL_ALL', e.data);
               return e.data;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        async GET_ARRIVAL_ALL_INFO({commit, getters},payload) {
          return await axios({
              method: "GET",
              url: '/api/v1/branches/medicines/arrival/' + payload.arrival_id + '/info/',
              headers: {Authorization: getters.getUser.token}
            })
            .then((e) => {
              commit('SET_ARRIVAL_ALL_INFO', e.data);
               return e.data;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },

        async ADD_MEDICINES({commit, getters}, payload) {
          return await axios({
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
                piece: payload.piece,
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
        async ADD_MEDICINE_INFO({commit, getters}, payload) {
          return await axios({
              method: "POST",
              url: baseUrl + 'medicines/info/add/',
              headers: {Authorization: getters.getUser.token},
              data:{
                business_medicine_id: payload.business_medicine_id  ,
                quantity: payload.quantity,
                piece: payload.piece,
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
        async ADD_TO_CART({commit, getters}, payload) {
           await axios({
              method: "POST",
              url: baseUrl + 'cart/add/',
              headers: {Authorization: getters.getUser.token},
              data:{
                business_medicine_info_id: payload.business_medicine_info_id,
                quantity_box: payload.quantity_box,
                quantity_piece: payload.quantity_piece,
                branch_id: payload.branch_id
              }
            })
            .then((e) => {
              console.log('Successfully added into cart!')
            //   return e;
            })
            .catch((error) => {
              console.log(error);
            //   return error;
            })
        },
        async ADD_ARRIVAL_ALL({commit, getters}, payload) {
          await axios({
             method: "POST",
             url: '/api/v1/branches/arrival/add/',
             headers: {Authorization: getters.getUser.token},
             data:{
              send: 'True'
             }
           })
           .then((e) => {
             console.log('Successfully distributed!')
           //   return e;
           })
           .catch((error) => {
             console.log(error);
           //   return error;
           })
       },
       async DELETE_ARRIVAL_ONE({commit, getters}, payload) {
        await axios({
           method: "POST",
           url: '/api/v1/business/cart/delete ',
           headers: {Authorization: getters.getUser.token},
           data:{
              cart_id: payload.cart_id
           }
         })
         .then((e) => {
           console.log('Successfully deleted!')
         //   return e;
         })
         .catch((error) => {
           console.log(error);
         //   return error;
         })
      },
      async DELETE_ARRIVAL_FROM_HISTORY({commit, getters}, payload) {
        await axios({
           method: "POST",
           url: '/api/v1/business/delete/arrival/',
           headers: {Authorization: getters.getUser.token},
           data:{
            arrival_id: payload.arrival_id
           }
         })
         .then((e) => {
           console.log('Successfully deleted!')
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
        getBranchesInMedInfoPage: state => state.branches_in_med_info_page,
        getBranchMedicineDetail: state => state.branch_medicine_detail,
        getBranchMedicineInfo: state => state.branch_medicine_info,
        getShoppingCartMedicines: state => state.shopping_cart,
        getArrivalAll: state => state.arrival_all,
        getArrivalAllInfo: state => state.arrival_all_info,
    }
}

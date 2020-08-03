<template>
    <q-page class="bg-grey-3">
        <div class="q-pa-md">
            <q-expansion-item expand-separator icon="info" default-opened   header-class="bg-blue text-h6" dark :label="'Информация о лекарстве ' + getMedicines.title">

             <q-list bordered separator dense class="bg-white shadow-1">
               <q-item v-ripple>
                 <q-item-section>
                     <q-item-label class="text-h6 text-blue-9">Название лекарства : <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.title}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Описание: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.description}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Штрих-код: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.barcode}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Страна: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.country}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Производитель: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.manufacture}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Серийный номер: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.serial_code}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">НДС: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.vat}}%</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Общее количество в бизнесе: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.total_quantity}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Оставшееся количество в бизнесе: <span class="text-subtitle1 text-black">{{getMedicines.left_quantity}}</span></q-item-label>
                 </q-item-section>
               </q-item>
                
             </q-list>
      </q-expansion-item>

                   {{getMedicines}}
            <div class="q-mt-md">
              <q-btn push color="white" text-color="primary" label="Добавить" class="q-mb-xs" :disable="loading"
               :to="{ name: 'add-info-medicine', params: {id: id}}"/>
            </div>

            <div class="q-mt-xs">
                <q-table
                dense
                title="Покупатели"
                :data="data"
                :columns="columns"
                row-key="index"  
                :filter="filter"
                :loading="loading"
                separator="cell"
                :pagination.sync="pagination"
                :rows-per-page-options="[0]"
                >
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn dense round flat color="grey" @click="(addRow = !addRow) && (temp = props.row)" icon="add_circle"></q-btn>
                        <q-btn dense round flat color="grey" to="/branch-update" icon="edit"></q-btn>
                        <q-btn dense round flat color="grey" to="/branch-info" icon="fas fa-info-circle"></q-btn>
                    </q-td>
                </template>
                <template v-slot:top="props">
                    <span class="text-h6">Товары с разной наценкой</span>
                    <!-- <q-btn color="green" :disable="loading" label="Добавить" @click="addRow = !addRow" /> -->
                    <!-- <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" /> -->
                    <q-space />
                    <q-input borderless dense debounce="300" color="primary" v-model="filter"
                    placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; border-radius: 5px;">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                    </q-input>
                    <q-btn
                    flat round dense
                    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="props.toggleFullscreen"
                    class="q-ml-md"
                    />
                </template>
                </q-table>
            </div>



            <div class="q-mt-md">
                <q-table
                dense
                title="Покупатели"
                :data="data"
                :columns="columns"
                row-key="index"  
                :filter="filter"
                :loading="loading"
                separator="cell"
                :pagination.sync="pagination"
                :rows-per-page-options="[0]"
                >
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn dense round flat color="grey" to="/branch-update" icon="edit"></q-btn>
                        <q-btn dense round flat color="grey" to="/branch-info" icon="fas fa-info-circle"></q-btn>
                    </q-td>
                </template>
                <template v-slot:top="props">
                    <span class="text-h6">Лекарства в филиалах</span>
                    <!-- <q-btn color="green" :disable="loading" label="Добавить" @click="addRow = !addRow" /> -->
                    <!-- <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" /> -->
                    <q-space />
                    <q-input borderless dense debounce="300" color="primary" v-model="filter"
                    placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; border-radius: 5px;">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                    </q-input>
                    <q-btn
                    flat round dense
                    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="props.toggleFullscreen"
                    class="q-ml-md"
                    />
                </template>
                </q-table>
            </div>



        </div>



        <q-dialog v-model="addRow" persistent >
             <q-card style="width: 300px">
               <q-card-section class="bg-info">
                 <div class="text-h6 text-white">Распределение</div>
               </q-card-section>
               <q-separator />
               <q-card-section class="q-pt-none q-pa-lg">
                <q-select outlined v-model="distribution_branch" :options="distribution_options" label="Филиал" class="q-mb-sm"/>
                <q-input outlined v-model="distribution_amount" label="Кол-во" class="q-mb-sm" :suffix="temp_total_quantity" 
                :rules="[
                  val => val !== null && val !== '' || 'Заполните поле пожалуйста',
                  val => val > 0 && val <= temp.total_qauntity || 'В складе имеется ' + temp.total_qauntity + ' товара'
                ]"/>
                
               </q-card-section>
               <q-separator />
               <q-card-actions align="right" class="bg-white text-teal">
                 <q-btn flat label="Отменить" v-close-popup />
                 <q-btn flat label="Распределить" v-close-popup  @click="addToCart"/>
               </q-card-actions>
             </q-card>
           </q-dialog>
        {{getMedicinesInfo}}
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    props:{
      id: {
        type: Number,
        required: true
      },
    },
    data(){
        return{
            temp: {},
            temp_total_quantity: '',
            addRow: false,
            distribution_amount: '',
            distribution_branch: '',  
            distribution_options: [],

          // this should be commented
            getMedicines: {title: '', barcode: '', country: '', manufacture: '', serial_code: '', vat: '', total_quantity: '', left_quantity: ''},
            pagination: {
              rowsPerPage: 8
            },
            loading: false,
            filter: '',
            columns: [
                { name: 'index', align: 'center', label: '№', field: 'index', sortable: true},
                { name: 'expire_date', align: 'center', label: 'Годен до', field: 'expire_date', sortable: true },

                { name: 'total_qauntity', align: 'center', label: 'Общее кол-во', field: 'total_qauntity', sortable: true },
                { name: 'left_quantity', align: 'center', label: 'Остаток', field: 'left_quantity', sortable: true },
                { name: 'purchase_price', align: 'center', label: 'Цена покупки', field: 'purchase_price', sortable: true },
                { name: 'selling_price', align: 'center', label: 'Цена продажи', field: 'selling_price', sortable: true },

                { name: 'actions', label: 'Действия', field: '', align:'center' },
            ],
            data: [
              {
                "business_medicine_id":1,
                "total_qauntity":1000,
                "left_quantity": 200,
                "purchase_price":1500,
                "selling_price":1700,
                "expire_date":"2020-08-30"
              }
            ],  
            
        }
    },
    watch:{ 
      // 'distribution_amount': function (newVal, oldVal){
      //    if(newVal){
      //      this.temp_total_quantity = this.temp.total_qauntity - newVal;
      //    }
      // },
      'temp.total_qauntity': function (newVal, oldVal){
        this.temp_total_quantity = this.temp.total_qauntity.toString();
      },
        
    },
    async mounted(){
      await this.GET_BRANCHES();
      this.distribution_options = await this.getBranchNames;


      // await this.GET_MEDICINES();
      // const answer = await this.GET_MEDICINE_INFO({id: this.id});
      // console.log(data);
      // this.getMedicines.title = answer.data.title;
      // this.getMedicines.description = answer.data.description;
      // this.getMedicines.barcode = answer.data.barcode;
      // this.getMedicines.country = answer.data.country;
      // this.getMedicines.manufacture = answer.data.manufacture;
      // this.getMedicines.serial_code = answer.data.serial_code;
      // this.getMedicines.vat = answer.data.vat;
      // this.getMedicines.total_quantity = answer.data.total_quantity;
      // this.getMedicines.left_quantity = answer.data.left_quantity;

      // for(let i = 0; i < answer.data.medicines_info.length; i++ ){
      //   this.$set(this.data, this.data.length, answer.data.medicines_info[i]);
      // }
      
       
      
      
    },
    computed:{
      ...mapGetters([
        'getBranches', 'getUser', 'getMedicinesInfo'
      ]),
      getBranchNames() {
        let a = [];
        for(let i = 0; i<this.getBranches.length; i++){
          a.push(this.getBranches[i].name);
        }
        return a;
      },
    },
    methods: {
      ...mapActions([
          'GET_MEDICINES', 'GET_MEDICINE_INFO', 'GET_BRANCHES'
      ]),
      async addToCart(){
        let data = { id: this.id, branch: this.distribution_branch, amount: this.distribution_amount }
        await this.$emit('medicines', data);
      },
      // async getSearchResultByFilter(){
      //   return await this.GET_SEARCH_RESULT(
      //     {
      //       title: this.filter
      //     }
      //   )
      // },
    }
}
</script>

<style scoped>

</style>
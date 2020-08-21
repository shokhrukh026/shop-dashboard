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
            {{getBranches}}

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
                :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => firstRowIndex + '-' + endRowIndex + ' из ' + rowsNumber"

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
                    <!-- <q-input borderless dense debounce="300" color="primary" v-model="filter"
                    placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; border-radius: 5px;">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                    </q-input> -->
                    <q-btn
                    flat round dense
                    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="props.toggleFullscreen"
                    class="q-ml-md"
                    />
                </template>
                </q-table>
            </div>
          {{data}}

            <div class="q-mt-md">
                <q-table
                dense
                title="Покупатели"
                :data="data2"
                :columns="columns2"
                row-key="index"  
                :filter="filter"
                :loading="loading"
                separator="cell"
                :pagination.sync="pagination"
                :rows-per-page-options="[0]"
                :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => firstRowIndex + '-' + endRowIndex + ' из ' + totalRowsNumber"
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
                    <!-- <q-input borderless dense debounce="300" color="primary" v-model="filter"
                    placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; border-radius: 5px;">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                    </q-input> -->
                    <q-btn
                    flat round dense
                    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="props.toggleFullscreen"
                    class="q-ml-md"
                    />
                </template>
                </q-table>
            </div>

          {{getBranchesInMedInfoPage}}

        </div>



        <q-dialog v-model="addRow" persistent >
       
             <q-card style="min-width: 50vw;">
               
               <q-card-section class="bg-info">
                 <div class="text-h6 text-white">Добавить в корзину</div>
               </q-card-section>
               <q-separator />
                <q-form
                  @submit="addToCart"
                  @reset="onReset"
                  class="q-pt-md"
                >
               <q-card-section class="q-pt-none">
                 <div class="row">
                  <q-select outlined v-model="distribution_branch" :options="distribution_options" label="Филиал" class="q-mb-sm col-12"/>
                 </div>
                 <div class="row q-mb-xs content-stretch">
                  <q-input outlined v-model="distribution_amount.box" label="Кол-во упаковок" class="col" :suffix="left_quantity_box" 
                  ref="box" 
                  :rules="[
                    val => val >= 0 && val <= left_quantity_box || 'В складе имеется ' + left_quantity_box + ' упаковок'
                  ]"/>
                  <q-input outlined v-model="distribution_amount.piece" label="Кол-во штук" class="q-pl-xs col" :suffix="left_quantity_piece" 
                  ref="piece"
                  v-if="temp.capacity > 1" 
                  :rules="[
                    val => val >= 0 && val <= left_quantity_piece || 'В складе имеется ' + left_quantity_piece + ' штук'
                  ]"/>
                 </div>
            </q-card-section>
                
               
               <q-card-actions align="right" class="bg-white text-white">
                   <q-btn class="bg-info" label="Отменить" type="reset" v-close-popup />
                   <q-btn class="bg-info" label="Добавить" type="submit"/>
               </q-card-actions>
              
            </q-form>
             </q-card>

           </q-dialog>
        <!-- {{getMedicinesInfo}} -->
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
            rowsNumber: null,
            temp: {},
            left_quantity_box: '',
            left_quantity_piece: '',
            addRow: false,
            distribution_amount: {box: '', piece: ''},
            distribution_branch: '',  
            distribution_options: [],
            formHasError: false,

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

                { name: 'total_quantity', align: 'center', label: 'Общее кол-во', field: 'total_quantity', sortable: true },
                { name: 'left_quantity', align: 'center', label: 'Остаток', field: 'left_quantity', sortable: true },
                { name: 'purchase_price', align: 'center', label: 'Цена покупки', field: 'purchase_price', sortable: true },
                { name: 'selling_price', align: 'center', label: 'Цена продажи', field: 'selling_price', sortable: true },

                { name: 'actions', label: 'Действия', field: '', align:'center' },
            ],


            columns2: [
                { name: 'index', align: 'center', label: '№', field: 'index', sortable: true},
                { name: 'name', align: 'center', label: 'Имя', field: 'name', sortable: true },
                { name: 'address', align: 'center', label: 'Адрес', field: 'address', sortable: true },
                { name: 'city', align: 'center', label: 'Город', field: 'city', sortable: true },
                { name: 'contact_person', align: 'center', label: 'Контактное лицо', field: 'contact_person', sortable: true },
                { name: 'contact_phone', align: 'center', label: 'Контактный телефон', field: 'contact_phone', sortable: true },
                { name: 'status', align: 'center', label: 'Статус', field: 'status', sortable: true },
                { name: 'street', align: 'center', label: 'Улица', field: 'street', sortable: true },
                { name: 'total_quantity', align: 'center', label: 'Кол-во', field: 'total_quantity', sortable: true },


                { name: 'actions', label: 'Действия', field: '', align:'center' },
            ],
            data: [
              // {
              //   "business_medicine_id":1,
              //   "total_qauntity":1000,
              //   "left_quantity": 200,
              //   "purchase_price":1500,
              //   "selling_price":1700,
              //   "expire_date":"2020-08-30"
              // }
            ],  
            data2: [

            ]
            
        }
    },
    watch:{ 
      'distribution_amount.box': function (newVal, oldVal){
         if(newVal < this.left_quantity_box){
           this.left_quantity_piece = this.temp.capacity;
         }else if (newVal == this.left_quantity_box){
           this.left_quantity_piece = this.temp.left_quantity_piece;
         }
      },
      'temp.left_quantity_box': function (newVal, oldVal){
        this.left_quantity_box = this.temp.left_quantity_box.toString();
      },
      'temp.left_quantity_piece': function (newVal, oldVal){
        this.left_quantity_piece = this.temp.left_quantity_piece.toString();
      },
      'temp.capacity': function (newVal, oldVal){
        if(newVal <= 1){
          this.distribution_amount.piece = 0
        }
      },
      data: {
        handler: function (val, oldVal) {
          this.data.forEach((row, index) => {
            row.index = index + 1
          })
          // let amount = [], left = [];
          // for(let k = 0; k < this.getMedicinesInfo.results.length; k++){
          //   let capacity = await this.getMedicinesInfo.results[k].capacity;
          //   let total_quantity_box = await this.getMedicinesInfo.results[k].total_qauntity;
          //   let total_quantity_piece = await this.getMedicinesInfo.results[k].total_quantity_piece;
          //   let left_quantity_box = await this.getMedicinesInfo.results[k].left_quantity;
          //   let left_quantity_piece = await this.getMedicinesInfo.results[k].left_quantity_piece;
          //   left.push(left_quantity_box + ' упаковок ' +  '( по ' + capacity + ' )' + ' + ' + left_quantity_piece + ' шт');
          //   amount.push(total_quantity_box + ' упаковок ' +  '( по ' + capacity + ' )' + ' + ' + total_quantity_piece + ' шт');
          // }
          // console.log(amount);

          // this.data.forEach((row, index) => {
          //   row.total_quantity = amount[index]
          // })
          // this.data.forEach((row, index) => {
          //   row.left_quantity = left[index]
          // })
      
        },
        deep: true
      },
      data2: {
        handler: function (val, oldVal) {
          this.data2.forEach((row, index) => {
            row.index = index + 1
          })
        },
        deep: true
      },

        
    },
    async mounted(){
      const details = await this.GET_MEDICINE_DETAIL({id: this.id});
      this.getMedicines.title = details.data.title;
      this.getMedicines.description = details.data.description;
      this.getMedicines.barcode = details.data.barcode;
      this.getMedicines.country = details.data.country;
      this.getMedicines.manufacture = details.data.manufacture;
      this.getMedicines.serial_code = details.data.serial_code;
      this.getMedicines.vat = details.data.vat;
      this.getMedicines.total_quantity = details.data.total_quantity;
      this.getMedicines.left_quantity = details.data.left_quantity;



      const answer = await this.GET_MEDICINE_INFO({id: this.id});
      // console.log(answer.data);
      this.rowsNumber = answer.data.count;
      for(let i = 0; i < answer.data.results.length; i++ ){
        this.$set(this.data, this.data.length, answer.data.results[i]);
      }
      
      const answer2 = await this.GET_BRANCHES_IN_MED_INFO_PAGE({id: this.id});
      // console.log(answer2.data);
      for(let i = 0; i < answer2.data.length; i++ ){
        this.$set(this.data2, this.data2.length, answer2.data[i]);
      }


      await this.GET_BRANCHES();
      this.distribution_options = await this.getBranchNames;

      // this.$watch(
      //   () => {
      //       return this.$refs.box
      //   },
      //   (val) => {
      //     console.log(val);
      //   }
      // )
      
    },
    computed:{
      ...mapGetters([
        'getBranches', 'getUser', 'getMedicinesInfo', 'getBranchesInMedInfoPage'
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
          'GET_MEDICINE_DETAIL', 'GET_MEDICINE_INFO', 'GET_BRANCHES', 'GET_BRANCHES_IN_MED_INFO_PAGE', 'ADD_TO_CART'
      ]),
      async addToCart(){
        console.log(this.$refs.box);
        // this.$refs.box.next()
        // .then(success => {console.log(success)})
        // .catch(err => console.log(err))
        this.$refs.box.validate()
        this.$refs.piece.validate()
        // .then(success => {console.log(success)})
        // .catch(err => console.log(err))
        

        if (this.$refs.box.hasError || this.$refs.piece.hasError) {
          this.formHasError = true;
          this.$q.notify({
            color: 'negative',
            message: 'Error!'
          })
          console.log('ERROR!');
        }
        else {
          
          await this.$emit('medicines', true);
      
          const branch_id = this.getBranches.filter(el => el.name == this.distribution_branch);
          console.log(branch_id);

          await this.ADD_TO_CART({
            business_medicine_info_id: this.temp.business_medicine_info_id,
            quantity_box: this.distribution_amount.box,
            quantity_piece: this.distribution_amount.piece,
            branch_id: branch_id[0].id,
          });
          this.$q.notify({
            icon: 'done',
            color: 'positive',
            message: 'Submitted'
          })
          
          this.onReset();
          this.addRow = false;
        }
      },
      onReset () {
        this.distribution_branch = '';
        this.distribution_amount = {box: '', piece: ''};

        this.$refs.box.resetValidation()
        this.$refs.piece.resetValidation()
      }
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
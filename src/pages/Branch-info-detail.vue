<template>
    <q-page class="bg-grey-3">
        <div class="q-pa-md">
            <q-expansion-item expand-separator icon="info" default-opened   header-class="bg-blue text-h6" dark :label="'Информация о продукте ' + getMedicines.title">

             <q-list bordered separator dense class="bg-white shadow-1">
               <q-item v-ripple>
                 <q-item-section>
                     <q-item-label class="text-h6 text-blue-9">Название продукта : <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.title}}</span></q-item-label>
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
                   <q-item-label class="text-h6 text-blue-9">НДС: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.vat}}%</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Общее количество в филиале: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.total_quantity}}</span></q-item-label>
                 </q-item-section>
               </q-item>
             </q-list>
      </q-expansion-item>

                   <!-- {{getBranchMedicineDetail}} -->

            <q-btn push color="white" text-color="blue" icon="fas fa-arrow-left" 
              class="q-mt-md q-mr-xs" :to="{ name: 'branch-info', params: {id: branch_id}}"/>

            <div class="q-mt-xs">
                <q-table
                dense
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
                        <q-btn dense round flat color="grey" @click="(addRow = !addRow) && (temp = props.row)" icon="remove_circle"></q-btn>
                        <q-btn dense round flat color="grey" icon="edit"></q-btn>
                        <q-btn dense round flat color="grey" icon="fas fa-info-circle"></q-btn>
                    </q-td>
                </template>
                <template v-slot:top="props">
                    <span class="text-h6">Товары с разной наценкой</span>
                    <q-space />
                    <!-- <q-input borderless dense debounce="300" color="primary" v-model="filter"
                    placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; border-radius: 5px;">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                    </q-input> -->
                    <q-btn flat round dense icon="fas fa-sync-alt" class="q-ml-md" :color="rColor" size="sm" @click="refresh"></q-btn>
                    <q-btn
                    flat round dense
                    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="props.toggleFullscreen"
                    class="q-ml-sm"
                    />
                </template>
                </q-table>
            </div>
        </div>


        <q-dialog v-model="addRow" persistent >
             <q-card>
               <q-card-section class="bg-info">
                 <div class="text-h6 text-white">Возврат</div>
               </q-card-section>
               <q-separator />
               <q-card-section class="q-pt-none q-pa-lg">
                <div class="row">
                  <q-input outlined v-model="distribution_amount.box" label="Кол-во упаковок" class="q-mr-xs col" :suffix="String(temp_total_quantity)" 
                  :rules="[
                    val => val >= 0 && val <= temp_total_quantity || 'В складе имеется ' + temp_total_quantity + ' упаковок'
                  ]"/>
                  <q-input outlined v-model="distribution_amount.piece" label="Кол-во штук" class="col" :suffix="String(temp_total_piece)" 
                  :rules="[
                    val => val >= 0 && val <= temp_total_piece || 'В складе имеется ' + temp_total_piece + ' штук'
                  ]"/>
                </div>
                
                <div class="q-mt-md"><span class="text-green text-weight-bold">Уже добавлено:</span> {{temp_already_added}}</div>
               </q-card-section>
               <q-separator />
               <q-card-actions align="right" class="bg-white text-teal">
                 <q-btn flat label="Отменить" v-close-popup />
                 <q-btn flat label="Добавить" @click="addRefunds"/>
                 <!-- {{temp}} -->
               </q-card-actions>
             </q-card>
           </q-dialog>
        <!-- {{getBranchMedicineInfo}} -->
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    props:{
      business_medicine_id: {
        required: true
      },
      branch_id: {
        required: true
      }
    },
    data(){
        return{
            rColor: 'grey',
            id: '',
            rowsNumber: null,
            temp: {},
            temp_total_quantity: '',
            temp_total_piece: '',
            temp_already_added: '',
            addRow: false,
            distribution_amount: {box: '', piece: ''},

            getMedicines: {title: '', barcode: '', country: '', manufacture: '', serial_code: '', vat: '', total_quantity: '', left_quantity: ''},
            pagination: {
              rowsPerPage: 8,
              page: 1,
              // sortBy: 'expire_date',
              // descending: true,
            },
            loading: false,
            filter: '',
            columns: [
                { name: 'index', align: 'center', label: '№', field: 'index', sortable: true},
                { name: 'expire_date', align: 'center', label: 'Годен до', field: 'expire_date', sortable: true },
                { name: 'quantity', align: 'center', label: 'Кол-во', field: 'quantity', sortable: true },
                { name: 'purchase_price', align: 'center', label: 'Цена покупки', field: 'purchase_price', sortable: true },
                { name: 'selling_price', align: 'center', label: 'Цена продажи', field: 'selling_price', sortable: true },
                { name: 'actions', label: 'Действия', field: '', align:'center' },
            ],
            data: [],  
        }
    },
    watch:{ 
      'pagination.page': async function (newVal, oldVal) {
        if (newVal == this.pagesNumber) {
          await this.GET_NEXT_PAGE_FOR_BRANCH_INFO_DETAIL();
        }
      },
      'temp.total_qauntity': function (newVal, oldVal){
        this.temp_total_quantity = Number(this.temp.total_qauntity);
      },
      addRow: async function(newVal, oldVal){
        if(newVal == true){
          let a = await this.GET_CHECK_FOR_REFUND({ branch_id: this.branch_id, med_info_id: this.temp.business_medicine_info_id});
          // a.limit_quantity = 56;
          // a.capacity = 5;
          // a.already_added = 10;
          // console.log(a);

          this.temp_total_quantity = Math.floor(a.limit_quantity / a.capacity);
          this.temp_total_piece = a.limit_quantity % a.capacity;
          if(a.already_added != 0){
            this.temp_already_added = Math.floor(a.already_added / a.capacity) + ' упаковок ' + '(по ' + a.capacity + ' )'
             + ' и ' + (a.already_added % a.capacity) + ' штук';
          }else{
            this.temp_already_added = 0;
          }

        }
      }
      
    
        
    },
    async mounted(){
      const details = await this.GET_BRANCH_MEDICINE_DETAIL({branch_id: this.branch_id,  business_medicine_id: this.business_medicine_id});
      // console.log(details);
      Object.assign(this.getMedicines, {title: details.title, description: details.description, barcode: details.barcode,
       country: details.country, manufacture: details.manufacture, serial_code: details.serial_code,vat: details.vat,
        total_quantity: details.total_quantity});
     

      await this.refresh();
      
    },
    computed:{
      ...mapGetters([
        'getBranchMedicineInfo', 'getBranchMedicineDetail'
      ]),
      pagesNumber () {
        return Math.ceil(this.data.length / this.pagination.rowsPerPage)
      },
    },
    methods: {
      ...mapActions([
          'GET_BRANCH_MEDICINE_DETAIL', 'GET_BRANCH_MEDICINE_INFO', 'GET_CHECK_FOR_REFUND', 'ADD_REFUND',
          'GET_NEXT_PAGE_FOR_BRANCH_INFO_DETAIL'
      ]),
      async refresh(){
        this.rColor = 'blue';
        this.loading = true;
        await this.GET_BRANCH_MEDICINE_INFO({branch_id: this.branch_id,  business_medicine_id: this.business_medicine_id});
        this.rowsNumber = await this.getBranchMedicineInfo.count;
        this.data = await this.getBranchMedicineInfo.results;
        this.pagination.page = 1;
        this.loading = false;
        this.rColor = 'grey';
      },
      async addRefunds(){
        if(this.distribution_amount.box == ''){
          this.distribution_amount.box = 0;
        }
        if(this.distribution_amount.piece == ''){
          this.distribution_amount.piece = 0;
        }
        
        let response = await this.ADD_REFUND({branch_id: this.branch_id, business_medicine_info_id: this.temp.business_medicine_info_id, 
        quantity_box: this.distribution_amount.box, quantity_piece: this.distribution_amount.piece})

        Object.assign(this.distribution_amount, {box: '', piece: ''});
        // console.log(response);
        if(response.status == 'SUCCESS'){
          this.$q.notify({
            message: 'Успешно добавлено!',
            color: 'green'
          })
        }else{
          this.$q.notify({
            message: 'Ошибка!',
            color: 'negative'
          })
        }
        this.addRow = false;

      },
      
    }
}
</script>

<style scoped>

</style>
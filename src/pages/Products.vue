<template>
    <q-page class="bg-grey-3">
        <div class="q-pa-md">
            <q-btn push color="white" text-color="primary" label="Добавить" 
            class="q-mb-xs" :disable="loading" to="/add-product"/>
            <q-table
            dense
            title=""
            :data="data"
            :columns="columns"
            row-key="index"  
            :filter="filter"
            :loading="loading"
            separator="cell"
            :pagination.sync="pagination"
            >

            <!-- :rows-per-page-options="[0]"
            virtual-scroll
            table-style="height: 350px"
            class="my-sticky-virtscroll-table"
            :virtual-scroll-sticky-size-start="48" -->
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn dense round flat color="grey" @click="addRow = !addRow" icon="add_circle"></q-btn>
                    <q-btn dense round flat color="grey" :to="{ name: 'edit-product', params: {id: props.row.id, row: props.row}}" icon="edit"></q-btn>
                    <q-btn dense round flat color="grey" to="/med-info" icon="fas fa-info-circle"></q-btn>
                    <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
                </q-td>
            </template>
            <template v-slot:top="props">
                <span class="text-subtitle1">Все лекарства</span>
                <!-- <q-btn color="green" :disable="loading" label="Добавить" @click="addRow = !addRow" /> -->
                <!-- <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" /> -->
                <q-space />
                <q-input borderless dense debounce="100" color="primary" v-model="filter" @keydown="filterFunc"
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


           <q-dialog v-model="deleteRowVar">
             <q-card style="width: 300px">
               <q-card-section class="bg-warning">
                 <div class="text-h6 text-white">Удаление</div>
               </q-card-section>
               <q-separator />
               <q-card-section class="q-pt-none q-pa-lg">
                 Вы всерьёз хотите удалить строку?
               </q-card-section>
               <q-separator />
               <q-card-actions align="right" class="bg-white text-teal">
                 <q-btn flat label="Нет" v-close-popup />
                 <q-btn flat label="Да" v-close-popup  />
               </q-card-actions>
             </q-card>
           </q-dialog>


           <q-dialog v-model="addRow">
             <q-card style="width: 300px">
               <q-card-section class="bg-info">
                 <div class="text-h6 text-white">Распределение</div>
               </q-card-section>
               <q-separator />
               <q-card-section class="q-pt-none q-pa-lg">
                <q-select outlined v-model="distribution_branch" :options="distribution_options" label="Филиал" class="q-mb-sm"/>
                <q-input outlined v-model="distribution_amount" label="Кол-во"  class="q-mb-sm"/>
                
               </q-card-section>
               <q-separator />
               <q-card-actions align="right" class="bg-white text-teal">
                 <q-btn flat label="Отменить" v-close-popup />
                 <q-btn flat label="Распределить" v-close-popup  />
               </q-card-actions>
             </q-card>
           </q-dialog>
           {{distribution_options}}
           {{answer.data.data[0]}}
           {{getMedicines}}
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data(){
      return {
        answer: {data: {data: []}},
      distribution_amount: '',
      distribution_branch: '',
      distribution_options: [],
      pagination: {
        rowsPerPage: 1,
        page: 1,
      },
      row: {
        index: '',
        products: '',
        barcode: '',
        total_quantity: '',
        left_quantity: '',
        vat: '',
      },
      editRowVar: false,
      addRow: false,
      deleteRowVar: false,
      rowDelete: {},
      loading: false,
      filter: '',
      columns: [
        { name: 'index', align: 'center', label: 'No#', field: 'index', sortable: true},
        { name: 'products', align: 'center', label: 'Лекарство', field: 'title', sortable: true },
        { name: 'barcode', align: 'center', label: 'Штрих-код', field: 'barcode', sortable: true },
        // {
        //   name: 'name',
        //   required: true,
        //   label: 'Покупатель',
        //   align: 'left',
        //   field: row => row.name,
        //   format: val => ${val},
        //   sortable: true
        // },
        { name: 'total_quantity', align: 'center', label: 'Кол-во', field: 'total_quantity', sortable: true },
        { name: 'left_quantity', align: 'center', label: 'Остаток', field: 'left_quantity', sortable: true },
        { name: 'vat', align: 'center', label: 'НДС', field: 'vat', sortable: true },
       
        { name: 'actions', label: 'Действия', field: '', align:'center' },
      ],
      data: [
          // {index: 1, products: 'Тримол', barcode: '2313141', total_quantity: '100', left_quantity: '50', vat: '10%'},
          // {index: 2, products: 'Ношпа', barcode: '2313141', total_quantity: '56', left_quantity: '40', vat: '12%'},
          // {index: 3, products: 'Ибуклин', barcode: '2313141', total_quantity: '80', left_quantity: '10', vat: '5%'},
          // {index: 4, products: 'Арбидол', barcode: '2313141', total_quantity: '14', left_quantity: '0', vat: '7%'},
      ],
      }
    },
    watch: {
       'pagination.page': function (newVal, oldVal){
          console.log(newVal);
        },
        // filter: async function(newVal, oldVal) {
        //   if(newVal.length >= 3){
        //     this.answer = await this.getSearchResultByFilter();
        //     this.data = []
        //     this.data.push(await this.answer.data.data[0])
        //   }
        //   else{
        //     this.data = []
        //     this.data = await this.getMedicines.results
        //   }
        // },
    },
    async mounted(){
      await this.GET_MEDICINES();
      this.data = await this.getMedicines.results;
      // await this.GET_COMMENTS();
      // this.data = await this.getComments
      this.distribution_options = await this.getBranchNames;
    },
    computed:{
      ...mapGetters([
        'getMedicines', 'getComments', 'getBranches'
      ]),
      pagesNumber () {
        return Math.ceil(this.data.length / this.pagination.rowsPerPage)
      },
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
        'GET_MEDICINES', 'GET_COMMENTS', 'GET_SEARCH_RESULT'
      ]),
      async getSearchResultByFilter(){
        return await this.GET_SEARCH_RESULT(
          {
            title: this.filter
          }
        )
      },
      async filterFunc(){
         if(this.filter.length >= 1){
            this.data = []
            this.answer = await this.getSearchResultByFilter();
            this.data.push(await this.answer.data.data[0])
          }
         if(this.filter == ''){
            this.data = []
            this.data = await this.getMedicines.results
          }
      },


       deleteRow(props){
        this.rowDelete = props.row
        this.deleteRowVar = !this.deleteRowVar
      },
      editRow(props) {
        this.row = props.row
        this.editRowVar = !this.editRowVar
      },

    }
}
</script>

<style scoped>

</style>
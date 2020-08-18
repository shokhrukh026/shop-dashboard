<template>
    <q-page class="bg-grey-3">
        <div class="q-pa-md">
            <div class="row q-mb-xs">
              <q-btn push color="white" text-color="primary" label="Добавить" 
              class="q-mb-xs" :disable="loading" to="/add-medicine"/>
              <q-space/>
              <!-- <q-input   borderless dense debounce="1000" color="primary" v-model="filter" @keyup="filterFunc" class="bg-white"
              placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; border-radius: 5px;"> -->
                <!-- <template v-slot:append>
                    <q-icon name="search" />
                </template> -->
                <!-- <template v-slot:after>
                  <q-btn round dense flat icon="send" />
                </template>
              </q-input> -->
              <!-- <q-btn color="blue" size="sm"    label="Поиск" icon-right="search" >
              </q-btn> -->
            </div>
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
            :rows-per-page-options="[3]"
            :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => firstRowIndex + '-' + endRowIndex + ' из ' + rowsNumber"


            >
            <!-- <template v-slot:pagination="scope">

              <span>{{(pagination.page == 1) ? 1 : (1 + pagination.rowsPerPage * (pagination.page - 1))}}-{{((pagination.page * (rowsNumber/4)))}} из {{rowsNumber}}</span>

              <q-btn
                v-if="scope.pagesNumber > 2"
                icon="first_page"
                color="grey-8"
                round
                dense
                flat
                :disable="scope.isFirstPage"
                @click="scope.firstPage"
              />

              <q-btn
                icon="chevron_left"
                color="grey-8"
                round
                dense
                flat
                :disable="scope.isFirstPage"
                @click="scope.prevPage"
              />

              <q-btn
                icon="chevron_right"
                color="grey-8"
                round
                dense
                flat
                :disable="scope.isLastPage"
                @click="scope.nextPage"
              />

              <q-btn
                v-if="pagesNumber > 2"
                icon="last_page"
                color="grey-8"
                round
                dense
                flat
                :disable="scope.isLastPage"
                @click="scope.lastPage"
              />
            </template> -->



            <!-- :rows-per-page-options="[0]"
            virtual-scroll
            table-style="height: 350px"
            class="my-sticky-virtscroll-table"
            :virtual-scroll-sticky-size-start="48" -->
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn dense round flat color="grey" :to="{ name: 'edit-product', params: {id: props.row.id, row: props.row}}" icon="edit"></q-btn>
                    <q-btn dense round flat color="grey" :to="{ name: 'med-info', params: {id: props.row.id}}" icon="fas fa-info-circle"></q-btn>
                    <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
                </q-td>
            </template>
            <template v-slot:top="props">
                <span class="text-subtitle1">Все лекарства</span>
                <!-- <q-btn color="green" :disable="loading" label="Добавить" @click="addRow = !addRow" /> -->
                <!-- <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" /> -->
                <q-space />
                <form @submit.prevent.stop="getSearchResultByFilter"  class="row">
                  <q-input square borderless dense debounce="500" color="primary" v-model="filter"  
                  placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; min-width: 20vw;">
                    <!-- <template v-slot:append>
                        <q-icon name="search" />
                    </template> -->
                  </q-input>
                  <q-btn flat square color="white" :class="scan ? 'bg-green' : 'bg-blue'" style="border-radius: 0px;" type="submit">
                    <q-icon name="search" />  
                  </q-btn>
                </form>
                <q-toggle
                  v-model="scan"
                  icon="fas fa-barcode"
                  color="green"
                />
                <q-btn
                flat round dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                class="q-ml-md"
                />
            </template>
            </q-table>
            {{filter}}
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


        
           {{getMedicines}}
         
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    data(){
      return {
      answer: {data: {data: []}},
      scan: false,
      pagination: {
        rowsPerPage: 8,
        page: 1,
      },
      rowsNumber: null,
      row: {
        index: '',
        products: '',
        barcode: '',
        total_quantity: '',
        left_quantity: '',
        vat: '',
      },
      editRowVar: false,
      deleteRowVar: false,
      rowDelete: {},
      loading: false,
      filter: '',
      columns: [
        { name: 'index', align: 'center', label: 'No#', field: 'index', sortable: true},
        { name: 'products', align: 'center', label: 'Лекарство', field: 'title', sortable: true },
        { name: 'barcode', align: 'center', label: 'Штрих-код', field: 'barcode', sortable: true },
        { name: 'country', align: 'center', label: 'Страна', field: 'country', sortable: true },
        { name: 'manufacture', align: 'center', label: 'Производитель', field: 'manufacture', sortable: true },
        { name: 'serial_code', align: 'center', label: 'Серийный номер', field: 'serial_code', sortable: true },
        // { name: 'capacity', align: 'center', label: 'Вместимость', field: 'capacity', sortable: true },
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
        { name: 'sold_quantity', align: 'center', label: 'Продажи за 30 дней', field: 'sold_quantity', sortable: true },
       
        { name: 'actions', label: 'Действия', field: '', align:'center' },
      ],
      data: [
          // {index: 1, products: 'Тримол', barcode: '2313141', total_quantity: '100', left_quantity: '50', vat: '10%'},
          // {index: 2, products: 'Ношпа', barcode: '2313141', total_quantity: '56', left_quantity: '40', vat: '12%'},
          // {index: 3, products: 'Ибуклин', barcode: '2313141', total_quantity: '80', left_quantity: '10', vat: '5%'},
          // {index: 4, products: 'Арбидол', barcode: '2313141', total_quantity: '14', left_quantity: '0', vat: '7%'},
      ],
      data2: [],
      }
    },
    watch: {
       'pagination.page': async function (newVal, oldVal){
         if(newVal == this.pagesNumber){
           await this.GET_NEXT_PAGE();
           
         }
        },
        // filter: {
        //   handler(search) {
        //     this.setIconsDebounced(search);
        //   },
        //   immediate: true
        // },
        
        data: {
          handler: async function (val, oldVal) {
            // this.data.forEach((row, index) => {
            //   row.index = index + 1
            // })
            
            // let amount = [], left = [];
            // for(let k = 0; k < this.getMedicines.results.length; k++){
            //   let capacity = await this.getMedicines.results[k].capacity;
            //   let total_quantity_box = await this.getMedicines.results[k].total_quantity_box;
            //   let total_quantity_piece = await this.getMedicines.results[k].total_quantity_piece;
            //   let left_quantity_box = await this.getMedicines.results[k].left_quantity_box;
            //   let left_quantity_piece = await this.getMedicines.results[k].left_quantity_piece;
            //   left.push(left_quantity_box + ' упаковок ' +  '( по ' + capacity + ' )' + ' + ' + left_quantity_piece + ' шт');
            //   amount.push(total_quantity_box + ' упаковок ' +  '( по ' + capacity + ' )' + ' + ' + total_quantity_piece + ' шт');
            // }
           
            // this.data.forEach((row, index) => {
            //   this.$set(this.data[index], 'total_quantity_med', amount[index]);
            //   // row.total_quantity_med = amount[index]
            // })
            // this.data.forEach((row, index) => {
            //   this.$set(this.data[index], 'left_quantity_med', left[index]);
            //   // row.left_quantity_med = left[index]
            // })
            

          },
          deep: true
        },
        filter: async function(newVal, oldVal) {
          if(this.scan == false){
            if(newVal.length >= 2){          
              await this.getSearchResultByFilter();
            }
            else{
              console.log('Search input has less than 2 characters')
            }
          }
        },
    },
    async mounted(){
      await this.GET_MEDICINES();
      this.rowsNumber = await this.getMedicines.count;
      this.data = await this.getMedicines.results;


      // await this.$store.commit('MEDICINE_COMMIT', {name: 'total_quantity_med', amount: this.amount});
      // await this.$store.commit('MEDICINE_COMMIT', {name: 'left_quantity_med', amount: this.left});

     
      
      
      // this.data.forEach((row, index) => {
      //   row.index = index
      // })
    },
    computed:{
      ...mapGetters([
        'getMedicines', 'getBranches', 'getSearchResult'
      ]),
      pagesNumber () {
        return Math.ceil(this.data.length / this.pagination.rowsPerPage)
      },
      
    },
    methods: {
      ...mapActions([
        'GET_MEDICINES', 'GET_NEXT_PAGE', 'GET_SEARCH_RESULT_ALL_MEDICINES'
      ]),
      // async getTotalAndLeftQuantities(){
      //   for(let k = 0; k < this.getMedicines.results.length; k++){
      //     let capacity = await this.getMedicines.results[k].capacity;
      //     let total_quantity_box = await this.getMedicines.results[k].total_quantity_box;
      //     let total_quantity_piece = await this.getMedicines.results[k].total_quantity_piece;
      //     let left_quantity_box = await this.getMedicines.results[k].left_quantity_box;
      //     let left_quantity_piece = await this.getMedicines.results[k].left_quantity_piece;
      //     this.left.push(left_quantity_box + ' упаковок ' +  '( по ' + capacity + ' )' + ' + ' + left_quantity_piece + ' шт');
      //     this.amount.push(total_quantity_box + ' упаковок ' +  '( по ' + capacity + ' )' + ' + ' + total_quantity_piece + ' шт');
      //   }
      // },
      // setIconsDebounced: debounce(function(search) {
      //   this.filteredIcons = this.icons.filter(icon =>
      //     icon.name.toLowerCase().includes(search.toLowerCase())
      //   );
      // }, 5000),
      async getSearchResultByFilter(){
         let a = await this.GET_SEARCH_RESULT_ALL_MEDICINES(
          {
            value: this.filter,
          }
        )
        console.log(a);
      },
      // async filterFunc(){
      //    if(this.filter.length >= 1){     
      //       this.data = await []
      //       this.answer = await this.getSearchResultByFilter();
      //       this.data.push(await this.answer.data.data[0])
      //     } 
      //    if(this.filter == ''){
      //       this.data = await []
      //       this.data = await []
      //       this.data = await this.getMedicines.results
      //     }
      // },


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
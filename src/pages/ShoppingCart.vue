<template>
    <q-page class="bg-grey-3">
        <div class="q-pa-md">
         <div class="row q-mb-xs">
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
            :rows-per-page-options="[0]"
            style="min-width: 700px"
            >

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
                <!-- <q-input borderless dense debounce="100" color="primary" v-model="filter" @keydown="filterFunc"
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
        </div>
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    props:{
      // medicine:{
      //   type: Array,
      //   required: true,
      // }
    },
    data(){
      return {
        answer: {data: {data: []}},
      
        pagination: {
          rowsPerPage: 4,
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
        deleteRowVar: false,
        rowDelete: {},
        loading: false,
        filter: '',
        columns: [
          { name: 'index', align: 'center', label: 'No#', field: 'index', sortable: true},
          { name: 'branch', align: 'center', label: 'Филиал', field: 'branch', sortable: true },
          { name: 'name', align: 'center', label: 'Филиал', field: 'branch', sortable: true },
          { name: 'amount', align: 'center', label: 'Кол-во', field: 'amount', sortable: true },
          // { name: 'products', align: 'center', label: 'Лекарство', field: 'title', sortable: true },
          // { name: 'barcode', align: 'center', label: 'Штрих-код', field: 'barcode', sortable: true },
          // { name: 'country', align: 'center', label: 'Страна', field: 'country', sortable: true },
          // { name: 'manufacture', align: 'center', label: 'Производитель', field: 'manufacture', sortable: true },
          // { name: 'serial_code', align: 'center', label: 'Серийный номер', field: 'serial_code', sortable: true },
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
          // { name: 'total_quantity', align: 'center', label: 'Кол-во', field: 'total_quantity', sortable: true },
          // { name: 'left_quantity', align: 'center', label: 'Остаток', field: 'left_quantity', sortable: true },
          // { name: 'vat', align: 'center', label: 'НДС', field: 'vat', sortable: true },
        
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

    async mounted(){
      this.data = await this.GET_SHOPPING_CART_MEDICINES();
      console.log(this.data);
      // for(let i = 0; i < this.medicine.length; i++){
      //   this.$set(this.data, this.data.length, await this.medicine[i]);
      // }
    },
    computed:{
      ...mapGetters([
        'getBranches', 'getShoppingCartMedicines', 
      ])
    },
    methods: {
      ...mapActions([
        'GET_BRANCHES', 'GET_SHOPPING_CART_MEDICINES'
      ]),

    }
}
</script>

<style scoped>

</style>
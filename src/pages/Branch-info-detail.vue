<template>
    <q-page class="bg-grey-3">
        <div class="q-pa-md">
            <q-expansion-item expand-separator icon="info" default-opened   header-class="bg-blue text-h6" dark :label="'Информация о продукте ' + getProducts.title">

             <q-list bordered separator dense class="bg-white shadow-1">
               <q-item v-ripple>
                 <q-item-section>
                     <q-item-label class="text-h6 text-blue-9">Название продукта : <span class="text-subtitle1 text-black">&nbsp;{{getProducts.title}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple>
                 <q-item-section>
                     <q-item-label class="text-h6 text-blue-9">Категория: <span class="text-subtitle1 text-black">&nbsp;{{getProducts.category}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Описание: <span class="text-subtitle1 text-black">&nbsp;{{getProducts.description}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Ед. измерения: <span class="text-subtitle1 text-black">&nbsp;{{getProducts.type_name}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Штрих-код: <span class="text-subtitle1 text-black">&nbsp;{{getProducts.barcode}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Страна: <span class="text-subtitle1 text-black">&nbsp;{{getProducts.country}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Производитель: <span class="text-subtitle1 text-black">&nbsp;{{getProducts.manufacture}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">НДС: <span class="text-subtitle1 text-black">&nbsp;{{getProducts.vat}}%</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-blue-9">Общее количество в филиале: <span class="text-subtitle1 text-black">&nbsp;{{getProducts.quantity}}  {{getProducts.type_name}}</span></q-item-label>
                 </q-item-section>
               </q-item>
             </q-list>
      </q-expansion-item>

                   {{getProductDetailInBranch}}

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


        <q-dialog v-model="addRow" persistent>
             <q-card style="min-width: 30vw;">
               <q-card-section class="bg-info">
                 <div class="text-h6 text-white">Возврат</div>
               </q-card-section>
               <q-separator />
               <q-card-section class="q-pt-none q-pa-lg">
                <div class="row">
                  <q-input outlined v-model="distribution_amount" label="Кол-во для возврата" class="q-mr-xs col" :suffix="String(getCheckRefunds.limit_quantity)" 
                  :rules="[
                    val => val >= 0 && val <= getCheckRefunds.limit_quantity || 'В складе имеется ' + getCheckRefunds.limit_quantity + ' ' + getProducts.type_name
                  ]"/>
                </div>
                
                <div class="q-mt-md"><span class="text-green text-weight-bold">Уже добавлено:</span> {{getCheckRefunds.already_added}} {{getProducts.type_name}}</div>
               </q-card-section>
               <q-separator />
               <q-card-actions align="right" class="bg-white text-teal">
                 <q-btn flat label="Отменить" v-close-popup />
                 <q-btn flat label="Добавить" @click="addRefunds"/>
               </q-card-actions>
             </q-card>
           </q-dialog>
        {{getProductInfoInBranch}}
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    props:{
      business_product_id: {
        required: true
      },
      branch_id: {
        required: true
      }
    },
    data(){
        return{
            rColor: 'grey',
            rowsNumber: null,
            temp: {},
            addRow: false,
            distribution_amount: '',
            getProducts: {},
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
          await this.FETCH_NEXT_PAGE_PRODUCTS_INFO_IN_BRANCHES();
        }
      },
      addRow: async function(newVal, oldVal){
        if(newVal == true){
          await this.FETCH_CHECK_FOR_REFUND({ branch_id: this.branch_id, business_product_info_id: this.temp.business_product_info_id});
        }
      }

    },
    async mounted(){
      await this.FETCH_PRODUCT_DETAIL_IN_BRANCH({branch_id: this.branch_id,  business_product_id: this.business_product_id});
      this.getProducts = this.getProductDetailInBranch;

      await this.refresh();
    },
    computed:{
      ...mapGetters([
        'getProductInfoInBranch', 'getProductDetailInBranch', 'getCheckRefunds'
      ]),
      pagesNumber () {
        return Math.ceil(this.data.length / this.pagination.rowsPerPage)
      },
    },
    methods: {
      ...mapActions([
          'FETCH_PRODUCT_DETAIL_IN_BRANCH', 'FETCH_PRODUCT_INFO_IN_BRANCH', 'FETCH_CHECK_FOR_REFUND', 'ADD_REFUND',
          'FETCH_NEXT_PAGE_PRODUCTS_INFO_IN_BRANCHES'
      ]),
      async refresh(){
        this.rColor = 'blue';
        this.loading = true;
        await this.FETCH_PRODUCT_INFO_IN_BRANCH({branch_id: this.branch_id,  business_product_id: this.business_product_id});
        this.rowsNumber = await this.getProductInfoInBranch.count;
        this.data = await this.getProductInfoInBranch.results;
        this.pagination.page = 1;
        this.loading = false;
        this.rColor = 'grey';
      },
      async addRefunds(){
        let response = await this.ADD_REFUND
        ({
          branch_id: this.branch_id,
          business_product_info_id: this.temp.business_product_info_id, 
          quantity: this.distribution_amount
        });

        this.distribution_amount = '';
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
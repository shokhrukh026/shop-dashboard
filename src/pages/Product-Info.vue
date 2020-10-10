<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">
      <q-expansion-item expand-separator icon="info" default-opened   header-class="bg-blue text-h6" dark :label="'Информация о Продукте ' + getProduct.title">
        <q-list bordered separator dense class="bg-white shadow-1">
          <q-item v-ripple >
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9">Добавлено в : <span class="text-subtitle1 text-black">{{getProduct.added_at}}</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9">Название Продукта : <span class="text-subtitle1 text-black">&nbsp;{{getProduct.title}}</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple >
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9">Категория: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.category}}</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple >
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9">Описание: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.description}}</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple >
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9">Штрих-код: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.barcode}}</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple >
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9">Ед. измерения: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.type_product_name}}</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple >
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9">Страна: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.country}}</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple >
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9">Производитель: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.manufacture}}</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple >
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9">НДС: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.vat}}%</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple >
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9">Общее количество в бизнесе: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.total_quantity}} {{getProduct.type_product_name}}</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple >
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9">Оставшееся количество в бизнесе: <span class="text-subtitle1 text-black">{{getProduct.left_quantity}} {{getProduct.type_product_name}}</span></q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

      <!-- {{getProduct}} -->
      <div class="q-mt-md">
        <q-btn push color="white" text-color="blue" icon="fas fa-arrow-left"
               class="q-mb-xs q-mr-xs" to="/products"/>
        <q-btn push color="white" text-color="primary" label="Добавить" class="q-mb-xs" :disable="loading"
               :to="{ name: 'add-info-product', params: {id: $props.id}}"/>
      </div>
      <!-- {{getBranches}} -->
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
              <q-btn dense round flat color="grey" icon="edit"></q-btn>
              <q-btn dense round flat color="grey" icon="fas fa-info-circle"></q-btn>
            </q-td>
          </template>
          <template v-slot:top="props">
            <span class="text-h6">Товары с разной наценкой</span>
            <q-space />
            <q-btn flat round dense icon="fas fa-sync-alt" :color="rColor" size="sm" @click="refresh"></q-btn>
            <q-btn
              flat round dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              class="q-ml-md"
            />
          </template>
        </q-table>
      </div>
      <!-- {{data}} -->

      <!-- {{getProductInfo}} -->
      <div class="q-mt-md">
        <q-table
          dense
          title="Покупатели"
          :data="data2"
          :columns="columns2"
          row-key="index"
          :filter="filter"
          :loading="loading2"
          separator="cell"
          :pagination.sync="pagination"
          :rows-per-page-options="[0]"
          :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => firstRowIndex + '-' + endRowIndex + ' из ' + totalRowsNumber"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense round flat color="grey" icon="edit"></q-btn>
              <q-btn dense round flat color="grey" icon="fas fa-info-circle"></q-btn>
            </q-td>
          </template>
          <template v-slot:top="props">
            <span class="text-h6">Продукт в филиалах</span>
            <q-space />
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
            <q-card style="min-width: 50vw;">
              <q-card-section class="bg-info">
                 <div class="text-h6 text-white">Добавить в корзину</div>
               </q-card-section>
               <q-separator />
                <q-form
                  @submit="addToCart"
                  @reset="onReset"
                  class="q-pt-sm"
                >
               <q-card-section class="q-py-none">
                 <div class="row">
                    <q-select outlined v-model="distribution_branch" :options="distribution_options" label="Филиал"
                     class="q-my-sm col-12"
                    />
                 </div>
                 <div class="row content-stretch">
                    <q-input outlined v-model="distribution_amount" label="Кол-во штук" class="col" :suffix="String(temp.left_quantity)" 
                    :rules="[
                      val => val >= 0 && val <= temp.left_quantity || 'В складе имеется ' + temp.left_quantity + ' штук'
                    ]"/>
                 </div>
              </q-card-section>
              <q-card-actions align="right" class="bg-white text-white q-pt-none">
                  <q-btn class="bg-info" label="Отменить" type="reset" v-close-popup />
                  <q-btn class="bg-info" label="Добавить" type="submit" :disable="distribution_branch == ''"/>
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
        required: true
      },
    },
    data(){
      return{
        rColor: 'grey',
        rColor2: 'grey',
        rowsNumber: null,
        temp: {},
        addRow: false,
        distribution_amount: '',
        distribution_branch: '',
        distribution_options: [],

        getProduct: {title: '', barcode: '', type: '', country: '', manufacture: '', category: '',
          total_quantity: '', left_quantity: '', vat: '', description: "", added_at: ""},
        pagination: {
          rowsPerPage: 9,
          page: 1,
        },
        loading: false,
        loading2: false,
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
          { name: 'street', align: 'center', label: 'Улица', field: 'street', sortable: true },
          { name: 'contact_person', align: 'center', label: 'Контактное лицо', field: 'contact_person', sortable: true },
          { name: 'contact_phone', align: 'center', label: 'Контактный телефон', field: 'contact_phone', sortable: true },
          { name: 'status', align: 'center', label: 'Статус', field: 'status', sortable: true },
          { name: 'total_quantity', align: 'center', label: 'Кол-во', field: 'total_quantity', sortable: true },
          { name: 'actions', label: 'Действия', field: '', align:'center' },
        ],
        data: [],
        data2: [],
      }
    },
    watch:{
      'pagination.page': async function (newVal, oldVal) {
        if (newVal == this.pagesNumber) {
          await this.FETCH_NEXT_PAGE_PRODUCTS_INFO();
        }
      },
    },
    async mounted(){
      const details = await this.FETCH_BUSSINESS_PRODUCT(this.id);
      this.getProduct = await this.getProductDetail;

      await this.refresh();
      await this.refresh2();

      await this.FETCH_ALL_BRANCHES();
      this.distribution_options = await this.getBranchNames;
    },
    computed:{
      ...mapGetters([
        'getProductDetail', 'getProductInfo', 'getProductInBranch', 'GET_ALL_BRANCHES'
      ]),
      pagesNumber() {
        return Math.ceil(this.data.length / this.pagination.rowsPerPage);
      },
      getBranchNames() {
        let a = [];
        for(let i = 0; i<this.GET_ALL_BRANCHES.length; i++){
          a.push(this.GET_ALL_BRANCHES[i].name);
        }
        return a;
      },
    },
    methods: {
      ...mapActions([
        'FETCH_BUSSINESS_PRODUCT', 'FETCH_BUSSINESS_PRODUCT_INFO', 'FETCH_ALL_BRANCHES',
        'FETCH_BUSSINESS_PRODUCT_IN_BRANCH', 'ADD_TO_CARD', 'FETCH_NEXT_PAGE_PRODUCTS_INFO'
      ]),
      async refresh(){
        this.rColor = 'blue';
        this.loading = true;
        await this.FETCH_BUSSINESS_PRODUCT_INFO(this.id);
        this.rowsNumber = await this.getProductInfo.count;
        this.data = await this.getProductInfo.results;
        this.pagination.page = 1;
        this.loading = false;
        this.rColor = 'grey';
      },
      async refresh2(){
        this.rColor2 = 'blue';
        this.loading2 = true;
        await this.FETCH_BUSSINESS_PRODUCT_IN_BRANCH(this.id);
        this.data2 = await this.getProductInBranch;
        this.loading2 = false;
        this.rColor2 = 'grey';
      },
      async addToCart(){
        await this.$emit('products', true);
        const branch_id = this.GET_ALL_BRANCHES.filter(el => el.name == this.distribution_branch);

        let isAdded = await this.ADD_TO_CARD({
          business_product_info_id: this.temp.business_product_info_id,
          quantity: this.distribution_amount,
          branch_id: branch_id[0].branch_id,
        });
       
        if (!isAdded.error)
        {
          this.$q.notify({
            icon: 'done',
            color: 'positive',
            message: 'Успешно добавлено в корзину!'
          })
        }else
        {
          this.$q.notify({
            color: 'negative',
            message: 'Ошибка!'
          })
        }

        this.addRow = false;
        await this.onReset();

        await this.refresh();
      },
      onReset () {
        this.distribution_branch = '';
        this.distribution_amount = '';
      },

    }
  }
</script>

<style scoped>

</style>

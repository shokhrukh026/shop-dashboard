<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">

      <q-expansion-item expand-separator icon="info" default-opened   header-class="bg-blue text-h6" dark :label="'Информация о Продукте ' + getProduct.title">

        <q-list bordered separator dense class="bg-white shadow-1">
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
              <q-item-label class="text-h6 text-blue-9">Тип: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.type}}</span></q-item-label>
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
              <q-item-label class="text-h6 text-blue-9">Общее количество в бизнесе: <span class="text-subtitle1 text-black">&nbsp;{{getProduct.total_quantity}}</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple >
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9">Оставшееся количество в бизнесе: <span class="text-subtitle1 text-black">{{getProduct.left_quantity}}</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple >
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9">Добавлено в : <span class="text-subtitle1 text-black">{{getProduct.added_at}}</span></q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

      <!-- {{getProduct}} -->
      <div class="q-mt-md">
        <q-btn push color="white" text-color="blue" icon="fas fa-arrow-left"
               class="q-mb-xs q-mr-xs" to="/products"/>
        <q-btn push color="white" text-color="primary" label="Добавить" class="q-mb-xs" :disable="loading"
               :to="{ name: 'add-info-product', params: {id: $props.branch_id}}"/>
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
              <q-btn dense round flat color="grey" to="/branch-update" icon="edit"></q-btn>
              <q-btn dense round flat color="grey" to="/branch-info" icon="fas fa-info-circle"></q-btn>
            </q-td>
          </template>
          <template v-slot:top="props">
            <span class="text-h6">Товары с разной наценкой</span>
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
      <!-- {{data}} -->

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
              <q-btn dense round flat color="grey" to="/branch-update" icon="edit"></q-btn>
              <q-btn dense round flat color="grey" to="/branch-info" icon="fas fa-info-circle"></q-btn>
            </q-td>
          </template>
          <template v-slot:top="props">
            <span class="text-h6">Лекарства в филиалах</span>
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

      <!-- {{getBranchesInMedInfoPage}} -->

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
              <q-select outlined v-model="distribution_branch" :options="distribution_options" label="Филиал" class="q-mt-md col-12"
                        :rules="[
                    val => val != '' || 'Филиал не выбран'
                  ]"/>
            </div>
            <div class="row q-mb-xs content-stretch">
              <q-input outlined v-model="distribution_amount.box" label="Кол-во упаковок" class="col" :suffix="String(left_quantity_box)"
                       ref="box"
                       :rules="[
                    val => val >= 0 && val <= left_quantity_box || 'В складе имеется ' + left_quantity_box + ' упаковок'
                  ]"/>
              <q-input outlined v-model="distribution_amount.piece" label="Кол-во штук" class="q-pl-md col" :suffix="String(left_quantity_piece)"
                       v-if="temp.capacity > 1"
                       ref="piece"
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
        required: true
      },
    },
    data(){
      return{
        rowsNumber: null,
        temp: {},
        left_quantity_box: null,
        left_quantity_piece: null,
        addRow: false,
        distribution_amount: {box: '', piece: ''},
        distribution_branch: '',
        distribution_options: [],

        getProduct: {title: '', barcode: '', type: '', country: '', manufacture: '', category: '',
          total_quantity: '', left_quantity: '', vat: '', description: "", added_at: ""},
        pagination: {
          rowsPerPage: 8
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
      'distribution_amount.box': function (newVal, oldVal){
        if(newVal < this.left_quantity_box){
          this.left_quantity_piece = Number(this.temp.capacity);
        }else if (newVal == this.left_quantity_box){
          this.left_quantity_piece = Number(this.temp.left_quantity_piece);
        }
      },
      'temp.left_quantity_box': function (newVal, oldVal){
        this.left_quantity_box = Number(this.temp.left_quantity_box);
      },
      'temp.left_quantity_piece': function (newVal, oldVal){
        this.left_quantity_piece = Number(this.temp.left_quantity_piece);
      },
      'temp.capacity': function (newVal, oldVal){
        if(newVal <= 1){
          this.distribution_amount.piece = 0
        }
      },

    },
    async mounted(){

      const details = await this.FETCH_BUSSINESS_PRODUCT(this.id);

      this.getProduct = await this.getProductDetail;



      // this.getProduct.title = details.data.title;
      // this.getProduct.barcode = details.data.barcode;
      // this.getProduct.type = details.data.type;
      // this.getProduct.country = details.data.country;
      // this.getProduct.manufacture = details.data.manufacture;
      // this.getProduct.category = details.data.category;
      // this.getProduct.total_quantity = details.data.total_quantity;
      // this.getProduct.left_quantity = details.data.left_quantity;
      // this.getProduct.vat = details.data.vat;
      // this.getProduct.description = details.data.description;
      // this.getProduct.added_at = details.data.added_at;

      this.loading = true;
      const answer = await this.FETCH_BUSSINESS_PRODUCT_INFO(this.id);
      console.log(answer.data);
      this.rowsNumber = answer.data.count;
      for(let i = 0; i < answer.data.results.length; i++ ){
        this.$set(this.data, this.data.length, answer.data.results[i]);
      }
      this.loading = false;



      this.loading2 = true;
      const answer2 = await this.FETCH_BUSSINESS_PRODUCT_IN_BRANCH(this.id);

      console.log(answer2);

      for(let i = 0; i < answer2.data.length; i++ ){
        this.$set(this.data2, this.data2.length, answer2.data[i]);
      }
      this.loading2 = false;


      await this.GET_BRANCHES();
      this.distribution_options = await this.getBranchNames;


    },
    computed:{
      ...mapGetters([
        'GET_ALL_BRANCHES', 'getProductDetail', 'getBranchesInMedInfoPage'
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
        'FETCH_BUSSINESS_PRODUCT', 'FETCH_BUSSINESS_PRODUCT_INFO', 'FETCH_ALL_BRANCHES', 'GET_BRANCHES_IN_MED_INFO_PAGE',
        'ADD_TO_CART', 'FETCH_BUSSINESS_PRODUCT_IN_BRANCH'
      ]),
      async addToCart(){
        await this.$emit('medicines', true);

        const branch_id = this.getBranches.filter(el => el.name === this.distribution_branch);
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
          message: 'Отправлено'
        })

        this.onReset();
        this.addRow = false;


        this.data = [];
        const answer = await this.GET_MEDICINE_INFO({id: this.id});
        // console.log(answer.data);
        this.rowsNumber = answer.data.count;
        for(let i = 0; i < answer.data.results.length; i++ ){
          this.$set(this.data, this.data.length, answer.data.results[i]);
        }

      },
      onReset () {
        this.distribution_branch = '';
        this.distribution_amount = {box: '', piece: ''};

        this.$refs.box.resetValidation()
        this.$refs.piece.resetValidation()
      }
    }
  }
</script>

<style scoped>

</style>

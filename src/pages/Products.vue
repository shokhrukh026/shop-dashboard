<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">
      <div class="row q-mb-xs">
        <q-btn
          push
          color="white"
          text-color="primary"
          label="Добавить"
          class="q-mb-xs"
          :disable="loading"
          @click="addProductPopUp = !addProductPopUp"
        />
        <q-space />
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
        :pagination-label="
          (firstRowIndex, endRowIndex, totalRowsNumber) =>
            firstRowIndex + '-' + endRowIndex + ' из ' + rowsNumber
        "
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              color="grey"
              :to="{
                name: 'edit-product',
                params: { id: props.row.business_product_id, row: props.row },
              }"
              icon="edit"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              :to="{
                name: 'product-info',
                params: { id: props.row.business_product_id },
              }"
              icon="fas fa-info-circle"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              @click="deleteRow(props)"
              icon="delete"
            ></q-btn>
          </q-td>
        </template>
        <template v-slot:top="props">
          <span class="text-subtitle1">Все продукты</span>
          <q-space />
          <form @submit.prevent.stop="getSearchResultByFilter" class="row">
            <q-input
              square
              borderless
              dense
              debounce="500"
              color="primary"
              v-model="filter"
              placeholder="Искать"
              style="
                border: 1px solid silver;
                padding: 0px 5px;
                min-width: 20vw;"
            >
            </q-input>
            <q-btn
              flat
              square
              color="white"
              :class="scan ? 'bg-green' : 'bg-blue'"
              style="border-radius: 0px;"
              type="submit"
            >
              <q-icon name="search" />
            </q-btn>
          </form>
          <q-toggle v-model="scan" icon="fas fa-barcode" color="green" />
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
        </template>
      </q-table>
    </div>

    <q-dialog v-model="deleteRowVar">
      <q-card style="width: 300px;">
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
          <q-btn flat label="Да" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addProductPopUp" full-width full-height>
      <addProduct />
    </q-dialog>

    <!-- {{getProduct}} -->
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import addProduct from './Add-product'

export default {
  components:{
    'addProduct': addProduct
  },

  data() {
    return {
      answer: { data: { data: [] } },
      scan: false,

      title: "",
      title_options: [],
      response: [],
      medicine_add: {
        title: "",
        barcode: "",
        country: "",
        manufacture: "",
        serial_code: "",
        capacity: "",
        quantity: "",
        piece: "",
        vat: "",
        description: "",
        purchase_price: "",
        selling_price: "",
        expire_date: "",
      },

      pagination: {
        rowsPerPage: 7,
        page: 1,
      },
      rowsNumber: null,
      row: {
        index: "",
        business_product_id: "",
        products: "",
        barcode: "",
        total_quantity: "",
        left_quantity: "",
        vat: "",
      },
      addProductPopUp: false,
      editRowVar: false,
      deleteRowVar: false,
      rowDelete: {},
      loading: false,
      filter: "",
      columns: [
        {
          name: "index",
          align: "center",
          label: "No#",
          field: "index",
          sortable: true,
        },
        {
          name: "products",
          align: "center",
          label: "Название",
          field: "title",
          sortable: true,
        },
        {
          name: "barcode",
          align: "center",
          label: "Штрих-код",
          field: "barcode",
          sortable: true,
        },
        {
          name: "country",
          align: "center",
          label: "Страна",
          field: "country",
          sortable: true,
        },

        {
          name: "manufacture",
          align: "center",
          label: "Производство",
          field: "manufacture",
          sortable: true,
        },
        {
          name: "type",
          align: "center",
          label: "Тип",
          field: "type",
        },
        {
          name: "category",
          align: "center",
          label: "Категория",
          field: "category",
        },
        {
          name: "vat",
          align: "center",
          label: "НДС",
          field: "vat",
          sortable: true,
        },
        {
          name: "total_quantity",
          align: "center",
          label: "Кол-во",
          field: "total_quantity",
          sortable: true,
        },
        {
          name: "left_quantity",
          align: "center",
          label: "Остаток",
          field: "left_quantity",
          sortable: true,
        },
        {
          name: "sold_quantity",
          align: "center",
          label: "Продажи за 30 дней",
          field: "sold_quantity",
          sortable: true,
        },

        { name: "actions", label: "Действия", field: "", align: "center" },
      ],
      data: [],
      data2: [],
    };
  },
  watch: {
    "pagination.page": async function (newVal, oldVal) {
      if (newVal === this.pagesNumber) {
        await this.GET_NEXT_PAGE();
      }
    },

    filter: async function (newVal, oldVal) {
      if (this.scan === false) {
        if (newVal.length >= 2) {
          await this.getSearchResultByFilter();
        } else {
          console.log(
            "Search input has less than 2 characters. Search is not working"
          );
        }
      }
    },
  },
  async mounted() {
    this.loading = true;
    await this.FETCH_BUSSINESS_PRODUCT_LIST();
    this.rowsNumber = await this.getProducts.count;
    this.data = await this.getProducts.results;
    console.log(this.data);
    this.loading = false;
  },
  computed: {
    ...mapGetters(["getProducts", "getBranches"]),
    pagesNumber() {
      return Math.ceil(this.data.length / this.pagination.rowsPerPage);
    },
  },
  methods: {
    ...mapActions([
      "FETCH_BUSSINESS_PRODUCT_LIST",
      "GET_NEXT_PAGE",
      "GET_SEARCH_RESULT_ALL_PRODUCTS",
    ]),

    async getSearchResultByFilter() {
      let a = await this.GET_SEARCH_RESULT_ALL_PRODUCTS({
        value: this.filter,
      });
    },
    deleteRow(props) {
      console.log(props.business_product_id);
    },
  },
};
</script>

<style scoped></style>


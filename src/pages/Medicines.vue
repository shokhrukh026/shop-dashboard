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
          @click="addMedicinePopUp = !addMedicinePopUp"
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
                params: { id: props.row.id, row: props.row },
              }"
              icon="edit"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              :to="{ name: 'med-info', params: { id: props.row.id } }"
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
          <span class="text-subtitle1">Все лекарства</span>
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
                min-width: 20vw;
              "
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
      {{ filter }}
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

    <q-dialog v-model="addMedicinePopUp" full-width full-height>
      <q-card>
        <q-card-section class="bg-info row">
          <div class="text-h6 text-white">Искать лекарство</div>
          <q-space></q-space>
          <q-btn icon="close" color="white" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-none q-pa-lg">
          <div class="row">
            <q-select
              label="Название"
              outlined
              dense
              v-model="medicine_add.title"
              use-input
              hide-selected
              fill-input
              input-debounce="500"
              :options="title_options"
              @filter="filterTitle"
              color="blue"
              class="col"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Нет результатов
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:append>
                <q-icon
                  v-if="medicine_add.title !== null"
                  class="cursor-pointer"
                  name="clear"
                  @click.stop="medicine_add.title = null"
                />
              </template>
            </q-select>
            <q-select
              label="Штрих-код"
              outlined
              dense
              v-model="medicine_add.barcode"
              use-input
              hide-selected
              fill-input
              input-debounce="1000"
              color="blue"
              class="q-ml-xs col"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Нет результатов
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:append>
                <q-icon
                  v-if="medicine_add.barcode !== null"
                  class="cursor-pointer"
                  name="clear"
                  @click.stop="medicine_add.barcode = null"
                />
              </template>
            </q-select>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-table
            dense
            title=""
            :data="data2"
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
                    params: { id: props.row.id, row: props.row },
                  }"
                  icon="edit"
                ></q-btn>
                <q-btn
                  dense
                  round
                  flat
                  color="grey"
                  :to="{ name: 'med-info', params: { id: props.row.id } }"
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
              <span class="text-subtitle1">Все лекарства</span>
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
                    min-width: 20vw;
                  "
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
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
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
        rowsPerPage: 5,
        page: 1,
      },
      rowsNumber: null,
      row: {
        index: "",
        products: "",
        barcode: "",
        total_quantity: "",
        left_quantity: "",
        vat: "",
      },
      addMedicinePopUp: false,
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
          label: "Лекарство",
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
          label: "Производитель",
          field: "manufacture",
          sortable: true,
        },
        {
          name: "serial_code",
          align: "center",
          label: "Серийный номер",
          field: "serial_code",
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
          name: "vat",
          align: "center",
          label: "НДС",
          field: "vat",
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
      if (newVal == this.pagesNumber) {
        await this.GET_NEXT_PAGE();
      }
    },

    filter: async function (newVal, oldVal) {
      if (this.scan == false) {
        if (newVal.length >= 2) {
          await this.getSearchResultByFilter();
        } else {
          console.log("Search input has less than 2 characters");
        }
      }
    },
  },
  async mounted() {
    await this.GET_MEDICINES();
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.data.length / this.pagination.rowsPerPage);
    },
  },
  methods: {
    ...mapActions([
      "GET_MEDICINES",
      "GET_NEXT_PAGE",
      "GET_SEARCH_RESULT_ALL_MEDICINES",
      "GET_SEARCH_RESULT_ADD_MEDICINE",
    ]),

    async getSearchResultByFilter() {
      let a = await this.GET_SEARCH_RESULT_ALL_MEDICINES({
        value: this.filter,
      });
      console.log(a);
    },

    deleteRow(props) {
      this.rowDelete = props.row;
      this.deleteRowVar = !this.deleteRowVar;
    },
    editRow(props) {
      this.row = props.row;
      this.editRowVar = !this.editRowVar;
    },

    async filterTitle(val, update, abort) {
      if (val.length >= 2) {
        await update(async () => {
          // const needle = val.toLowerCase()
          const needle = val;
          this.response = await this.GET_SEARCH_RESULT_ADD_MEDICINE({
            value: needle,
            type: "title",
          });
          for (let i = 0; i < this.response.length; i++) {
            await this.$set(this.title_options, i, this.response[i].title);
          }
        });
      }
    },
  },
};
</script>

<style scoped></style>

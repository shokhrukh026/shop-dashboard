<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">
      <q-expansion-item
        expand-separator
        icon="info"
        default-opened
        header-class="bg-blue text-h6"
        dark
        :label="'Информация о лекарстве ' + getMedicines.title"
      >
        <q-list bordered separator dense class="bg-white shadow-1">
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Название лекарства :
                <span class="text-subtitle1 text-black"
                  >&nbsp;{{ getMedicines.title }}</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Описание:
                <span class="text-subtitle1 text-black"
                  >&nbsp;{{ getMedicines.description }}</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Штрих-код:
                <span class="text-subtitle1 text-black"
                  >&nbsp;{{ getMedicines.barcode }}</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Страна:
                <span class="text-subtitle1 text-black"
                  >&nbsp;{{ getMedicines.country }}</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Производитель:
                <span class="text-subtitle1 text-black"
                  >&nbsp;{{ getMedicines.manufacture }}</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Серийный номер:
                <span class="text-subtitle1 text-black"
                  >&nbsp;{{ getMedicines.serial_code }}</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >НДС:
                <span class="text-subtitle1 text-black"
                  >&nbsp;{{ getMedicines.vat }}%</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-item-section>
              <q-item-label class="text-h6 text-blue-9"
                >Общее количество в филиале:
                <span class="text-subtitle1 text-black"
                  >&nbsp;{{ getMedicines.total_quantity }}</span
                ></q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

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
                @click="(addRow = !addRow) && (temp = props.row)"
                icon="remove_circle"
              ></q-btn>
              <q-btn
                dense
                round
                flat
                color="grey"
                to="/branch-update"
                icon="edit"
              ></q-btn>
              <q-btn
                dense
                round
                flat
                color="grey"
                to="/branch-info"
                icon="fas fa-info-circle"
              ></q-btn>
            </q-td>
          </template>
          <template v-slot:top="props">
            <span class="text-h6">Товары с разной наценкой</span>
            <q-space />
            <q-input
              borderless
              dense
              debounce="300"
              color="primary"
              v-model="filter"
              placeholder="Искать"
              style="
                border: 1px solid silver;
                padding: 0px 5px;
                border-radius: 5px;
              "
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
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
    </div>

    <q-dialog v-model="addRow" persistent>
      <q-card>
        <q-card-section class="bg-info">
          <div class="text-h6 text-white">Возврат</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-none q-pa-lg">
          <!-- <q-select outlined v-model="distribution_branch" :options="distribution_options" label="Филиал" class="q-mb-sm"/> -->
          <div class="row">
            <q-input
              outlined
              v-model="distribution_amount"
              label="Кол-во упаковок"
              class="q-mr-xs col"
              :suffix="String(temp_total_quantity)"
              :rules="[
                (val) =>
                  (val > 0 && val <= temp_total_quantity) ||
                  'В складе имеется ' + temp_total_quantity + ' упаковок',
              ]"
            />
            <q-input
              outlined
              v-model="distribution_amount"
              label="Кол-во штук"
              class="col"
              :suffix="String(temp_total_piece)"
              :rules="[
                (val) =>
                  (val > 0 && val <= temp_total_piece) ||
                  'В складе имеется ' + temp_total_piece + ' штук',
              ]"
            />
          </div>

          <div class="q-mt-md">
            <span class="text-green text-weight-bold">Уже добавлено:</span>
            {{ temp_already_added }}
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Отменить" v-close-popup />
          <q-btn flat label="Добавить" @click="addToCart" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  props: {
    business_medicine_id: {
      required: true,
    },
    branch_id: {
      required: true,
    },
  },
  data() {
    return {
      id: "",
      rowsNumber: null,
      rowsNumber2: null,
      temp: {},
      temp_total_quantity: "",
      temp_total_piece: "",
      temp_already_added: "",
      addRow: false,
      distribution_amount: "",
      distribution_branch: "",
      distribution_options: [],

      // this should be commented
      getMedicines: {
        title: "",
        barcode: "",
        country: "",
        manufacture: "",
        serial_code: "",
        vat: "",
        total_quantity: "",
        left_quantity: "",
      },
      pagination: {
        rowsPerPage: 8,
      },
      loading: false,
      filter: "",
      columns: [
        {
          name: "index",
          align: "center",
          label: "№",
          field: "index",
          sortable: true,
        },
        {
          name: "expire_date",
          align: "center",
          label: "Годен до",
          field: "expire_date",
          sortable: true,
        },

        {
          name: "quantity",
          align: "center",
          label: "Кол-во",
          field: "quantity",
          sortable: true,
        },
        // { name: 'left_quantity', align: 'center', label: 'Остаток', field: 'left_quantity', sortable: true },
        {
          name: "purchase_price",
          align: "center",
          label: "Цена покупки",
          field: "purchase_price",
          sortable: true,
        },
        {
          name: "selling_price",
          align: "center",
          label: "Цена продажи",
          field: "selling_price",
          sortable: true,
        },

        { name: "actions", label: "Действия", field: "", align: "center" },
      ],

      data: [],
    };
  },
  watch: {
    "temp.total_qauntity": function (newVal, oldVal) {
      this.temp_total_quantity = Number(this.temp.total_qauntity);
    },
    addRow: async function (newVal, oldVal) {
      if (newVal == true) {
        let a = await this.GET_CHECK_FOR_REFUND({
          branch_id: this.branch_id,
          med_info_id: this.business_medicine_id,
        });
        a.limit_quantity = 56;
        a.capacity = 1;
        a.already_added = 0;
        this.temp_total_quantity = Math.floor(a.limit_quantity / a.capacity);
        this.temp_total_piece = a.limit_quantity % a.capacity;
        if (a.already_added != 0) {
          this.temp_already_added =
            Math.floor(a.already_added / a.capacity) +
            " упаковок " +
            "(по " +
            a.capacity +
            " )" +
            " и " +
            (a.already_added % a.capacity) +
            " штук";
        } else {
          this.temp_already_added = 0;
        }
      }
    },
  },
  async mounted() {},
  computed: {},
  methods: {
    async addToCart() {
      let data = {
        id: this.id,
        branch: this.distribution_branch,
        amount: this.distribution_amount,
      };
      await this.$emit("medicines", data);
    },
  },
};
</script>

<style scoped></style>

<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">
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
              @click="editRow(props)"
              icon="edit"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              :to="{
                name: 'branch-info-detail',
                params: {
                  business_medicine_id: props.row.business_medicine_id,
                  branch_id: id,
                },
              }"
              icon="fas fa-info-circle"
            ></q-btn>
          </q-td>
        </template>
        <template v-slot:top="props">
          <span class="text-h6">Магазины</span>
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
              class="bg-blue"
              style="border-radius: 0px;"
              type="submit"
            >
              <q-icon name="search" />
            </q-btn>
          </form>
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
  </q-page>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      row:{
        required: false,
      }
    },

  },
  data() {
    return {
      rowsNumber: "",
      pagination: {
        rowsPerPage: 8,
      },
      row: {
        index: "",
        branch_name: "",
        city: "",
        owner: "",
        status: "",
      },
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
          label: "Магазины",
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
        // { name: 'left_quantity', align: 'center', label: 'Остаток', field: 'left_quantity', sortable: true },
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
    };
  },
  watch: {},
  async mounted() {},
  computed: {},
  methods: {},
};
</script>

<style scoped></style>

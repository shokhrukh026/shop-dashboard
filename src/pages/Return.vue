<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">
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
        :pagination-label="
          (firstRowIndex, endRowIndex, totalRowsNumber) =>
            firstRowIndex + '-' + endRowIndex + ' из ' + totalRowsNumber
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
          <span class="text-h6">История возвратов</span>
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
  </q-page>
</template>

<script>
export default {
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
          name: "title",
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
          name: "capacity",
          align: "center",
          label: "Вместимость",
          field: "capacity",
          sortable: true,
        },
        {
          name: "quantity",
          align: "center",
          label: "Кол-во",
          field: "quantity",
          sortable: true,
        },
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
        {
          name: "expire_date",
          align: "center",
          label: "Годен до",
          field: "expire_date",
          sortable: true,
        },
        {
          name: "vat",
          align: "center",
          label: "Ндс",
          field: "vat",
          sortable: true,
        },
        {
          name: "description",
          align: "center",
          label: "Описание",
          field: "description",
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

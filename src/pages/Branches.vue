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
        :rows-per-page-options="[1]"
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
              :to="{
                name: 'branch-update',
                params: { id: props.row.branch_id, row: props.row },
              }"
              icon="edit"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              :to="{
                name: 'branch-info',
                params: { id: props.row.branch_id, row: props.row },
              }"
              icon="fas fa-info-circle"
            ></q-btn>
          </q-td>
        </template>
        <template v-slot:top="props">
          <span class="text-h6">Филиалы</span>
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
      <!-- {{GET_ALL_BRANCHES}} -->
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      pagination: {
        rowsPerPage: 8,
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
          name: "branch_name",
          align: "center",
          label: "Название",
          field: "name",
          sortable: true,
        },
        {
          name: "address",
          align: "center",
          label: "Адрес",
          field: "address",
          sortable: true,
        },
        {
          name: "street",
          align: "center",
          label: "Улица",
          field: "street",
          sortable: true,
        },
        {
          name: "city",
          align: "center",
          label: "Город",
          field: "city",
          sortable: true,
        },
        {
          name: "status",
          align: "center",
          label: "Статус",
          field: "status",
          sortable: true,
        },
        {
          name: "contact_person",
          align: "center",
          label: "Контактное лицо",
          field: "contact_person",
          sortable: true,
        },
        {
          name: "contact_phone",
          align: "center",
          label: "Контактный телефон",
          field: "contact_phone",
          sortable: true,
        },

        { name: "actions", label: "Действия", field: "", align: "center" },
      ],
      data: [],
    };
  },
  watch: {
    data: {
      handler: function (val, oldVal) {
        this.data.forEach((row, index) => {
          row.index = index + 1;
        });
      },
      deep: true,
    },
  },
  async created() {
    this.loading = true;
    await this.FETCH_ALL_BRANCHES();
    //await this.FETCH_ONE_BRANCHES("1/"); //geting brach by id
    //await console.log(this.GET_ONE_BRANCH); //geting brach by id
    this.data = this.GET_ALL_BRANCHES;
    this.loading = false;
  },
  computed: {
    ...mapGetters(["GET_ALL_BRANCHES", "GET_ONE_BRANCH"]),
  },
  methods: {
    ...mapActions(["FETCH_ALL_BRANCHES", "FETCH_ONE_BRANCHES"]),

    propsPrint(id) {
      console.log(id);
    },
  },
};
</script>

<style scoped></style>

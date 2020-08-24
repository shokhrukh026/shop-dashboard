<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">
      <div class="row justify-end q-mb-xs">
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
          style="min-width: 70vw;"
          class="col-12"
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
        <q-btn
          color="blue"
          class="q-my-sm"
          @click="distribute"
          :disable="data.length == 0"
          >Распределить</q-btn
        >
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
            <q-btn flat label="Да" v-close-popup @click="deleteProcess" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      answer: { data: { data: [] } },

      pagination: {
        rowsPerPage: 4,
        page: 1,
      },
      row: {
        index: "",
        products: "",
        barcode: "",
        total_quantity: "",
        left_quantity: "",
        vat: "",
      },
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
          name: "branch_name",
          align: "center",
          label: "Филиал",
          field: "branch_name",
          sortable: true,
        },
        {
          name: "title",
          align: "center",
          label: "Лекарство",
          field: "title",
          sortable: true,
        },
        {
          name: "quantity",
          align: "center",
          label: "Кол-во",
          field: "quantity",
          sortable: true,
        },

        { name: "actions", label: "Действия", field: "", align: "center" },
      ],
      data: [
        // {index: 1, products: 'Тримол', barcode: '2313141', total_quantity: '100', left_quantity: '50', vat: '10%'},
        // {index: 2, products: 'Ношпа', barcode: '2313141', total_quantity: '56', left_quantity: '40', vat: '12%'},
        // {index: 3, products: 'Ибуклин', barcode: '2313141', total_quantity: '80', left_quantity: '10', vat: '5%'},
        // {index: 4, products: 'Арбидол', barcode: '2313141', total_quantity: '14', left_quantity: '0', vat: '7%'},
      ],
    };
  },

  async mounted() {},
  computed: {},
  methods: {
    async deleteRow(props) {
      this.deleteRowVar = !this.deleteRowVar;
      this.rowDelete = props.row;
    },
    async deleteProcess() {
      await this.DELETE_ARRIVAL_ONE({ cart_id: this.rowDelete.cart_id });
      console.log(this.rowDelete);
      this.data = [];
      this.data = await this.GET_SHOPPING_CART_MEDICINES();
      await this.$emit("medicines", false);
    },
    async distribute() {
      await this.ADD_ARRIVAL_ALL();
      await this.$emit("medicines", "distribute_all");
      this.data = [];
      this.data = await this.GET_SHOPPING_CART_MEDICINES();
    },
  },
};
</script>

<style scoped></style>

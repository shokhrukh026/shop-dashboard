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
          @click="addCategoryPopUp = !addCategoryPopUp"
        />
        <q-space />
      </div>
      <q-table
        dense
        :data="data"
        :columns="columns"
        row-key="index"
        :filter="filter"
        :loading="loading"
        separator="cell"
        :pagination.sync="pagination"
        :rows-per-page-options="[1]"
        :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => firstRowIndex + '-' + endRowIndex + ' из ' + totalRowsNumber"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat color="grey" :to="{ name: 'branch-update', params: { id: props.row.branch_id, row: props.row },}"
             icon="edit"></q-btn>
            <q-btn dense round flat color="grey" :to="{ name: 'branch-info', params: { id: props.row.branch_id, row: props.row }}"
             icon="fas fa-info-circle"></q-btn>
          </q-td>
        </template>
        <template v-slot:top="props">
          <span class="text-h6">Категории</span>
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter"
            placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; border-radius: 5px;">
            <template v-slot:append>
                <q-icon name="search" />
            </template>
          </q-input>
          <q-btn flat round dense icon="fas fa-sync-alt" class="q-ml-md" :color="rColor" size="sm" @click="refresh"></q-btn>
          <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen" class="q-ml-sm"/>
        </template>
      </q-table>
    </div>
      <!-- {{data}} -->
    <q-dialog v-model="addCategoryPopUp" persistent>
      <addCategory  @onDestroyComponent="updateTableInfo"/>
    </q-dialog>
  </q-page>
</template>

<script>
import addCategory from "./popUps/AddCategory";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    addCategory: addCategory,
  },

  data() {
    return {
      rColor: 'grey',
      pagination: {
        rowsPerPage: 9,
      },
      loading: false,
      filter: '',
      addCategoryPopUp: false,
      columns: [
        { name: "index", align: "center", label: "No#", field: "category_id", sortable: true},
        { name: "branch_name", align: "center", label: "Название", field: "title", sortable: true},
        { name: "actions", label: "Действия", field: "", align: "center" },
      ],
      data: [],
    };
  },
  watch: {
    
  },
  async mounted() {
    await this.updateTableInfo();  
  },
  computed: {
    ...mapGetters(["getAllCategories"]),
  },
  methods: {
    ...mapActions(["FETCH_ALL_CATEGORIES"]),

    async updateTableInfo() {
      this.rColor = 'blue';
      this.loading = true;
      await this.FETCH_ALL_CATEGORIES();
      this.data = this.getAllCategories;
      this.loading = false;
      this.rColor = 'grey';
    }

  },
};
</script>

<style scoped></style>

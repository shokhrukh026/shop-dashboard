<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">
      <q-btn push color="white" text-color="blue" icon="fas fa-arrow-left"
             class="q-mb-xs q-mr-xs" to="/branches"/>
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
            <q-btn dense round flat color="grey" icon="edit"></q-btn>
            <q-btn dense round flat color="grey" :to="{ name: 'branch-info-detail', params: {business_product_id: props.row.business_product_id, branch_id: id}}"  icon="fas fa-info-circle"></q-btn>
          </q-td>
        </template>
        <template v-slot:top="props">
          <span class="text-h6">Продукты в {{branch_name.name}}</span>
          <q-space />
          <form @submit.prevent.stop="getSearchResultByFilter"  class="row">
            <q-input square borderless dense debounce="500" color="primary" v-model="filter"
                     placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; min-width: 20vw;">
            </q-input>
            <q-btn flat square color="white" class="bg-blue" style="border-radius: 0px;" type="submit">
              <q-icon name="search" />
            </q-btn>
          </form>
          <q-btn flat round dense icon="fas fa-sync-alt" class="q-ml-md" :color="rColor" size="sm" @click="refresh"></q-btn>
          <q-btn
            flat round dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-xs"
          />
        </template>
      </q-table>
    </div>
    {{getProductsInsideBranch}}
  </q-page>
</template>


<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    props: {
      id: [String, Number],
      row:{
        required: false,
      }
    },
    data(){
      return {
        rColor: 'grey',
        rowsNumber: '',
        pagination: {
          rowsPerPage: 9,
          page: 1,
        },
        branch_name: this.row ? this.row : '',
        loading: false,
        filter: '',
        columns: [
          { name: 'index', align: 'center', label: 'No#', field: 'index', sortable: true},
          { name: 'title', align: 'center', label: 'Название', field: 'title', sortable: true },
          { name: 'category_title', align: 'center', label: 'Категория', field: 'category_title', sortable: true },
          { name: 'barcode', align: 'center', label: 'Штрих-код', field: 'barcode', sortable: true },
          { name: 'country', align: 'center', label: 'Страна', field: 'country', sortable: true },
          { name: 'manufacture', align: 'center', label: 'Производитель', field: 'manufacture', sortable: true },
          { name: 'total_quantity', align: 'center', label: 'Общее кол-во', field: 'total_quantity', sortable: true },
          { name: 'sold_quantity', align: 'center', label: 'Продано штук', field: 'sold_quantity', sortable: true },
          { name: 'vat', align: 'center', label: 'НДС', field: 'vat', sortable: true },
          { name: 'actions', label: 'Действия', field: '', align:'center' },
        ],
        data: [],
      }
    },
    watch:{
      "pagination.page": async function (newVal, oldVal) {
        if (newVal === this.pagesNumber) {
          await this.FETCH_NEXT_PAGE_PRODUCTS_IN_BRANCHES();
        }
      },

    },
    async mounted(){
      await this.refresh();
      if(await this.GET_ALL_BRANCHES.length === 0){
        await this.FETCH_ALL_BRANCHES();
      }
      let name = await this.GET_ALL_BRANCHES.filter(obj => {
        return obj.branch_id == this.id;
      })
      this.branch_name = name[0];
    },
    computed:{
      ...mapGetters([
        'GET_ALL_BRANCHES', 'getProductsInsideBranch'
      ]),
      pagesNumber() {
        return Math.ceil(this.data.length / this.pagination.rowsPerPage);
      },
    },
    methods: {
      ...mapActions([
        'FETCH_ALL_BRANCHES', 'FETCH_PRODUCTS_INSIDE_BRANCH', 'FETCH_NEXT_PAGE_PRODUCTS_IN_BRANCHES'
      ]),
       async refresh(){
        this.rColor = 'blue';
        this.loading = true;
        await this.FETCH_PRODUCTS_INSIDE_BRANCH(this.id);
        this.rowsNumber = await this.getProductsInsideBranch.count;
        this.data = await this.getProductsInsideBranch.results;
        this.pagination.page = 1;
        this.loading = false;
        this.rColor = 'grey';
      },
      // async getSearchResultByFilter(){
      //   return await this.GET_SEARCH_RESULT_BY_BRANCH(
      //     {
      //       virtual_number: this.id,
      //       title: this.filter
      //     }
      //   )
      // },
    }
  }
</script>

<style scoped>

</style>

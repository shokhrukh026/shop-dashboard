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
            <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
            <q-btn dense round flat color="grey" :to="{ name: 'branch-info-detail', params: {business_medicine_id: props.row.business_medicine_id, branch_id: id}}"  icon="fas fa-info-circle"></q-btn>
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
    <!-- {{getMedicinesByBranch}} -->
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
        rowsNumber: '',
        pagination: {
          rowsPerPage: 8
        },
        branch_name: this.row ? this.row : '',
        loading: false,
        filter: '',
        columns: [
          { name: 'index', align: 'center', label: 'No#', field: 'index', sortable: true},
          { name: 'title', align: 'center', label: 'Название', field: 'title', sortable: true },
          { name: 'barcode', align: 'center', label: 'Штрих-код', field: 'barcode', sortable: true },
          { name: 'country', align: 'center', label: 'Страна', field: 'country', sortable: true },
          { name: 'manufacture', align: 'center', label: 'Производитель', field: 'manufacture', sortable: true },
          { name: 'quantity', align: 'center', label: 'Кол-во', field: 'quantity', sortable: true },
          { name: 'vat', align: 'center', label: 'НДС', field: 'vat', sortable: true },
          { name: 'description', align: 'center', label: 'описание', field: 'description', sortable: true },
          { name: 'category', align: 'center', label: 'котегория', field: 'category', sortable: true },
          { name: 'actions', label: 'Действия', field: '', align:'center' },
        ],
        data: [],
      }
    },
    watch:{

    },
    async mounted(){
      if(this.getBranches.length === 0){
        await this.FETCH_ALL_BRANCHES();
      }
      let name = await this.getBranches.filter(obj => {
        return obj.id === this.id;
      })
      this.branch_name = name[0];



      this.loading = true;
      const answer = await this.FETCH_BUSSINESS_PRODUCT_IN_BRANCH(this.id);
      // console.log(answer);
      this.rowsNumber = answer.count;
      for(let i = 0; i < answer.results.length; i++ ){
        this.$set(this.data, this.data.length, answer.results[i]);
      }
      this.loading = false;



    },
    computed:{
      ...mapGetters([
        
      ])
    },
    methods: {
      ...mapActions([
        'FETCH_ALL_BRANCHES', 'FETCH_BUSSINESS_PRODUCT_IN_BRANCH', 'GET_SEARCH_RESULT_BY_BRANCH'
      ]),
      async getSearchResultByFilter(){
        return await this.GET_SEARCH_RESULT_BY_BRANCH(
          {
            virtual_number: this.id,
            title: this.filter
          }
        )
      },
    }
  }
</script>

<style scoped>

</style>

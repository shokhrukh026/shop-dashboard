<template>
    <q-page class="bg-grey-3">
        <div class="q-pa-md">
            <q-btn push color="white" text-color="blue" icon="fas fa-arrow-left" 
              class="q-mb-xs q-mr-xs" to="/return-branches"/>
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
            :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => firstRowIndex + '-' + endRowIndex + ' из ' + totalRowsNumber"
            >
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn dense round flat color="grey" icon="edit"></q-btn>
                    <q-btn dense round flat color="grey" icon="fas fa-info-circle"></q-btn>
                </q-td>
            </template>
            <template v-slot:top="props">
                <span class="text-h6">История возвратов в {{row[0].name}}</span>
                <q-space />
                <q-input borderless dense debounce="300" color="primary" v-model="filter"
                  placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; border-radius: 5px;">
                  <template v-slot:append>
                      <q-icon name="search" />
                  </template>
                </q-input>
                <q-btn flat round dense icon="fas fa-sync-alt" class="q-ml-md" :color="rColor" size="sm" @click="refresh"></q-btn>
                <q-btn
                flat round dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                class="q-ml-sm"
                />
            </template>
            </q-table>
        </div>
        <!-- {{getRefunds}} -->
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    props:{
      branch_id: [Number, String]
    },
    data(){
      return {
        pagination: {
          rowsPerPage: 8,
          page: 1,
          sortBy: 'expire_date',
          descending: false,
        },
        rColor: 'grey',
        loading: false,
        row: [{branch_name: ''}],
        filter: '',
        columns: [
          { name: 'index', align: 'center', label: 'No#', field: 'index', sortable: true},
          { name: 'expire_date', align: 'center', label: 'Годен до', field: 'expire_date', sortable: true },
          { name: 'title', align: 'center', label: 'Название', field: 'title', sortable: true },
          { name: 'category', align: 'center', label: 'Категория', field: 'category', sortable: true },
          { name: 'barcode', align: 'center', label: 'Штрих-код', field: 'barcode', sortable: true },
          { name: 'country', align: 'center', label: 'Страна', field: 'country', sortable: true },
          { name: 'manufacture', align: 'center', label: 'Производитель', field: 'manufacture', sortable: true },
          { name: 'type_product_name', align: 'center', label: 'Ед. измерения', field: 'type_product_name', sortable: true },
          { name: 'vat', align: 'center', label: 'Ндс', field: 'vat', sortable: true },
          { name: 'quantity', align: 'center', label: 'Кол-во', field: 'quantity', sortable: true },
          { name: 'purchase_price', align: 'center', label: 'Цена покупки', field: 'purchase_price', sortable: true },
          { name: 'selling_price', align: 'center', label: 'Цена продажи', field: 'selling_price', sortable: true },
          { name: 'actions', label: 'Действия', field: '', align:'center' },
        ],
        data: [],
      }
    },
    watch:{
  
    },
    async mounted(){
      await this.refresh();

      if(this.GET_ALL_BRANCHES.length == 0){
          await this.FETCH_ALL_BRANCHES();
      }

      this.row = await this.GET_ALL_BRANCHES.filter(obj => {
        return obj.branch_id == this.branch_id
      })
    },
    computed:{
      ...mapGetters([
        'getRefunds', 'GET_ALL_BRANCHES'
      ])
    },
    methods: {
      ...mapActions([
          'FETCH_REFUNDS', 'FETCH_ALL_BRANCHES'
      ]),
      async refresh(){
        this.rColor = 'blue';
        this.loading = true;
        await this.FETCH_REFUNDS({branch_id: this.branch_id});
        this.data = await this.getRefunds;
        this.loading = false;
        this.rColor = 'grey';
      },
    }
}
</script>

<style scoped>

</style>
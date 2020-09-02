<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">
      <q-btn push color="white" text-color="blue" icon="fas fa-arrow-left"
             class="q-mb-xs q-mr-xs" to="/history"/>
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
        :rows-per-page-options="[1]"
        :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => firstRowIndex + '-' + endRowIndex + ' из ' + totalRowsNumber"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat color="grey" :to="{ name: 'branch-update', params: {id: props.row.id, row: props.row}}"
                   icon="edit"></q-btn>
            <q-btn dense round flat color="grey" :to="{ name: 'branch-info', params: {id: props.row.id, row: props.row}}" icon="fas fa-info-circle"></q-btn>
          </q-td>
        </template>
        <template v-slot:top="props">
          <span class="text-h6">История приходов в {{row[0].branch_name}}</span>
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter"
                   placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; border-radius: 5px;">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
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
  </q-page>
</template>


<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    props: {
      id: [String, Number],
    },
    data(){
      return {
        rowsNumber: '',
        pagination: {
          rowsPerPage: 8,
          sortBy: 'added_at',
          descending: true,
        },
        row: [{branch_name: ''}],
        loading: false,
        filter: '',
        columns: [
          { name: 'index', align: 'center', label: 'No#', field: 'index', sortable: true},
          { name: 'title', align: 'center', label: 'Название', field: 'title', sortable: true },
          { name: 'barcode', align: 'center', label: 'Штрих-код', field: 'barcode', sortable: true },
          { name: 'country', align: 'center', label: 'Страна', field: 'country', sortable: true },
          { name: 'manufacture', align: 'center', label: 'Производитель', field: 'manufacture', sortable: true },
          { name: 'quantity', align: 'center', label: 'Количество', field: 'quantity', sortable: true },
          { name: 'code', align: 'center', label: 'Серийный номер', field: 'code', sortable: true },
          { name: 'status', align: 'center', label: 'Статус', field: 'status', sortable: true },
          {name:  'description', align: 'center', label: 'Описание', field: 'description', sortable: true},
          { name: 'vat', align: 'center', label: 'НДС', field: 'vat', sortable: true },
          { name: 'purchase_price', align: 'center', label: 'Цена покупки', field: 'purchase_price', sortable: true },
          { name: 'selling_price', align: 'center', label: 'Цена продажи', field: 'selling_price', sortable: true },
          { name: 'expire_date', align: 'center', label: 'Годен до', field: 'expire_date', sortable: true },
          { name: 'actions', label: 'Действия', field: '', align:'center' },
        ],
        data: [],
      }
    },
    watch:{

    },
    async mounted(){
      this.loading = true;
      let a =  await this.FETCH_ARRIVAL_ALL_INFO(Number(await this.id));
      this.data = await this.getArrivalAllInfo;
      this.loading = false;

      if(this.getArrivalAll.length === 0){
        await this.FETCH_ARRIVAL_ALL();
      }

      this.row = await this.getArrivalAll.filter(obj => {
        return obj.id === this.id
      })
    },
    computed:{
      ...mapGetters([
        'getArrivalAll', 'getArrivalAllInfo'
      ])
    },
    methods: {
      ...mapActions([
        'FETCH_ARRIVAL_ALL_INFO', 'FETCH_ARRIVAL_ALL'
      ]),

    }
  }
</script>

<style scoped>

</style>

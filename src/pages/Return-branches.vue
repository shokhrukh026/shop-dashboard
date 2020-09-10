<template>
    <q-page class="bg-grey-3">
        <div class="q-pa-md">
            <!-- <q-page-sticky position="top-left" :offset="[18, 18]" style="z-index: 1000;" class="backBtn">
              <q-btn round color="blue" icon="arrow_back" />
            </q-page-sticky> -->
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
            :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => firstRowIndex + '-' + endRowIndex + ' из ' + totalRowsNumber"
            >
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn dense round flat color="grey" icon="edit"></q-btn>
                     <!-- :to="{ name: 'branch-update', params: {id: props.row.id, row: props.row}}" -->
                    <q-btn dense round flat color="grey" :to="{ name: 'return', params: {branch_id: props.row.branch_id}}" icon="fas fa-info-circle"></q-btn>
                </q-td>
            </template>
            <template v-slot:top="props">
                <span class="text-h6">Возвраты в филиалах</span>
                <q-space />
                <q-input borderless dense debounce="300" color="primary" v-model="filter"
                placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; border-radius: 5px;">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
                </q-input>
                <q-btn flat round dense icon="fas fa-sync-alt" class="q-ml-sm" :color="rColor" size="sm" @click="refresh"></q-btn>
                <q-btn
                flat round dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                class="q-ml-sm"
                />
            </template>
            </q-table> 
        </div>
        <!-- {{getBranches}} -->
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data(){
      return {
        pagination: {
          rowsPerPage: 8
        },
        rColor: 'grey',
        loading: false,
        filter: '',
        columns: [
          { name: 'index', align: 'center', label: 'No#', field: 'index', sortable: true},
          { name: 'branch_name', align: 'center', label: 'Название', field: 'name', sortable: true },
          { name: 'address', align: 'center', label: 'Адрес', field: 'address', sortable: true },
          { name: 'street', align: 'center', label: 'Улица', field: 'street', sortable: true },
          { name: 'city', align: 'center', label: 'Город', field: 'city', sortable: true },
          { name: 'status', align: 'center', label: 'Статус', field: 'status', sortable: true },
          { name: 'contact_person', align: 'center', label: 'Контактное лицо', field: 'contact_person', sortable: true },
          { name: 'contact_phone', align: 'center', label: 'Контактный телефон', field: 'contact_phone', sortable: true },
          { name: 'actions', label: 'Действия', field: '', align:'center' },
        ],
        data: [],
      }
    },
    watch: {
    
    },
    async mounted(){
      await this.refresh();
    },
    computed:{
      ...mapGetters([
        'GET_ALL_BRANCHES'
      ])
    },
    methods: {
      ...mapActions([
        'FETCH_ALL_BRANCHES'
      ]),
      async refresh(){
        this.rColor = 'blue';
        this.loading = true;
        await this.FETCH_ALL_BRANCHES();
        this.data = await this.GET_ALL_BRANCHES;
        this.loading = false;
        this.rColor = 'grey';
      },
    }
}
</script>

<style scoped>    
/* .backBtn{
  opacity: 0.0001;
}
.backBtn:hover{
  opacity: 1;
} */
</style>
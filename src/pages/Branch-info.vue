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
            >
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
                    <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="fas fa-info-circle"></q-btn>
                </q-td>
            </template>
            <template v-slot:top="props">
                <span class="text-h6">Лекарства</span>
                <!-- <q-btn color="green" :disable="loading" label="Добавить" @click="addRow = !addRow" /> -->
                <!-- <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" /> -->
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
      row: {
        index: '',
        branch_name: '',
        city: '',
        owner: '',
        status: '',
      },
      loading: false,
      filter: '',
      columns: [
        { name: 'index', align: 'center', label: 'No#', field: 'index', sortable: true},
        { name: 'medicine_name', align: 'center', label: 'Название лекарства', field: 'medicine_name', sortable: true },
        { name: 'quantity', align: 'center', label: 'Кол-во', field: 'quantity', sortable: true },
        { name: 'price', align: 'center', label: 'Цена', field: 'price', sortable: true },
       
        { name: 'actions', label: 'Действия', field: '', align:'center' },
      ],
      data: [
          {index: 1, medicine_name: 'Ношпа', quantity: '10', price: '400000'},
          {index: 2, medicine_name: 'Ношпа', quantity: '15', price: '400000'},
          {index: 3, medicine_name: 'Ношпа', quantity: '12', price: '400000'},
          {index: 4, medicine_name: 'Ношпа', quantity: '13', price: '400000'},
          {index: 5, medicine_name: 'Ношпа', quantity: '15', price: '400000'},
          {index: 6, medicine_name: 'Ношпа', quantity: '20', price: '400000'},
          {index: 7, medicine_name: 'Ношпа', quantity: '29', price: '400000'},
          {index: 8, medicine_name: 'Ношпа', quantity: '134', price: '400000'},
          {index: 9, medicine_name: 'Ношпа', quantity: '14', price: '400000'},
          {index: 10, medicine_name: 'Ношпа', quantity: '16', price: '400000'},
      ],
      }
    },
    mounted(){
      this.GET_BRANCHES();
    },
    computed:{
      ...mapGetters([
        'getBranches', 'getUser'
      ])
    },
    methods: {
      ...mapActions([
          'GET_BRANCHES',
      ]),
    }
}
</script>

<style scoped>

</style>
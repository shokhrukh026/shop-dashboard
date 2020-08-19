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
            :rows-per-page-options="[0]"
            :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => firstRowIndex + '-' + endRowIndex + ' из ' + totalRowsNumber"

            >
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
                    <q-btn dense round flat color="grey" :to="{ name: 'history-info', params: {id: props.row.id}}"  icon="fas fa-info-circle"></q-btn>
                    <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete" v-if="props.row.is_received == 'ложь'"></q-btn>
                </q-td>
            </template>
            <template v-slot:top="props">
                <span class="text-h6">История приходов</span>
                <!-- <q-btn color="green" :disable="loading" label="Добавить" @click="addRow = !addRow" /> -->
                <!-- <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" /> -->
                <q-space />
                <!-- <q-input borderless dense debounce="300" color="primary" v-model="filter"
                  placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; border-radius: 5px;">
                  <template v-slot:append>
                      <q-icon name="search" />
                  </template>
                </q-input> -->
               <!-- <form @submit.prevent.stop="getSearchResultByFilter"  class="row">
                  <q-input square borderless dense debounce="500" color="primary" v-model="filter"  
                  placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; min-width: 20vw;">
                  </q-input>
                  <q-btn flat square color="white" class="bg-blue" style="border-radius: 0px;" type="submit">
                    <q-icon name="search" />  
                  </q-btn>
                </form> -->
                <q-btn
                flat round dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                class="q-ml-md"
                />
            </template>
            </q-table>
        </div>
        {{data}}

         <q-dialog v-model="deleteRowVar">
             <q-card style="width: 300px">
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
                 <q-btn flat label="Да" v-close-popup @click="deleteArrival" />
               </q-card-actions>
             </q-card>
           </q-dialog>

    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data(){
      return {
      rowsNumber: '',
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
      rowDelete: {},
      deleteRowVar: false,
      filter: '',
      columns: [
        { name: 'index', align: 'center', label: '№', field: 'index', sortable: true},
        { name: 'id', align: 'center', label: 'Идентификатор', field: 'id', sortable: true },
        { name: 'branch_name', align: 'center', label: 'Филиал', field: 'branch_name', sortable: true },
        { name: 'is_received', align: 'center', label: 'Получено', field: 'is_received', sortable: true },
        { name: 'added_at', align: 'center', label: 'Добавлено в', field: 'added_at', sortable: true },
        { name: 'received_at', align: 'center', label: 'Получено в', field: 'received_at', sortable: true },

       
        { name: 'actions', label: 'Действия', field: '', align:'center' },
      ],
      data: [
          // {index: 1, medicine_name: 'Ношпа', quantity: '10', price: '400000'},
          // {index: 2, medicine_name: 'Ношпа', quantity: '15', price: '400000'},
      ],
      }
    },
    watch:{
  
    },
    async mounted(){
      this.data = await this.GET_ARRIVAL_ALL();
      
      
    },
    computed:{
      ...mapGetters([
        'getArrivalAll',
      ])
    },
    methods: {
      ...mapActions([
          'GET_ARRIVAL_ALL', 'DELETE_ARRIVAL_FROM_HISTORY'
      ]),
      deleteRow(props){
        console.log(props.row);
        this.rowDelete = props.row
        this.deleteRowVar = !this.deleteRowVar
      },
      async deleteArrival(){
        await this.DELETE_ARRIVAL_FROM_HISTORY({arrival_id: this.rowDelete.id});
        this.data = [];
        this.data = await this.GET_ARRIVAL_ALL();
      }
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
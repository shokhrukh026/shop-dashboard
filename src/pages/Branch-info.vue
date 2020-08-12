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
            :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => firstRowIndex + '-' + endRowIndex + ' из ' + rowsNumber"

            >
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
                    <q-btn dense round flat color="grey" :to="{ name: 'branch-info-detail', params: {business_medicine_id: props.row.business_medicine_id, branch_id: id}}"  icon="fas fa-info-circle"></q-btn>
                </q-td>
            </template>
            <template v-slot:top="props">
                <span class="text-h6">Лекарства</span>
                <!-- <q-btn color="green" :disable="loading" label="Добавить" @click="addRow = !addRow" /> -->
                <!-- <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" /> -->
                <q-space />
               <form @submit.prevent.stop="getSearchResultByFilter"  class="row">
                  <q-input square borderless dense debounce="500" color="primary" v-model="filter"  
                  placeholder="Искать" style="border: 1px solid silver; padding: 0px 5px; min-width: 20vw;">
                    <!-- <template v-slot:append>
                        <q-icon name="search" />
                    </template> -->
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
        {{getMedicinesByBranch}}
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    props: {
      id: {
        type: Number,
        required: true
      }
    },
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
      filter: '',
      columns: [
        { name: 'index', align: 'center', label: 'No#', field: 'index', sortable: true},
        { name: 'products', align: 'center', label: 'Лекарство', field: 'title', sortable: true },
        { name: 'barcode', align: 'center', label: 'Штрих-код', field: 'barcode', sortable: true },
        { name: 'country', align: 'center', label: 'Страна', field: 'country', sortable: true },
        { name: 'manufacture', align: 'center', label: 'Производитель', field: 'manufacture', sortable: true },
        { name: 'serial_code', align: 'center', label: 'Серийный номер', field: 'serial_code', sortable: true },
        // { name: 'capacity', align: 'center', label: 'Вместимость', field: 'capacity', sortable: true },
        // {
        //   name: 'name',
        //   required: true,
        //   label: 'Покупатель',
        //   align: 'left',
        //   field: row => row.name,
        //   format: val => ${val},
        //   sortable: true
        // },
        { name: 'total_quantity', align: 'center', label: 'Кол-во', field: 'total_quantity', sortable: true },
        // { name: 'left_quantity', align: 'center', label: 'Остаток', field: 'left_quantity', sortable: true },
        { name: 'vat', align: 'center', label: 'НДС', field: 'vat', sortable: true },
        { name: 'sold_quantity', align: 'center', label: 'Продажи за 30 дней', field: 'sold_quantity', sortable: true },
       
        { name: 'actions', label: 'Действия', field: '', align:'center' },
      ],
      data: [
          // {index: 1, medicine_name: 'Ношпа', quantity: '10', price: '400000'},
          // {index: 2, medicine_name: 'Ношпа', quantity: '15', price: '400000'},
          // {index: 3, medicine_name: 'Ношпа', quantity: '12', price: '400000'},
          // {index: 4, medicine_name: 'Ношпа', quantity: '13', price: '400000'},
          // {index: 5, medicine_name: 'Ношпа', quantity: '15', price: '400000'},
          // {index: 6, medicine_name: 'Ношпа', quantity: '20', price: '400000'},
          // {index: 7, medicine_name: 'Ношпа', quantity: '29', price: '400000'},
          // {index: 8, medicine_name: 'Ношпа', quantity: '134', price: '400000'},
          // {index: 9, medicine_name: 'Ношпа', quantity: '14', price: '400000'},
          // {index: 10, medicine_name: 'Ношпа', quantity: '16', price: '400000'},
      ],
      }
    },
    watch:{
      // data: {
      //   handler: function (val, oldVal) {
      //     this.data.forEach((row, index) => {
      //       row.index = index + 1
      //     })
      //   },
      //   deep: true
      // }
    },
    async mounted(){
      await this.GET_BRANCHES();
      // this.$set(this.data, this.data.length, )
      const answer = await this.GET_MEDICINES_BY_BRANCH({virtual_number: this.id});
      // console.log(answer.data);
      for(let i = 0; i < answer.data.results.length; i++ ){
        this.$set(this.data, this.data.length, answer.data.results[i]);
      }
    },
    computed:{
      ...mapGetters([
        'getBranches', 'getUser', 'getMedicinesByBranch'
      ])
    },
    methods: {
      ...mapActions([
          'GET_BRANCHES', 'GET_MEDICINES_BY_BRANCH', 'GET_SEARCH_RESULT_BY_BRANCH'
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
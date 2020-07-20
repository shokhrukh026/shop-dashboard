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
                    <q-btn dense round flat color="grey" to="/branch-update" icon="edit"></q-btn>
                    <q-btn dense round flat color="grey" to="/branch-info" icon="fas fa-info-circle"></q-btn>
                </q-td>
            </template>
            <template v-slot:top="props">
                <span class="text-h6">Филиалы</span>
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
        { name: 'branch_name', align: 'center', label: 'Имя Филиала', field: 'branch_name', sortable: true },
        { name: 'city', align: 'center', label: 'Город', field: 'city', sortable: true },
        { name: 'owner', align: 'center', label: 'Владелец', field: 'owner', sortable: true },
        { name: 'status', align: 'center', label: 'Статус', field: 'status', sortable: true },
       
        { name: 'actions', label: 'Действия', field: '', align:'center' },
      ],
      data: [
          {index: 1, branch_name: 'Арзон аптека #1', city: 'Тошкент', owner: 'Шоазиз', status: 'новый'},
          {index: 2, branch_name: 'Арзон аптека #2', city: 'Тошкент', owner: 'Жахонгир', status: 'новый'},
          {index: 3, branch_name: 'Арзон аптека #3', city: 'Бухоро', owner: 'Бехруз', status: 'новый'},
          {index: 4, branch_name: 'Арзон аптека #4', city: 'Самарканд', owner: 'Жавохир', status: 'новый'},
          {index: 5, branch_name: 'Арзон аптека #5', city: 'Жиззах', owner: 'Улугбек', status: 'новый'},
          {index: 6, branch_name: 'Арзон аптека #6', city: 'Тошкент вилояти', owner: 'Фарход', status: 'новый'},
          {index: 7, branch_name: 'Арзон аптека #7', city: 'Тошкент вилояти', owner: 'Шохрух', status: 'новый'},
          {index: 8, branch_name: 'Арзон аптека #8', city: 'Тошкент вилояти', owner: 'Олим ака', status: 'новый'},
          {index: 9, branch_name: 'Арзон аптека #9', city: 'Тошкент вилояти', owner: 'Олим ака', status: 'новый'},
          {index: 10, branch_name: 'Арзон аптека #10', city: 'Тошкент вилояти', owner: 'Олим ака', status: 'новый'},
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
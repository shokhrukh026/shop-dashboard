<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-md">
      <div class="row justify-end q-mb-xs">
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
          :rows-per-page-options="[0]"
          style="min-width: 70vw;"
          class="col-12"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
            </q-td>
          </template>
          <template v-slot:top="props">
            <span class="text-subtitle1">Все Продукты</span>
            <q-space />
            <q-btn
              flat round dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              class="q-ml-md"
            />
          </template>
        </q-table>
        <q-btn color="blue" class="q-my-sm" @click="distribute" :disable="data.length == 0">Распределить</q-btn>
      </div>


      <!-- {{data}} -->
      <q-dialog v-model="deleteRowVar">
        <q-card>
          <q-card-section class="bg-warning">
            <div class="text-h6 text-white">Удаление</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pt-none q-pa-lg">
            Вы всерьёз хотите удалить лекарство?
          </q-card-section>
          <q-separator />
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="Нет" v-close-popup />
            <q-btn flat label="Да" v-close-popup  @click="deleteProcess"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>


<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    data(){
      return {
        pagination: {
          rowsPerPage: 4,
          page: 1,
        },
        deleteRowVar: false,
        rowDelete: {},
        loading: false,
        filter: '',
        columns: [
          { name: 'index', align: 'center', label: 'No#', field: 'index', sortable: true},
          { name: 'branch_name', align: 'center', label: 'Филиал', field: 'branch_name', sortable: true },
          { name: 'title', align: 'center', label: 'Лекарство', field: 'title', sortable: true },
          { name: 'quantity', align: 'center', label: 'Кол-во', field: 'quantity', sortable: true },
          { name: 'actions', label: 'Действия', field: '', align:'center' },
        ],
        data: [],
      }
    },

    async mounted(){
        this.loading =  true;
        await this.FETCH_CART_LIST();
        this.data =  this.getCartList;
        this.loading =  false;
    },
    computed:{
      ...mapGetters([
        'getCartList',
      ])
    },
    methods: {
      ...mapActions([
        'FETCH_CART_LIST', 'DELETE_CART_ITEM'
      ]),
      async deleteRow(props){
        this.deleteRowVar = !this.deleteRowVar
        this.rowDelete = props.row
      },
      async deleteProcess(){

        await this.DELETE_CART_ITEM(this.rowDelete.cart_id);
        this.data = [];
        this.data = await this.FETCH_CART_LIST();
        await this.$emit('medicines', false);
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Успешно удалено!'
        })
      },
      async distribute(){
        await this.ADD_ARRIVAL_ALL();
        await this.$emit('medicines', 'distribute_all');
        this.data = [];
        this.data = await this.FETCH_CART_LIST();
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Успешно распределено!'
        })
      }

    }
  }
</script>

<style scoped>

</style>

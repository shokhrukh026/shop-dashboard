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
            <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
          </q-td>
        </template>
        <template v-slot:top="props">
          <span class="text-h6">История приходов</span>
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
    <!-- {{data}} -->

    <q-dialog v-model="deleteRowVar">
      <q-card>
        <q-card-section class="bg-negative">
          <div class="text-h6 text-white">Удаление</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-none q-pa-lg">
          - Вы уверены, что хотите удалить историю? 
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Нет" v-close-popup />
          <q-btn flat label="Да" v-close-popup @click="deleteArrival" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  {{data}}
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      rColor: 'grey',
      pagination: {
        rowsPerPage: 9,
      },
      loading: false,
      rowDelete: {},
      deleteRowVar: false,
      filter: '',
      columns: [
        {
          name: "id",
          align: "center",
          label: "Идентификатор",
          field: "id",
          sortable: true,
        },
        {
          name: "branch_name",
          align: "center",
          label: "Филиал",
          field: "branch_name",
          sortable: true,
        },
        {
          name: "is_received",
          align: "center",
          label: "Получено",
          field: "is_received",
          sortable: true,
        },
        {
          name: "added_at",
          align: "center",
          label: "Добавлено в",
          field: "added_at",
          sortable: true,
        },
        {
          name: "received_at",
          align: "center",
          label: "Получено в",
          field: "received_at",
          sortable: true,
        },

        { name: "actions", label: "Действия", field: "", align: "center" },
      ],
      data: [],
    };
  },
  async mounted() {
    await this.refresh();
  },
  computed:{
    ...mapGetters([
      'getArrivalAll',
    ])
  },
  methods: {
    ...mapActions([
      'FETCH_ARRIVAL_ALL', 'DELETE_ARRIVAL_FROM_HISTORY'
    ]),
    async refresh(){
      this.rColor = 'blue';
      this.loading = true;
      this.data = await this.FETCH_ARRIVAL_ALL();
      this.loading = false;
      this.rColor = 'grey';
    },
    deleteRow(props){
      this.rowDelete = props.row;
      this.deleteRowVar = !this.deleteRowVar;
    },
    async deleteArrival(){
      let response = await this.DELETE_ARRIVAL_FROM_HISTORY(this.rowDelete.id);
      if(response.success){
        this.$q.notify({
          message: 'Успешно удалено!',
          color: 'green'
        })
      }else{
        this.$q.notify({
          message: 'Ошибка!',
          color: 'negative'
        })
      }
      this.data = [];
      this.data = await this.FETCH_ARRIVAL_ALL();
    }

  }
};

</script>

<style scoped></style>

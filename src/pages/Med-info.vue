<template>
    <q-page class="bg-grey-3">
        <div class="q-pa-md">
             <q-list bordered separator class="bg-white shadow-1">
               <q-item v-ripple>
                 <q-item-section>
                     <q-item-label class="text-h5">Название лекарства : <span class="text-h6 text-bold">&nbsp;{{getMedicines.title}}</span></q-item-label>
                     <q-item-label class="text-subtitle2 text-bold text-grey-6">Описание: <span class="text-black text-weight-medium">&nbsp;{{getMedicines.description}}</span></q-item-label> 
                 </q-item-section>
               </q-item>

               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6">Штрих-код: <span class="text-h6">&nbsp;{{getMedicines.barcode}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6">Страна: <span class="text-h6">&nbsp;{{getMedicines.country}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6">Производитель: <span class="text-h6">&nbsp;{{getMedicines.manufacture}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6">Серийный номер: <span class="text-h6">&nbsp;{{getMedicines.serial_code}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6">НДС: <span class="text-h6">&nbsp;{{getMedicines.vat}}%</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6">Общее количество в бизнесе: <span class="text-h6">&nbsp;{{getMedicines.total_quantity}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6">Оставшееся количество в бизнесе: <span class="text-h6">{{getMedicines.left_quantity}}</span></q-item-label>
                 </q-item-section>
               </q-item>
             </q-list>


                   {{getMedicines}}

            <div class="q-mt-lg">
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
        </div>
        {{getMedicinesInfo}}
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data(){
        return{
          // this should be commented
            getMedicines: {title: '', barcode: '', country: '', manufacture: '', serial_code: '', vat: '', total_quantity: '', left_quantity: ''},
            pagination: {
              rowsPerPage: 8
            },
            loading: false,
            filter: '',
            columns: [
                { name: 'index', align: 'center', label: '№', field: 'index', sortable: true},
                { name: 'expire_date', align: 'center', label: 'Годен до', field: 'expire_date', sortable: true },

                { name: 'total_quantity', align: 'center', label: 'Общее кол-во', field: 'total_quantity', sortable: true },
                { name: 'left_quantity', align: 'center', label: 'Остаток', field: 'left_quantity', sortable: true },
                { name: 'purchase_price', align: 'center', label: 'Цена покупки', field: 'purchase_price', sortable: true },
                { name: 'selling_price', align: 'center', label: 'Цена продажи', field: 'selling_price', sortable: true },

                { name: 'actions', label: 'Действия', field: '', align:'center' },
            ],
            data: [
            ],  
            
        }
    },
    async mounted(){
      await this.GET_MEDICINES();
      const answer = await this.GET_MEDICINE_INFO();
      this.getMedicines.title = answer.data.title;
      this.getMedicines.description = answer.data.description;
      this.getMedicines.barcode = answer.data.barcode;
      this.getMedicines.country = answer.data.country;
      this.getMedicines.manufacture = answer.data.manufacture;
      this.getMedicines.serial_code = answer.data.serial_code;
      this.getMedicines.vat = answer.data.vat;
      this.getMedicines.total_quantity = answer.data.total_quantity;
      this.getMedicines.left_quantity = answer.data.left_quantity;

      for(let i = 0; i < answer.data.medicines_info.length; i++ ){
        this.$set(this.data, this.data.length, answer.data.medicines_info[i]);
      }
    },
    computed:{
      ...mapGetters([
        '', 'getUser', 'getMedicinesInfo'
      ])
    },
    methods: {
      ...mapActions([
          'GET_MEDICINES', 'GET_MEDICINE_INFO'
      ]),
    }
}
</script>

<style scoped>

</style>
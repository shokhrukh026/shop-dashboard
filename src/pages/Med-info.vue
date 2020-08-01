<template>
    <q-page class="bg-grey-3">
        <div class="q-pa-md">
             <q-list bordered separator class="bg-white shadow-1">
               <q-item v-ripple>
                 <q-item-section>
                     <q-item-label class="text-subtitle2">Название лекарства : <span class="text-body2">{{getMedicines[0].title}}</span></q-item-label>
                     <q-item-label caption>Описание: {{getMedicines[0].description}}</q-item-label>
                 </q-item-section>
               </q-item>

               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-subtitle2">Штрих-код: <span class="text-body2">{{getMedicines[0].barcode}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-subtitle2">Страна: <span class="text-body2">{{getMedicines[0].country}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-subtitle2">Производитель: <span class="text-body2">{{getMedicines[0].manufacture}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-subtitle2">Серийный номер: <span class="text-body2">{{getMedicines[0].serial_code}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-subtitle2">НДС: <span class="text-body2">{{getMedicines[0].vat}}%</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-subtitle2">Общее количество в бизнесе: <span class="text-body2">{{getMedicines[0].total_quantity}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-subtitle2">Оставшееся количество в бизнесе: <span class="text-body2">{{getMedicines[0].left_quantity}}</span></q-item-label>
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
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data(){
        return{
          // this should be commented
            getMedicines: [
              {title: 'sad', Barcode: 12345689, Country: 'Russia', Manufacture: 'Company LLC', "Serial Code": 'serial code', Vat: '15.0 %',
            "Total Quantity in Business": '1 упаковок по (10) + 0 шт', "Left Quantity in Busuness": '2 упаковок по (10) + 0 шт'}
            ],
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
                {index: 1, expire_date: 'Арзон аптека #1', total_quantity: 'Тошкент', left_quantity: 'Шоазиз', purchase_price: 'новый', selling_price: '10 000'},
            ],
            
        }
    },
    async mounted(){
      await this.GET_MEDICINES();
    },
    computed:{
      ...mapGetters([
        'getMedicines', 'getUser'
      ])
    },
    methods: {
      ...mapActions([
          'GET_MEDICINES',
      ]),
    }
}
</script>

<style scoped>

</style>
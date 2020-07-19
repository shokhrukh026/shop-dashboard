<template>
    <q-page class="bg-grey-3">
        <div class="q-pa-md">
             <q-list bordered separator class="bg-white shadow-1">
               <q-item v-ripple>
                 <q-item-section>
                     <q-item-label class="text-subtitle2">Medicine Title : <span class="text-body2">Noshpa</span></q-item-label>
                     <q-item-label caption>Description: d</q-item-label>
                 </q-item-section>
               </q-item>

               <q-item v-ripple v-for="(elem,name, item) in info" :key="item">
                 <q-item-section>
                   <q-item-label class="text-subtitle2">{{name}}: <span class="text-body2">{{elem}}</span></q-item-label>
                 </q-item-section>
               </q-item>
             </q-list>


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
export default {
    data(){
        return{
            info:{ Barcode: 12345689, Country: 'Russia', Manufacture: 'Company LLC', "Serial Code": 'serial code', Vat: '15.0 %',
            "Total Quantity in Business": '1 упаковок по (10) + 0 шт', "Left Quantity in Busuness": '2 упаковок по (10) + 0 шт'},


            columns: [
                { name: 'index', align: 'center', label: 'No#', field: 'index', sortable: true},
                { name: 'expire_date', align: 'center', label: 'Date of expire', field: 'expire_date', sortable: true },

                { name: 'total_quantity', align: 'center', label: 'Total quantity', field: 'total_quantity', sortable: true },
                { name: 'left_quantity', align: 'center', label: 'Left quantity', field: 'left_quantity', sortable: true },
                { name: 'purchase_price', align: 'center', label: 'Purchase price', field: 'purchase_price', sortable: true },
                { name: 'selling_price', align: 'center', label: 'Selling price', field: 'selling_price', sortable: true },

                { name: 'actions', label: 'Действия', field: '', align:'center' },
            ],
            data: [
                {index: 1, expire_date: 'Арзон аптека #1', total_quantity: 'Тошкент', left_quantity: 'Шоазиз', purchase_price: 'новый', selling_price: '10 000'},
                {index: 2, expire_date: 'Арзон аптека #2', total_quantity: 'Тошкент', left_quantity: 'Жахонгир', purchase_price: 'новый', selling_price: '10 000'},
                {index: 3, expire_date: 'Арзон аптека #3', total_quantity: 'Бухоро', left_quantity: 'Бехруз', purchase_price: 'новый', selling_price: '10 000'},
                {index: 4, expire_date: 'Арзон аптека #4', total_quantity: 'Самарканд', left_quantity: 'Жавохир', purchase_price: 'новый', selling_price: '10 000'},
                {index: 5, expire_date: 'Арзон аптека #5', total_quantity: 'Жиззах', left_quantity: 'Улугбек', purchase_price: 'новый', selling_price: '10 000'},
                {index: 6, expire_date: 'Арзон аптека #6', total_quantity: 'Тошкент вилояти', left_quantity: 'Фарход', purchase_price: 'новый', selling_price: '10 000'},
                {index: 7, expire_date: 'Арзон аптека #7', total_quantity: 'Тошкент вилояти', left_quantity: 'Шохрух', purchase_price: 'новый', selling_price: '10 000'},
                {index: 8, expire_date: 'Арзон аптека #8', total_quantity: 'Тошкент вилояти', left_quantity: 'Олим ака', purchase_price: 'новый', selling_price: '10 000'},
                {index: 9, expire_date: 'Арзон аптека #9', total_quantity: 'Тошкент вилояти', left_quantity: 'Олим ака', purchase_price: 'новый', selling_price: '10 000'},
                {index: 10, expire_date: 'Арзон аптека #10', total_quantity: 'Тошкент вилояти', left_quantity: 'Олим ака', purchase_price: 'новый', selling_price: '10 000'},
            ],
            
        }
    }
}
</script>

<style scoped>

</style>
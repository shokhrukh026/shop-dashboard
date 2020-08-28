<template>
        <q-card>
               <q-card-section class="bg-blue row">
                 <div class="text-h6 text-white">Добавить лекарство</div>
                 <q-space></q-space>
                 <q-btn icon="close" color="white" flat round dense v-close-popup />
               </q-card-section>

                     <q-tabs
                      v-model="tab"
                      dense
                      no-caps
                      inline-label
                      align="justify"
                      :breakpoint="0"
                      class="bg-blue text-white shadow-2"
                    >
                      <q-tab name="old" icon="fas fa-tablets" label="Существующее Лекарство" />
                      <q-tab name="new" icon="fas fa-pills" label="Новое лекарство" />
                    </q-tabs>

                    <q-tab-panels v-model="tab" animated>
                      <q-tab-panel name="old">

                      
               <q-card-section class="row">
                
              <q-list class="row col-8">
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                      <q-select
                        label="Название"
                        outlined
                        dense
                        v-model="medicine_add.title"
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="800"
                        :options="title_options"
                        @new-value="createTitleValue"
                        @filter="filterTitle"
                        color="blue"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              Нет результатов
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:append>
                          <q-icon v-if="medicine_add.title !== null" class="cursor-pointer" name="clear"
                            @click.stop="medicine_add.title = null" />
                        </template>
                      </q-select>
                      
               
                     </q-item-section>
                   </q-item>
                    
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                        <q-select
                        label="Штрих-код"
                        outlined
                        dense
                        v-model="medicine_add.barcode"
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="500"
                        @new-value="createBarcodeValue"
                        :options="barcode_options"
                        @keyup.enter="filterBarcode"
                        color="blue"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              Нет результатов
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:append>
                          <q-icon v-if="medicine_add.barcode !== null" class="cursor-pointer" name="clear"
                            @click.stop="medicine_add.barcode = null" />
                        </template>
                      </q-select>

                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add.country" label="Страна" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add.manufacture" label="Производитель" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add.serial_code" label="Серийный номер" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add.capacity" label="Вместимость" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add.vat" label="НДС" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-input color="blue" outlined autogrow dense v-model="medicine_add.description" label="Описание" />
                      </q-item-section>
                    </q-item>              
                 </q-list>




                <q-list class="col">
                  
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add.quantity" label="Кол-во упаковок" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12" :disable="medicine_add.capacity == 1">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add.piece" label="Кол-во штук" />
                     </q-item-section>
                   </q-item>
                    <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add.purchase_price" label="Цена покупки" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add.selling_price" label="Цена продажи" />
                     </q-item-section>
                   </q-item>

                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>

                       <q-input dense color="blue" outlined v-model="medicine_add.expire_date" label="Годен до">
                         <template v-slot:append>
                           <q-icon name="event" class="cursor-pointer">
                             <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                               <q-date color="blue" outlined mask="YYYY-MM-DD" today-btn v-model="medicine_add.expire_date" @input="() => $refs.qDateProxy.hide()"/>
                             </q-popup-proxy>
                           </q-icon>
                         </template>
                       </q-input>

                     </q-item-section>
                   </q-item>
                   
                 </q-list>
                 <div class="row col-12 justify-end q-px-md">
                  <q-btn class="text-capitalize bg-blue text-white" @click="addMedicine">Добавить</q-btn>
                 </div>
                 <!-- {{medicine_add}} -->

               </q-card-section>

                </q-tab-panel>

                <q-tab-panel name="new">





<q-card-section class="row">

  <q-list class="row col-8">
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                      <q-input
                        label="Название"
                        outlined
                        dense
                        v-model="medicine_add_new.title"
                        color="blue"
                      >
                      
                      </q-input>
                      
               
                     </q-item-section>
                   </q-item>
                    
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                        <q-input
                        label="Штрих-код"
                        outlined
                        dense
                        v-model="medicine_add_new.barcode"
                        color="blue"
                      >

                      </q-input>
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add_new.country" label="Страна" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add_new.manufacture" label="Производитель" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add_new.serial_code" label="Серийный номер" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add_new.capacity" label="Вместимость" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add_new.vat" label="НДС" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-input color="blue" outlined autogrow dense v-model="medicine_add_new.description" label="Описание" />
                      </q-item-section>
                    </q-item>              
                 </q-list>








               <q-list class="col">
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add_new.quantity" label="Кол-во упаковок" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12" :disable="medicine_add_new.capacity == 1">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add_new.piece" label="Кол-во штук" />
                     </q-item-section>
                   </q-item>
                    <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add_new.purchase_price" label="Цена покупки" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add_new.selling_price" label="Цена продажи" />
                     </q-item-section>
                   </q-item>

                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>

                       <q-input dense color="blue" outlined v-model="medicine_add_new.expire_date" label="Годен до">
                         <template v-slot:append>
                           <q-icon name="event" class="cursor-pointer">
                             <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                               <q-date color="blue" outlined mask="YYYY-MM-DD" today-btn v-model="medicine_add_new.expire_date" @input="() => $refs.qDateProxy.hide()"/>
                             </q-popup-proxy>
                           </q-icon>
                         </template>
                       </q-input>

                     </q-item-section>
                   </q-item>
               
                 </q-list>
                 <div class="row col-12 justify-end q-px-md">
                  <q-btn class="text-capitalize bg-blue text-white" @click="addNewMedicine">Добавить</q-btn>
                 </div>
             </q-card-section>
                 <!-- {{medicine_add_new}} -->

                </q-tab-panel>
              </q-tab-panels>



             </q-card>
   
</template>


<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    data(){
        return {
            title_options: [],
            barcode_options: [],
            tab: 'old',
            response: [],
            medicine_add: {title: '', barcode: '', country: '', manufacture: '', serial_code: '', capacity: '', quantity: '',
              piece: '', vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''},
            medicine_add_new: {title: '', barcode: '', country: '', manufacture: '', serial_code: '', capacity: '', quantity: '',
              piece: '', vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''},
        }
    },
    watch:{
      'medicine_add.capacity': function (newVal, oldVal) {
        if (newVal <= 1) {
          this.medicine_add.piece = ''
        }
      },
      'medicine_add.title': function (newVal, oldVal) {
        if (newVal != '') {
          Object.assign(this.medicine_add, {title: this.medicine_add.title, barcode: this.response[0].barcode, 
          country: this.response[0].country, manufacture: this.response[0].manufacture, serial_code: this.response[0].serial_code,
          capacity: this.response[0].capacity});
        }
      },
      'medicine_add.barcode': function (newVal, oldVal) {
        if (newVal != '') {
          Object.assign(this.medicine_add, {title: this.response[0].title, barcode: this.medicine_add.barcode, 
          country: this.response[0].country, manufacture: this.response[0].manufacture, serial_code: this.response[0].serial_code,
          capacity: this.response[0].capacity});
        }
      },
    },
    computed:{
      ...mapGetters([
        ''
      ]),
    },
    methods:{
       ...mapActions([
        'GET_SEARCH_RESULT_ALL_MEDICINES', 'GET_SEARCH_RESULT_ADD_MEDICINE', 'ADD_MEDICINES'
      ]),
       async filterTitle (val, update, abort) {
        if(val.length >= 2){

          this.response = await this.GET_SEARCH_RESULT_ADD_MEDICINE({value: val, type: 'title'});
          setTimeout(async() => {
          await update(async () => {
            // console.log(this.response);
            for(let i = 0; i < this.response.length; i++){
              await this.$set(this.title_options, i, this.response[i].title);
            }
            if(this.title_options.length > this.response.length){
              while(this.title_options.length > this.response.length){
                this.title_options.pop();
              }
            }
            if(this.response.length == 0){
              console.log('Array is empty!');
            }
          })
          }, 200);

        }
      },
      async filterBarcode(){
        this.response = await this.GET_SEARCH_RESULT_ADD_MEDICINE({value: this.medicine_add.barcode, type: 'barcode'});
        console.log(this.response);
        this.barcode_options = [];
        for(let i = 0; i < this.response.length; i++){
          this.$set(this.barcode_options, i, this.response[i].barcode);
        }
      },
      createTitleValue (val, done) {
        if (val.length > 0) {
          if (!this.title_options.includes(val)) {
            this.$set(this.title_options, this.title_options.length, val);
            console.log(this.title_options);
          }
          done(val, 'toggle')
        }
      },
      createBarcodeValue (val, done) {
        if (val.length > 0) {
          if (!this.barcode_options.includes(val)) {
            this.$set(this.barcode_options, this.barcode_options.length, val);
            // this.barcode_options.push(val);
            console.log(this.barcode_options);
          }
          done(val, 'toggle')
        }
      },
      async addMedicine(){
        if(this.medicine_add.piece == ''){
          this.medicine_add.piece = 0;
        }else if(this.medicine_add.quantity == ''){
          this.medicine_add.quantity = 0;
        }
        let answer = await this.ADD_MEDICINES(
          {
            title: this.medicine_add.title,
            barcode: this.medicine_add.barcode,
            country: this.medicine_add.country,
            manufacture: this.medicine_add.manufacture,
            serial_code: this.medicine_add.serial_code,
            quantity: this.medicine_add.quantity,
            piece: this.medicine_add.piece,
            capacity: this.medicine_add.capacity,
            vat: this.medicine_add.vat,
            description: this.medicine_add.description,
            purchase_price: this.medicine_add.purchase_price,
            selling_price: this.medicine_add.selling_price,
            expire_date: this.medicine_add.expire_date,
          }
        )
        Object.assign(this.medicine_add, {title: '', barcode: '', country: '', manufacture: '', serial_code: '', capacity: '', quantity: '',
               piece: '', vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''});
        if(answer.status == 'SUCCESS'){
          this.$q.notify({
            message: 'Успешно добавлено!',
            color: 'green'
          })
        }else{
          this.$q.notify({
            message: 'Ошибка!',
            color: 'negative'
          })
        }
      },


      async addNewMedicine(){
        // if(!('piece' in this.medicine_add_new)){
        //   this.medicine_add_new.piece = '';
        // }
        if(this.medicine_add_new.piece == ''){
          this.medicine_add_new.piece = 0;
        }else if(this.medicine_add_new.quantity == ''){
          this.medicine_add_new.quantity = 0;
        }
        let answer = await this.ADD_MEDICINES(
          {
            title: this.medicine_add_new.title,
            barcode: this.medicine_add_new.barcode,
            country: this.medicine_add_new.country,
            manufacture: this.medicine_add_new.manufacture,
            serial_code: this.medicine_add_new.serial_code,
            quantity: this.medicine_add_new.quantity,
            piece: this.medicine_add_new.piece,
            capacity: this.medicine_add_new.capacity,
            vat: this.medicine_add_new.vat,
            description: this.medicine_add_new.description,
            purchase_price: this.medicine_add_new.purchase_price,
            selling_price: this.medicine_add_new.selling_price,
            expire_date: this.medicine_add_new.expire_date,
          }
        )
        Object.assign(this.medicine_add_new, {title: '', barcode: '', country: '', manufacture: '', serial_code: '', capacity: '', quantity: '',
               piece: '', vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''});
        if(answer.status == 'SUCCESS'){
          this.$q.notify({
            message: 'Успешно добавлено!',
            color: 'green'
          })
        }else{
          this.$q.notify({
            message: 'Ошибка!',
            color: 'negative'
          })
        }
      },
    }

}
</script>

<style scoped>

</style>
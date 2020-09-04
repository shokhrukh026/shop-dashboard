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
                        input-debounce="500"
                        :options="title_options"
                        option-value="id"
                        option-label="desc"
                        emit-value
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
                        option-value="id"
                        option-label="desc"
                        @keyup.enter="filterBarcode"
                        color="blue"
                        ref="barcode"
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
                       <q-input  color="blue" outlined dense v-model="medicine_add.type" label="Страна" />
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
                       <q-input  color="blue" outlined dense v-model="medicine_add.category_id" label="Серийный номер" />
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
                       <q-input  color="blue" outlined dense v-model="medicine_add_new.type" label="Страна" />
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
                       <q-input  color="blue" outlined dense v-model="medicine_add_new.category_id" label="Серийный номер" />
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
                       <q-input color="blue" outlined dense v-model="medicine_add_new.quantity" label="Кол-во упаковок" />
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
            medicine_add: {title: '', barcode: '', type: '', country: '', manufacture: '', category_id: '', quantity: '',
            vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''},
            medicine_add_new: {title: '', barcode: '', type: '', country: '', manufacture: '', category_id: '', quantity: '',
            vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''},
        }
    },
    watch:{
      'medicine_add.title': function (newVal, oldVal) {
        if(newVal == null){
          newVal = '';
        }
        if (newVal !== '') {
          // if(!newVal.id){
            //   newVal = {id: 0, desc: ''};
          // }
          Object.assign(this.medicine_add, {title: this.response[newVal], barcode: this.response[newVal], type: this.response[newVal], 
            country: this.response[newVal], manufacture: this.response[newVal], category_id: this.response[newVal], quantity: this.response[newVal],
            vat: this.response[newVal], description: this.response[newVal], purchase_price: this.response[newVal], selling_price: this.response[newVal],
            expire_date: this.response[newVal]});
        }
      },
      'medicine_add.barcode': function (newVal, oldVal) {
        if(newVal == null){
          newVal = '';
        }
        if (newVal !== '') {
          // if(!newVal.id){
          //   newVal = {id: 0, desc: ''};
          // }
          Object.assign(this.medicine_add, {title: this.response[newVal.id], barcode: this.response[newVal.id], type: this.response[newVal.id], 
            country: this.response[newVal.id], manufacture: this.response[newVal.id], category_id: this.response[newVal.id], quantity: this.response[newVal.id],
            vat: this.response[newVal.id], description: this.response[newVal.id], purchase_price: this.response[newVal.id], selling_price: this.response[newVal.id],
            expire_date: this.response[newVal.id]});
         
          this.$refs.barcode.blur();

        }
      },
    },
    computed:{
      ...mapGetters([]),
    },
    methods:{
       ...mapActions([
        'GET_SEARCH_RESULT_ALL_MEDICINES', 'GET_SEARCH_RESULT_ADD_MEDICINE', 'ADD_PRODUCT'
      ]),
       async filterTitle (val, update, abort) {
        if(val.length >= 2){

          this.response = await this.GET_SEARCH_RESULT_ADD_MEDICINE({value: val, type: 'title'});
          setTimeout(async() => {
          await update(async () => {
            for(let i = 0; i < this.response.length; i++){
              await this.$set(this.title_options, i, {id: i, desc: this.response[i].title});
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
          }, 300);

        }
      },
      async filterBarcode(){
        this.response = await this.GET_SEARCH_RESULT_ADD_MEDICINE({value: this.medicine_add.barcode, type: 'barcode'});
        // console.log(this.response);
        setTimeout(async() => {
          if(this.response.length == 1){
            Object.assign(this.medicine_add, {title: this.response[0], barcode: this.response[0], type: this.response[0], 
            country: this.response[0], manufacture: this.response[0], category_id: this.response[0], quantity: this.response[0],
            vat: this.response[0], description: this.response[0], purchase_price: this.response[0], selling_price: this.response[0],
             expire_date: this.response[0]});

            this.$refs.barcode.blur();
          }else{
            this.barcode_options = [];
            for(let i = 0; i < this.response.length; i++){
              this.$set(this.barcode_options, i, {id: i, desc: this.response[i].title});
            }
            this.$refs.barcode.showPopup();
          }
        }, 500);
      },
      
      createTitleValue (val, done) {
        if (val.length > 0) {
          if (!this.title_options.includes(val)) {
            this.$set(this.title_options, this.title_options.length, val);
            // console.log(this.title_options);
          }
          done(val, 'toggle')
        }
      },
      createBarcodeValue (val, done) {
        if (val.length > 0) {
          if (!this.barcode_options.includes(val)) {
            this.$set(this.barcode_options, this.barcode_options.length, val);
            // console.log(this.barcode_options);
          }
          done(val, 'toggle')
        }
      },
      async addMedicine(){
        let answer = await this.ADD_PRODUCT(
          {
            title: this.medicine_add.title,
            barcode: this.medicine_add.barcode,
            type: this.medicine_add.type,
            country: this.medicine_add.country,
            manufacture: this.medicine_add.manufacture,
            category_id: this.medicine_add.category_id,
            quantity: this.medicine_add.quantity,
            vat: this.medicine_add.vat,
            description: this.medicine_add.description,
            purchase_price: this.medicine_add.purchase_price,
            selling_price: this.medicine_add.selling_price,
            expire_date: this.medicine_add.expire_date
          }
        )
        Object.assign(this.medicine_add, {title: '', barcode: '', type: '', country: '', manufacture: '', category_id: '', quantity: '',
              vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''});
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
        let answer = await this.ADD_PRODUCT(
          {
            title: this.medicine_add.title,
            barcode: this.medicine_add.barcode,
            type: this.medicine_add.type,
            country: this.medicine_add.country,
            manufacture: this.medicine_add.manufacture,
            category_id: this.medicine_add.category_id,
            quantity: this.medicine_add.quantity,
            vat: this.medicine_add.vat,
            description: this.medicine_add.description,
            purchase_price: this.medicine_add.purchase_price,
            selling_price: this.medicine_add.selling_price,
            expire_date: this.medicine_add.expire_date
          }
        )
        Object.assign(this.medicine_add, {title: '', barcode: '', type: '', country: '', manufacture: '', category_id: '', quantity: '',
              vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''});
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
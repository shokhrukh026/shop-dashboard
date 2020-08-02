<template>
    <q-page class="bg-grey-3">
        <div class="row q-pa-md">
           <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-mr-md q-mb-md">
             <q-card class="card-bg text-black">
               <q-card-section class="text-h6 bg-blue">
                 <div class="text-h6 text-white">Добавить лекарство</div>
                 <div class="text-subtitle2 text-white">Введите данные лекарства</div>
               </q-card-section>
               <q-card-section class="q-pa-sm">
                 <q-list class="row">
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <!-- <q-select
                        label="Название"
                        outlined
                        dense
                        v-model="medicine_add.title"
                        use-input
                        
                        @keypress="filterFunc"
                        input-debounce="1000"
                        @new-value="createValue"
                        :options="title_options"
                        @filter="filterFn"
                        color="blue"
                      > -->
                      <q-select
                        label="Название"
                        outlined
                        dense
                        v-model="medicine_add.title"
                        use-input
                        
                        hide-selected
                        fill-input
                        
                        input-debounce="100"
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
                       <!-- <q-input color="blue" outlined dense v-model="medicine_add.title" label="Название" /> -->
                       <!-- <q-list bordered separator >
                        <q-item clickable v-ripple>
                          <q-item-section>Single line item</q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                          <q-item-section>
                            <q-item-label>Item with caption</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                          <q-item-section>
                            <q-item-label>Item with caption</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list> -->
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
                        input-debounce="100"
                        :options="barcode_options"
                        @new-value="createBarcodeValue"
                        @filter="filterBarcode"
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
                       <!-- <q-input  color="blue" outlined dense v-model="medicine_add.barcode" label="Штрих-код" /> -->
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
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add.capacity" label="Вместимость" />
                     </q-item-section>
                   </q-item>
                   <!-- <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add[0].vat" label="НДС" />
                     </q-item-section>
                   </q-item> -->
                   <!-- <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add[0].quantity" label="Количество" />
                     </q-item-section>
                   </q-item>
                    <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-input color="blue" outlined autogrow dense v-model="medicine_add[0].description" label="Описание" />
                      </q-item-section>
                    </q-item>
                    <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add[0].purchase_price" label="Цена покупки" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add[0].selling_price" label="Цена продажи" />
                     </q-item-section>
                   </q-item> -->

                   <!-- <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                     <q-item-section>

                       <q-input dense color="blue" outlined v-model="medicine_add[0].expire_date" label="Годен до">
                         <template v-slot:append>
                           <q-icon name="event" class="cursor-pointer">
                             <q-popup-proxy  transition-show="scale" transition-hide="scale">
                               <q-date color="blue" outlined mask="YYYY-MM-DD" today-btn v-model="medicine_add[0].expire_date"/>
                             </q-popup-proxy>
                           </q-icon>
                         </template>
                       </q-input>

                     </q-item-section>
                   </q-item> -->

                 </q-list>
               </q-card-section>
               <q-card-actions align="right">
                 <!-- <q-btn class="text-capitalize bg-blue text-white" @click="addMedicine">Добавить</q-btn> -->
               </q-card-actions>
             </q-card>
           </div>




          <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
             <q-card class="card-bg text-black">
               <q-card-section class="text-h6 bg-blue">
                 <div class="text-h6 text-white">Добавить инфо для лекарства</div>
                 <div class="text-subtitle2 text-white">Введите данные лекарства</div>
               </q-card-section>
               <q-card-section class="q-pa-sm">
                 <q-list class="row">
                   <!-- <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-select
                        label="Название"
                        outlined
                        dense
                        v-model="title"
                        use-input
                        use-chips
                        input-debounce="0"
                        @new-value="createValue"
                        :options="options"
                        @filter="filterFn"
                        color="blue"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                     </q-item-section>
                   </q-item> -->
                  
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add.quantity" label="Количество" />
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

                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>

                       <q-input dense color="blue" outlined v-model="medicine_add.expire_date" label="Годен до">
                         <template v-slot:append>
                           <q-icon name="event" class="cursor-pointer">
                             <q-popup-proxy  transition-show="scale" transition-hide="scale">
                               <q-date color="blue" outlined mask="YYYY-MM-DD" today-btn v-model="medicine_add.expire_date"/>
                             </q-popup-proxy>
                           </q-icon>
                         </template>
                       </q-input>

                     </q-item-section>
                   </q-item>

                 </q-list>
               </q-card-section>
               <q-card-actions align="right">
                 <!-- <q-btn class="text-capitalize bg-blue text-white" @click="addMedicine">Добавить</q-btn> -->
               </q-card-actions>
             </q-card>
           </div>

          <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 row justify-end q-mt-sm">
              <q-btn class="text-capitalize bg-blue text-white" @click="addMedicine" size="lg">Добавить</q-btn>
          </div>

           <!-- <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <q-btn color="blue" icon="add" label="Добавить информацию о лекарстве" @click="addInfoForMedicine"/>
           </div>
           
              

              <div class="q-pt-sm"  style="max-width: 20vw; min-width: 20vw;" v-for="(medInfo,item) in medicine_info_add" :key="item">
                 <div class="col-lg-5 col-md-5 col-xs-5 col-sm-12 q-mr-sm">
                <q-list bordered class="rounded-borders bg-blue" dark>
                  <q-expansion-item expand-separator icon="info" :label="'Информация о лекарстве #' + (item + 1)  " caption="Введите данные лекарства">
                    <q-card>
                      <q-card-section>

                        <q-list class="row">
                          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <q-item-section>
                              <q-select label="Название" outlined dense v-model="title" use-input use-chips
                                input-debounce="0" @new-value="createValue" :options="options" @filter="filterFn"
                                color="blue">
                                <template v-slot:no-option>
                                  <q-item>
                                    <q-item-section class="text-grey">
                                      Нет результатов
                                    </q-item-section>
                                  </q-item>
                                </template>
                              </q-select>
                            </q-item-section>
                          </q-item>

                          <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <q-item-section>
                              <q-input color="blue" outlined dense v-model="medInfo.quantity"
                                label="Количество" />
                            </q-item-section>
                          </q-item>
                          <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <q-item-section>
                              <q-input color="blue" outlined dense v-model="medInfo.purchase_price"
                                label="Цена покупки" />
                            </q-item-section>
                          </q-item>
                          <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <q-item-section>
                              <q-input color="blue" outlined dense v-model="medInfo.selling_price"
                                label="Цена продажи" />
                            </q-item-section>
                          </q-item>

                          <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <q-item-section>

                              <q-input dense color="blue" outlined v-model="medInfo.expire_date"
                                label="Годен до">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                      <q-date color="blue" outlined mask="YYYY-MM-DD" today-btn
                                        v-model="medInfo.expire_date" />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>

                            </q-item-section>
                          </q-item>
                        </q-list>

                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </div>
            </div> -->
{{title_options}}
{{medicine_add}}


        </div>
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data(){
      return {
          title_options: [],
          barcode_options: [],
          response: {data: {data: {}}},
          medicine_add: {title: '', barcode: '', country: '', manufacture: '', serial_code: '', capacity: '',
           quantity: '', vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''},
          // medicine_info_add: [{ quantity: '', purchase_price: '', selling_price: '', expire_date: ''}],
      }
    },
    watch: {
      // medicine_add: {  
      //   handler: function (newVal, oldVal) {
      //     console.log(newVal[0].title);
      //     // if(newVal[0].title == null){
      //     //   this.title = false;
      //     // }
      //     if ((this.medicine_add[0].title != '') && (this.title == false)) {
      //       let a = this.response.data.data[0];
      //       this.$set(this.medicine_add, 0, a);
      //       this.title = true;
      //     }
      //   },
      //   deep: true
      // },

      'medicine_add.title': function (newVal, oldVal) {
        if (newVal != '') {
          this.medicine_add = {title: this.medicine_add.title, barcode: this.response.data.data[0].barcode, country: this.response.data.data[0].country, 
            manufacture: this.response.data.data[0].manufacture, serial_code: this.response.data.data[0].serial_code, capacity: this.response.data.data[0].capacity};
          // this.$set(this.medicine_add, 0, this.response.data.data[0]);

          //  for(let u=0; u < this.response.data.data.length; u  ++){
          //    this.$set(this.medicine_add, u, this.response.data.data[u])
          //  }
        }
      },
      'medicine_add.barcode': function (newVal, oldVal) {
        if (newVal != '') {
          this.medicine_add = {title: this.response.data.data[0].title, barcode: this.medicine_add.barcode, country: this.response.data.data[0].country, 
            manufacture: this.response.data.data[0].manufacture, serial_code: this.response.data.data[0].serial_code, capacity: this.response.data.data[0].capacity};
          // this.$set(this.medicine_add, 0, this.response.data.data[0]);

          //  for(let u=0; u < this.response.data.data.length; u  ++){
          //    this.$set(this.medicine_add, u, this.response.data.data[u])
          //  }
        }
      },
    },
    computed:{
      
    },
    mounted(){
      
    },
    methods:{
      ...mapActions([
        'ADD_MEDICINES', 'ADD_MEDICINE_INFO', 'GET_SEARCH_RESULT'
      ]),

      // addInfoForMedicine(){
      //   this.$set(this.medicine_info_add, this.medicine_info_add.length, { quantity: '', purchase_price: '', selling_price: '', expire_date: ''});
      // },
      async filterTitle (val, update, abort) {
        if(val.length >= 2){
          await update(async () => {
          // const needle = val.toLowerCase()
          const needle = val;
          this.response = await this.GET_SEARCH_RESULT({value: needle, type: 'title'});
          this.title_options = [];
          for(let i = 0; i < this.response.data.data.length; i++){
            this.title_options.push(await this.response.data.data[i].title);
          }
          // this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
          })
        }
      },
      async filterBarcode (val, update, abort) {
        if(val.length >= 2){
          await update(async () => {
          // const needle = val.toLowerCase()
          const needle = val;
          this.response = await this.GET_SEARCH_RESULT({value: needle, type: 'barcode'});
          this.barcode_options = [];
          for(let i = 0; i < this.response.data.data.length; i++){
            this.barcode_options.push(await this.response.data.data[i].title);
          }
          // this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
          })
        }
      },
    
      // async addMedicineInfo(){
      //   await this.ADD_MEDICINE_INFO(
      //     {
      //       quantity: this.medicine_info_add.quantity,
      //       purchase_price: this.medicine_info_add.purchase_price,
      //       selling_price: this.medicine_info_add.selling_price,
      //       expire_date: this.medicine_info_add.expire_date,
      //     }
      //   )
      // },
      async addMedicine(){
        let answer = await this.ADD_MEDICINES(
          {
            title: this.medicine_add.title,
            barcode: this.medicine_add.barcode,
            country: this.medicine_add.country,
            manufacture: this.medicine_add.manufacture,
            serial_code: this.medicine_add.serial_code,
            quantity: this.medicine_add.quantity,
            capacity: this.medicine_add.capacity,
            vat: this.medicine_add.vat,
            description: this.medicine_add.description,
            purchase_price: this.medicine_add.purchase_price,
            selling_price: this.medicine_add.selling_price,
            expire_date: this.medicine_add.expire_date,
          }
        )
        if(answer){
          this.$router.push('/medicines');
        }
      },
      createTitleValue (val, done) {
        if (val.length > 0) {
          if (!this.title_options.includes(val)) {
            this.title_options.push(val);
          }
          done(val, 'toggle')
        }
      },
      createBarcodeValue (val, done) {
        if (val.length > 0) {
          if (!this.barcode_options.includes(val)) {
            this.barcode_options.push(val);
          }
          done(val, 'toggle')
        }
      },
      


    }
    
}
</script>

<style scoped>
.m:hover{
  color: green;
}
</style>
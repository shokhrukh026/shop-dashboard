<template>
    <q-page class="bg-grey-3">
        <div class="row q-pa-md">
           <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-mr-md q-mb-md">
             <q-card class="card-bg text-black">
               <q-card-section class="text-h6 bg-blue">
                 <div class="text-h6 text-white">Данные лекарства</div>
               </q-card-section>
            

              <q-list dense bordered separator class="bg-white shadow-1">
               <q-item v-ripple>
                 <q-item-section>
                     <q-item-label class="text-h6 text-green-9">Название лекарства : <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.title}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Описание: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.description}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Штрих-код: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.barcode}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Страна: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.country}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Производитель: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.manufacture}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Серийный номер: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.serial_code}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">НДС: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.vat}}%</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Общее количество в бизнесе: <span class="text-subtitle1 text-black">&nbsp;{{getMedicines.total_quantity}}</span></q-item-label>
                 </q-item-section>
               </q-item>
               <q-item v-ripple >
                 <q-item-section>
                   <q-item-label class="text-h6 text-green-9">Оставшееся количество в бизнесе: <span class="text-subtitle1 text-black">{{getMedicines.left_quantity}}</span></q-item-label>
                 </q-item-section>
               </q-item>
             </q-list>


          
             </q-card>
           </div>




          <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-mt-md" v-for="(medInfo,item) in medicine_info_add" :key="item">
             <q-card class="card-bg text-black">
               <q-card-section class="text-h6 bg-blue row justify-between">
                 <div>
                   <div class="text-h6 text-white">Добавить инфо для лекарства #{{item + 1}}</div>
                   <div class="text-subtitle2 text-white">Введите данные лекарства</div>
                 </div>
                 <div>
                   <q-btn flat @click="removeInfoForMedicine(item)">
                    <q-icon name="close" class="text-white text-h5"></q-icon>
                   </q-btn>
                 </div>
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
                       <q-input  color="blue" outlined dense v-model="medicine_info_add[item].quantity" label="Количество" />
                     </q-item-section>
                   </q-item>
                    <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_info_add[item].purchase_price" label="Цена покупки" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_info_add[item].selling_price" label="Цена продажи" />
                     </q-item-section>
                   </q-item>

                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>

                       <q-input dense color="blue" outlined v-model="medicine_info_add[item].expire_date" label="Годен до">
                         <template v-slot:append>
                           <q-icon name="event" class="cursor-pointer">
                             <q-popup-proxy  transition-show="scale" transition-hide="scale">
                               <q-date color="blue" outlined mask="YYYY-MM-DD" today-btn v-model="medicine_info_add[item].expire_date"/>
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

          

           <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-mt-md row justify-between">
            <q-btn color="blue" icon="add" label="Добавить информацию о лекарстве" size="md" @click="addInfoForMedicine"/>
            <q-btn class="text-capitalize bg-blue text-white" @click="addMedicine" size="md" v-if="medicine_info_add.length != 0">Добавить</q-btn>
           </div>
           
              
               <!-- style="max-width: 20vw; min-width: 20vw;"  -->
              <!-- <div class="q-pt-md" v-for="(medInfo,item) in medicine_info_add" :key="item">
                 <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-mr-sm">
                <q-list bordered class="rounded-borders bg-blue" dark>
                  <q-expansion-item expand-separator icon="info" :label="'Информация о лекарстве #' + (item + 1)  " caption="Введите данные лекарства">
                    <q-card>
                      <q-card-section>

                        <q-list class="row">
                          
                          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <q-item-section>
                              <q-input color="blue" outlined dense v-model="medInfo.quantity"
                                label="Количество" />
                            </q-item-section>
                          </q-item>
                          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <q-item-section>
                              <q-input color="blue" outlined dense v-model="medInfo.purchase_price"
                                label="Цена покупки" />
                            </q-item-section>
                          </q-item>
                          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <q-item-section>
                              <q-input color="blue" outlined dense v-model="medInfo.selling_price"
                                label="Цена продажи" />
                            </q-item-section>
                          </q-item>

                          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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


            <!-- <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 row justify-end q-mt-sm">
              <q-btn class="text-capitalize bg-blue text-white" @click="addMedicine" size="lg">Добавить</q-btn>
          </div> -->
        </div>
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
          getMedicines: {title: '', barcode: '', country: '', manufacture: '', serial_code: '', vat: '', total_quantity: '', left_quantity: ''},
          response: {data: {data: {}}},
          // medicine_add: {title: '', barcode: '', country: '', manufacture: '', serial_code: '', capacity: '',
          //  quantity: '', vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''},
          medicine_info_add: [{ quantity: '', purchase_price: '', selling_price: '', expire_date: ''}],

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





      // 'medicine_add.title': function (newVal, oldVal) {
      //   if (newVal != '') {
      //     this.medicine_add = {title: this.medicine_add.title, barcode: this.response.data.data[0].barcode, country: this.response.data.data[0].country, 
      //       manufacture: this.response.data.data[0].manufacture, serial_code: this.response.data.data[0].serial_code, capacity: this.response.data.data[0].capacity};
      //     // this.$set(this.medicine_add, 0, this.response.data.data[0]);

      //     //  for(let u=0; u < this.response.data.data.length; u  ++){
      //     //    this.$set(this.medicine_add, u, this.response.data.data[u])
      //     //  }
      //   }
      // },
      // 'medicine_add.barcode': function (newVal, oldVal) {
      //   if (newVal != '') {
      //     this.medicine_add = {title: this.response.data.data[0].title, barcode: this.medicine_add.barcode, country: this.response.data.data[0].country, 
      //       manufacture: this.response.data.data[0].manufacture, serial_code: this.response.data.data[0].serial_code, capacity: this.response.data.data[0].capacity};
      //     // this.$set(this.medicine_add, 0, this.response.data.data[0]);

      //     //  for(let u=0; u < this.response.data.data.length; u  ++){
      //     //    this.$set(this.medicine_add, u, this.response.data.data[u])
      //     //  }
      //   }
      // },
    },
    computed:{
      
    },
    async mounted(){
      const answer = await this.GET_MEDICINE_INFO({id: this.id});
      console.log(answer); //shuni ko'rish kerak
      this.getMedicines.title = answer.data.title;
      this.getMedicines.description = answer.data.description;
      this.getMedicines.barcode = answer.data.barcode;
      this.getMedicines.country = answer.data.country;
      this.getMedicines.manufacture = answer.data.manufacture;
      this.getMedicines.serial_code = answer.data.serial_code;
      this.getMedicines.vat = answer.data.vat;
      this.getMedicines.total_quantity = answer.data.total_quantity;
      this.getMedicines.left_quantity = answer.data.left_quantity;
    },
    methods:{
      ...mapActions([
        'ADD_MEDICINES', 'ADD_MEDICINE_INFO', 'GET_MEDICINE_INFO'
      ]),

      addInfoForMedicine(){
        this.$set(this.medicine_info_add, this.medicine_info_add.length, { quantity: '', purchase_price: '', selling_price: '', expire_date: ''});
      },
      removeInfoForMedicine(item){
        this.medicine_info_add.splice(item, 1);
      },
      // async filterTitle (val, update, abort) {
      //   if(val.length >= 2){
      //     await update(async () => {
      //     // const needle = val.toLowerCase()
      //     const needle = val;
      //     this.response = await this.GET_SEARCH_RESULT({value: needle, type: 'title'});
      //     this.title_options = [];
      //     for(let i = 0; i < this.response.data.data.length; i++){
      //       this.title_options.push(await this.response.data.data[i].title);
      //     }
      //     // this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      //     })
      //   }
      // },
      // async filterBarcode (val, update, abort) {
      //   if(val.length >= 2){
      //     await update(async () => {
      //     // const needle = val.toLowerCase()
      //     const needle = val;
      //     this.response = await this.GET_SEARCH_RESULT({value: needle, type: 'barcode'});
      //     this.barcode_options = [];
      //     for(let i = 0; i < this.response.data.data.length; i++){
      //       this.barcode_options.push(await this.response.data.data[i].title);
      //     }
      //     // this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      //     })
      //   }
      // },
    
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
      // createTitleValue (val, done) {
      //   if (val.length > 0) {
      //     if (!this.title_options.includes(val)) {
      //       this.title_options.push(val);
      //     }
      //     done(val, 'toggle')
      //   }
      // },
      // createBarcodeValue (val, done) {
      //   if (val.length > 0) {
      //     if (!this.barcode_options.includes(val)) {
      //       this.barcode_options.push(val);
      //     }
      //     done(val, 'toggle')
      //   }
      // },
      


    }
    
}
</script>

<style scoped>
.m:hover{
  color: green;
}
</style>
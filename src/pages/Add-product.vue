<template>
    <q-page class="bg-grey-3">
        <div class="row q-pa-sm">
           <div class="col-lg-7 col-md-7 col-xs-7 col-sm-12 q-mr-md q-mb-md">
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
                        :options="med_options"
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
                        clearable
                        input-debounce="100"
                        :options="med_options"
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
                       <q-input  color="blue" outlined dense v-model="medicine_add[0].barcode" label="Штрих-код" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add[0].country" label="Страна" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add[0].manufacture" label="Производитель" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add[0].serial_code" label="Серийный номер" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add[0].capacity" label="Вместимость" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_add[0].quantity" label="Количество" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_add[0].vat" label="НДС" />
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
                   </q-item>

                   <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
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
                   </q-item>

                 </q-list>
               </q-card-section>
               <q-card-actions align="right">
                 <q-btn class="text-capitalize bg-blue text-white" @click="addMedicine">Добавить</q-btn>
               </q-card-actions>
             </q-card>
           </div>




          <div class="col-lg-4 col-md-4 col-xs-4 col-sm-12">
             <q-card class="card-bg text-black">
               <q-card-section class="text-h6 bg-blue">
                 <div class="text-h6 text-white">Добавить инфо для лекарства</div>
                 <div class="text-subtitle2 text-white">Введите данные лекарства</div>
               </q-card-section>
               <q-card-section class="q-pa-sm">
                 <q-list class="row">
                   <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                       <!-- <q-input color="blue" outlined dense v-model="title" label="Название" /> -->
                     </q-item-section>
                   </q-item>
                  
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input  color="blue" outlined dense v-model="medicine_info_add.quantity" label="Количество" />
                     </q-item-section>
                   </q-item>
                    <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_info_add.purchase_price" label="Цена покупки" />
                     </q-item-section>
                   </q-item>
                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>
                       <q-input color="blue" outlined dense v-model="medicine_info_add.selling_price" label="Цена продажи" />
                     </q-item-section>
                   </q-item>

                   <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                     <q-item-section>

                       <q-input dense color="blue" outlined v-model="medicine_info_add.expire_date" label="Годен до">
                         <template v-slot:append>
                           <q-icon name="event" class="cursor-pointer">
                             <q-popup-proxy  transition-show="scale" transition-hide="scale">
                               <q-date color="blue" outlined mask="YYYY-MM-DD" today-btn v-model="medicine_info_add.expire_date"/>
                             </q-popup-proxy>
                           </q-icon>
                         </template>
                       </q-input>

                     </q-item-section>
                   </q-item>

                 </q-list>
               </q-card-section>
               <q-card-actions align="right">
                 <q-btn class="text-capitalize bg-blue text-white" @click="addMedicine">Добавить</q-btn>
               </q-card-actions>
             </q-card>
           </div>

{{med_options}}
{{medicine_add}}


        </div>
    </q-page>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data(){
      return {
          med_options: [],
          options: ['ADS'],
          response: {data: {data: {}}},
          medicine_add: [{title: '', barcode: '', country: '', manufacture: '', serial_code: '', capacity: '',
           quantity: '', vat: '', description: '', purchase_price: '', selling_price: '', expire_date: ''}],
          title: null,
          medicine_info_add: { quantity: '', purchase_price: '', selling_price: '', expire_date: ''},
      }
    },
    watch: {
      'medicine_add.title': function (newVal, oldVal){
         if(newVal != ''){
           this.$set(this.medicine_add, 0, this.response.data.data[0]);
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
      async filterFn (val, update, abort) {
        if(val.length >= 2){
          await update(async () => {
          // const needle = val.toLowerCase()
          const needle = val;
          // let response = {data: {data: {}}};
          this.response = await this.GET_SEARCH_RESULT({title: needle});
          this.med_options = [];
          for(let i = 0; i < this.response.data.data.length; i++){
            this.med_options.push(await this.response.data.data[i].title);
          }
          console.log(this.med_options);
          // this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
          })
        }
      },
      async filterFunc(){
        let response = {data: {data: {}}};
        this.med_options = []
        response = await this.GET_SEARCH_RESULT({title: this.medicine_add.title});
        console.log(response.data.data);
        for(let i = 0; i < response.data.data.length; i++){
          this.med_options.push(response.data.data[i]);
        }
      },
    
      async addMedicineInfo(){
        await this.ADD_MEDICINE_INFO(
          {
            quantity: this.medicine_info_add.quantity,
            purchase_price: this.medicine_info_add.purchase_price,
            selling_price: this.medicine_info_add.selling_price,
            expire_date: this.medicine_info_add.expire_date,
          }
        )
      },
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
          this.$router.go();
        }
      },
      createValue (val, done) {
        // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
        // and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
        // only if is not already set
        // and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
        // (adds to model if not already in the model, removes from model if already has it)
        // and it resets the input textbox to empty string
        // ----
        // If "var" content is undefined/null, then it doesn't tampers with the model
        // and only resets the input textbox to empty string
        
        // if (val.length > 2) {
        //   // if (!stringOptions.includes(val)) {
        //   //   done(val, 'add-unique')
        //   // }
        //   done(val, 'add-unique')
        // }

        done(val, 'add-unique')
      },
    }
    
}
</script>

<style scoped>
.m:hover{
  color: green;
}
</style>
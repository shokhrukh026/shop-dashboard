<template>
  <q-page class="bg-grey-3">
    <div class="row q-pa-md">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-card class="card-bg text-black">
          <q-card-section class="text-h6 bg-blue">
            <div class="text-h6 text-white">Редактировать лекарство</div>
            <div class="text-subtitle2 text-white">
              Введите данные лекарства
            </div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="medicine_add.title"
                    label="Название"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="medicine_add.barcode"
                    label="Штрих-код"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="medicine_add.country"
                    label="Страна"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="medicine_add.manufacture"
                    label="Производитель"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="medicine_add.serial_code"
                    label="Серийный номер"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="medicine_add.capacity"
                    label="Вместимость"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-blue text-white">Сохранить</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-mt-md">
        <div class="col-lg-4 col-md-4 col-xs-4 col-sm-12">
          <div class="col-lg-4 col-md-4 col-xs-4 col-sm-12">
            <q-card class="card-bg text-black">
              <q-card-section class="text-h6 bg-blue">
                <div class="text-h6 text-white">
                  Редактировать инфо о лекарстве
                </div>
                <div class="text-subtitle2 text-white">
                  Введите данные лекарства
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-list class="row">
                  <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-item-section>
                      <q-select
                        outlined
                        v-model="model"
                        dense
                        :options="med_info_options"
                        label="Инфо #1"
                        class="bg-white"
                        color="blue"
                      />
                    </q-item-section>
                  </q-item>

                  <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <q-item-section>
                      <q-input
                        color="blue"
                        outlined
                        dense
                        v-model="medicine_info_edit[0].quantity"
                        label="Количество"
                      />
                    </q-item-section>
                  </q-item>
                  <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <q-item-section>
                      <q-input
                        color="blue"
                        outlined
                        dense
                        v-model="medicine_info_edit[0].purchase_price"
                        label="Цена покупки"
                      />
                    </q-item-section>
                  </q-item>
                  <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <q-item-section>
                      <q-input
                        color="blue"
                        outlined
                        dense
                        v-model="medicine_info_edit[0].selling_price"
                        label="Цена продажи"
                      />
                    </q-item-section>
                  </q-item>

                  <q-item class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <q-item-section>
                      <q-input
                        dense
                        color="blue"
                        outlined
                        v-model="medicine_info_edit[0].expire_date"
                        label="Годен до"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                color="blue"
                                outlined
                                mask="YYYY-MM-DD"
                                today-btn
                                v-model="medicine_info_edit[0].expire_date"
                              />
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  class="text-capitalize bg-blue text-white"
                  @click="addMedicine"
                  >Сохранить</q-btn
                >
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    {{ row }}
  </q-page>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    row: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      med_info_options: [],
      medicine_add: this.row,
      medicine_info_edit: [
        {
          quantity: "",
          purchase_price: "",
          selling_price: "",
          expire_date: "",
        },
      ],
    };
  },
  computed: {},
  methods: {},
};
</script>

<style scoped></style>

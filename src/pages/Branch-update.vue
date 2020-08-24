<template>
  <q-page class="bg-grey-3">
    <div class="row q-pa-md">
      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg text-black">
          <q-card-section class="text-h6 bg-blue">
            <div class="text-h6 text-white">Редактирование филиала</div>
            <div class="text-subtitle2 text-white">Заполните поля</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="branch_edit.name"
                    label="Название"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="branch_edit.address"
                    label="Адрес"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="branch_edit.street"
                    label="Улица"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="branch_edit.city"
                    label="Город"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="branch_edit.status"
                    label="Статус"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="branch_edit.contact_person"
                    label="Контактное лицо"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="branch_edit.contact_phone"
                    label="Контактный телефон"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    color="blue"
                    outlined
                    dense
                    v-model="branch_edit.virtual_number"
                    label="Виртуальный номер"
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
    </div>
  </q-page>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    row: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      branch_edit: this.row,
    };
  },
  mounted() {},
};
</script>

<style scoped></style>

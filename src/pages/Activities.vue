<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <h1>{{ $t("actividades") }}</h1>
  <div class="q-pa-md" id="act">
    <q-btn :label="$t('nuevo')" color="positive" @click="inception = true" />
    <q-dialog v-model="inception">
      <div padding class="bg-white q-pa-xl" style="width: 80%">
        <q-form
          @submit.prevent="procesingForm"
          @reset="reset"
          ref="myForm"
          style="width: 100%"
        >
          <div padding class="q-col-gutter-y-sm">
            <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
              <div>
                <q-input
                  outlined
                  :label="$t('fecha')"
                  v-model="date"
                  type="date"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || this.$t('rellene'),
                  ]"
                />
              </div>
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
              <div>
                <q-input
                  outlined
                  :label="$t('hora')"
                  v-model="hour"
                  type="time"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || this.$t('rellene'),
                  ]"
                />
              </div>
            </div>

            <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
              <div class="form-floating">
                <q-input
                  v-model="description"
                  outlined
                  type="textarea"
                  :label="$t('descripcion')"
                  rows="3"
                  maxlength="200"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || this.$t('rellene'),
                  ]"
                />
              </div>
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
              <div>
                <q-input
                  outlined
                  :label="$t('precio')"
                  v-model="price"
                  min="0"
                  max="200000"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || this.$t('rellene'),
                  ]"
                />
              </div>
            </div>
          </div>
          <div>
            <q-btn
              color="primary"
              :label="$t('aceptar')"
              class="q-ml-sm"
              type="submit"
            />
            <q-btn
              color="primary"
              :label="$t('reset')"
              class="q-ml-sm"
              type="reset"
            />
          </div>
        </q-form>
      </div>
    </q-dialog>
    <pintar-actividades
      :activities="activities"
      @button-clicked="updatingactivitie"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { api } from "src/boot/axios";
import PintarActividades from "src/components/PintarActividades.vue";

export default {
  components: { PintarActividades },
  setup() {
    // Variables reactivas
    const date = ref("");
    const hour = ref("");
    const description = ref("");
    const price = ref("");
    const myForm = ref(null);
    const selectedActivitie = ref(false);
    const tempid = ref(""); //Arreglo de vehiculos
    const activities = ref([]);
    const token = localStorage.getItem("token");

    const procesingForm = async () => {
      console.log("me diste click");
      myForm.value.resetValidation();
      //luego se procesa el formulario
      const tempactivitie = {
        activityId: selectedActivitie.value ? tempid.value : 0,
        day: date.value,
        description: description.value,
        price: price.value,
      };
      if (!selectedActivitie.value) {
        await api.post("api/DayliActivities", tempactivitie, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        activities.value.push(tempactivitie);
        //location.reload();
      } else {
        await api.put("api/DayliActivities", tempactivitie, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        location.reload();
      }
      //restablece los valores del formulario
      reset();
    };
    const updatingactivitie = (row) => {
      date.value = row.day;
      description.value = row.description;
      price.value = row.price;
      tempid.value = row.activityId;
      selectedActivitie.value = true;
      inception.value = true;
    };
    const reset = () => {
      date.value = null;
      hour.value = null;
      description.value = null;
      price.value = null;
    };

    return {
      date,
      hour,
      description,
      price,
      myForm,
      token,
      inception: ref(false),
      activities,
      procesingForm,
      reset,
      updatingactivitie,
    };
  },
};
</script>

<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <h2>Actividades</h2>
  <div class="q-pa-md">
    <q-btn label="Nuevo" color="positive" @click="inception = true" />
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
                  label="Fecha"
                  v-model="date"
                  type="date"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Rellene el campo',
                  ]"
                />
              </div>
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
              <div>
                <q-input
                  outlined
                  label="Hora"
                  v-model="hour"
                  type="time"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Rellene el campo',
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
                  label="Descripción"
                  rows="3"
                  maxlength="200"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Rellene el campo',
                  ]"
                />
              </div>
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
              <div>
                <q-input
                  outlined
                  label="Precio"
                  v-model="price"
                  min="0"
                  max="200000"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Rellene el campo',
                  ]"
                />
              </div>
            </div>
          </div>
          <div>
            <q-btn
              color="primary"
              label="Aceptar"
              class="q-ml-sm"
              type="submit"
            />
            <q-btn
              color="primary"
              label="Cancelar"
              class="q-ml-sm"
              type="reset"
            />
          </div>
        </q-form>
      </div>
    </q-dialog>
    <pintar-actividades :activities="activities" />
  </div>
</template>

<script>
import { ref } from "vue";
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
        await api.post("api/DayliActivities", tempactivitie);
        phour.value.push(cphour);
        //location.reload();
      } else {
        await api.put("api/DayliActivities", tempactivitie);
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
      inception: ref(false),
      activities,
      procesingForm,
      reset,
    };
  },
};
</script>

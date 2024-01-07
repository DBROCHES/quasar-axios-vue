<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <h2>Temporadas</h2>
  <div class="q-pa-md">
    <q-btn label="Nuevo" color="positive" @click="inception = true" />
    <q-dialog v-model="inception" @hide="handleClose()">
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
                  label="Nombre de la Temporada"
                  v-model="name"
                  type="text"
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
                  filled
                  v-model="date"
                  label="Fecha de Inicio"
                  mask="date"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date" :options="optionsFn">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
              <q-input
                outlined
                label="fecha"
                v-model="name"
                type="date"
                lazy-rules
                :rules="['date']"
              />
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
    <PintarSeason :seasons="Seasons" @button-clicked="updatingseason" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import PintarSeason from "src/components/PintarSeason.vue";

export default {
  components: { PintarSeason },
  setup() {
    // Variables reactivas
    const date = ref("");
    const name = ref("");
    const myForm = ref(null);
    const selectedSeason = ref(false);
    const tempid = ref(""); //Arreglo de vehiculos
    const Seasons = ref([]);
    const currentYear = new Date().getFullYear();
    const inception = ref(false);
    const procesingForm = async () => {
      console.log("me diste click");
      myForm.value.resetValidation();
      //luego se procesa el formulario
      const tempSeason = {
        seasonId: selectedSeason.value ? tempid.value : 0,
        seasonName: name.value,
        startDate: date.value,
      };
      if (!selectedSeason.value) {
        await api.post("api/Season", tempSeason);
        phour.value.push(cphour);
        //location.reload();
      } else {
        await api.put("api/Season", tempSeason);
        location.reload();
      }
      //restablece los valores del formulario
      reset();
    };
    const updatingseason = (row) => {
      date.value = row.startDate;
      name.value = row.seasonName;
      tempid.value = row.seasonId;
      selectedActivitie.value = true;
      inception.value = true;
    };
    const reset = () => {
      date.value = null;
      name.value = null;
    };

    const optionsFn = (date) => {
      const [year, month, dayh] = date.split("/");
      return year === currentYear.toString();
    };
    const handleClose = () => {
      inception.value = false;
      location.reload();
    };
    return {
      date,
      name,
      myForm,
      Seasons,
      inception,
      currentYear,
      updatingseason,
      procesingForm,
      reset,
      handleClose,
      optionsFn,
    };
  },
};
</script>

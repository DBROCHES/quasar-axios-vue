<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <h2>Modalidad</h2>
  <div class="q-pa-md">
    <q-btn label="Nuevo" color="positive" @click="inception = true" />
    <q-dialog v-model="inception">
      <div class="q-pa-md q-gutter-sm">
        <q-carousel animated v-model="slide" infinite>
          <q-carousel-slide name="hora">
            <!-- Formulario de Costo por hora -->
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
                      label="Costo por horas"
                      v-model="phours"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      label="Costo por horas extras"
                      v-model="ehours"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      label="Costo por kilometros recorridos"
                      v-model="pkilometers"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      label="Costo por kilometros extras"
                      v-model="ekilometers"
                      type="number"
                      placeholder="1"
                      min="1"
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
          </q-carousel-slide>

          <q-carousel-slide name="viaje">
            <!-- Formulario de costo por viaje -->
            <q-form
              @submit.prevent="procesingForm"
              @reset="reset"
              ref="myForm"
              style="width: 100%"
            >
              <div padding class="q-col-gutter-y-sm">
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
                  <div>
                    <q-input
                      v-model="description"
                      outlined
                      type="textarea"
                      label="Descripcion de la ruta"
                      rows="3"
                      maxlength="200"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      label="Costo de la ruta"
                      v-model="rute"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      label="Costo por ida y regreso"
                      v-model="goback"
                      type="number"
                      placeholder="1"
                      min="1"
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
          </q-carousel-slide>

          <q-carousel-slide name="kilometraje">
            <!-- Formulario de costo por kilometraje -->
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
                      label="Costo por kilometraje"
                      v-model="kilometer"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      label="Costo por regreso"
                      v-model="back"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      label="Costo por horas de espera"
                      v-model="wait"
                      type="number"
                      placeholder="1"
                      min="1"
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
          </q-carousel-slide>
        </q-carousel>

        <div class="row justify-center">
          <q-btn-toggle
            glossy
            v-model="slide"
            :options="[
              { label: 'Costo por hora', value: 'hora' },
              { label: 'Costo por viaje', value: 'viaje' },
              { label: 'Costo por kilometraje', value: 'kilometraje' },
            ]"
          />
        </div>
      </div>
    </q-dialog>

    <q-card>
      <q-tabs
        v-model="tab"
        class="bg-blue text-white"
        align="justify"
        narrow-indicator
      >
        <q-tab name="hour" label="Costo por hora" />
        <q-tab name="travel" label="Costo por viaje" />
        <q-tab name="kilometer" label="Costo por kilometraje" />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        style="height: auto"
        animated
        class="bg-orange-1 text-dark text-center"
      >
        <q-tab-panel name="hour" class="bg-lime-1 text-dark">
          <PintarCostoporhora
            :hours="phour"
            @button-clicked="updatingHour"
          ></PintarCostoporhora>
        </q-tab-panel>
        <q-tab-panel name="travel" class="bg-lime-1 text-dark">
          <PintarCostoporViaje
            :tours="ptravel"
            @button-clicked="updatingTour"
          />
        </q-tab-panel>
        <q-tab-panel name="kilometer" class="bg-lime-1 text-dark">
          <PintarCostoporkilometraje
            :kilometers="pkilometer"
            @button-clicked="updatingMileage"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import PintarCostoporhora from "src/components/PintarCostoporhora.vue";
import { api } from "src/boot/axios";
import PintarCostoporViaje from "src/components/PintarCostoporViaje.vue";
import PintarCostoporkilometraje from "src/components/PintarCostoporkilometraje.vue";

export default {
  // components: { PintarVehicles },
  setup() {
    // Variables reactivas
    // variables de Costo por hora
    const phours = ref("");
    const ehours = ref("");
    const pkilometers = ref("");
    const ekilometers = ref("");
    // Variables de Costo por viaje
    const description = ref("");
    const rute = ref("");
    const goback = ref("");
    //Variables de Costo por Kilometraje
    const kilometer = ref("");
    const back = ref("");
    const wait = ref("");
    //Variables auxiliares
    const myForm = ref(null);
    const inception = ref(false);
    const tempid = ref("");
    const selectedModalitY = ref(false);
    const slide = ref("hora");
    const buttonstate = ref(true);
    //Arreglos de modalidades
    const phour = ref([]);
    const ptravel = ref([]);
    const pkilometer = ref([]);
    const procesingForm = async () => {
      myForm.value.validate().then((success) => {
        if (success) {
          inception.value = false;
        }
      });
      //myForm.value.resetValidation();
      console.log("me diste click");

      //luego se procesa el formulario
      switch (slide.value) {
        case "hora":
          costPerHourActions();
          break;
        case "viaje":
          costPerTourActions();
          break;
        case "kilometraje":
          mileageCostActions();
          break;
        default:
          break;
      }

      //restablece los valores del formulario
      inception.value = false;
      reset();
    };
    const reset = () => {
      phours.value = null;
      ehours.value = null;
      pkilometers.value = null;
      ekilometers.value = null;
      description.value = null;
      rute.value = null;
      goback.value = null;
      kilometer.value = null;
      back.value = null;
      wait.value = null;
    };
    const costPerHourActions = async () => {
      const cphour = {
        modalityId: selectedModalitY.value ? tempid.value : 0,
        cost_per_hour: phours.value,
        cost_per_kilometer_traveled: pkilometers.value,
        extra_kilometer_cost: ekilometers.value,
        extra_hour_cost: ehours.value,
      };
      if (!selectedModalitY.value) {
        await api.post("api/Costperhour", cphour);
        phour.value.push(cphour);
        //location.reload();
      } else {
        await api.put("api/Costperhour", cphour);
        location.reload();
      }
    };
    const costPerTourActions = async () => {
      const cptour = {
        modalityId: selectedModalitY.value ? tempid.value : 0,
        rout_description: description.value,
        route_cost: rute.value,
        round_trip_cost: goback.value,
      };
      if (!selectedModalitY.value) {
        await api.post("api/CostPerTour", cptour);
        ptravel.value.push(cptour);
        //location.reload();
      } else {
        await api.put("api/CostPerTour", cptour);
        location.reload();
      }
    };
    const mileageCostActions = async () => {
      const mileagec = {
        modalityId: selectedModalitY.value ? tempid.value : 0,
        cost_per_kilometer: kilometer.value,
        cost_per_round_trip: back.value,
        cost_per_waiting_hour: wait.value,
      };
      if (!selectedModalitY.value) {
        await api.post("api/MilageCost", mileagec);
        pkilometer.value.push(mileagec);
        //location.reload();
      } else {
        await api.put("api/MilageCost", mileagec);
        location.reload();
      }
    };
    // funciones de modificar
    const updatingHour = (row) => {
      tempid.value = row.modalityId;
      phours.value = row.cost_per_hour;
      pkilometers.value = row.cost_per_kilometer_traveled;
      ekilometers.value = row.extra_kilometer_cost;
      ehours.value = row.extra_hour_cost;
      selectedModalitY.value = true;
      inception.value = true;
      slide.value = "hora";
    };
    const updatingTour = (row) => {
      tempid.value = row.modalityId;
      description.value = row.rout_description;
      rute.value = row.route_cost;
      goback.value = row.round_trip_cost;
      selectedModalitY.value = true;
      inception.value = true;
      slide.value = "viaje";
    };
    const updatingMileage = (row) => {
      tempid.value = row.modalityId;
      kilometer.value = row.cost_per_kilometer;
      back.value = row.cost_per_round_trip;
      wait.value = row.cost_per_waiting_hour;
      selectedModalitY.value = true;
      inception.value = true;
      slide.value = "kilometraje";
    };
    return {
      phours,
      ehours,
      pkilometers,
      ekilometers,
      description,
      rute,
      goback,
      kilometer,
      back,
      wait,
      myForm,
      inception,
      slide,
      phour,
      ptravel,
      pkilometer,
      tab: ref("hour"),
      buttonstate,
      updatingHour,
      updatingMileage,
      updatingTour,
      procesingForm,
      reset,
    };
  },
  components: {
    PintarCostoporhora,
    PintarCostoporViaje,
    PintarCostoporkilometraje,
  },
};
</script>

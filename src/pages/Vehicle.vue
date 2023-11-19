<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <h1>Vehicle</h1>
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
                  label="Matrícula"
                  v-model="plate"
                  pattern="[A-Z]\d{5}"
                  placeholder="******"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Rellene el campo',
                  ]"
                />
              </div>
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
              <div>
                <q-select
                  outlined
                  v-model="model"
                  :options="options"
                  label="Modelo"
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
                  label="Capacidad sin equipaje"
                  v-model="capacity_without"
                  placeholder="2"
                  min="2"
                  max="40"
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
                  label="Capacidad con equipaje"
                  v-model="capacity_with"
                  placeholder="2"
                  min="2"
                  max="40"
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
                  label="Capacidad total"
                  v-model="total"
                  placeholder="2"
                  min="2"
                  max="40"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Rellene el campo',
                  ]"
                />
              </div>
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
              <div>
                <q-select
                  v-model="selectedYear"
                  outlined
                  :options="optionsyear"
                  label="Select a year"
                />
              </div>
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
              <div class="form-floating">
                <q-input
                  v-model="manufacturing"
                  outlined
                  type="textarea"
                  label="Modo de fabricación"
                  rows="3"
                  maxlength="200"
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
              flat
              v-close-popup
              @click="reset()"
            />
          </div>
        </q-form>
      </div>
    </q-dialog>
  </div>
  <pintar-vehicles :vehicles="vehicles" @button-clicked="modificarForm" />
</template>

<script>
import { ref, onMounted } from "vue";
import PintarVehicles from "src/components/PintarVehicles.vue";
import { api } from "boot/axios";

export default {
  components: { PintarVehicles },

  setup() {
    // Variables reactivas
    const optionsyear = ref([]);
    const plate = ref("");
    const capacity_without = ref("");
    const capacity_with = ref("");
    const total = ref("");
    const manufacturing = ref("");
    const model = ref("");
    const selectedYear = ref(null);
    const myForm = ref(null);
    const inception = ref(false);
    const SelectedVehicles = ref(false);
    const tempid = ref("");
    //Arreglo de vehiculos
    const vehicles = ref([]);
    const generateYears = () => {
      const currentYear = new Date().getFullYear();
      for (let year = 1900; year <= currentYear; year++) {
        optionsyear.value.push(year);
      }
    };
    const procesingForm = async () => {
      myForm.value.validate().then((success) => {
        if (success) {
          inception.value = false;
        }
      });
      var currentId = 0;
      if (!SelectedVehicles.value) {
        console.log(vehicles.value.length);
        myForm.value.resetValidation();
        var lastVehicle;
        if (vehicles.value.length > 0) {
          lastVehicle = vehicles.value[vehicles.value.length - 1];
        }
        currentId = lastVehicle.vehicleId + 1;
      } else {
        currentId = tempid.value;
      }
      const tempVehicle = {
        vehicleId: currentId,
        license_Plate_Number: plate.value,
        brand: model.value,
        capacity_Without_Equipement: capacity_without.value,
        capacity_With_Equipement: capacity_with.value,
        total_Capacity: total.value,
        year_of_Manufacture: selectedYear.value,
        manufacturing_Mode: manufacturing.value,
      };
      //luego se procesa el formulario
      if (!SelectedVehicles.value) {
        await api.post("api/Vehicles", tempVehicle);
        vehicles.value.push(tempVehicle);
      } else {
        const index = vehicles.value.findIndex(
          (v) => v.id === tempVehicle.vehicleId
        );
        await api.put("api/Vehicles", tempVehicle);
        vehicles.value.splice(index, 1, tempVehicle);
      }
      //restablece los valores del formulario
      SelectedVehicles.value = false;
      reset();
    };
    const modificarForm = async (row) => {
      tempid.value = row.vehicleId;
      plate.value = row.license_Plate_Number;
      model.value = row.brand;
      (capacity_without.value = row.capacity_Without_Equipement),
        (capacity_with.value = row.capacity_With_Equipement),
        (total.value = row.total_Capacity),
        (selectedYear.value = row.year_of_Manufacture),
        (manufacturing.value = row.manufacturing_Mode);
      inception.value = true;
      SelectedVehicles.value = true;
    };

    const prueba = async () => {
      await api
        .get("api/Vehicles")
        .then((response) => {
          vehicles.value = response.data;
          console.log(vehicles.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const fillTable = () => {};
    const reset = () => {
      plate.value = null;
      capacity_without.value = null;
      capacity_with.value = null;
      total.value = null;
      manufacturing.value = null;
      model.value = null;
      selectedYear.value = null;
    };

    onMounted(() => {
      prueba();
      generateYears();
    });

    return {
      plate,
      capacity_without,
      capacity_with,
      total,
      manufacturing,
      model,
      selectedYear,
      optionsyear,
      myForm,
      inception,
      options: ["Mercedez", "Audi", "Lada", "Mazda", "Peugot"],
      vehicles,
      // SelectedVehicles,
      procesingForm,
      reset,
      modificarForm,
      // reset() {
      //   plate.value = null;
      //   capacity_without.value = null;
      //   capacity_with.value = null;
      //   total.value = null;
      //   manufacturing.value = null;
      //   model.value = null;
      //   selectedYear.value = null;
      // },
    };
  },
};
</script>

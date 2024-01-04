<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <h1>{{ $t("vehicle") }}</h1>
  <div class="q-pa-md">
    <q-btn :label="$t('nuevo')" color="positive" @click="inception = true" />
    <q-dialog v-model="inception">
      <div padding class="bg-white q-pa-xl" style="width: 80%">
        <save-vehicle :vehicle="vehicle" />
      </div>
    </q-dialog>
  </div>
  <pintar-vehicles :vehicles="vehicles" />
</template>

<script>
import { ref, onMounted } from "vue";
import PintarVehicles from "src/components/PintarVehicles.vue";
import SaveVehicle from "src/components/SaveVehicles.vue";
import { api } from "boot/axios";

export default {
  components: { PintarVehicles, SaveVehicle },

  setup() {
    // Variables reactivas
    //creando vehiculo vacio
    const vehicle = {
      vehicleId: -1,
      license_Plate_Number: "",
      brand: "",
      capacity_Without_Equipement: 0,
      capacity_With_Equipement: 0,
      total_Capacity: 0,
      year_of_Manufacture: 0,
      manufacturing_Mode: "",
    };

    //Arreglo de vehiculos
    const vehicles = ref([]);
    const token = localStorage.getItem('token');

    const prueba = async () => {
      await api
        .get("api/Vehicles", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
          vehicles.value = response.data;
          console.log(vehicles.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    onMounted(() => {
      prueba();
    });

    return {
      inception: ref(false),
      vehicle,
      vehicles,
      token,
    };
  },
};
</script>

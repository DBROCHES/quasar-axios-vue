<template>
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
            :label="$t('plate')"
            v-model="plate"
            pattern="[A-Z]\d{5}"
            placeholder="******"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || this.$t('rellene')]"
          />
        </div>
      </div>
      <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
        <div>
          <q-select
            outlined
            v-model="model"
            :options="options"
            :label="$t('model')"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || this.$t('rellene')]"
          />
        </div>
      </div>
      <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
        <div>
          <q-input
            type="number"
            outlined
            :label="$t('capacity_without')"
            v-model="capacity_without"
            placeholder="2"
            min="2"
            max="40"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || this.$t('rellene')]"
          />
        </div>
      </div>

      <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
        <div>
          <q-input
            type="number"
            outlined
            :label="$t('capacity_with')"
            v-model="capacity_with"
            placeholder="2"
            min="2"
            max="40"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || this.$t('rellene')]"
          />
        </div>
      </div>

      <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
        <div>
          <q-input
            type="number"
            outlined
            :label="$t('totalCapacity')"
            v-model="total"
            placeholder="2"
            min="2"
            max="40"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || this.$t('rellene')]"
          />
        </div>
      </div>
      <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
        <div>
          <q-input
            type="number"
            outlined
            :label="$t('precio')"
            v-model="price"
            placeholder="2"
            min="1"
            max="10000"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || this.$t('rellene')]"
          />
        </div>
      </div>
      <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
        <div>
          <q-select
            v-model="selectedYear"
            outlined
            :options="optionsyear"
            :label="$t('selectedYear')"
          />
        </div>
      </div>
      <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
        <div class="form-floating">
          <q-input
            v-model="manufacturing"
            outlined
            type="textarea"
            :label="$t('manufacturing')"
            rows="3"
            maxlength="200"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || this.$t('rellene')]"
          />
        </div>
      </div>
      <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
        <div>
          <q-select
            outlined
            v-model="selectedOptions"
            :options="optionsProvince"
            :label="$t('province')"
            emit-value
            map-options
            lazy-rules
          />
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
    </div>
  </q-form>
</template>
<script>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";

export default {
  props: ["vehicle"],

  setup() {
    // Variables reactivas
    const price = ref([]);
    const optionsProvince = ref([]);
    const selectedOptions = ref(null);
    const optionsyear = ref([]);
    const plate = ref("");
    const capacity_without = ref("");
    const capacity_with = ref("");
    const total = ref("");
    const manufacturing = ref("");
    const model = ref(null);
    const selectedYear = ref(null);
    const myForm = ref(null);
    const token = localStorage.getItem("token");
    //Arreglo de vehiculos
    const vehicles = ref([]);
    const generateYears = () => {
      const currentYear = new Date().getFullYear();
      for (let year = 1900; year <= currentYear; year++) {
        optionsyear.value.push(year);
      }
    };
    const procesingForm = async () => {
      console.log(vehicles.value.length);
      myForm.value.resetValidation();
      var lastVehicle;
      if (vehicles.value.length > 0) {
        lastVehicle = vehicles.value[vehicles.value.length - 1];
      }

      const NewVehicle = {
        license_Plate_Number: plate.value,
        brand: model.value,
        capacity_Without_Equipement: capacity_without.value,
        capacity_With_Equipement: capacity_with.value,
        total_Capacity: total.value,
        year_of_Manufacture: selectedYear.value,
        manufacturing_Mode: manufacturing.value,
        provinceId: selectedOptions.value,
        price: price.value,
      };
      //luego se procesa el formulario
      await api.post("api/Vehicles", NewVehicle, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      vehicles.value.push(NewVehicle);

      //restablece los valores del formulario
      reset();
    };
    const prueba = async () => {
      await api
        .get("api/Vehicles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          vehicles.value = response.data;
          console.log(vehicles.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const reset = () => {
      plate.value = null;
      capacity_without.value = null;
      capacity_with.value = null;
      total.value = null;
      manufacturing.value = null;
      model.value = null;
      selectedYear.value = null;
      selectedOptions.value = null;
    };
    const getOptions = async () => {
      try {
        const response = await api.get("/api/ProvinceSet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        optionsProvince.value = response.data.map((tupla) => ({
          label: tupla.provinceName,
          value: tupla.provinceId,
        }));
      } catch (error) {
        console.error("Error al obtener las opciones desde la API", error);
      }
    };
    onMounted(() => {
      prueba();
      generateYears();
      getOptions();
    });
    return {
      price,
      optionsProvince,
      selectedOptions,
      plate,
      capacity_without,
      capacity_with,
      total,
      manufacturing,
      model,
      selectedYear,
      optionsyear,
      myForm,
      token,
      inception: ref(false),
      options: ["Mercedez", "Audi", "Lada", "Mazda", "Peugot"],
      vehicles,
      procesingForm,
      reset,
    };
  },
};
</script>

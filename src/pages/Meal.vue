<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <h2>{{ $t("meal") }}</h2>
  <div>
    <q-btn
      :label="$t('nuevo')"
      color="positive"
      class="boton"
      @click="inception = true"
    />
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
                  :label="$t('type')"
                  v-model="name"
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
                  maxlength="400"
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
                  placeholder="2"
                  min="1"
                  max="300"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || this.$t('rellene'),
                  ]"
                />
              </div>
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
              <div>
                <q-select
                  outlined
                  v-model="selectedOptions"
                  :options="options"
                  label="Hotel"
                  emit-value
                  map-options
                  lazy-rules
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
  </div>
  <pintar-meals :meals="meals" @modifiMeals="updateMeal" />
</template>

<script>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import PintarMeals from "src/components/PintarMeals.vue";

export default {
  components: { PintarMeals },

  setup() {
    // Variables reactivas
    const name = ref("");
    const description = ref(null);
    const price = ref("");
    const options = ref([]);
    const selectedOptions = ref(null);
    const myForm = ref(null);
    const selectedMeal = ref(false);
    const inception = ref(false);
    //Arreglo de vehiculos
    const meals = ref([]);
    const token = localStorage.getItem("token");
    const tempid = ref([]);

    //GETTES SETTES

    const getMeals = async () => {
      await api
        .get("/api/Meal", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          meals.value = response.data;
          console.log(meals.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const getOptions = async () => {
      try {
        const response = await api.get("/api/Hotel", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        options.value = response.data.map((tupla) => ({
          label: tupla.name,
          value: tupla.hotelId,
        }));
      } catch (error) {
        console.error("Error al obtener las opciones desde la API", error);
      }
    };

    const updateMeal = (row) => {
      selectedOptions.value = row.hotelId;
      name.value = row.name;
      description.value = row.description;
      price.value = row.price;
      selectedMeal.value = true;
      inception.value = true;
      tempid.value = row.id;
    };
    const procesingForm = async () => {
      myForm.value.resetValidation();

      const hotelId = selectedOptions.value ? selectedOptions.value : null;

      const newMeal = {
        id: selectedMeal.value ? tempid.value : 0,
        name: name.value,
        description: description.value,
        price: price.value,
        hotelId: hotelId,
      };
      if (!selectedMeal.value) {
        await api.post("/api/Meal", newMeal, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        meals.value = [...meals.value, newMeal];
      } else {
        await api.put("/api/Meal", newMeal, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        location.reload();
      }

      reset();
      fillTable();
    };

    const fillTable = () => {
      console.log("LLenando tabla...");
    };

    const reset = () => {
      name.value = null;
      description.value = null;
      price.value = null;
      selectedOptions.value = null;
      fillTable();
    };

    onMounted(() => {
      getMeals();
      getOptions();
    });
    const handleClose = () => {
      inception.value = false;
      location.reload();
    };
    return {
      meals,
      name,
      description,
      price,
      myForm,
      selectedOptions,
      options,
      token,
      inception,
      procesingForm,
      reset,
      updateMeal,
      handleClose,
    };
  },
};
</script>

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h2>{{ $t("room") }}</h2>
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
                <q-input
                  outlined
                  :label="$t('amountofPeople')"
                  type="number"
                  v-model="amountofPeople"
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
  <pintar-rooms :rooms="rooms" @modifiRooms="updateRoom" />
</template>

<script>
import { ref, onMounted, toRaw, nextTick } from "vue";
import PintarRooms from "src/components/PintarRooms.vue";
import { api } from "boot/axios";

export default {
  components: { PintarRooms },

  setup() {
    // Variables reactivas
    const name = ref("");
    const description = ref(null);
    const price = ref("");
    const amountofPeople = ref(0);
    const options = ref([]);
    const selectedOptions = ref(null);
    const myForm = ref(null);
    const selectedRoom = ref(false);
    const tempid = ref(0);
    //Arreglo de vehiculos
    const rooms = ref([]);
    const token = localStorage.getItem("token");
    const inception = ref(false);
    //GETTES SETTES

    const getRooms = async () => {
      await api
        .get("/api/Room", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          rooms.value = response.data;
          console.log(rooms.value);
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
        console.log(options.value);
      } catch (error) {
        console.error("Error al obtener las opciones desde la API", error);
      }
    };

    const updateRoom = (row) => {
      selectedOptions.value = row.hotelId;
      name.value = row.name;
      description.value = row.description;
      price.value = row.price;
      amountofPeople.value = row.amountofPeople;
      selectedRoom.value = true;
      tempid.value = row.id;
      inception.value = true;
    };
    const procesingForm = async () => {
      myForm.value.resetValidation();

      const hotelId = selectedOptions.value ? selectedOptions.value : null;
      const newRoom = {
        id: selectedRoom.value ? tempid.value : 0,
        name: name.value,
        description: description.value,
        price: price.value,
        amountofPeople: amountofPeople.value,
        hotelId: hotelId,
      };
      if (!selectedRoom.value) {
        await api.post("/api/Room", newRoom, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await api.put("/api/Room", newRoom, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      rooms.value = [...rooms.value, newRoom];
      reset();
      fillTable();
    };

    const fillTable = () => {
      console.log("Llenando la tabla...");
    };

    const reset = () => {
      name.value = null;
      description.value = null;
      price.value = null;
      amountofPeople.value = null;
      selectedOptions.value = null;
      fillTable();
    };

    onMounted(() => {
      getRooms();
      getOptions();
    });
    const handleClose = () => {
      inception.value = false;
      location.reload();
    };
    return {
      rooms,
      name,
      description,
      price,
      myForm,
      token,
      selectedOptions,
      options,
      inception,
      amountofPeople,
      procesingForm,
      reset,
      updateRoom,
      handleClose,
    };
  },
};
</script>

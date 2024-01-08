<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h2>{{ $t("hoteles") }}</h2>
  <div>
    <q-btn :label="$t('nuevo')" color="positive" @click="inception = true" />
    <!-- style="margin-left: 18px;" -->
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
                  :label="$t('nombre')"
                  v-model="name"
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
                  v-model="chain"
                  :options="options"
                  :label="$t('chain')"
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
                  :label="$t('category')"
                  v-model="category"
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
                  :label="$t('phone')"
                  v-model="phone"
                  mask="53########"
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
                  :label="$t('email')"
                  v-model="email"
                  type="email"
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
                  :label="$t('rooms')"
                  v-model="rooms"
                  placeholder="10"
                  min="10"
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
                  :label="$t('floors')"
                  v-model="floors"
                  placeholder="1"
                  min="1"
                  max="40"
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
                  :label="$t('dairport')"
                  v-model="dairport"
                  placeholder="1"
                  min="1"
                  max="1200"
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
                  :label="$t('dcity')"
                  v-model="dcity"
                  placeholder="0"
                  min="0"
                  max="1200"
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
                  v-model="locations"
                  outlined
                  :placeholder="$t('ejAddress')"
                  :label="$t('address')"
                  lazy-rules
                  :rules="[
                    // (val) =>
                    //   /^Calle\s[A-Za-z]\d+\sentre\s[A-Za-z]\d+\sy\s[A-Za-z]\d+\s\d+\s[A-Za-z]+\s[A-Za-z]+$/.test(
                    //     val
                    //   ) || 'La dirección no sigue el patrón requerido',
                    (val) => (val && val.length > 0) || this.$t('rellene'),
                  ]"
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
                  placeholder="1"
                  min="1"
                  max="3000"
                />
              </div>
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
              <div>
                <q-select
                  v-model="commercialization"
                  outlined
                  :options="getOptions()"
                  :label="$t('commercialization')"
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
            <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
              <div>
                <q-select
                  outlined
                  v-model="selectedOptionsContract"
                  :options="optionsContract"
                  :label="$t('contratos')"
                  emit-value
                  map-options
                  lazy-rules
                />
              </div>
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
              <div>
                <q-select
                  outlined
                  v-model="enabled"
                  :options="optionsEnabled"
                  :label="$t('enabled')"
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
      </div>
    </q-dialog>
  </div>
  <pintar-hoteles :hoteles="hoteles" @buttonClicked="updateHotel" />
</template>

<script>
import PintarHoteles from "src/components/PintarHoteles.vue";
import { ref, onMounted } from "vue";
import { api } from "boot/axios";

export default {
  components: { PintarHoteles },
  setup() {
    // Variables reactivas
    const optionsProvince = ref([]);
    const selectedOptions = ref(null);
    const optionsContract = ref(0);
    const selectedOptionsContract = ref(null);
    const enabled = ref(null);
    const optionsEnabled = ref("");
    const name = ref("");
    const province = ref(null);
    const category = ref("");
    const phone = ref("");
    const email = ref("");
    const rooms = ref("");
    const floors = ref("");
    const dairport = ref("");
    const dcity = ref("");
    const locations = ref("");
    const price = ref("");
    const chain = ref(null);
    const commercialization = ref(null);
    const myForm = ref(null);
    const token = localStorage.getItem("token");
    const inception = ref(false);
    const tempid = ref(0);
    const selectedHotel = ref(false);
    //Arreglo de hoteles
    const hoteles = ref([]);

    const lang = ref("es");

    const getOptions = () => {
      return lang.value == "es"
        ? ["Alto", "Medio", "Bajo"]
        : ["High", "Medium", "Low"];
    };
    const getOptionsProvince = async () => {
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
    const getContracts = async () => {
      try {
        const response = await api.get("/api/HotelContract", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        optionsContract.value = response.data.map((tupla) => ({
          label: tupla.id,
          value: tupla.id,
        }));
      } catch (error) {
        console.error("Error al obtener las opciones desde la API", error);
      }
    };
    const getHotels = async () => {
      await api
        .get("/api/Hotel", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          hoteles.value = response.data;
          console.log(hoteles.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const procesingForm = async () => {
      myForm.value.resetValidation();
      // console.log("Hakuna mATATA"+count);
      const newHotel = {
        hotelId: selectedHotel.value ? tempid.value : 0,
        name: name.value,
        chain: chain.value,
        province: province.value,
        category: category.value,
        phone: phone.value,
        email: email.value,
        numberOfRooms: rooms.value,
        disNearCity: dcity.value,
        disAirport: dairport.value,
        numberOfFloors: floors.value,
        address: locations.value,
        comercializationMode: commercialization.value,
        price: price.value,
        enabled: true,
        provinceId: selectedOptions.value,
        contractId: selectedOptionsContract.value,
      };
      if (!selectedHotel.value) {
        const response = await api.post("/api/Hotel", newHotel, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        hoteles.value = [...hoteles.value, newHotel];
      } else {
        const response = await api.put("/api/Hotel", newHotel, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      reset();
      fillTable();
    };
    const updateHotel = async (row) => {
      tempid.value = row.hotelId;
      name.value = row.name;
      chain.value = row.chain;
      category.value = row.category;
      phone.value = row.phone;
      email.value = row.email;
      rooms.value = row.numberOfRooms;
      dcity.value = row.disNearCity;
      dairport.value = row.disAirport;
      floors.value = row.numberOfFloors;
      locations.value = row.address;
      commercialization.value = row.comercializationMode;
      price.value = row.price;
      selectedOptions.value = row.provinceId;
      selectedOptionsContract.value = row.contractId;
      enabled.value = row.enabled;
      inception.value = true;
      selectedHotel.value = true;
    };
    const fillTable = () => {
      console.log(this.$t("llenar"));
    };
    const reset = () => {
      name.value = null;
      category.value = null;
      phone.value = null;
      email.value = null;
      rooms.value = null;
      floors.value = null;
      dairport.value = null;
      dcity.value = null;
      locations.value = null;
      price.value = null;
      chain.value = null;
      commercialization.value = null;
      enabled.value = null;
    };

    onMounted(() => {
      getHotels();
      getOptionsProvince();
      getContracts();
    });
    const handleClose = () => {
      inception.value = false;
      location.reload();
    };
    return {
      optionsContract,
      selectedOptionsContract,
      selectedOptions,
      optionsProvince,
      name,
      chain,
      category,
      phone,
      email,
      rooms,
      floors,
      dairport,
      dcity,
      enabled,
      optionsEnabled: [
        {
          label: "Activo",
          value: true,
        },
        {
          label: "Inactivo",
          value: false,
        },
      ],
      token,
      locations,
      price,
      province,
      commercialization,
      optionscom: ["Alto", "Medio", "Bajo"],
      myForm,
      inception,
      options: ["Melia", "Iberostar", "GranCaribe", "Royalton", "Barcelo"],
      hoteles,
      lang,
      getOptions,
      procesingForm,
      reset,
      handleClose,
      updateHotel,
    };
  },
};
</script>

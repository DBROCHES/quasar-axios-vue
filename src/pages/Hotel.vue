<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h2>{{ $t("hoteles") }}</h2>
  <div>
    <q-btn :label="$t('nuevo')" color="positive" @click="inception = true" />
    <!-- style="margin-left: 18px;" -->
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
                <q-select
                  outlined
                  v-model="province"
                  :options="provinces"
                  :label="$t('province')"
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
                  mask="7#######"
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
                  v-model="location"
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
  <pintar-hoteles :hoteles="hoteles" />
</template>

<script>
import PintarHoteles from "src/components/PintarHoteles.vue";
import { ref, onMounted } from "vue";
import { api } from "boot/axios";

export default {
  components: { PintarHoteles },
  setup() {
    // Variables reactivas
    const name = ref("");
    const province = ref(null);
    const category = ref("");
    const phone = ref("");
    const email = ref("");
    const rooms = ref("");
    const floors = ref("");
    const dairport = ref("");
    const dcity = ref("");
    const location = ref("");
    const price = ref("");
    const chain = ref(null);
    const commercialization = ref(null);
    const myForm = ref(null);

    //Arreglo de vehiculos
    const hoteles = ref([]);

    const lang = ref("es");

    const getOptions = () => {
      return lang.value == "es"
        ? ["Alto", "Medio", "Bajo"]
        : ["High", "Medium", "Low"];
    };

    const getHotels = async () => {
      await api
        .get("/api/Hotel")
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
        address: location.value,
        comercializationMode: commercialization.value,
        price: price.value,
        enabled: true,
      };

      const response = await api.post("/api/Hotel", newHotel);

      hoteles.value = [...hoteles.value, newHotel];
      reset();
      fillTable();
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
      location.value = null;
      price.value = null;
      chain.value = null;
      commercialization.value = null;
    };

    onMounted(() => {
      getHotels();
    });

    return {
      name,
      chain,
      category,
      phone,
      email,
      rooms,
      floors,
      dairport,
      dcity,
      location,
      price,
      province,
      commercialization,
      // optionscom: ["Alto", "Medio", "Bajo"],
      myForm,
      inception: ref(false),
      options: ["Melia", "Iberostar", "GranCaribe", "Royalton", "Barcelo"],
      provinces: [
        "Pinar del Río",
        "Artemisa",
        "La Habana",
        "Mayabeque",
        "Matanzas",
        "Cienfuegos",
        "Villa Clara",
        "Sancti Spíritus",
        "Ciego de Ávila",
        "Camagüey",
        "Las Tunas",
        "Granma",
        "Holguín",
        "Santiago de Cuba",
        "Guantánamo",
        " Isla de la Juventud",
      ],
      hoteles,
      lang,
      getOptions,
      procesingForm,
      reset,
    };
  },
};
</script>

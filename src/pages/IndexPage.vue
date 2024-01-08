<template>
  <div class="q-pa-md relative-position">
    <q-carousel
      animated
      v-model="slide"
      infinite
      class="q-carrusel"
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      ``<q-carousel-slide :name="1" img-src="~assets/beach.jpg" />
      <q-carousel-slide :name="2" img-src="~assets/bar.jpg" />
      <q-carousel-slide :name="3" img-src="~assets/acropolis.jpg" />
      <q-carousel-slide :name="4" img-src="~assets/city.jpg" />
      <q-carousel-slide :name="5" img-src="~assets/diving.jpg" />
      <q-carousel-slide :name="6" img-src="~assets/lighthouse.jpg" />
      <q-carousel-slide :name="7" img-src="~assets/safari.jpg" />
    </q-carousel>
    <div  v-if="rol !== null" class="form-overlay">
      <div id="centrar">
        <q-form
          class="q-pa-md q-gutter-md row items-center justify-center form-container"
          id="q-toolbar"
        >
          <!--------------------------Destino---------------------------------->
          <q-select
            outlined
            v-model="destination"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="options"
            @filter="filterFn"
            :label="$t('destino')"
            class="buscador"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  {{ $t("noResults") }}
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <div class="form-floating">
            <q-input
              standout
              v-model="dates"
              class="buscador"
              :label="$t('fechaDeseada')"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date" range />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <q-input
            class="buscador"
            type="number"
            v-model="personscant"
            :label="$t('numeroPersonas')"
            min="1"
          />
          <div>
            <q-btn
              :label="$t('buscar')"
              type="submit"
              color="primary"
              class ="buscador"
              @click="submitForm"
            />
          </div>
        </q-form>
      </div>
    </div>
  </div>
  <h3 class="text-center">Provincias a visitar</h3>
  <div class="text-center items-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card-section
        flat
        bordered
        v-for="province in provinces"
        :key="province.provinceName"
        class="my-card"
      >
        <div>
          <q-img
            class="full-width-image"
            :src="'https://source.unsplash.com/random?' + province.provinceName"
          />
          <q-card-section>
            <div class="text-h6">{{ province.provinceName }}</div>
            <div v-if="!province.showFullText">
              {{ province.provinceDesc.substring(0, 100) }}...
            </div>
            <div v-else>{{ province.provinceDesc }}</div>
            <q-btn
              flat
              :label="$t('leerMas')"
              @click="province.showFullText = !province.showFullText"
            />
          </q-card-section>
        </div>
      </q-card-section>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { ref, watch, onMounted } from "vue";
import { defineComponent } from "vue";
import { api } from "src/boot/axios";
export default defineComponent({
  name: "IndexPage",
  setup() {
    const personscant = ref(1);
    const destination = ref("");
    const options = ref([]);
    const provinces = ref([]);
    const date = ref(null);
    const dates = ref("");
    const token = localStorage.getItem('token');

    watch(date, (newdate) => {
      dates.value = `${newdate.from} - ${newdate.to}`;
    });
    const submitForm = () => {

      if(destination.value != null && dates.value.start != null && dates.value.end != null && personscant.value != null){
        localStorage.setItem('prov',destination.value);
        localStorage.setItem('starDate',dates.value.start);
        localStorage.setItem('endDate',dates.value.end);
        localStorage.setItem('amountP',amountofPeople.value);
      }
    };
    const getOptions = async () => {
      try {
        const response = await api.get("/api/ProvinceSet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        options.value = response.data.map((tupla) => ({
          label: tupla.provinceName,
          value: tupla.provinceId,
        }));
      } catch (error) {
        console.error("Error al obtener las opciones desde la API", error);
      }
    };
    onMounted(() => {
      getOptions();
    });

    return {
      options,
      date,
      dates,
      token,
      submitForm,
      personscant,
      destination,
      provinces,
      slide: ref(1),
      autoplay: ref(true),
      rol: localStorage.getItem("role"),
    };
  },
});
</script>
<style scoped>
.form-overlay {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
}

.q-carrusel {
  position: relative;
}

.form-container {
  background-color: transparent;
  width: 100%;
}
.ofertas {
  position: relative;
}
.my-card {
  border-radius: 0;
  width: 300px; /* Ajusta este valor al tamaño deseado para tu tarjeta */
  justify-content: center;
  display: flex;
}
.full-width-image {
  height: 300px; /* Ajusta este valor al tamaño deseado para tu imagen */
}
.absolute-center {
  top: 0%;
  left: 0%;
  transform: translate(-50%, -50%);
}
</style>

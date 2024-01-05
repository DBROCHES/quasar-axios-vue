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
    <div class="form-overlay">
      <div v-if="rol !== null" id="centrar">
        <q-form
          class="q-pa-md row items-center justify-center form-container"
          id="q-toolbar"
        >
        <!--------------------------Destino---------------------------------->
        <q-select
              standout
              v-model="model"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="options"
              @filter="filterFn"
              label="Destino"
              class="buscador"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
           <!------------------FECHAS------------------------------->
           <div class="form-floating">
              <q-input
                standout
                v-model="date"
                class="buscador"
                label="Fecha deseada"
                mask="date"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="date"  range/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <!----------------Numero de personas---------------------------------------------->
            <q-input
              class="buscador"
              type="number"
              v-model="personscant"
              label="Numero de personas"
              min="1"
            />
            <div>
              <q-btn
                label="Buscar"
                type="submit"
                class="buscador"
                color="primary"
              />
            </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  setup() {
    return {
      date: {
        start: null,
        end: null
      },
      slide: ref(1),
      autoplay: ref(true),
      rol: localStorage.getItem('role'),
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


</style>

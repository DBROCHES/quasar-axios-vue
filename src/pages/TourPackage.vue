<template>
  <q-page padding>
    <h3 class="q-mb-md q-mt-md text-h3 text-center">Confeccione sus vacaciones soñadas</h3>
    <h3 class="q-mb-md q-mt-md text-h4 text-center">Hoteles</h3>
    <!-- <div class="q-pa-md">
      <q-list class="q-gutter-md row" v-for="hotel in hotels" :key="hotel.name">
        <q-item v-ripple class="q-col-xs-12 q-col-sm-6 q-col-md-4 fit">
    <h3>{{ $t("planVac") }}</h3>

    <h5>{{ $t("hoteles") }}</h5>
    <div class="row">
      <q-list class="row fit" v-for="hotel in hotels" :key="hotel.name">
        <q-item v-ripple class="fit">
          <q-item-section>
            <q-card class="my-card">
              <q-card-section horizontal>
                <q-img class="fixed-size" src="https://source.unsplash.com/random?hotels" ratio="16 / 9" />
                <q-card-section vertical class="fit">
                  <div class="text-h6">
                    {{ hotel.chain + " " + hotel.name }}
                  </div>
                  <q-rating v-model="hotel.category" size="1.5em" icon="star" />
                  <div class="text-subtitle2 animated-description">
                    {{ "$" + hotel.price }}
                  </div>
                  <q-card-section>
                    <q-btn
                      color="primary"
                      label="Ver Oferta"
                      @click="
                        $router.push({
                          name: 'PintartourPackage',
                          params: { datos: datosDeLaCard },
                        })
                      "
                    ></q-btn>
                  </q-card-section>
                  <q-card-actions class="absolute-bottom-right">
                  </q-card-actions>
                </q-card-section>
              </q-card-section>
            </q-card>
          </q-item-section>
        </q-item>
      </q-list>
    </div> -->
    <div class="q-pa-md row justify-center items-center">
    <div class="row items-center flex-center" style="height: 300px">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered v-for="hotel in hotels" :key="hotel.name">
        <q-img src="https://source.unsplash.com/random?hotels" />

        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ hotel.chain + " " + hotel.name }}</div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon name="flight" />
              {{ hotel.disAirport + "km" }}
            </div>
          </div>

          <q-rating v-model="hotel.category" :max="5" size="32px" icon="star" readonly/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">{{ "$" + hotel.price }}</div>
          <div class="text-caption text-grey">
            Puede ahorrar hasta un 20% si paga con MasterCard.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn
            flat
            color="primary"
            label="Ver Oferta"
            @click="verOferta(hotel)"
            ></q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</div>

    <!-- Similar sections for Comidas, Habitaciones, Coches, Actividades -->
  </q-page>
</template>

<script>
import PintartourPackage from "src/components/PintartourPackage.vue";
import { api } from "boot/axios";
export default {
  data() {
    return {
      hotels: [], 
      mostrarComponente: false,
      // Similar data for Comidas, Habitaciones, Coches, Actividades
      token: localStorage.getItem('token'),
      
      // Similar options for Comidas, Habitaciones, Coches, Actividades
    };
  },
  methods: {
    verOferta(hotel) {
      this.$router.push({
        name: 'PintartourPackage',
        params: { datos: hotel },
      });
    },
     async getHotels (){
      await api
        .get("/api/Hotel", {
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
        })   
        .then((response) => {
          this.hotels = response.data;
          console.log(this.hotels);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getHotels();
  },
};
</script>

<style>
.my-card {
  border-radius: 25px;
}
.absolute-bottom-right {
  position: absolute;
  bottom: 0;
  right: 0;
}

.fixed-size {
  width: 300px; /* Ajusta este valor al tamaño deseado para tu imagen */
  height: 200px; /* Ajusta este valor al tamaño deseado para tu imagen */
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

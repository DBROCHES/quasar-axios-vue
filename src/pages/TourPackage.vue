<template>
  <q-page padding>
    <h3>{{ $t("planVac") }}</h3>

    <h5>{{ $t("hoteles") }}</h5>
    <div class="row">
      <q-list class="row fit" v-for="hotel in hotels" :key="hotel.name">
        <q-item v-ripple class="fit">
          <q-item-section>
            <q-card class="my-card fit">
              <q-card-section horizontal>
                <q-img class="fixed-size" :src="hotel.image" :ratio="16 / 9" />
                <q-card-section vertical class="fit">
                  <div class="text-h6">
                    {{ hotel.chain + " " + hotel.name }}
                  </div>
                  <q-rating v-model="hotel.category" size="1.5em" icon="star" />
                  <div class="text-subtitle2 animated-description">
                    {{ hotel.description }}
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
    </div>

    <!-- Similar sections for Comidas, Habitaciones, Coches, Actividades -->
  </q-page>
</template>

<script>
import PintartourPackage from "src/components/PintartourPackage.vue";
export default {
  data() {
    return {
      selectedHotel: null,
      mostrarComponente: false,
      // Similar data for Comidas, Habitaciones, Coches, Actividades
      hotels: [
        {
          name: "Hotel 1",
          description: this.$t("descipHotel1"),
          image: "https://source.unsplash.com/random?hotel",
          chain: "Iberostal",
          category: 4,
        },
        {
          name: "Hotel 2",
          description: this.$t("descipHotel2"),
          image: "https://source.unsplash.com/random?hotel",
          chain: "Iberostal",
          category: 4,
        },
        {
          name: "Hotel 3",
          description: this.$t("descipHotel3"),
          image: "https://source.unsplash.com/random?hotel",
          chain: "Iberostal",
          category: 4,
        },
      ],
      // Similar options for Comidas, Habitaciones, Coches, Actividades
    };
  },
  methods: {
    selectHotel(hotel) {
      this.selectedHotel = hotel;
      // Similar methods for Comidas, Habitaciones, Coches, Actividades
    },
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

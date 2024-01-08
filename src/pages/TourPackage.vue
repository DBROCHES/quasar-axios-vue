<template>
  <q-page padding>
    <h3 class="q-mb-md q-mt-md text-h3 text-center">{{ $t("planVac") }}</h3>
    <h3 class="q-mb-md q-mt-md text-h4 text-center">{{ $t("hoteles") }}</h3>

    <div class="q-pa-md row justify-center items-center">
      <div class="row items-center flex-center" style="height: 300px">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card
            class="my-card"
            flat
            bordered
            v-for="hotel in hotels"
            :key="hotel.name"
          >
            <q-img
              class="full-width-image"
              src="https://source.unsplash.com/random?hotels"
            />

            <q-card-section>
              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">
                  {{ hotel.chain + " " + hotel.name }}
                </div>
                <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                >
                  <q-icon name="flight" />
                  {{ hotel.disAirport + "km" }}
                </div>
              </div>

              <q-rating
                v-model="hotel.category"
                :max="5"
                size="32px"
                icon="star"
                readonly
              />
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
import { api } from "boot/axios";
export default {
  data() {
    return {
      hotels: [],
      mostrarComponente: false,
      token: localStorage.getItem("token"),
      prov: null,
      starDate: null,
      enddate: null,
      amountP: null,
      province: null,
    };
  },
  methods: {
    verOferta(hotel) {
      const h = JSON.stringify(hotel);
      sessionStorage.setItem("slchotel", h);
      this.$router.push({
        name: "PintartourPackage",
      });
    },
    getSelecctions() {
      this.province = localStorage.getItem("prov");
      this.prov = JSON.parse(this.province);

      this.starDate = localStorage.getItem("starDate");
      this.endDate = localStorage.getItem("endDate");
      this.personscant = localStorage.getItem("amountP");
    },
    async getHotels() {
      await api
        .get(
          `/api/Hotel/Province/ ${this.prov.value}/${this.starDate}/${this.endDate}/${this.personscant}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
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
    this.getSelecctions();
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

.full-width-image {
  height: 250px;
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

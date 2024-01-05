<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page padding>
        <q-stepper v-model="step" ref="stepper" color="primary" animated>
          <q-step :name="1" title="Hotel" icon="hotel" :done="step > 1">
            <PintarbookingStep1
              :meals="meals"
              :rooms="rooms"
              :selectedHotel="selectedhotel"
              @saveroom="selectRoom"
              @savemeal="selectMeal"
            />
          </q-step>

          <q-step
            :name="2"
            title="Seleccione el vehiculo"
            icon="directions_car"
            :done="step > 2"
          >
            <q-list>
              <q-item
                v-for="(vehiculo, index) in vehiculos"
                v-show="
                  selectedVehicleIndex === -1 || selectedVehicleIndex === index
                "
                :key="index"
                clickable
              >
                <q-item-section>
                  <q-card class="fit">
                    <q-card-section horizontal>
                      <q-img class="fixed-size" :src="vehiculo.image" />
                      <q-card-section vertical>
                        <div class="text-h6">{{ vehiculo.nombre }}</div>
                        <div>{{ vehiculo.descripcion }}</div>
                        <div>Modalidades:</div>
                        <q-badge
                          :color="white"
                          text-color="orange"
                          v-if="
                            selectedVehicleIndex !== -1 &&
                            selectedModality === 0
                          "
                          ><q-icon name="warning" size="14px" class="q-ml-xs" />
                          Marque una de las tres modalidades del vehículo
                        </q-badge>
                        <q-card-section horizontal>
                          <q-chip
                            clickable
                            rounded
                            color="blue"
                            text-color="white"
                            @click="selectModality(index, 1)"
                          >
                            {{ "$" + vehiculo.precioPorHora + "/h" }}
                            <q-badge
                              color="green"
                              floating
                              rounded
                              v-if="
                                selectedModality !== 0 &&
                                selectedModality ==
                                  vehiculos[index].precioPorHora
                              "
                            >
                              <q-icon name="check"
                            /></q-badge>
                          </q-chip>
                          <q-chip
                            clickable
                            color="orange"
                            text-color="white"
                            @click="selectModality(index, 2)"
                          >
                            {{ "$" + vehiculo.precioPorKilometro + "/k" }}
                            <q-badge
                              color="green"
                              floating
                              rounded
                              v-if="
                                selectedModality !== 0 &&
                                selectedModality ==
                                  vehiculos[index].precioPorKilometro
                              "
                            >
                              <q-icon name="check"
                            /></q-badge>
                          </q-chip>
                          <q-chip
                            clickable
                            rounded
                            color="purple"
                            text-color="white"
                            @click="selectModality(index, 3)"
                          >
                            {{ "$" + vehiculo.precioPorViaje + "/Viaje" }}

                            <q-badge
                              color="green"
                              floating
                              rounded
                              v-if="
                                selectedModality !== 0 &&
                                selectedModality ==
                                  vehiculos[index].precioPorViaje
                              "
                            >
                              <q-icon name="check"
                            /></q-badge>
                          </q-chip>
                        </q-card-section>
                      </q-card-section>
                      <q-card-actions>
                        <q-btn
                          :color="
                            selectedVehicles !== null ? 'green' : 'primary'
                          "
                          @click="selectVehicle(index)"
                        >
                          <q-icon
                            name="check"
                            v-if="selectedVehicles !== null"
                          />
                          {{ selectedVehicles !== null ? " " : "Seleccionar" }}
                        </q-btn>
                      </q-card-actions>
                    </q-card-section>
                  </q-card>
                </q-item-section>
              </q-item>
            </q-list>
          </q-step>
          <q-step
            :name="3"
            title="Seleccione Actividades diarias"
            icon="event"
            :done="step > 3"
          >
            <q-list>
              <q-item
                v-for="(activity, index) in activities"
                :key="index"
                clickable
              >
                <q-item-section>
                  <q-card class="fit">
                    <q-card-section horizontal>
                      <q-img class="fixed-size" :src="activity.image" />
                      <q-card-section vertical>
                        <q-expansion-item
                          label="Toque aqui para ver la descripción"
                          icon="mdi-chevron-down"
                        >
                          <q-card-section>
                            <div class="text-caption">
                              {{ activity.descripcion }}
                            </div>
                          </q-card-section>
                        </q-expansion-item>
                        <q-card-section>
                          <div class="text-h5">Precio:</div>
                          <div class="text-h6 text-bold">
                            {{ "$" + activity.price }}
                          </div>
                        </q-card-section>
                      </q-card-section>
                      <q-card-actions>
                        <q-btn
                          :color="
                            selectedActivities[index] ? 'green' : 'primary'
                          "
                          @click="seleccionarActividad(index)"
                        >
                          <q-icon
                            name="check"
                            v-if="selectedActivities[index]"
                          />
                          {{ selectedActivities[index] ? " " : "Seleccionar" }}
                        </q-btn>
                      </q-card-actions>
                    </q-card-section>
                  </q-card>
                </q-item-section>
              </q-item>
            </q-list>
          </q-step>
          <q-step :name="4" title="Reservar" icon="done" :done="step > 4">
            <h3>Paquete Turístico</h3>
            <q-form>
              <q-list bordered>
                <q-item clickable v-ripple>
                  <q-item-section>
                    <q-item-label class="text-bold">Hotel</q-item-label>
                    <div>
                      {{ selectedhotel.chain + " " + selectedhotel.name }}
                    </div>
                    <q-rating
                      v-model="selectedhotel.category"
                      size="1.5em"
                      icon="star"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-bold">Habitación</q-item-label>
                    <div>
                      {{ selectedRoom.name }}
                    </div>
                    <div>{{ "$" + selectedRoom.price }}</div>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-bold"
                      >Plan de comida</q-item-label
                    >
                    <div>{{ selectedMeal.name }}</div>
                    <div>{{ "$" + selectedMeal.price }}</div>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-h6 text-bold">Total:</div>
                    <div
                      class="text-subtitle2 text-bold"
                      style="text-align: end"
                    >
                      {{ "$" + (selectedRoom.price + selectedMeal.price) }}
                    </div>
                  </q-item-section>
                </q-item>
                <q-item v-if="selectedVehicles != null" class="col-12 col-md">
                  <q-item-section>
                    <q-item-label class="text-bold">Vehículo</q-item-label>
                    <div>
                      {{ selectedVehicles.nombre }}
                    </div>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Modalidad</q-item-label>
                    <div class="text-subtitle2">
                      {{ "$" + selectedModality }}
                    </div>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-h6 text-bold" style="text-align: end">
                      Total:
                    </div>
                    <div class="text-h6 text-bold" style="text-align: end">
                      {{ "$" + selectedModality }}
                    </div>
                  </q-item-section>
                </q-item>
                <q-item v-if="activitiesOn.length !== 0">
                  <q-item-section>
                    <q-item-label>Actividades Seleccionadas</q-item-label>
                    <div>{{ activitiesOn.length }}</div>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-h6 text-bold" style="text-align: end">
                      Total:
                    </div>
                    <div class="text-bold" style="text-align: end">
                      {{ "$" + sumallactivities() }}
                    </div>
                  </q-item-section>
                </q-item>
                <q-item
                  ><div class="text-h6 text-bold" style="text-align: end">
                    Precio del pequete
                  </div>
                  <div class="text-h6 text-bold" style="text-align: end">
                    {{ "$" + calcularTotal() }}
                  </div>
                </q-item>
              </q-list>
            </q-form>
          </q-step>
          <template v-slot:navigation>
            <q-badge
              :color="white"
              text-color="orange"
              v-if="step === 1 && buttonValidation()"
              ><q-icon name="warning" size="14px" class="q-ml-xs" />
              Seleccione la habitación y el plan de comida que desea
            </q-badge>
            <q-stepper-navigation>
              <q-btn
                @click="$refs.stepper.next()"
                color="primary"
                :label="step === 4 ? 'Reservar' : 'Continuar'"
                :disable="buttonValidation()"
              />
              <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="$refs.stepper.previous()"
                label="Back"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
        <!--
        <q-drawer
          side="right"
          id="Filterpane"
          v-model="drawerRight"
          show-if-above
          :breakpoint="700"
          elevated
          class="bg-white text-black"
        >
          <q-scroll-area class="fit">
            <div class="q-pa-sm">
              <h5>Filtros</h5>
              <q-input v-model="text" type="text" label="Destino" />
            </div>
          </q-scroll-area>
        </q-drawer>-->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import PintarbookingStep1 from "src/components/PintarbookingStep1.vue";

export default {
  components: { PintarbookingStep1 },
  data() {
    return {
      selectedRoom: null,
      white: "white",
      selectedRoomindex: -1,
      provincia: "",
      selectedhotel: {
        name: "Arenas Doradas",
        chain: "Gran Caribe",
        category: 4,
        descripcion: " hotel bueno",
      },
      selectedMeal: null,
      selectedMealtype: "",
      mealstypes: [
        "Todo Incluido",
        "Solo Comidas",
        "Solo Desayuno",
        "Solo Almuerzo",
        "Solo Comida",
      ],
      meals: [
        {
          name: "Todo Incluido",
          descripcion:
            "pero quiero que se muestre algo de la descipcion y solo cuando el usuario le de se muestre completa ademas ssoloquiero que acete eel tamaño de esa qcard no quiero que afecte las demas",
          price: 20,
        },
        {
          name: "Solo Comidas",
          descripcion: "regular",
          price: 10,
        },
        {
          name: "Solo Desayuno",
          descripcion: "algo ahi",
          price: 40,
        },
        {
          name: "Solo Almuerzo",
          descripcion: "algo ahi",
          price: 60,
        },
        {
          name: "Solo Comida",
          descripcion: "algo ahi",
          price: 60,
        },
      ],
      provincias: ["Provincia 1", "Provincia 2", "Provincia 3"],
      selectedVehicleIndex: -1,
      selectedModality: 0,
      step: 1,
      selectedVehicles: null,
      selectedActivities: {},
      activitiesOn: [],
      showMore: false,
      activities: [
        {
          image: "https://source.unsplash.com/random?party",
          descripcion:
            "pero quiero que se muestre algo de la descipcion y solo cuando el usuario le de se muestre completa ademas ssoloquiero que acete eel tamaño de esa qcard no quiero que afecte las demas",
          price: 20,
        },
        {
          image: "https://source.unsplash.com/random?party",
          descripcion: "regular",
          price: 10,
        },
        {
          image: "https://source.unsplash.com/random?party",
          descripcion: "algo ahi",
          price: 40,
        },
        {
          image: "https://source.unsplash.com/random?party",
          descripcion: "algo ahi",
          price: 60,
        },
      ],
      vehiculos: [
        {
          nombre: "Vehículo A",
          descripcion:
            "Un vehículo compacto y eficiente en combustible, ideal para la ciudad.",
          precioPorHora: 10,
          precioPorKilometro: 0.5,
          precioPorViaje: 50,
          image: "https://source.unsplash.com/random?vehicle",
        },
        {
          nombre: "Vehículo B",
          descripcion:
            "Un vehículo de lujo con todas las comodidades, perfecto para viajes largos.",
          precioPorHora: 20,
          precioPorKilometro: 1,
          precioPorViaje: 100,
          image: "https://source.unsplash.com/random?vehicle",
        },
        {
          nombre: "Vehículo C",
          descripcion:
            "Un vehículo deportivo de alto rendimiento, para los amantes de la velocidad.",
          precioPorHora: 30,
          precioPorKilometro: 1.5,
          precioPorViaje: 150,
          image: "https://source.unsplash.com/random?vehicle",
        },
        {
          nombre: "Vehículo D",
          descripcion:
            "Un vehículo todoterreno robusto, para aventuras fuera de la carretera.",
          precioPorHora: 15,
          precioPorKilometro: 0.75,
          precioPorViaje: 75,
          image: "https://source.unsplash.com/random?vehicle",
        },
      ],

      // Agrega aquí más campos según sea necesario
      rooms: [
        {
          name: "Habitación Deluxe",
          description:
            "Una habitación espaciosa con una cama king size y vistas al mar.",
          price: 40,
        },
        {
          name: "Habitación Doble",
          description: "Una habitación cómoda con dos camas individuales.",
          price: 40,
        },
        {
          name: "Suite Presidencial",
          description:
            "Nuestra suite más lujosa con una amplia sala de estar, cocina y jacuzzi.",
          price: 40,
        },
      ],
    };
  },

  methods: {
    calcularPrecio() {
      // Aquí va la lógica para calcular el precio
    },
    selectRoom(room) {
      this.selectedRoom = room;
    },
    selectMeal(meal) {
      this.selectedMeal = meal;
    },
    selectVehicle(index) {
      if (this.selectedVehicleIndex === index) {
        this.selectedVehicles = null;
        this.selectedVehicleIndex = -1;
        this.selectedModality = 0;
      } else {
        this.selectedVehicleIndex = index;
        this.selectedVehicles = this.vehiculos[index];
      }
    },
    seleccionarActividad(index) {
      this.selectedActivities[index] = !this.selectedActivities[index];
      if (this.selectedActivities[index])
        this.activitiesOn.push(this.activities[index]);
      else {
        let temp = this.activitiesOn.findIndex(
          (s) => s.price === this.activities[index].price
        );
        this.activitiesOn.splice(temp, 1);
      }
    },
    selectModality(index, type) {
      if (this.selectedVehicles === null) {
        this.selectedVehicles = this.vehiculos[index];
        this.selectedVehicleIndex = index;
      }

      if (type === 1)
        this.selectedModality = this.vehiculos[index].precioPorHora;
      else if (type === 2)
        this.selectedModality = this.vehiculos[index].precioPorKilometro;
      else if (type === 3)
        this.selectedModality = this.vehiculos[index].precioPorViaje;
    },
    sumallactivities() {
      let sum = 0;
      if (this.activitiesOn.length != 0) {
        sum = this.activitiesOn.reduce(
          (total, object) => total + object.price,
          0
        );
      }
      return sum;
    },
    buttonValidation() {
      if (this.step == 1) {
        if (this.selectedRoomindex === -1 || this.selectedMeal === null) {
          return true;
        } else {
          return false;
        }
      } else if (this.step === 2) {
        if (this.selectedModality == 0 && this.selectedVehicleIndex !== -1) {
          return true;
        } else return false;
      }
    },
    calcularTotal() {
      if (this.selectedMeal !== null && this.selectedRoom !== null)
        return (
          this.rooms[selectedRoomindex].price +
          this.selectedMeal.price +
          this.selectedModality +
          this.sumallactivities()
        );
      else {
        return 0;
      }
    },
  },
};
</script>

<style scoped>
.my-card {
  background: white;
  border-radius: 10px;
}
.latiza {
  border: 5px;
  border-color: rgb(26, 26, 181);
}
.fixed-size {
  width: 300px; /* Ajusta este valor al tamaño deseado para tu imagen */
  height: 200px; /* Ajusta este valor al tamaño deseado para tu imagen */
}
</style>

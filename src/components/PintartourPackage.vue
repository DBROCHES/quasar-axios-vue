<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page padding>
        <q-stepper v-model="step" ref="stepper" color="primary" animated>
          <q-step :name="1" title="Hotel" icon="hotel" :done="step > 1">
            <div class="row q-col-gutter-md">
              <q-card class="my-card fit" animated>
                <q-img src="https://cdn.quasar.dev/img/mountains.jpg" />
                <q-card-section>
                  <div class="text-h5">
                    {{
                      "Hotel " + selectedhotel.chain + " " + selectedhotel.name
                    }}
                  </div>
                  <q-rating
                    v-model="selectedhotel.category"
                    readonly
                    size="1.5em"
                    icon="star"
                  />
                </q-card-section>
                <q-card-section>
                  <q-card-section>
                    <div class="text-h6">
                      Seleccione el Plan de Comida que Desea:
                    </div>
                    <q-select
                      v-model="selectedMeal"
                      :options="meals"
                      option-label="name"
                      label="Plan de comida"
                      filled
                    />
                    <q-card-section v-if="selectedMeal !== null">
                      <div class="text-subtitle2">Descripcion:</div>
                      <div>
                        {{ selectedMeal.descripcion }}
                      </div>
                    </q-card-section>
                  </q-card-section>
                  <div class="text-h6">
                    Seleccione Las Habitaciones que desee
                  </div>
                  <q-list>
                    <q-item
                      v-for="(room, index) in rooms"
                      v-show="
                        selectedRoomindex === -1 || selectedRoomindex === index
                      "
                      :key="index"
                      clickable
                    >
                      <q-item-section>
                        <q-item-label>{{ room.name }}</q-item-label>
                        <q-item-label caption>{{
                          room.description
                        }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-btn
                          :color="selectedRoom !== null ? 'green' : 'primary'"
                          @click="selectRoom(index)"
                        >
                          <q-icon name="check" v-if="selectedRoom !== null" />
                          {{ selectedRoom !== null ? " " : "Seleccionar" }}
                        </q-btn>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
              <!-- Repite el patrón anterior para otros campos como hotel, cuarto del hotel, plan de comida, etc. -->
            </div>
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
                        <q-card-section horizontal>
                          <q-chip rounded color="blue" text-color="white">
                            {{ "$" + vehiculo.precioPorHora + "/h" }}
                          </q-chip>
                          <q-chip rounded color="orange" text-color="white">
                            {{ "$" + vehiculo.precioPorKilometro + "/k" }}
                          </q-chip>
                          <q-chip rounded color="green" text-color="white">
                            {{ "$" + vehiculo.precioPorViaje + "/Viaje" }}
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
                          label="Toque aqui para ver la descripcion"
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
                  <q-q-item-section>
                    <div class="text-h6 text-bold">Total:</div>
                    <div
                      class="text-subtitle2 text-bold"
                      style="text-align: end"
                    >
                      {{ "$" + (selectedRoom.price + selectedMeal.price) }}
                    </div>
                  </q-q-item-section>
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
                    <q-select
                      v-model="selectedModality"
                      :options="[
                        'Costo por horas',
                        'Costo por kilometros',
                        'Costo por Viaje',
                      ]"
                      label=" Seleccione la modalidad"
                      filled
                    />
                  </q-item-section>
                  <q-item-section>
                    <div class="text-h6 text-bold" style="text-align: end">
                      Total:
                    </div>
                    <div class="text-bold" style="text-align: end">
                      {{ selectModality() }}
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
                      {{ sumallactivities() }}
                    </div>
                  </q-item-section>
                </q-item>
                <q-item>
                  <div class="text-h5 text-bold" style="text-align: end">
                    Precio total del paquete:
                  </div>
                  <div class="text-bold" style="text-align: end">
                    {{
                      "$" +
                      (selectedRoom.price +
                        selectedMeal.price +
                        selectModality() +
                        sumallactivities())
                    }}
                  </div>
                </q-item>
              </q-list>
            </q-form>
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                @click="$refs.stepper.next()"
                color="primary"
                :label="step === 4 ? 'Finish' : 'Continue'"
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
import { computed, ref } from "vue";
export default {
  data() {
    return {
      selectedRoom: null,
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
      selectedModality: "",
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
    selectRoom(index) {
      if (this.selectedRoomindex === index) {
        this.selectedRoom = null;
        this.selectedRoomindex = -1;
      } else {
        this.selectedRoom = this.rooms[index];
        this.selectedRoomindex = index;
      }
    },
    selectVehicle(index) {
      if (this.selectedVehicleIndex === index) {
        this.selectedVehicles = null;
        this.selectedVehicleIndex = -1;
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
    selectModality() {
      if (this.selectedModality === "") return 0;
      else if (this.selectedModality === "Costo por horas")
        return "$" + this.selectedVehicles.precioPorHora;
      else if (this.selectedModality === "Costo por kilometros")
        return "$" + this.selectedVehicles.precioPorKilometro;
      else if (this.selectedModality === "Costo por Viaje")
        return "$" + this.selectedVehicles.precioPorViaje;
    },
    sumallactivities() {
      let sum = 0;
      if (this.activitiesOn.length !== 0) {
        sum = this.activitiesOn.reduce(
          (total, object) => total + object.price,
          0
        );
      }
      return sum;
    },
  },

  setup() {
    return {
      drawerLeft: ref(false),
      drawerRight: ref(false),
      ratingModel: ref(4),
    };
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

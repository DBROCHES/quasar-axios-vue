<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page padding>
        <q-stepper v-model="step" ref="stepper" color="primary" animated>
          <!---------------------Seleción de Hotel,Room,Meal------------------------>
          <q-step :name="1" title="Hotel" icon="hotel" :done="step > 1">
            <div class="row q-col-gutter-md">
              <q-card class="my-card fit" animated>
                <q-img
                  src="https://source.unsplash.com/random?hotel"
                  class="full-width-image"
                />
                <q-card-section>
                  <div class="text-h5">
                    {{
                      "Hotel " +
                      this.selectedhotel.chain +
                      " " +
                      this.selectedhotel.name
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
                      {{ $t("selectMealPlan") }}
                    </div>
                    <q-select
                      v-model="selectedMeal"
                      :options="meals"
                      option-label="name"
                      :label="$t('meal')"
                      filled
                    />
                    <q-card-section v-if="selectedMeal !== null">
                      <div class="text-subtitle2">{{ $t("description") }}</div>
                      <div>
                        {{ selectedMeal.description }}
                      </div>
                    </q-card-section>
                  </q-card-section>
                  <div class="text-h6">
                    {{ $t("selectRoom") }}
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
                          {{ selectedRoom !== null ? " " : this.$t("select") }}
                        </q-btn>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
          </q-step>

          <!---------------------------------------------------------------------------->

          <!--------Selecion de vehiculo------------------------------------------------>
          <q-step
            :name="2"
            :title="$t('selectVehicle')"
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
                      <q-img
                        class="fixed-size"
                        src="https://source.unsplash.com/random?vehicle"
                      />
                      <q-card-section vertical>
                        <div class="text-h6">{{ vehiculo.brand }}</div>
                        <div>{{ vehiculo.license_Plate_Number }}</div>
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
                            v-for="(modality, index) in modalities"
                            :key="index"
                            clickable
                            rounded
                            color="blue"
                            text-color="white"
                            @click="
                              selectModality(index, 'Costo por kilometro')
                            "
                          >
                            km
                            <q-badge
                              color="green"
                              floating
                              rounded
                              v-if="
                                selectedModality !== null &&
                                selectedModality.type === 'Costo por kilometro'
                              "
                            >
                              <q-icon name="check"
                            /></q-badge>
                          </q-chip>
                          <q-chip
                            clickable
                            rounded
                            color="blue"
                            text-color="white"
                            @click="selectModality(index, 'Costo por hora')"
                          >
                            hrs
                            <q-badge
                              color="green"
                              floating
                              rounded
                              v-if="
                                selectedModality !== null &&
                                selectedModality.type === 'Costo por hora'
                              "
                            >
                              <q-icon name="check"
                            /></q-badge>
                          </q-chip>
                          <q-chip
                            clickable
                            rounded
                            color="blue"
                            text-color="white"
                            @click="selectModality(index, 'Costo por viaje')"
                          >
                            viaje
                            <q-badge
                              color="green"
                              floating
                              rounded
                              v-if="
                                selectedModality !== null &&
                                selectedModality.type === 'Costo por viaje'
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
                          {{
                            selectedVehicles !== null ? " " : this.$t("select")
                          }}
                        </q-btn>
                      </q-card-actions>
                    </q-card-section>
                  </q-card>
                </q-item-section>
              </q-item>
            </q-list>
          </q-step>
          <!---------------------------------------------------------------------------->
          <!--------------------Selecionar actividades diarias-------------------------->
          <q-step
            :name="3"
            :title="$t('selectDailyActivities')"
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
                      <q-img
                        class="fixed-size"
                        src="https://source.unsplash.com/random?"
                      />
                      <q-card-section vertical>
                        <q-expansion-item
                          :label="$t('seeDescription')"
                          icon="mdi-chevron-down"
                        >
                          <q-card-section>
                            <div class="text-caption">
                              {{ activity.description }}
                            </div>
                          </q-card-section>
                        </q-expansion-item>
                        <q-card-section>
                          <div class="text-h5">{{ $t("price") }}</div>
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
                          {{
                            selectedActivities[index] ? " " : this.$t("select")
                          }}
                        </q-btn>
                      </q-card-actions>
                    </q-card-section>
                  </q-card>
                </q-item-section>
              </q-item>
            </q-list>
          </q-step>
          <!---------------------------------------------------------------------------->

          <!------------------------------Reserva final--------------------------------->
          <q-step
            :name="4"
            :title="$t('reservar')"
            icon="done"
            :done="step > 4"
          >
            <h3>{{ $t("tPackage") }}</h3>
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
                    <q-item-label class="text-bold">{{
                      $t("habitacion")
                    }}</q-item-label>
                    <div>
                      {{ selectedRoom.name }}
                    </div>
                    <div>{{ "$" + selectedRoom.price }}</div>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-bold">{{
                      $t("meal")
                    }}</q-item-label>
                    <div>{{ selectedMeal.name }}</div>
                    <div>{{ "$" + selectedMeal.price }}</div>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-h6 text-bold" style="text-align: end">
                      Total:
                    </div>
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
                    <q-item-label class="text-bold">{{
                      $t("vehicle")
                    }}</q-item-label>
                    <div>
                      {{ selectedVehicles.nombre }}
                    </div>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Modalidad</q-item-label>
                    <div class="text-subtitle2">
                      {{ "$" + selectedVehicles.price }}
                    </div>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-h6 text-bold" style="text-align: end">
                      Total:
                    </div>
                    <div class="text-h6 text-bold" style="text-align: end">
                      {{ "$" + selectedVehicles.price + 50 }}
                    </div>
                  </q-item-section>
                </q-item>
                <q-item v-if="activitiesOn.length !== 0">
                  <q-item-section>
                    <q-item-label class="text-bold"
                      >Actividades Seleccionadas</q-item-label
                    >
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
                <q-item>
                  <q-item-section>
                    <div class="text-h6 text-bold" style="text-align: end">
                      Precio del paquete:
                    </div>
                    <div class="text-h6 text-bold" style="text-align: end">
                      {{ "$" + calcularTotal() }}
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-form>
          </q-step>
          <!---------------------------------------------------------------------------->

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
                v-if="step !== 4"
                @click="$refs.stepper.next()"
                color="primary"
                label="Continuar"
                :disable="buttonValidation()"
              />
              <q-btn
                v-if="step === 4"
                @click="reservar()"
                color="primary"
                label="Reservar"
              />
              <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="$refs.stepper.previous()"
                :label="$t('atras')"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
        <!---------------------------------------------------------------------------->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      selectedRoom: null,
      white: "white",
      selectedRoomindex: -1,
      provincia: "",
      hotel: null,
      selectedhotel: null,
      selectedMeal: null,
      selectedMealtype: "",
      modalities: [],
      meals: null,
      provincias: ["Provincia 1", "Provincia 2", "Provincia 3"],
      selectedVehicleIndex: -1,
      selectedModality: { type: null, modalityid: null },
      step: 1,
      selectedVehicles: null,
      selectedActivities: {},
      activitiesOn: [],
      showMore: false,
      activities: null,
      vehiculos: null,
      rooms: null,
      tipos: [],
    };
  },
  methods: {
    gethotel() {
      this.hotel = sessionStorage.getItem("slchotel");
      this.selectedhotel = JSON.parse(this.hotel);
      console.log(this.selectedhotel.hotelId);
    },
    async getRooms() {
      await api
        .get(`/api/Room/Hotel/ ${this.selectedhotel.hotelId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.rooms = response.data;
          console.log(this.rooms);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getMeals() {
      await api
        .get(`/api/Meal/Hotel/ ${this.selectedhotel.hotelId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.meals = response.data;
          console.log(this.meals);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getModalities() {
      await api
        .get(`/api/Modality/VehicleId/ ${this.selectedVehicles.vehicleId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.modalities = response.data;
          console.log(this.vehiculos);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async getVehicles() {
      await api
        .get(`/api/Vehicles/Province/ ${this.selectedhotel.provinceId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.vehiculos = response.data;
          console.log(this.vehiculos);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getDactivities() {
      await api
        .get(
          `/api/DayliActivities/Province/ ${this.selectedhotel.provinceId}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.activities = response.data;
          console.log(this.activities);
        })
        .catch((error) => {
          console.error(error);
        });
    },
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
      // const r = JSON.stringify(room);
      // sessionStorage.setItem('slcroom',r);
    },
    selectVehicle(index) {
      if (this.selectedVehicleIndex === index) {
        this.selectedVehicles = null;
        this.selectedVehicleIndex = -1;
        this.selectedModality = 0;
      } else {
        this.selectedVehicleIndex = index;
        this.selectedVehicles = this.vehiculos[index];
        this.getModalities(this.selectedVehicles.vehicleId);
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
        getModalities(this.vehiculos[index]);
        this.selectedVehicles = this.vehiculos[index];
        this.selectedVehicleIndex = index;
      }
      this.s;
      let i = 0;
      let find = false;

      while (!find) {
        var c = this.modalities[i].type;

        if (c === type) {
          this.selectedModality.type = c;
          this.selectedModality.modalityid = this.modalities[i].modalityId;
          find = true;
        } else i++;
      }
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
          this.rooms[this.selectedRoomindex].price +
          this.selectedMeal.price +
          this.selectedVehicles.price +
          this.sumallactivities()
        );
      else {
        return 0;
      }
    },
    sumModalitiesCost(modality) {
      if (modality.type === "Costo por hora") {
        return "$" + modality.cost_per_hour + "/h";
      } else if (modality.type === "Costo por viaje") {
        return "$" + modality.route_cost + "/k";
      } else if (modality.type === "Costo por kilometraje") {
        return "$" + modality.cost_per_kilometer + "/viaje";
      }
    },
    async reservar() {
      const paquete = {
        package: 1,
        provinceId: this.selectedhotel.provinceId,
        hotelId: this.selectedhotel.hotelId,
        roomId: this.selectedRoom.id,
        mealId: this.selectedMeal.id,
        vehicleId: this.selectedVehicles ? this.selectedVehicles.vehicleId : 0,
        modalityId: this.selectedModality
          ? this.selectedModality.modalityId
          : 0,
        userId: localStorage.getItem("userId"),
        peopleCant: localStorage.getItem("amountP"),
        startDate: new Date(localStorage.getItem("startDate")),
        endDate: new Date(localStorage.getItem("endDate")),
        totalPrice: this.calcularTotal(),
        dayliActivities: this.activitiesOn,
      };
      await api.post("/api/TourPackage", paquete, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    },
  },

  created() {
    this.gethotel();
    this.getRooms();
    this.getMeals();
    this.getVehicles();
    this.getDactivities();
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
.full-width-image {
  height: 250px;
}
</style>

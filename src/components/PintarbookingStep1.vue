<template>
  <div class="row q-col-gutter-md">
    <q-card class="my-card fit" animated>
      <q-img src="https://source.unsplash.com/random?hotel" />
      <q-card-section>
        <div class="text-h5">
          {{ "Hotel " + selectedHotel.chain + " " + selectedHotel.name }}
        </div>
        <q-rating
          :modelValue="selectedHotel.category"
          readonly
          size="1.5em"
          icon="star"
        />
      </q-card-section>
      <q-card-section>
        <q-card-section>
          <div class="text-h6">Seleccione el Plan de Comida que Desea:</div>
          <q-select
            v-model="selectedMeal"
            :options="meals"
            option-label="name"
            label="Plan de comida"
            filled
            @change="selectMeal"
          />
          <q-card-section v-if="selectedMeal !== null">
            <div class="text-subtitle2">Descripción:</div>
            <div>
              {{ selectedMeal.descripcion }}
            </div>
          </q-card-section>
        </q-card-section>
        <div class="text-h6">Seleccione Las Habitaciones que desee</div>
        <q-list>
          <q-item
            v-for="(room, index) in rooms"
            v-show="selectedRoomindex === -1 || selectedRoomindex === index"
            :key="index"
            clickable
          >
            <q-item-section>
              <q-item-label>{{ room.name }}</q-item-label>
              <q-item-label caption>{{ room.description }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                :color="selectedRoom !== null ? 'green' : 'primary'"
                @click="selectRoom(room, index)"
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
</template>

<script>
import { ref } from "vue";

export default {
  props: { rooms: Array, meals: Array, selectedHotel: Object },
  setup({ emit }) {
    const selectedMeal = ref(null);
    const selectedRoom = ref(null);
    const selectedRoomindex = ref(-1);
    const selectRoom = (room, index) => {
      if (selectedRoomindex.value === index) {
        selectedRoom.value = null;
        selectedRoomindex.value = -1;
      } else {
        selectedRoom.value = room;
        selectedRoomindex.value = index;
        emit("saveroom", room);
      }
    };
    const selectMeal = (meal) => {
      emit("savemeal", meal);
    };
    return {
      selectedMeal,
      selectedRoom,
      selectedRoomindex,
      selectRoom,
      selectMeal,
    };
  },
};
</script>

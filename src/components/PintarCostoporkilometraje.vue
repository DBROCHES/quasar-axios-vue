<template>
  <q-table
    title="Costo por kilometros"
    class="q-mt-md"
    no-data-label="Sin Modalidades para mostrar"
    :columns="columns"
    :rows="allkilometers"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.field">
          {{ props.row[col.field] }}
        </q-td>
        <q-td auto-width>
          <q-btn
            size="sm"
            color="amber"
            round
            dense
            text-color="black"
            icon="edit"
            @click="handleClick(props.row)"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
import { api } from "src/boot/axios";
import { ref, onMounted, watchEffect } from "vue";
const columns = [
  {
    name: "cost_per_kilometer",
    label: "Costo por kilometro",
    alingn: "center",
    field: "cost_per_kilometer",
    sortable: true,
  },
  {
    name: "cost_per_round_trip",
    label: "Costo por viaje de ida y vuelta",
    alingn: "center",
    field: "cost_per_round_trip",
    sortable: true,
  },
  {
    name: "cost_per_waiting_hour",
    label: "Costo por horas de espera",
    alingn: "center",
    field: "cost_per_waiting_hour",
    sortable: true,
  },
];

const rows = [
  {
    cost_per_kilometer: "20",
    cost_per_round_trip: "20",
    cost_per_waiting_hour: "2",
  },
];

export default {
  props: {
    kilometers: Array,
  },

  setup(props, { emit }) {
    const handleClick = (row) => {
      emit("button-clicked", row);
    };
    let allkilometers = ref([...props.kilometers]);
    //Esta funcion hace que los cambios en la propiedad hours del props se reflejen tambien en el arreglo
    watchEffect(() => {
      allkilometers.value = [...props.kilometers];
    });
    //Funcion de llenar la tabla
    const getall = async () => {
      await api
        .get("api/MilageCost")
        .then((response) => {
          allkilometers.value = response.data;
          console.log(allkilometers.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    onMounted(() => {
      getall();
    });
    return {
      columns,
      rows,
      handleClick,
      allkilometers,
    };
  },
};
</script>
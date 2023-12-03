<template>
  <q-table
    title="Costo por viaje"
    class="q-mt-md"
    no-data-label="Sin Modalidades para mostrar"
    :columns="columns"
    :rows="alltours"
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
    name: "rout_description",
    alingn: "center",
    label: "Descripción del viaje",
    field: "rout_description",
    sortable: true,
  },
  {
    name: "route_cost",
    label: "Costo de la ruta",
    alingn: "center",
    field: "route_cost",
    sortable: true,
  },
  {
    name: "round_trip_cost",
    label: "Costo de ida y vuelta",
    alingn: "center",
    field: "round_trip_cost",
    sortable: true,
  },
];

const rows = [
  {
    rout_description: "20",
    route_cost: "20",
    round_trip_cost: "2",
  },
];

export default {
  props: {
    tours: Array,
  },

  setup(props, { emit }) {
    const handleClick = (row) => {
      emit("button-clicked", row);
    };
    let alltours = ref([...props.tours]);
    //Esta funcion hace que los cambios en la propiedad hours del props se reflejen tambien en el arreglo
    watchEffect(() => {
      alltours.value = [...props.tours];
    });
    //Funcion de llenar la tabla
    const getall = async () => {
      await api
        .get("api/CostPerTour")
        .then((response) => {
          alltours.value = response.data;
          console.log(alltours.value);
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
      alltours,
    };
  },
};
</script>

<template>
  <q-table
    class="q-mt-md"
    no-data-label="Sin actividades para mostrar"
    :columns="columns"
    :rows="activities"
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
            text-color="white"
            icon="edit"
            @click="handleClick(props.row)"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { ref, onMounted, watchEffect } from "vue";
import { api } from "src/boot/axios";
const columns = [
  {
    name: "date",
    label: "Día",
    align: "left",
    field: "day",
    sortable: true,
  },
  {
    name: "description",
    label: "Descripción",
    align: "left",
    field: "description",
    sortable: true,
  },
  {
    name: "price",
    label: "Precio",
    align: "left",
    field: "price",
    sortable: true,
  },
];
export default {
  props: {
    activities: Array,
  },
  setup(props, { emit }) {
    const handleClick = (row) => {
      emit("button-clicked", row);
    };
    let allactivities = ref([...props.activities]);
    //Esta funcion hace que los cambios en la propiedad hours del props se reflejen tambien en el arreglo
    watchEffect(() => {
      allactivities.value.push(...props.activities);
    });
    //Funcion de llenar la tabla
    const getall = async () => {
      await api
        .get("api/Vehicles")
        .then((response) => {
          allactivities.value = response.data;
          console.log(allactivities.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    onMounted(() => {
      getall();
    });
    return {
      allactivities,
      handleClick,
      columns,
    };
  },
};
</script>

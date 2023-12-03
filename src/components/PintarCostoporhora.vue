<template>
  <q-table
    title="Costo por horas"
    class="q-mt-md"
    no-data-label="Sin Modalidades para mostrar"
    :columns="columns"
    :rows="allhours"
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
        <q-td auto-width>
          <q-btn
            size="sm"
            color="red"
            round
            dense
            text-color="white"
            icon="delete"
            @click="confirmDelete(props.row)"
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
    name: "cost_per_hour",
    label: "Costo por hora",
    alingn: "center",
    field: "cost_per_hour",
    sortable: true,
  },
  {
    name: "cost_per_kilometer_traveled",
    label: "Costo por kilometros recorridos",
    alingn: "center",
    field: "cost_per_kilometer_traveled",
    sortable: true,
  },
  {
    name: "extra_kilometer_cost",
    label: "Costo por Kilometros extras",
    alingn: "center",
    field: "extra_kilometer_cost",
    sortable: true,
  },
  {
    name: "extra_hour_cost ",
    label: "Costo por horas extras",
    alingn: "center",
    field: "extra_hour_cost",
    sortable: true,
  },
];

const rows = [
  {
    cost_per_hour: "20",
    cost_per_kilometer_traveled: "20",
    extra_kilometer_cost: "2",
    extra_kilometer_cost: "2",
  },
];

export default {
  props: {
    hours: Array,
  },

  setup(props, { emit }) {
    const handleClick = (row) => {
      emit("button-clicked", row);
    };
    let allhours = ref([...props.hours]);
    //Esta funcion hace que los cambios en la propiedad hours del props se reflejen tambien en el arreglo
    watchEffect(() => {
      allhours.value.push(...props.hours);
    });
    //Funcion de llenar la tabla
    const getall = async () => {
      await api
        .get("api/Costperhour")
        .then((response) => {
          allhours.value = response.data;
          console.log(allhours.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const confirmDelete = async (row) => {
      const confirmed = window.confirm(
        "¿Está seguro de borrar esta modalidad?"
      );

      if (confirmed) {
        try {
          console.log(row.modalityId+"Hakuna Matata");
          await api.delete(`/api/CostPerHour/ ${row.modalityId}`);
          window.alert("Modalidad eliminada");
          location.reload();
        } catch (error) {
          console.error("Error Modalidad no eliminada", error);
        }
      }
    };
    onMounted(() => {
      getall();
    });
    return {
      confirmDelete,
      columns,
      rows,
      handleClick,
      allhours,
    };
  },
};
</script>
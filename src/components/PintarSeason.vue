<template>
  <q-table
    title="Temporadas"
    class="q-mt-md"
    no-data-label="Sin Temporadas para mostrar"
    :columns="columns"
    :rows="allSeasons"
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
    name: "seasonName",
    label: "Nombre de la temporada",
    alingn: "center",
    field: "seasonName",
    sortable: true,
  },
  {
    name: "startDate",
    label: "Fecha de inicio",
    alingn: "center",
    field: "startDate",
    sortable: true,
  },
];

const rows = [
  {
    seasonName: "navidad",
    startDate: 11 / 10,
  },
];

export default {
  props: {
    seasons: Array,
  },

  setup(props, { emit }) {
    const token = localStorage.getItem("token");
    const handleClick = (row) => {
      emit("button-clicked", row);
    };

    let allSeasons = ref([...props.seasons]);
    //Esta funcion hace que los cambios en la propiedad hours del props se reflejen tambien en el arreglo
    watchEffect(() => {
      allSeasons.value.push(...props.seasons);
    });
    //Funcion de llenar la tabla
    const getall = async () => {
      await api
        .get("api/Season", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          allSeasons.value = response.data;
          console.log(allSeasons.value);
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
          console.log(row.seasonId + "Hakuna Matata");
          await api.delete(`/api/CostPerHour/ ${row.seasonId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          window.alert("Temporada eliminada");
          location.reload();
        } catch (error) {
          console.error("Error Temporada no eliminada", error);
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
      allSeasons,
    };
  },
};
</script>

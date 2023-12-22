<template>
  <q-table
    title="Contratos de Transportes"
    class="q-mt-md"
    no-data-label="Sin Contratos para mostrar"
    :columns="columns"
    :rows="allContracts"
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
    name: "desc",
    label: "Descripción",
    alingn: "center",
    field: "desc",
    sortable: true,
  },
  {
    name: "starDate",
    label: "Fecha de inicio",
    alingn: "center",
    field: "starDate",
    sortable: true,
  },
  {
    name: "endTime",
    label: "Fecha de fin",
    alingn: "center",
    field: "endTime",
    sortable: true,
  },
  {
    name: "concilTime ",
    label: "Fecha de conciliación",
    alingn: "center",
    field: "concilTime",
    sortable: true,
  },
  {
    name: "transportationProvider",
    label: "Proveedor",
    alingn: "center",
    field: "transportationProvider",
    sortable: true,
  },
  {
    name: "incluedVehicles",
    label: "Vehículos incluídos",
    alingn: "center",
    field: "incluedVehicles",
    sortable: true,
  },
  {
    name: "licensePlateNumber",
    label: "Matrícula",
    alingn: "center",
    field: "licensePlateNumber",
    sortable: true,
  },
  {
    name: "enabled",
    label: "Estado",
    align: "left",
    field: "enabled",
    sortable: true,
  },
];

export default {
  props: {
    transportation: Array,
  },

  setup(props, { emit }) {
    const handleClick = (row) => {
      emit("button-clicked", row);
    };
    let allContracts = ref([...props.transportation]);
    //Esta funcion hace que los cambios en la propiedad hours del props se reflejen tambien en el arreglo
    watchEffect(() => {
      allContracts.value.push(...props.transportation);
    });
    //Funcion de llenar la tabla
    const getall = async () => {
      await api
        .get("api/TransportationContract")
        .then((response) => {
          allContracts.value = response.data;
          console.log(allContracts.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const confirmDelete = async (row) => {
      const confirmed = window.confirm("¿Está seguro de borrar este contrato?");

      if (confirmed) {
        try {
          console.log(row.id + "Hakuna Matata");
          await api.delete(`/api/TransportationContract/ ${row.id}`);
          window.alert("Contrato eliminado");
          location.reload();
        } catch (error) {
          console.error("Error Contrato no eliminado", error);
        }
      }
    };
    onMounted(() => {
      getall();
    });
    return {
      confirmDelete,
      columns,
      handleClick,
      allContracts,
    };
  },
};
</script>

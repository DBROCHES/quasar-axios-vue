<template>
  <q-table
    title="Contratos Complementarios"
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
    name: "serviceType ",
    label: "Tipo de Servicio",
    alingn: "center",
    field: "serviceType",
    sortable: true,
  },
  {
    name: "costPerPerson",
    label: "Costo por persona",
    alingn: "center",
    field: "costPerPerson",
    sortable: true,
  },
  {
    name: "complementaryServiceProvince",
    label: "Servicio por provincia",
    alingn: "center",
    field: "complementaryServiceProvince",
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

// const rows = [
//   {
//     cost_per_hour: "20",
//     cost_per_kilometer_traveled: "20",
//     extra_kilometer_cost: "2",
//     extra_kilometer_cost: "2",
//   },
// ];

export default {
  props: {
    complementary: Array,
  },

  setup(props, { emit }) {
    const handleClick = (row) => {
      emit("button-clicked", row);
    };
    let allContracts = ref([...props.complementary]);
    //Esta funcion hace que los cambios en la propiedad hours del props se reflejen tambien en el arreglo
    watchEffect(() => {
      allContracts.value.push(...props.complementary);
    });
    //Funcion de llenar la tabla
    const getall = async () => {
      await api
        .get("api/ComplementaryContract")
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
          await api.delete(`/api/ComplementaryContract/ ${row.id}`);
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
      visibleColumns: ref([
        "desc",
        "starDate",
        "endTime",
        "serviceType",
        "costPerPerson",
        "complementaryServiceProvince",
        "enabled",
      ]),
      handleClick,
      allContracts,
    };
  },
};
</script>

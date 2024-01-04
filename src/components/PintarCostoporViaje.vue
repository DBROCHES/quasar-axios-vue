<template>
  <q-table
    class="q-mt-md"
    :no-data-label="$t('noModalitys')"
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
import { api } from "src/boot/axios";
import { ref, onMounted, watchEffect } from "vue";

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
    const token = localStorage.getItem('token');
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
        .get("api/CostPerTour", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
          alltours.value = response.data;
          console.log(alltours.value);
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
          console.log(row.modalityId + "Hakuna Matata");
          await api.delete(`/api/CostPerTour/ ${row.modalityId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });
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
      rows,
      handleClick,
      alltours,
      confirmDelete,
      token,
    };
  },

  data() {
    return {
      columns: [
        {
          name: "rout_description",
          alingn: "center",
          label: this.$t("tripDesc"),
          field: "rout_description",
          sortable: true,
        },
        {
          name: "route_cost",
          label: this.$t("routCost"),
          alingn: "center",
          field: "route_cost",
          sortable: true,
        },
        {
          name: "round_trip_cost",
          label: this.$t("goback"),
          alingn: "center",
          field: "round_trip_cost",
          sortable: true,
        },
      ],
    };
  },
};
</script>

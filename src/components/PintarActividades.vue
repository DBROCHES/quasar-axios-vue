<template>
  <q-table
    class="q-mt-md"
    :title="$t('actividades')"
    :no-data-label="$t('noActivities')"
    :columns="columns"
    :rows="allactivities"
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
import { ref, onMounted, toRaw, nextTick, watchEffect } from "vue";
import { api } from "boot/axios";
export default {
  props: {
    activities: Array,
  },
  data() {
    return {
      columns: [
        {
          name: "day",
          label: this.$t("fecha"),
          align: "left",
          field: "day",
          sortable: true,
        },
        {
          name: "description",
          label: this.$t("descripcion"),
          align: "left",
          field: "description",
          sortable: true,
        },
        {
          name: "price",
          label: this.$t("precio"),
          align: "left",
          field: "price",
          sortable: true,
        },
      ],
    };
  },
  setup(props, { emit }) {
    const token = localStorage.getItem("token");
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
        .get("api/DayliActivities", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          allactivities.value = response.data;
          console.log(allactivities.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const confirmDelete = async (row) => {
      const confirmed = window.confirm(
        "¿Está seguro de borrar esta actividad?"
      );

      if (confirmed) {
        try {
          console.log(row.activityId + "Hakuna Matata");
          await api.delete(`/api/DayliActivities ${row.activityId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          window.alert("Actividad eliminada");
          location.reload();
        } catch (error) {
          console.error("Error Actividad no eliminada no eliminada", error);
        }
      }
    };
    onMounted(() => {
      getall();
    });
    return {
      allactivities,
      handleClick,
      confirmDelete,
    };
  },
};
</script>

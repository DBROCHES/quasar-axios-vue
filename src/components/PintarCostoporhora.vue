<template>
  <q-table
    class="q-mt-md"
    :no-data-label="$t('noModalitys')"
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
    const token = localStorage.getItem("token");
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
        .get("api/Costperhour", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          allhours.value = response.data;
          console.log(allhours.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const confirmDelete = async (row) => {
      const confirmed = window.confirm(this.$t("deleteModalityConf"));

      if (confirmed) {
        try {
          console.log(row.modalityId + "Hakuna Matata");
          await api.delete(`/api/CostPerHour/ ${row.modalityId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          window.alert(this.$t("deletedModality"));
          location.reload();
        } catch (error) {
          console.error(this.$t("errDeletModality"), error);
        }
      }
    };
    onMounted(() => {
      getall();
    });
    return {
      rows,
      handleClick,
      allhours,
      confirmDelete,
    };
  },
  data() {
    return {
      columns: [
        {
          name: "cost_per_hour",
          label: this.$t("costPH"),
          align: "center",
          field: "cost_per_hour",
          sortable: true,
        },
        {
          name: "cost_per_kilometer_traveled",
          label: this.$t("pkilometers"),
          align: "center",
          field: "cost_per_kilometer_traveled",
          sortable: true,
        },
        {
          name: "extra_kilometer_cost",
          label: this.$t("ekilometers"),
          align: "center",
          field: "extra_kilometer_cost",
          sortable: true,
        },
        {
          name: "extra_hour_cost ",
          label: this.$t("ehours"),
          align: "center",
          field: "extra_hour_cost",
          sortable: true,
        },
      ],
    };
  },
};
</script>

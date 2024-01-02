<template>
  <q-table
    class="q-mt-md"
    :no-data-label="$t('noContracts')"
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
    onMounted(() => {
      getall();
    });
    return {
      handleClick,
      allContracts,
    };
  },

  methods: {
    async confirmDelete(row) {
      const confirmed = window.confirm(this.$t("deleteConfCont"));

      if (confirmed) {
        try {
          console.log(row.id + "Hakuna Matata");
          await api.delete(`/api/TransportationContract/ ${row.id}`);
          window.alert(this.$t("deleteCont"));
          location.reload();
        } catch (error) {
          console.error(this.$t("errContDelet"), error);
        }
      }
    },
  },

  data() {
    return {
      columns: [
        {
          name: "desc",
          label: this.$t("descripcion"),
          alingn: "center",
          field: "desc",
          sortable: true,
        },
        {
          name: "starDate",
          label: this.$t("startDate"),
          alingn: "center",
          field: "starDate",
          sortable: true,
        },
        {
          name: "endTime",
          label: this.$t("endTime"),
          alingn: "center",
          field: "endTime",
          sortable: true,
        },
        {
          name: "concilTime ",
          label: this.$t("concilTime"),
          alingn: "center",
          field: "concilTime",
          sortable: true,
        },
        {
          name: "transportationProvider",
          label: this.$t("provider"),
          alingn: "center",
          field: "transportationProvider",
          sortable: true,
        },
        {
          name: "incluedVehicles",
          label: this.$t("includVehic"),
          alingn: "center",
          field: "incluedVehicles",
          sortable: true,
        },
        {
          name: "licensePlateNumber",
          label: this.$t("plate"),
          alingn: "center",
          field: "licensePlateNumber",
          sortable: true,
        },
        {
          name: "enabled",
          label: this.$t("enabled"),
          align: "left",
          field: "enabled",
          sortable: true,
        },
      ],
    };
  },
};
</script>

<template>
  <q-table
    class="q-mt-md"
    :title="$t('actividades')"
    :no-data-label="$t('noActivities')"
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
export default {
  props: {
    activities: Array,
  },
  data() {
    return {
      columns: [
        {
          name: "date",
          label: this.$t("fecha"),
          align: "left",
          field: "date",
          sortable: true,
        },
        {
          name: "hour",
          label: this.$t("hora"),
          align: "left",
          field: "hour",
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
      token: localStorage.getItem('token'),
    };
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
        .get("api/Vehicles", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
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
    };
  },
};
</script>

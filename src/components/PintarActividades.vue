<template>
  <q-table
    class="q-mt-md"
    title="Actividades"
    no-data-label="Sin actividades para mostrar"
    :columns="columns"
    :rows="activities"
  />
</template>

<script>
const columns = [
  {
    name: "date",
    label: "Fecha",
    align: "left",
    field: "date",
    sortable: true,
  },
  {
    name: "hour",
    label: "Hora",
    align: "left",
    field: "hour",
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
  setup() {
    return {
      columns,
    };
  },
};
</script>

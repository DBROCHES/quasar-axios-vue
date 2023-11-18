<template>
  <q-table
    title="Hoteles"
    class="q-mt-md"
    no-data-label="Sin hoteles para mostrar"
    :columns="columns"
    :rows="hoteles"
  ></q-table>
</template>
<script>
const columns = [
  {
    name: "name",
    label: "Nombre",
    alingn: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "model",
    label: "Cadena",
    alingn: "left",
    field: "model",
    sortable: true,
  },
  {
    name: "category",
    label: "Estrellas",
    alingn: "left",
    field: "category",
    sortable: true,
  },
  {
    name: "phone",
    label: "Teléfono",
    alingn: "left",
    field: "phone",
    sortable: true,
  },
  {
    name: "email",
    label: "Correo",
    alingn: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "rooms",
    label: "Cantidad de habitaciones",
    alingn: "left",
    field: "rooms",
    sortable: true,
  },
  {
    name: "floors",
    label: "Cantidad de pisos",
    alingn: "left",
    field: "floors",
    sortable: true,
  },
  {
    name: "dairport",
    label: "Distancia al aeropuerto",
    alingn: "left",
    field: "dairport",
    sortable: true,
  },
  {
    name: "dcity",
    label: "Distancia a la ciudad",
    alingn: "left",
    field: "dcity",
    sortable: true,
  },
  {
    name: "commercialization",
    label: "Cantidad de pisos",
    alingn: "left",
    field: "commercialization",
    sortable: true,
  },
  {
    name: "location",
    label: "Dirección",
    alingn: "left",
    field: "location",
    sortable: true,
  },
  {
    name: "date",
    label: "Fecha",
    alingn: "left",
    field: "date",
    sortable: true,
  },
];

const rows = [
  {
    plate: "A12365",
    model: "Audi",
    capacity_without: "2",
    capacity_with: "2",
    total: "2",
    year: "2000",
    manufacturing: "industrial",
  },
];

export default {
  props: {
    hoteles: Array,
  },
  setup() {
    return {
      columns,
      rows,
    };
  },
};
</script>

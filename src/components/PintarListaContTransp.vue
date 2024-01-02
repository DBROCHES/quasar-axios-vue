<template>
  <div class="q-mt-md">
    <!-- q-pa-md -->
    <q-table
      :no-data-label="$t('noContracts')"
      :columns="columns"
      :rows="contracts"
      row-key="name"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top>
        <q-space />

        <q-select
          v-model="visibleColumns"
          multiple
          outlined
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          options-cover
          style="min-width: 150px"
        />
      </template>
    </q-table>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  props: {
    contracts: Array,
  },
  data() {
    return {
      columns: [
        {
          name: "prestarioTransporte",
          label: this.$t("provider"),
          align: "left",
          field: "prestarioTransporte",
          sortable: true,
        },
        {
          name: "fechaInicioContrato",
          label: this.$t("startDate"),
          align: "left",
          field: "fechaInicioContrato",
          sortable: true,
        },
        {
          name: "fechaTerminacionContrato",
          label: this.$t("endTime"),
          align: "left",
          field: "fechaTerminacionContrato",
          sortable: true,
        },
        {
          name: "fechaConciliacionContrato",
          label: this.$t("concilTime"),
          align: "left",
          field: "fechaConciliacionContrato",
          sortable: true,
        },
        {
          name: "chapa",
          label: this.$t("plate"),
          align: "left",
          field: "chapa",
          sortable: true,
        },
        {
          name: "marca",
          label: this.$t("marca"),
          align: "left",
          field: "marca",
          sortable: true,
        },
        {
          name: "capacidadSinEquipajes",
          label: this.$t("capacity_without"),
          align: "left",
          field: "capacidadSinEquipajes",
          sortable: true,
        },
        {
          name: "capacidadConEquipajes",
          label: this.$t("capacity_with"),
          align: "left",
          field: "capacidadConEquipajes",
          sortable: true,
        },
        {
          name: "capacidadTotal",
          label: this.$t("totalCapacity"),
          align: "left",
          field: "capacidadTotal",
          sortable: true,
        },
        {
          name: "annoFabricacion",
          label: this.$t("year"),
          align: "left",
          field: "annoFabricacion",
          sortable: true,
        },
        {
          name: "costoPorKilometro",
          label: this.$t("kilometer"),
          align: "left",
          field: "costoPorKilometro",
          sortable: true,
        },
        {
          name: "costoPorKilometroIdaVuelta",
          label: this.$t("goback"),
          align: "left",
          field: "costoPorKilometroIdaVuelta",
          sortable: true,
        },
        {
          name: "costoPorHorasEspera",
          label: this.$t("wait"),
          align: "left",
          field: "costoPorHorasEspera",
          sortable: true,
        },
        {
          name: "costoPorKilometroRecorrido",
          label: this.$t("pkilometers"),
          align: "left",
          field: "costoPorKilometroRecorrido",
          sortable: true,
        },
        {
          name: "costoPorHoras",
          label: this.$t("phours"),
          align: "left",
          field: "costoPorHoras",
          sortable: true,
        },
        {
          name: "costoPorKilometrosExtras",
          label: this.$t("ekilometers"),
          align: "left",
          field: "costoPorKilometrosExtras",
          sortable: true,
        },
        {
          name: "costosPorHorasExtras",
          label: this.$t("ehours"),
          align: "left",
          field: "costosPorHorasExtras",
          sortable: true,
        },
        {
          name: "descripcionRecorrido",
          label: this.$t("descRecorrido"),
          align: "left",
          field: "descripcionRecorrido",
          sortable: true,
        },
        {
          name: "costoRecorrido",
          label: this.$t("costPV"),
          align: "left",
          field: "costoRecorrido",
          sortable: true,
        },
        {
          name: "costoPorIdaVuelta",
          label: this.$t("goback"),
          align: "left",
          field: "costoPorIdaVuelta",
          sortable: true,
        },
      ],
      visibleColumns: ref([
        "prestarioTransporte",
        "fechaInicioContrato",
        "chapa",
        "capacidadTotal",
        "annoFabricacion",
      ]),
    };
  },
};
</script>

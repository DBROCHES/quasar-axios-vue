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
          name: "hotelName",
          label: this.$t("hotelName"),
          align: "left",
          field: "hotelName",
          sortable: true,
        },
        {
          name: "startDate",
          label: this.$t("startDate"),
          align: "left",
          field: "startDate",
          sortable: true,
        },
        {
          name: "endDate",
          label: this.$t("endTime"),
          align: "left",
          field: "endDate",
          sortable: true,
        },
        {
          name: "conciliationDate",
          label: this.$t("concilTime"),
          align: "left",
          field: "conciliationDate",
          sortable: true,
        },
        {
          name: "seasonStartDate",
          label: this.$t("startSeason"),
          align: "left",
          field: "seasonStartDate",
          sortable: true,
        },
        {
          name: "seasonName",
          label: this.$t("season"),
          align: "left",
          field: "seasonName",
          sortable: true,
        },
        {
          name: "roomType",
          label: this.$t("typeRoom"),
          align: "left",
          field: "roomType",
          sortable: true,
        },
        {
          name: "mealPlan",
          label: this.$t("meal"),
          align: "left",
          field: "mealPlan",
          sortable: true,
        },
        {
          name: "contractPrice",
          label: this.$t("precio"),
          align: "left",
          field: "contractPrice",
          sortable: true,
        },
      ],
      visibleColumns: ref([
        "hotelName",
        "startDate",
        "seasonStartDate",
        "seasonName",
        "contractPrice",
      ]),
    };
  },
};
</script>

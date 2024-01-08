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
          name: "date",
          label: this.$t("date"),
          align: "left",
          field: "date",
          sortable: true,
        },
        {
          name: "name",
          label: this.$t("hotelName"),
          align: "left",
          field: "name",
          sortable: true,
        },
        {
          name: "chain",
          label: this.$t("chain"),
          align: "left",
          field: "chain",
          sortable: true,
        },
        {
          name: "provinceName",
          label: this.$t("province"),
          align: "left",
          field: "provinceName",
          sortable: true,
        },
        {
          name: "category",
          label: this.$t("category"),
          align: "left",
          field: "category",
          sortable: true,
        },
        {
          name: "phone",
          label: this.$t("phone"),
          align: "left",
          field: "phone",
          sortable: true,
        },
        {
          name: "address",
          label: this.$t("address"),
          align: "left",
          field: "address",
          sortable: true,
        },
        {
          name: "email",
          label: this.$t("email"),
          align: "left",
          field: "email",
          sortable: true,
        },
        {
          name: "disNearCity",
          label: this.$t("dcity"),
          align: "left",
          field: "disNearCity",
          sortable: true,
        },
        {
          name: "disAirport",
          label: this.$t("dairport"),
          align: "left",
          field: "disAirport",
          sortable: true,
        },
        {
          name: "numberOfRooms",
          label: this.$t("rooms"),
          align: "left",
          field: "numberOfRooms",
          sortable: true,
        },

        {
          name: "numberOfFloors",
          label: this.$t("floors"),
          align: "left",
          field: "numberOfFloors",
          sortable: true,
        },
        {
          name: "comercializationMode",
          label: this.$t("commercialization"),
          align: "left",
          field: "comercializationMode",
          sortable: true,
        },
      ],
      visibleColumns: ref([
        "name",
        "chain",
        "category",
        "phone",
        "address",
        "email",
      ]),
    };
  },
};
</script>

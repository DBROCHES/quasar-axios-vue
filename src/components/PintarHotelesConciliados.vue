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
      <template v-slot:body-cell-roomType="props">
        <div v-if="props.row.roomType && props.row.roomType.length > 0">
          <ul>
            <li v-for="room in props.row.roomType" :key="room">
              {{ room }}
            </li>
          </ul>
        </div>
        <div v-else>Campo vacío</div>
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
          name: "hotelChain",
          label: this.$t("chain"),
          align: "left",
          field: "hotelChain",
          sortable: true,
        },
        {
          name: "province",
          label: this.$t("province"),
          align: "left",
          field: "province",
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
          name: "category",
          label: this.$t("category"),
          align: "left",
          field: "category",
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
          name: "description",
          label: this.$t("descripcion"),
          align: "left",
          field: "description",
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
        "hotelChain",
        "address",
        "category",
        "startDate",
        "conciliationDate",
        "contractPrice",
      ]),
    };
  },
};
</script>

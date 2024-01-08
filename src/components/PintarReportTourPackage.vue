<template>
  <div class="q-mt-md">
    <!-- q-pa-md -->
    <q-table
      :no-data-label="$t('noTourPackage')"
      :columns="columns"
      :rows="packages"
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
        <div v-if="props.columns == null">
          <div>Campo vacío</div>
        </div>
      </template>
    </q-table>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  props: {
    packages: Array,
  },
  data() {
    return {
      columns: [
        {
          name: "userName",
          label: this.$t("userName"),
          align: "left",
          field: "userName",
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
          name: "provinceName",
          label: this.$t("province"),
          align: "left",
          field: "provinceName",
          sortable: true,
        },
        {
          name: "hotelName",
          label: "Hotel",
          align: "left",
          field: "hotelName",
          sortable: true,
        },
        {
          name: "vehicle",
          label: this.$t("vehicle"),
          align: "left",
          field: "vehicle",
          sortable: true,
        },
        {
          name: "modality",
          label: this.$t("modality"),
          align: "left",
          field: "modality",
          sortable: true,
        },
        {
          name: "peopleCant",
          label: this.$t("amountofPeople"),
          align: "left",
          field: "peopleCant",
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
          name: "totalprice",
          label: this.$t("totalPrice"),
          align: "left",
          field: "totalprice",
          sortable: true,
        },
      ],
      visibleColumns: ref([
        "userName",
        "email",
        "provinceName",
        "hotelName",
        "vehicle",
        "peopleCant",
        "totalprice",
      ]),
    };
  },
};
</script>

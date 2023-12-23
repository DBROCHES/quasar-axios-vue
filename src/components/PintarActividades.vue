<template>
  <q-table
    class="q-mt-md"
    :title="$t('actividades')"
    :no-data-label="$t('noActivities')"
    :columns="columns"
    :rows="activities"
  />
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
    };
  },
};
</script>

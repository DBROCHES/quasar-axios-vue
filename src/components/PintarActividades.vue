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
    };
  },
};
</script>

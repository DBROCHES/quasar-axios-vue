<template>
  <div class="q-mt-md">
    <!-- q-pa-md -->
    <q-table
      :no-data-label="$t('noProvinces')"
      :columns="columns"
      :rows="provinces"
      row-key="provinceId"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.field">
            {{ props.row[col.field] }}
          </q-td>
          <!-- Botón "Edit" -->
          <q-td auto-width>
            <q-btn
              size="sm"
              color="orange"
              round
              dense
              text-color="white"
              icon="edit"
              @click="handleClick(props.row)"
            />
          </q-td>
          <!-- Botón "Delete" -->
          <q-td auto-width>
            <q-btn
              size="sm"
              color="red"
              round
              dense
              text-color="white"
              icon="delete"
              @click="confirmDelete(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
import { ref } from "vue";
import { api } from "boot/axios";

export default {
  props: {
    provinces: Array,
  },
  data() {
    return {
      columns: [
        {
          name: "provinceId",
          label: "No.",
          align: "left",
          field: "provinceId",
          sortable: true,
        },
        {
          name: "provinceName",
          label: this.$t("province"),
          align: "left",
          field: "provinceName",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    handleClick(row) {
      this.$emit("button-clicked", row);
    },
    async confirmDelete(row) {
      const confirmed = window.confirm(this.$t("deletProvince"));

      if (confirmed) {
        try {
          const response = await api.delete(
            `/api/ProvinceSet/${row.provinceId}`
          );
          window.alert(this.$t("deletConfProvince"));
          location.reload();
        } catch (error) {
          console.error(this.$t("errDeletProvince"), error);
        }
      }
      this.confirmationVisible = false;
    },
  },
};
</script>

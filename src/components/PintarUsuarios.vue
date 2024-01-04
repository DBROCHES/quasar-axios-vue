<template>
  <div class="q-mt-md">
    <!-- q-pa-md -->
    <q-table
      :no-data-label="$t('noUsers')"
      :columns="columns"
      :rows="users"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.field">
            {{
              col.field === "roles" && Array.isArray(props.row[col.field])
                ? props.row[col.field].join(", ")
                : props.row[col.field]
            }}
          </q-td>
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
    users: Array,
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
          name: "roles",
          label: "Rol",
          align: "left",
          field: "roles",
          sortable: true,
        },
      ],
    };
  },

  methods: {
    async confirmDelete(row) {
      const confirmed = window.confirm(this.$t("deleteUser"));

      if (confirmed) {
        try {
          const response = await api.delete(`/api/User/${row.userId}`);
          window.alert(this.$t("deletConfUser"));
          location.reload();
        } catch (error) {
          console.error(this.$t("errDeletUser"), error);
        }
      }
      this.confirmationVisible = false;
    },
  },
};
</script>

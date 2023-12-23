<template>
  <div class="q-mt-md">
    <!-- q-pa-md -->
    <q-table
      :no-data-label="$t('noHotels')"
      :columns="columns"
      :rows="hoteles"
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
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div
              v-if="col.name === 'enabled'"
              class="q-gutter-md"
              @click.stop="changeStatus(props.row)"
            >
              <q-badge
                v-if="props.row.enabled"
                outline
                color="primary"
                label="Activo"
              />
              <q-badge v-else outline color="orange" label="Inactivo" />
            </div>
            <div v-else>
              {{ col.value }}
            </div>
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
    hoteles: Array,
  },
  data() {
    return {
      columns: [
        {
          name: "name",
          label: this.$t("nombre"),
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
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
          name: "province",
          label: this.$t("province"),
          align: "left",
          field: "province",
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
          name: "email",
          label: this.$t("email"),
          align: "left",
          field: "email",
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
          name: "numberOfFloors",
          label: this.$t("floors"),
          align: "left",
          field: "numberOfFloors",
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
          name: "comercializationMode",
          label: this.$t("commercialization"),
          align: "left",
          field: "comercializationMode",
          sortable: true,
        },
        {
          name: "price",
          label: this.$t("precio"),
          align: "left",
          field: "price",
          sortable: true,
        },
        {
          name: "enabled",
          label: this.$t("enabled"),
          align: "left",
          field: "enabled",
          sortable: true,
        },
      ],
      visibleColumns: ref([
        "name",
        "chain",
        "category",
        "price",
        "phone",
        "enabled",
      ]),
    };
  },

  methods: {
    async handleClick(row) {
      try {
        const response = await api.delete(`/api/Hotel/${row.id}`);
        console.log(this.$t("RowDelet"), response);
        location.reload();
      } catch (error) {
        console.error(this.$t("errRowDelet"), error);
      }
    },
    async confirmDelete(row) {
      const confirmed = window.confirm(this.$t("deletHotel"));

      if (confirmed) {
        try {
          const response = await api.delete(`/api/Hotel/${row.id}`);
          window.alert(this.$t("deletConfHotel"));
          location.reload();
        } catch (error) {
          console.error(this.$t("errDeletHotel"), error);
        }
      }
      this.confirmationVisible = false;
    },

    async changeStatus(row) {
      row.enabled = !row.enabled;

      await api.patch(`/api/Hotel/${row.id}/${row.enabled}`);
    },
  },
};
</script>

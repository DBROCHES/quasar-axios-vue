<template>
  <div class="q-mt-md">
    <q-table
      flat
      bordered
      :no-data-label="$t('noRooms')"
      :columns="columns"
      :rows="rooms"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
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
              @click="emitir(props.row)"
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
import { api } from "boot/axios";

export default {
  props: {
    rooms: Array,
  },

  data() {
    return {
      columns: [
        {
          name: "name",
          label: this.$t("nombre"),
          align: "left",
          field: "name",
          sortable: true,
          required: true,
        },
        {
          name: "description",
          label: this.$t("descripcion"),
          align: "left",
          field: "description",
          sortable: true,
          required: true,
        },
        {
          name: "price",
          label: this.$t("precio"),
          align: "left",
          field: "price",
          sortable: true,
          required: true,
        },
        {
          name: "amountofPeople",
          label: this.$t("amountofPeople"),
          align: "left",
          field: "amountofPeople",
          sortable: true,
          required: true,
        },
        // {
        //   name: "hName",
        //   label: Hotel,
        //   align: "left",
        //   field: "hName",
        //   sortable: true,
        //   required: true,
        // },
      ],
      token: localStorage.getItem("token"),
    };
  },

  methods: {
    async handleClick(row) {
      try {
        const response = await api.delete(`/api/Room/${row.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(this.$t("RowDelet"), response);
        location.reload();
      } catch (error) {
        console.error(this.$t("errRowDelet"), error);
      }
    },
    async confirmDelete(row) {
      const confirmed = window.confirm(this.$t("deleteRoomConf"));

      if (confirmed) {
        try {
          const response = await api.delete(`/api/Room/${row.id}`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          console.log(this.$t("RowDelet"), response);
          window.alert(this.$t("RowDelet"));
          location.reload();
        } catch (error) {
          console.error(this.$t("errRowDelet"), error);
        }
      }
      this.confirmationVisible = false;
    },
    emitir(row) {
      this.$emit("modifiRooms", row);
    },
  },
};
</script>

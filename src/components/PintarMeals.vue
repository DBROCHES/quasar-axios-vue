<template>
  <div class="q-mt-md">
    <q-table
      flat
      bordered
      :no-data-label="$t('noMeals')"
      :columns="columns"
      :rows="meals"
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
              @click="handleEditClick(props.row)"
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
    meals: Array,
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
      ],
      token: localStorage.getItem('token'),
    };
  },
  methods: {
    async handleClick(row) {
      try {
        const response = await api.delete(`/api/Meal/${row.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });
        console.log("Fila eliminada", response);
        location.reload();
      } catch (error) {
        console.error("Error al eliminar", error);
      }
    },
    async confirmDelete(row) {
      const confirmed = window.confirm("¿Está seguro de borrar este plan de comida?");

      if (confirmed) {
      if (confirmed) {
        try {
          const response = await api.delete(`/api/Meal/${row.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });
          console.log("Fila eliminada", response);
          window.alert("Fila eliminada");
          location.reload();
          location.reload();
        } catch (error) {
          console.error("Error al eliminar", error);
        }
      }
      }
      this.confirmationVisible = false;
    },
  },
};

</script>

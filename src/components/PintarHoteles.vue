<template>
  <div class="q-mt-md">
    <!-- q-pa-md -->
    <q-table
        title="Hoteles"
        no-data-label="Sin hoteles para mostrar"
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
              <div v-if="col.name === 'enabled'" class="q-gutter-md" @click.stop="changeStatus(props.row)">
                <q-badge v-if="props.row.enabled" outline color="primary" label="Activo" />
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
import { api } from 'boot/axios';
const columns = [
  {
    name: "name",
    label: "Nombre",
    align: "left",
    field: row => row.name,
    format: val => `${val}`,
    sortable: true,

  },
  {
    name: "chain",
    label: "Cadena",
    align: "left",
    field: "chain",
    sortable: true,
  },
  {
    name: "province",
    label: "Provincia",
    align: "left",
    field: "province",
    sortable: true,
  },
  {
    name: "category",
    label: "Categoría",
    align: "left",
    field: "category",
    sortable: true,
  },
  {
    name: "phone",
    label: "Teléfono",
    align: "left",
    field: "phone",
    sortable: true,
  },
  {
    name: "email",
    label: "Correo",
    align: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "numberOfRooms",
    label: "Cantidad de habitaciones",
    align: "left",
    field: "numberOfRooms",
    sortable: true,
  },
  {
    name: "disNearCity",
    label: "Distancia a la ciudad",
    align: "left",
    field: "disNearCity",
    sortable: true,
  },
  {
    name: "disAirport",
    label: "Distancia al aeropuerto",
    align: "left",
    field: "disAirport",
    sortable: true,
  },
  {
    name: "numberOfFloors",
    label: "Cantidad de pisos",
    align: "left",
    field: "numberOfFloors",
    sortable: true,
  },
  {
    name: "address",
    label: "Dirección",
    align: "left",
    field: "address",
    sortable: true,
  },
  {
    name: "comercializationMode",
    label: "Modo de comercialización",
    align: "left",
    field: "comercializationMode",
    sortable: true,
  },
  {
    name: "price",
    label: "Precio",
    align: "left",
    field: "price",
    sortable: true,
  },
  {
    name: "enabled",
    label: "Estado",
    align: "left",
    field: "enabled",
    sortable: true,
  },
];




export default {
  props: {
    hoteles: Array,
  },
  setup() {
    return {
      columns,
      visibleColumns: ref(["name","chain","category","price","phone","enabled"]),
    };
  },

  methods: {
    handleClick(row){
        this.$emit("buttonClicked", row);
    },
    async confirmDelete(row) {
      const confirmed = window.confirm('¿Está seguro de borrar este hotel?');

        if (confirmed) {
        try {
          const response = await api.delete(`/api/Hotel/${row.id}`);
          window.alert("Hotel eliminado");
          location.reload();  
        } catch (error) {
          console.error("Error Hotel no eliminado", error);
        }
       }
      this.confirmationVisible = false;

    },

    async changeStatus(row) {
    row.enabled = !row.enabled;

    await api.patch(`/api/Hotel/${row.id}/${row.enabled}`);
  }
   
}
};
</script>

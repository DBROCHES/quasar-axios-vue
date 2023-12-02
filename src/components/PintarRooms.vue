<template>
    <div class="q-mt-md">
      <q-table
        flat bordered
        no-data-label="Sin habitaciones para mostrar"
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
  import { api } from 'boot/axios';
  const columns = [
    {
      name: "name",
      label: "Nombre",
      align: "left",
      field: "name",
      sortable: true,
      required: true,
    },
    {
      name: "description",
      label: "Descripción",
      align: "left",
      field: "description",
      sortable: true,
      required: true,
    },
    {
      name: "price",
      label: "Precio",
      align: "left",
      field: "price",
      sortable: true,
      required: true,
    }, 
  ];
  
  export default {
    props: {
      rooms: Array,
    },
    setup() {
      return {
        columns,
      };
    },
    methods: {
    async handleClick(row) {
      try {
        const response = await api.delete(`/api/Room/${row.id}`);
        console.log("Fila eliminada de la API", response);
        location.reload();
      } catch (error) {
        console.error("Error al eliminar la fila de la API", error);
      }
    },
    async confirmDelete(row) {
        const confirmed = window.confirm('¿Está seguro de borrar este vehículo?');
  
          if (confirmed) {
          try {
            const response = await api.delete(`/api/Room/${row.id}`);
            console.log("Fila eliminada de la API", response);
            window.alert("Fila eliminada de la API");
            location.reload();  
          } catch (error) {
            console.error("Error al eliminar la fila de la API", error);
          }
         }
        this.confirmationVisible = false;
  
      },
     
  }
  };
  </script>
  
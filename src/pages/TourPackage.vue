<template>
    <q-layout view="hHh lpR fFf">
      <q-page-container>
        <q-page padding>
          <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-6 col-md-4">
              <q-card class="my-card">
                <q-card-section>
                  <div class="text-h6">Provincia</div>
                  <q-select v-model="provincia" :options="provincias" label="Selecciona una provincia" />
                </q-card-section>
              </q-card>
            </div>
            <!-- Repite el patrón anterior para otros campos como hotel, cuarto del hotel, plan de comida, etc. -->
          </div>

        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script>
  export default {
    data() {
      return {
        provincia: '',
        provincias: ['Provincia 1', 'Provincia 2', 'Provincia 3'],
        // Agrega aquí más campos según sea necesario
      };
    },
    methods: {
      calcularPrecio() {
        // Aquí va la lógica para calcular el precio
      },
    },
  };
  </script>
  
  <style scoped>
  .my-card {
    background: white;
    border-radius: 10px;
  }
  </style>
  
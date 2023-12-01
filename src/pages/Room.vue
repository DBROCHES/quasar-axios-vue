<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <h2>Habitaciones</h2>
    <div>
      <q-btn label="Nuevo" color="positive" class="boton" @click="inception = true" />
      <q-dialog v-model="inception">
        <div padding class="bg-white q-pa-xl" style="width: 80%">
          <q-form
            @submit.prevent="procesingForm"
            @reset="reset"
            ref="myForm"
            style="width: 100%"
            
          >
            <div padding class="q-col-gutter-y-sm">
              <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
              <div>
                <q-input
                  outlined
                  label="Tipo"
                  v-model="name"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Rellene el campo',
                  ]"
                />
              </div>
              </div>
              <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
                <div class="form-floating">
                  <q-input
                    v-model="description"
                    outlined
                    type="textarea"
                    label="Descripción"
                    rows="3"
                    maxlength="400"
                    lazy-rules
                    :rules="[
                      (val) => (val && val.length > 0) || 'Rellene el campo',
                    ]"
                  />
                </div>
              </div>
              <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
                <div>
                  <q-input
                    outlined
                    label="Precio"
                    v-model="price"
                    placeholder="2"
                    min="1"
                    max="300"
                    lazy-rules
                    :rules="[
                      (val) => (val && val.length > 0) || 'Rellene el campo',
                    ]"
                  />
                </div>
              </div>
              <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
              <div>
                <q-select
                  outlined
                  v-model="selectedOptions"
                  :options="options"
                  label="Hotel"
                  emit-value
                  map-options
                  lazy-rules
                />
              </div>
            </div>
            </div>
            <div>
              <q-btn
                color="primary"
                label="Aceptar"
                class="q-ml-sm"
                type="submit"
              />
              <q-btn
                color="primary"
                label="Cancelar"
                class="q-ml-sm"
                type="reset"
              />
            </div>
          </q-form>
        </div>
      </q-dialog>
    </div>
    <pintar-rooms :rooms ="rooms" />
  </template>
  
  
  <script>
  import { ref, onMounted,toRaw, nextTick  } from "vue";
  import PintarRooms from "src/components/PintarRooms.vue";
  import { api } from 'boot/axios';
  
  export default {
    components: { PintarRooms },
  
    setup() {
      // Variables reactivas
      const name = ref("");
      const description = ref(null);
      const price = ref("");
      const options = ref([]);
      const selectedOptions = ref(null);
      const myForm = ref(null);
  
      //Arreglo de vehiculos
      const rooms = ref([])
  
      
      //GETTES SETTES 
  
      const getRooms = async () => {
         await api.get("/api/Room")
         .then((response) =>{
            rooms.value = response.data;
            console.log(rooms.value);
         })
         .catch((error) => {
            console.error(error);
         });
      };

      const getOptions = async () => {
      try {
        const response = await api.get("/api/Hotel");  
        options.value = response.data.map(tupla => ({ label: tupla.name, value: tupla.id }));
      } catch (error) {
        console.error("Error al obtener las opciones desde la API", error);
      }
    };
  
  
        const procesingForm = async() => {
            myForm.value.resetValidation();

            const hotelId = selectedOptions.value ? selectedOptions.value : null;

            const newRoom = {
                name: name.value,
                description: description.value,
                price: price.value,
                hotelId: hotelId
            };
            await api.post("/api/Room", newRoom);
  
            rooms.value = [...rooms.value, newRoom];
            reset();
            fillTable();
        };
  
        const fillTable = () => {
        console.log("Llenando la tabla...");
        };
  
        const reset = () => {
            name.value = null;
            description.value = null;
            price.value = null;
        fillTable(); 
        };

        onMounted(() => {
            getRooms();
            getOptions();
        });
  
        return {
            rooms,
            name,
            description,
            price,
            myForm,
            selectedOptions,
            options,
            inception: ref(false),
            procesingForm,
            reset,
        };
    },
  
  };
  </script>
  
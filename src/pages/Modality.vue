<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <h1>Modalidad</h1>
  <div class="q-pa-md">
    <q-btn label="Nuevo" color="positive" @click="inception = true" />
    <q-dialog v-model="inception">
      <div class="q-pa-md q-gutter-sm">
        <q-carousel animated v-model="slide" infinite>
          <q-carousel-slide name="hora">
            <!-- Formulario de Costo por hora -->
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
                      label="Costo por horas"
                      v-model="phours"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      label="Costo por horas extras"
                      v-model="ehours"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      label="Costo por kilometros recorridos"
                      v-model="pkilometers"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      label="Costo por kilometros extras"
                      v-model="ekilometers"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
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
          </q-carousel-slide>

          <q-carousel-slide name="viaje">
            <!-- Formulario de costo por viaje -->
            <q-form
              @submit.prevent="procesingForm"
              @reset="reset"
              ref="myForm"
              style="width: 100%"
            >
              <div padding class="q-col-gutter-y-sm">
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
                  <div>
                    <q-input
                      v-model="description"
                      outlined
                      type="textarea"
                      label="Descripcion de la ruta"
                      rows="3"
                      maxlength="200"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      label="Costo de la ruta"
                      v-model="rute"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      label="Costo por ida y regreso"
                      v-model="goback"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
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
          </q-carousel-slide>

          <q-carousel-slide name="kilometraje">
            <!-- Formulario de costo por kilometraje -->
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
                      label="Costo por kilometraje"
                      v-model="kilometer"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      label="Costo por regreso"
                      v-model="back"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      label="Costo por horas de espera"
                      v-model="wait"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Rellene el campo',
                      ]"
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
          </q-carousel-slide>
        </q-carousel>

        <div class="row justify-center">
          <q-btn-toggle
            glossy
            v-model="slide"
            :options="[
              { label: 'Costo por hora', value: 'hora' },
              { label: 'Costo por viaje', value: 'viaje' },
              { label: 'Costo por kilometraje', value: 'kilometraje' },
            ]"
          />
        </div>
      </div>
    </q-dialog>
    <q-btn-group spread>
      <q-btn color="primary" label="Costo por hora" />
      <q-btn color="primary" label="Costo por viaje" />
      <q-btn color="primary" label="Costo por kilometraje" />
    </q-btn-group>
  </div>
</template>

<script>
import { ref } from "vue";
import PintarVehicles from "src/components/PintarVehicles.vue";

export default {
  // components: { PintarVehicles },
  setup() {
    // Variables reactivas
    const phours = ref("");
    const ehours = ref("");
    const pkilometers = ref("");
    const ekilometers = ref("");

    const description = ref("");
    const rute = ref("");
    const goback = ref("");

    const kilometer = ref("");
    const back = ref("");
    const wait = ref("");

    const myForm = ref(null);

    //Arreglo de vehiculos
    const phour = ref([]);
    const ptravel = ref([]);
    const pkilometer = ref([]);

    const procesingForm = () => {
      console.log("me diste click");
      myForm.value.resetValidation();
      //luego se procesa el formulario
      phour.value = [
        ...phour.value,
        {
          phours: phours.value,
          ehours: ehours.value,
          pkilometers: pkilometers.value,
          ekilometers: ekilometers.value,
        },
      ];
      ptravel.value = [
        ...ptravel.value,
        {
          description: description.value,
          rute: rute.value,
          goback: goback.value,
        },
      ];
      pkilometer.value = [
        ...pkilometer.value,
        {
          kilometer: kilometer.value,
          back: back.value,
          wait: wait.value,
        },
      ];
      //restablece los valores del formulario
      reset();
    };
    const reset = () => {
      phours.value = null;
      ehours.value = null;
      pkilometers.value = null;
      ekilometers.value = null;

      description.value = null;
      rute.value = null;
      goback.value = null;

      kilometer.value = null;
      back.value = null;
      wait.value = null;
    };

    return {
      phours,
      ehours,
      pkilometers,
      ekilometers,

      description,
      rute,
      goback,

      kilometer,
      back,
      wait,

      myForm,
      inception: ref(false),

      phour,
      ptravel,
      pkilometer,
      slide: ref("hora"),
      procesingForm,
      reset,
    };
  },
};
</script>

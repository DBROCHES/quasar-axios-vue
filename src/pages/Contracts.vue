<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <h2>{{ $t("contratos") }}</h2>
  <div class="q-pa-md">
    <q-btn :label="$t('nuevo')" color="positive" @click="inception = true" />
    <q-dialog v-model="inception">
      <div class="q-pa-md q-gutter-sm">
        <q-carousel animated v-model="slide" infinite>
          <q-carousel-slide name="complementarios">
            <!-- Formulario de Contratos complementarios -->
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
                      :label="$t('descripcion')"
                      v-model="Descp"
                      type="textarea"
                      rows="3"
                      maxlength="200"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      :label="$t('startDate')"
                      v-model="inicio"
                      type="date"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      :label="$t('endTime')"
                      v-model="fin"
                      type="date"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      :label="$t('concilTime')"
                      v-model="concil"
                      type="date"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-select
                      outlined
                      :label="$t('typeService')"
                      v-model="servicio"
                      :options="services"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      :label="$t('costPP')"
                      v-model="costo"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-select
                      outlined
                      :label="$t('servProv')"
                      v-model="provincia"
                      :options="servicesProv"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
              </div>
              <div>
                <q-btn
                  color="primary"
                  :label="$t('aceptar')"
                  class="q-ml-sm"
                  type="submit"
                />
                <q-btn
                  color="primary"
                  :label="$t('reset')"
                  class="q-ml-sm"
                  type="reset"
                />
              </div>
            </q-form>
          </q-carousel-slide>

          <q-carousel-slide name="hoteles">
            <!-- Formulario de contratos de hoteles -->
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
                      :label="$t('descripcion')"
                      v-model="Descp"
                      type="textarea"
                      rows="3"
                      maxlength="200"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      :label="$t('startDate')"
                      v-model="inicio"
                      type="date"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      :label="$t('endTime')"
                      v-model="fin"
                      type="date"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      :label="$t('concilTime')"
                      v-model="concil"
                      type="date"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
                  <div>
                    <q-input
                      v-model="direccion"
                      outlined
                      type="textarea"
                      :label="$t('address')"
                      rows="1"
                      maxlength="100"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      :label="$t('totalPrice')"
                      v-model="precio"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
              </div>
              <div>
                <q-btn
                  color="primary"
                  :label="$t('aceptar')"
                  class="q-ml-sm"
                  type="submit"
                />
                <q-btn
                  color="primary"
                  :label="$t('reset')"
                  class="q-ml-sm"
                  type="reset"
                />
              </div>
            </q-form>
          </q-carousel-slide>

          <q-carousel-slide name="transportes">
            <!-- Formulario de contratos de transportes -->
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
                      :label="$t('descripcion')"
                      v-model="Descp"
                      type="textarea"
                      rows="3"
                      maxlength="200"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      :label="$t('startDate')"
                      v-model="inicio"
                      type="date"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      :label="$t('endTime')"
                      v-model="fin"
                      type="date"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      :label="$t('concilTime')"
                      v-model="concil"
                      type="date"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-select
                      outlined
                      :label="$t('provider')"
                      v-model="proveedor"
                      :options="providers"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      :label="$t('includVehic')"
                      v-model="vehiculos"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="200000"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
                  <div>
                    <q-input
                      outlined
                      :label="$t('plate')"
                      v-model="matricula"
                      type="textarea"
                      rows="1"
                      maxlength="8"
                      lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || this.$t('rellene'),
                      ]"
                    />
                  </div>
                </div>
              </div>
              <div>
                <q-btn
                  color="primary"
                  :label="$t('aceptar')"
                  class="q-ml-sm"
                  type="submit"
                />
                <q-btn
                  color="primary"
                  :label="$t('reset')"
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
              {
                label: this.$t('complementaryContract'),
                value: 'complementarios',
              },
              { label: this.$t('hotelContract'), value: 'hoteles' },
              { label: this.$t('transpContract'), value: 'transportes' },
            ]"
            :enable="buttonstate"
          />
        </div>
      </div>
    </q-dialog>

    <q-card>
      <q-tabs
        v-model="tab"
        class="bg-blue text-white"
        align="justify"
        narrow-indicator
      >
        <q-tab
          name="complementaryContract"
          :label="$t('complementaryContracts')"
        />
        <q-tab name="hotelContract" :label="$t('hotelContracts')" />
        <q-tab name="transportationContract" :label="$t('transpContracts')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        style="height: auto"
        animated
        class="bg-orange-1 text-dark text-center"
      >
        <q-tab-panel name="complementaryContract" class="bg-lime-1 text-dark">
          <PintarContratosComplementarios
            :complementary="comp"
            @button-clicked="updatingComplementary"
          />
        </q-tab-panel>
        <q-tab-panel name="hotelContract" class="bg-lime-1 text-dark">
          <PintarContratosHoteles
            :hotels="hotls"
            @button-clicked="updatingHotels"
          />
        </q-tab-panel>
        <q-tab-panel name="transportationContract" class="bg-lime-1 text-dark">
          <PintarContratosTransporte
            :transportation="transp"
            @button-clicked="updatingTransportation"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { api } from "src/boot/axios";
import PintarContratosComplementarios from "src/components/PintarContratosComlementarios.vue";
import PintarContratosHoteles from "src/components/PintarContratosHoteles.vue";
import PintarContratosTransporte from "src/components/PintarContratosTransporte.vue";

export default {
  setup() {
    // Variables reactivas
    // variables generales
    const Descp = ref("");
    const inicio = ref("");
    const fin = ref("");
    const concil = ref("");
    //Variables de Contratos complementarios
    const servicio = ref(null);
    const costo = ref("");
    const provincia = ref(null);
    // Variables de Contratos de hoteles
    const direccion = ref("");
    const precio = ref("");
    //Variables de Contratos de transportes
    const proveedor = ref(null);
    const vehiculos = ref("");
    const matricula = ref("");
    //Variables auxiliares
    const myForm = ref(null);
    const inception = ref(false);
    const tempid = ref("");
    const selectedContract = ref(false);
    const slide = ref("complementarios");
    const buttonstate = ref(true);
    //Arreglos de contratos
    const comp = ref([]);
    const hotls = ref([]);
    const transp = ref([]);
    const procesingForm = async () => {
      myForm.value.validate().then((success) => {
        if (success) {
          inception.value = false;
        }
      });
      //myForm.value.resetValidation();
      console.log("me diste click");

      //luego se procesa el formulario
      switch (slide.value) {
        case "complementarios":
          contratoComplementario();
          break;
        case "hoteles":
          contratoHoteles();
          break;
        case "transportes":
          contratosTransporte();
          break;
        default:
          break;
      }

      //restablece los valores del formulario
      inception.value = false;
      reset();
    };
    const reset = () => {
      Descp.value = null;
      inicio.value = null;
      fin.value = null;
      concil.value = null;
      servicio.value = null;
      costo.value = null;
      provincia.value = null;
      direccion.value = null;
      precio.value = null;
      proveedor.value = null;
      matricula.value = null;
    };
    const contratoComplementario = async () => {
      const ccomplementario = {
        id: selectedContract.value ? tempid.value : 0,
        desc: Descp.value,
        starDate: inicio.value,
        endTime: fin.value,
        concilTime: concil.value,
        serviceType: servicio.value,
        costPerPerson: costo.value,
        complementaryServiceProvince: provincia.value,
        enabled: true,
      };
      if (!selectedContract.value) {
        await api.post("api/ComplementaryContract", ccomplementario);
        comp.value.push(ccomplementario);
        location.reload();
      } else {
        await api.put("api/ComplementaryContract", ccomplementario);
        location.reload();
      }
    };
    const contratoHoteles = async () => {
      const choteles = {
        id: selectedContract.value ? tempid.value : 0,
        desc: Descp.value,
        starDate: inicio.value,
        endTime: fin.value,
        concilTime: concil.value,
        address: direccion.value,
        hotelTotalPrice: precio.value,
        enabled: true,
      };
      if (!selectedContract.value) {
        await api.post("api/HotelContract", choteles);
        hotls.value.push(choteles);
        //location.reload();
      } else {
        await api.put("api/HotelContract", choteles);
        location.reload();
      }
    };
    const contratosTransporte = async () => {
      const ctransporte = {
        id: selectedContract.value ? tempid.value : 0,
        desc: Descp.value,
        starDate: inicio.value,
        endTime: fin.value,
        concilTime: concil.value,
        transportationProvider: proveedor.value,
        incluedVehicles: vehiculos.value,
        licensePlateNumber: matricula.value,
        enabled: true,
      };
      if (!selectedContract.value) {
        await api.post("api/TransportationContract", ctransporte);
        transp.value.push(ctransporte);
        //location.reload();
      } else {
        await api.put("api/TransportationContract", ctransporte);
        location.reload();
      }
    };
    // funciones de modificar
    const updatingComplementary = (row) => {
      tempid.value = row.id;
      Descp.value = row.desc;
      inicio.value = row.starDate;
      fin.value = row.endTime;
      concil.value = row.concilTime;
      servicio.value = row.serviceType;
      costo.value = row.costPerPerson;
      provincia.value = row.complementaryServiceProvince;
      selectedContract.value = true;
      inception.value = true;
      slide.value = "complementarios";
    };
    const updatingHotels = (row) => {
      tempid.value = row.id;
      Descp.value = row.desc;
      inicio.value = row.starDate;
      fin.value = row.endTime;
      concil.value = row.concilTime;
      direccion.value = row.address;
      precio.value = row.hotelTotalPrice;
      selectedContract.value = true;
      inception.value = true;
      slide.value = "hoteles";
    };
    const updatingTransportation = (row) => {
      tempid.value = row.id;
      Descp.value = row.desc;
      inicio.value = row.starDate;
      fin.value = row.endTime;
      concil.value = row.concilTime;
      proveedor.value = row.transportationProvider;
      vehiculos.value = row.incluedVehicles;
      matricula.value = row.licensePlateNumber;
      selectedContract.value = true;
      inception.value = true;
      slide.value = "transportes";
    };
    return {
      Descp,
      inicio,
      fin,
      concil,
      servicio,
      services: ["Servicio 1", "Servicio 2", "Servicio 3"],
      costo,
      provincia,
      servicesProv: ["Opción 1", "Opción 2"],
      direccion,
      precio,
      proveedor,
      providers: ["Transtour", "Gaviota"],
      vehiculos,
      matricula,
      myForm,
      inception,
      slide,
      comp,
      hotls,
      transp,
      tab: ref("complementaryContract"),
      buttonstate,
      updatingComplementary,
      updatingHotels,
      updatingTransportation,
      procesingForm,
      reset,
    };
  },
  components: {
    PintarContratosComplementarios,
    PintarContratosHoteles,
    PintarContratosTransporte,
  },
};
</script>

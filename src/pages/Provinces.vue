<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <h2>{{ $t("provinces") }}</h2>
  <div class="q-pa-md">
    <q-btn :label="$t('nuevo')" color="positive" @click="inception = true" />
    <!-- style="margin-left: 18px;" -->
    <q-dialog v-model="inception" @hide="handleClose()">
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
                  :label="$t('province')"
                  v-model="name"
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
      </div>
    </q-dialog>

    <PintarProvincias
      :provinces="provinces"
      @button-clicked="updatingProvinces"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { api } from "src/boot/axios";
import PintarProvincias from "src/components/PintarProvincias.vue";

export default {
  setup() {
    // Variables reactivas
    // variables generales
    const name = ref("");
    //Variables auxiliares
    const myForm = ref(null);
    const inception = ref(false);
    const tempid = ref("");
    const selectedProvince = ref(false);
    const buttonstate = ref(true);
    //Arreglos de contratos
    const provinces = ref([]);
    const token = localStorage.getItem("token");
    const procesingForm = async () => {
      myForm.value.validate().then((success) => {
        if (success) {
          inception.value = false;
        }
      });
      //myForm.value.resetValidation();
      console.log("me diste click");

      //luego se procesa el formulario
      prov();

      //restablece los valores del formulario
      inception.value = false;
      reset();
    };
    const reset = () => {
      name.value = null;
    };
    const prov = async () => {
      const p = {
        provinceId: selectedProvince.value ? tempid.value : 0,
        provinceName: name.value,
      };
      if (!selectedProvince.value) {
        await api.post("api/ProvinceSet", p, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        provinces.value.push(p);
        location.reload();
      } else {
        await api.put("api/ProvinceSet", p, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        location.reload();
      }
    };
    // funciones de modificar
    const updatingProvinces = (row) => {
      tempid.value = row.provinceId;
      name.value = row.provinceName;
      selectedProvince.value = true;
      inception.value = true;
    };
    const handleClose = () => {
      inception.value = false;
      location.reload();
    };
    return {
      name,
      myForm,
      inception,
      provinces,
      token,
      buttonstate,
      updatingProvinces,
      procesingForm,
      reset,
      handleClose,
    };
  },
  components: {
    PintarProvincias,
  },
};
</script>

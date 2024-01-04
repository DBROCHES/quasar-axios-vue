<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h2>{{ $t("provinces") }}</h2>
  <div>
    <q-btn :label="$t('nuevo')" color="positive" @click="inception = true" />
    <!-- style="margin-left: 18px;" -->
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
  </div>
  <pintar-provincias :provinces="provinces" />
</template>

<script>
import PintarProvincias from "src/components/PintarProvincias.vue";
import { ref, onMounted } from "vue";
import { api } from "boot/axios";

export default {
  components: { PintarProvincias },
  setup() {
    // Variables reactivas
    const name = ref("");
    const myForm = ref(null);

    //Arreglo de provincias
    const provinces = ref([]);

    const getProvinces = async () => {
      await api
        .get("/api/ProvinceSet")
        .then((response) => {
          provinces.value = response.data;
          console.log(provinces.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const procesingForm = async () => {
      myForm.value.resetValidation();
      // console.log("Hakuna mATATA"+count);
      const newProvince = {
        provinceName: name.value,
      };

      await api.post("api/ProvinceSet", newProvince);
      provinces.value.push(newProvince);
      location.reload();

      reset();
      fillTable();
    };

    const fillTable = () => {
      console.log(this.$t("llenar"));
    };
    const reset = () => {
      name.value = null;
    };

    onMounted(() => {
      getProvinces();
    });

    return {
      name,
      myForm,
      provinces,
      inception: ref(false),
      procesingForm,
      fillTable,
      reset,
    };
  },
};
</script>

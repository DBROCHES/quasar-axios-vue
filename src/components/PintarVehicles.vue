<template>
  <q-table
    class="q-mt-md"
    :no-data-label="$t('noVehicles')"
    :columns="columns"
    :rows="vehicles"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.field">
          {{ props.row[col.field] }}
        </q-td>
        <q-td auto-width>
          <q-btn
            size="sm"
            color="amber"
            round
            dense
            text-color="white"
            @click="openDialog(props.row)"
            icon="edit"
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

  <q-dialog v-model="dialog" persistent @hide="handleClose">
    <div padding class="bg-white q-pa-xl q-col-gutter-y-sm" style="width: 80%">
      <q-form
        @submit.prevent="savevehicles()"
        @reset="reset"
        ref="myForm"
        style="width: 100%"
      >
        <div padding class="q-col-gutter-y-sm">
          <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3">
            <div>
              <q-input
                outlined
                :label="$t('plate')"
                v-model="plate"
                pattern="[A-Z]\d{5}"
                placeholder="******"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || this.$t('rellene'),
                ]"
              />
            </div>
          </div>
          <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
            <div>
              <q-select
                outlined
                v-model="model"
                :options="options"
                :label="$t('model')"
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
                type="number"
                outlined
                :label="$t('capacity_without')"
                v-model="capacity_without"
                placeholder="2"
                min="2"
                max="40"
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
                type="number"
                outlined
                :label="$t('capacity_with')"
                v-model="capacity_with"
                placeholder="2"
                min="2"
                max="40"
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
                type="number"
                outlined
                :label="$t('totalCapacity')"
                v-model="total"
                placeholder="2"
                min="2"
                max="40"
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
                type="number"
                outlined
                :label="$t('precio')"
                v-model="price"
                placeholder="2"
                min="1"
                max="10000"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || this.$t('rellene'),
                ]"
              />
            </div>
          </div>
          <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
            <div>
              <q-select
                v-model="selectedYear"
                outlined
                :options="optionsyear"
                :label="$t('selectedYear')"
              />
            </div>
          </div>
          <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
            <div>
              <q-select
                outlined
                v-model="selectedOptions"
                :options="optionsProvince"
                :label="$t('province')"
                emit-value
                map-options
                lazy-rules
              />
            </div>
          </div>
          <div class="col-12 col-sm-4 col-md-4 col-xxl-3 mb-3" id="imp">
            <div class="form-floating">
              <q-input
                v-model="manufacturing"
                outlined
                type="textarea"
                :label="$t('manufacturing')"
                rows="3"
                maxlength="200"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || this.$t('rellene'),
                ]"
              />
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
        </div>
      </q-form>
    </div>
  </q-dialog>
</template>
<script>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";

export default {
  props: {
    vehicles: Array,
  },
  data() {
    return {
      columns: [
        {
          name: "plate",
          label: this.$t("plate"),
          alingn: "center",
          field: "license_Plate_Number",
          sortable: true,
        },
        {
          name: "model",
          label: this.$t("chain"),
          alingn: "center",
          field: "brand",
          sortable: true,
        },
        {
          name: "capacity_without",
          label: this.$t("capacity_without"),
          alingn: "center",
          field: "capacity_Without_Equipement",
          sortable: true,
        },
        {
          name: "capacity_with",
          label: this.$t("capacity_with"),
          alingn: "center",
          field: "capacity_With_Equipement",
          sortable: true,
        },
        {
          name: "total",
          label: this.$t("totalCapacity"),
          alingn: "center",
          field: "total_Capacity",
          sortable: true,
        },
        {
          name: "price",
          label: this.$t("precio"),
          alingn: "center",
          field: "price",
          sortable: true,
        },
        {
          name: "year",
          label: this.$t("year"),
          alingn: "center",
          field: "year_of_Manufacture",
          sortable: true,
        },
        {
          name: "manufacturing",
          label: this.$t("manufacturing"),
          alingn: "center",
          field: "manufacturing_Mode",
          sortable: true,
        },
      ],
    };
  },
  setup() {
    const price = ref([]);
    const optionsProvince = ref([]);
    const selectedOptions = ref([]);
    const optionsyear = ref([]);
    const plate = ref("");
    const capacity_without = ref("");
    const capacity_with = ref("");
    const total = ref("");
    const manufacturing = ref("");
    const model = ref(null);
    const selectedYear = ref(null);
    const myForm = ref(null);
    const tempid = ref("");
    const token = localStorage.getItem("token");
    const dialog = ref(false);
    const savevehicles = async () => {
      const temp = {
        vehicleId: tempid.value,
        capacity_With_Equipement: capacity_with.value,
        capacity_Without_Equipement: capacity_without.value,
        year_of_Manufacture: selectedYear.value,
        total_Capacity: total.value,
        manufacturing_Mode: manufacturing.value,
        brand: model.value,
        license_Plate_Number: plate.value,
        price: price.value,
        provinceId: selectedOptions.value,
      };

      await api.put("/api/Vehicles", temp, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      location.reload();
      this.dialog = false;
    };
    const confirmDelete = async (row) => {
      const confirmed = window.confirm("¿Está seguro de borrar este vehículo?");

      if (confirmed) {
        try {
          const response = await api.delete(`/api/Vehicles/${row.vehicleId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          window.alert("Vehículo eliminado");
          location.reload();
        } catch (error) {
          window.alert("Error, Vehículo no eliminado", error);
        }
      }
      this.confirmationVisible = false;
    };
    const getOptions = async () => {
      try {
        const response = await api.get("/api/ProvinceSet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        optionsProvince.value = response.data.map((tupla) => ({
          label: tupla.provinceName,
          value: tupla.provinceId,
        }));
      } catch (error) {
        console.error("Error al obtener las opciones desde la API", error);
      }
    };
    const openDialog = async (row) => {
      tempid.value = row.vehicleId;
      capacity_with.value = row.capacity_With_Equipement;
      capacity_without.value = row.capacity_Without_Equipement;
      selectedYear.value = row.year_of_Manufacture;
      total.value = row.total_Capacity;
      manufacturing.value = row.manufacturing_Mode;
      model.value = row.brand;
      plate.value = row.license_Plate_Number;
      selectedOptions.value = row.provinceId;
      price.value = row.price;
      dialog.value = true;
    };
    onMounted(() => {
      getOptions();
    });
    const handleClose = () => {
      inception.value = false;
      location.reload();
    };
    return {
      optionsProvince,
      selectedOptions,
      price,
      dialog,
      selectedVehicle: null,
      optionsyear,
      plate,
      capacity_without,
      capacity_with,
      total,
      manufacturing,
      model,
      options: ["Mercedez", "Audi", "Lada", "Mazda", "Peugot"],
      selectedYear,
      myForm,
      tempid,
      token,
      getOptions,
      confirmDelete,
      savevehicles,
      openDialog,
      handleClose,
    };
  },
};
</script>

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

  <q-dialog v-model="dialog" persistent>
    <q-card class="q-col-gutter-y-sm">
      <div padding class="bg-white q-pa-xl" style="width: 80%">
        <q-form
          @submit.prevent="saveVehicle()"
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
                  v-model="selectedVehicle.license_Plate_Number"
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
                <q-select
                  v-model="selectedYear"
                  outlined
                  :options="optionsyear"
                  :label="$t('selectedYear')"
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
          </div>
        </q-form>
      </div>

      <q-card-actions align="right">
        <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
        <q-btn
          flat
          :label="$t('guardar')"
          color="primary"
          @click="saveVehicle"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref, onMounted, watchEffect } from "vue";
const rows = [
  {
    plate: "A12365",
    model: "Audi",
    capacity_without: "2",
    capacity_with: "2",
    total: "2",
    year: "2000",
    manufacturing: "industrial",
  },
];

export default {
  props: {
    vehicles: Array,
  },
  data() {
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
    return {
      dialog: false,
      selectedVehicle: null,
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
  methods: {
    openDialog(row) {
      this.tempid = row.VehicleId;
      this.capacity_with = row.capacity_With_Equipement;
      this.capacity_without = row.capacity_Without_Equipement;
      this.selectedYear = row.year_of_Manufacture;
      this.total = row.total_Capacity;
      this.manufacturing = row.manufacturing_Mode;
      this.model = row.brand;
      this.plate = row.license_Plate_Number;
    },

    async confirmDelete(row) {
      const confirmed = window.confirm("¿Está seguro de borrar este vehículo?");

      if (confirmed) {
        try {
          const response = await api.delete(`/api/Vehicles/${row.vehicleId}`);
          window.alert("Vehículo eliminado");
          location.reload();
        } catch (error) {
          window.alert("Error, Vehículo no eliminado", error);
        }
      }
      this.confirmationVisible = false;
    },
    async saveVehicle() {
      const temp = {
        VehicleId: this.tempid,
        capacity_With_Equipement: this.capacity_with,
        capacity_Without_Equipement: this.capacity_without,
        year_of_Manufacture: this.selectedYear,
        total_Capacity: this.total,
        manufacturing_Mode: this.manufacturing,
        brand: this.model,
        license_Plate_Number: this.plate,
      };

      await api.put("api/Vehicle", temp);
      location.reload();
      this.dialog = false;
    },
  },
  setup() {
    return {
      rows,
    };
  },
};
</script>

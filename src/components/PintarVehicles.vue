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
            text-color="black"
            @click="openDialog(props.row)"
            icon="edit"
          />
        </q-td>

        <!-- ... -->
      </q-tr>
    </template>
  </q-table>

  <q-dialog v-model="dialog" persistent>
    <q-card class="q-col-gutter-y-sm">
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
    openDialog(vehicle) {
      this.selectedVehicle = { ...vehicle };
      this.dialog = true;
    },
    saveVehicle() {
      // Aquí puedes actualizar los datos del vehículo...
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

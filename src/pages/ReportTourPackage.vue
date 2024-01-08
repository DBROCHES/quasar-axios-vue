<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h4>{{ $t("tourPackage") }}</h4>
  <div>
    <q-btn :label="$t('export')" color="positive" @click="exporToPDF" />
  </div>
  <div id="qr"><PintarReportTourPackage :packages="packages" /></div>
</template>

<script>
import PintarReportTourPackage from "src/components/PintarReportTourPackage.vue";
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import html2pdf from "html2pdf.js";

export default {
  components: { PintarReportTourPackage },
  setup() {
    const packages = ref([]);

    const getContracts = async () => {
      await api
        .get("/api/TourPackage/GetTourPackages")
        .then((response) => {
          packages.value = response.data;
          console.log(packages.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    onMounted(() => {
      getContracts();
    });

    return {
      packages,
    };
  },

  methods: {
    exporToPDF() {
      var element = document.getElementById("qr");
      var opt = {
        margin: 0,
        filename: "Paquetes Turísticos.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      };

      // New Promise-based usage:
      html2pdf().from(element).set(opt).save();
    },
  },
};
</script>

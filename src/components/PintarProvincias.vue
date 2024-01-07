<template>
  <q-table
    class="q-mt-md"
    :no-data-label="$t('noProvinces')"
    :columns="columns"
    :rows="allProvinces"
    row-key="provinceId"
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
            icon="edit"
            @click="handleClick(props.row)"
          />
        </q-td>
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
</template>
<script>
import { ref, onMounted, watchEffect } from "vue";
import { api } from "src/boot/axios";

export default {
  props: {
    provinces: Array,
  },

  setup(props, { emit }) {
    const token = localStorage.getItem("token");
    const handleClick = (row) => {
      emit("button-clicked", row);
    };
    let allProvinces = ref([...props.provinces]);
    //Esta funcion hace que los cambios en la propiedad hours del props se reflejen tambien en el arreglo
    watchEffect(() => {
      allProvinces.value.push(...props.provinces);
    });
    //Funcion de llenar la tabla
    const getall = async () => {
      await api
        .get("api/ProvinceSet")
        .then((response) => {
          allProvinces.value = response.data;
          console.log(allProvinces.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    onMounted(() => {
      getall();
    });
    return {
      handleClick,
      allProvinces,
      token: localStorage.getItem("token"),
    };
  },

  methods: {
    async confirmDelete(row) {
      const confirmed = window.confirm(this.$t("deletProvince"));

      if (confirmed) {
        try {
          console.log(row.provinceId + "Hakuna Matata");
          await api.delete(`/api/ProvinceSet/ ${row.provinceId}`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          window.alert(this.$t("deletConfProvince"));
          location.reload();
        } catch (error) {
          console.error(this.$t("errDeletProvince"), error);
        }
      }
    },
  },

  data() {
    return {
      columns: [
        {
          name: "provinceId",
          label: "No.",
          align: "left",
          field: "provinceId",
          sortable: true,
        },
        {
          name: "provinceName",
          label: this.$t("province"),
          align: "left",
          field: "provinceName",
          sortable: true,
        },
        {
          name: "provinceDesc",
          label: this.$t("descripcion"),
          align: "left",
          field: "provinceDesc",
          sortable: true,
        },
      ],
    };
  },
};
</script>

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h2>{{ $t("users") }}</h2>
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
                  :label="$t('nombre')"
                  v-model="userName"
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
                  v-model="password"
                  type="password"
                  :label="$t('contrasena')"
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
                  v-model="email"
                  :label="$t('email')"
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
  <PintarUsuarios :users="users" />
</template>

<script>
import PintarUsuarios from "src/components/PintarUsuarios.vue";
import { ref, onMounted } from "vue";
import { api } from "boot/axios";

export default {
  components: { PintarUsuarios },
  setup() {
    // Variables reactivas
    const userName = ref("");
    const password = ref("");
    const email = ref("");
    const myForm = ref(null);

    //Arreglo de usuarios
    const users = ref([]);

    const getUsers = async () => {
      await api
        .get("/api/User")
        .then((response) => {
          users.value = response.data;
          console.log(users.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const procesingForm = async () => {
      myForm.value.resetValidation();
      // console.log("Hakuna mATATA"+count);
      const newUser = {
        userName: userName.value,
        password: password.value,
        email: email.value,
      };

      const response = await api.post("/api/User", newUser);
      users.value.push(newUser);
      location.reload();

      reset();
      fillTable();
    };

    const fillTable = () => {
      console.log(this.$t("llenar"));
    };
    const reset = () => {
      userName.value = null;
      password.value = null;
      email.value = null;
    };

    onMounted(() => {
      getUsers();
    });

    return {
      userName,
      password,
      email,
      myForm,
      inception: ref(false),
      users,
      procesingForm,
      reset,
    };
  },
};
</script>

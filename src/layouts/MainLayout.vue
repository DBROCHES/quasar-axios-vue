<template>
  <q-layout view="hHh lpR lFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          ConoceCuba
        </q-toolbar-title>

        <q-btn label="Español" @click="$i18n.locale = 'es'"></q-btn>
        <q-btn label="English" @click="$i18n.locale = 'en-US'"></q-btn>

        <q-btn round @click="card = true">
          <q-avatar size="42px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-btn>
        <q-dialog v-model="card">
          <div class="q-pa-lg">
            <q-form
              @submit.prevent="iniciarSesion()"
              @reset="onReset"
              class="bg-white q-pa-lg"
            >
              <q-input
                filled
                v-model="name"
                label="Su nombre*"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Usuario incorrecta',
                ]"
              />

              <q-input
                filled
                v-model="password"
                label="Su contraseña *"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 6) || 'Contraseña incorrecta',
                ]"
              />

              <!-- <q-toggle
                  v-model="accept"
                  label="Acepto las licencias y lo términos"
                /> -->

              <div>
                <q-btn label="Ingresar" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </div>
        </q-dialog>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <q-scroll-area
        style="height: calc(100% - 150px); border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item clickable v-ripple to="/" active-class="my-menu-link" exact>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> {{ $t("inicio") }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/tourPackage">
            <q-item-section avatar>
              <q-icon name="tourPackage" />
            </q-item-section>
            <q-item-section> Paquetes Turísticos </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/about" active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> {{ $t("about") }} </q-item-section>
          </q-item>

          <!-- v-if="rol === 'admin'" -->
          <q-expansion-item icon="inventory_2" label="Gestión" caption="">
            <q-item clickable v-ripple to="/contracts">
              <q-item-section avatar>
                <q-icon name="book" />
              </q-item-section>
              <q-item-section> {{ $t("contracts") }} </q-item-section>
            </q-item>
            <q-expansion-item
              icon="business"
              :label="$t('hotelera')"
              caption=""
            >
              <q-item clickable v-ripple to="/hotel">
                <q-item-section avatar>
                  <q-icon name="hotel" />
                </q-item-section>
                <q-item-section> {{ $t("hoteles") }} </q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/room">
                <q-item-section avatar>
                  <q-icon name="bed" />
                </q-item-section>
                <q-item-section> {{ $t("room") }} </q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/meal">
                <q-item-section avatar>
                  <q-icon name="restaurant_menu" />
                </q-item-section>
                <q-item-section> Planes de comida </q-item-section>
              </q-item>
            </q-expansion-item>
            <q-item clickable v-ripple to="/activities">
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section> {{ $t("actividades") }} </q-item-section>
            </q-item>
            <q-expansion-item
              icon="local_shipping"
              label="Transporte"
              caption=""
            >
              <q-item clickable v-ripple to="/vehicle">
                <q-item-section avatar>
                  <q-icon name="directions_car" />
                </q-item-section>
                <q-item-section> Vehiculo </q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/modality">
                <q-item-section avatar>
                  <q-icon name="grid_view" />
                </q-item-section>
                <q-item-section> Modalidad</q-item-section>
              </q-item>
            </q-expansion-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent, ref } from "vue";
import VueJwtDecode from "vue-jwt-decode";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const name = ref(null);
    const password = ref(null);
    const accept = ref(false);
    const rol = ref(null);
    return {
      password,
      accept,
      name,
      leftDrawerOpen,
      rol: localStorage.getItem("role"),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        name.value = null;
        password.value = null;
        accept.value = false;
      },
      card: ref(false),
    };
  },
  methods: {
    async iniciarSesion() {
      try {
        const response = await api.post(
          `/api/User/api/login/${this.name}/${this.password}`
        );

        api.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
        localStorage.setItem("token", response.data.token);

        const decodedToken = VueJwtDecode(response.data.token);
        const userName =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ];
        const email =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/email"
          ];
        const role =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];

        localStorage.setItem("userName", userName);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);

        console.log(localStorage.getItem("id"));
        console.log(localStorage.getItem("userName"));
        console.log(localStorage.getItem("email"));
        console.log(localStorage.getItem("role"));

        // Redirigir al usuario
        this.$router.push("/");
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    },
  },
};
</script>
<style lang="scss">
.my-menu-link {
  color: #1976d2;
}
</style>

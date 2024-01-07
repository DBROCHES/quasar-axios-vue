<template>
  <q-layout view="hHh lpR lFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/CC.jpg" />
          </q-avatar>
          {{ userName }} {{ $t("saludo") }}
        </q-toolbar-title>

        <select
          v-model="locale"
          @change="cambiarIdioma(locale)"
          class="custom-select"
        >
          <option value="en-US">English</option>
          <option value="es">Español</option>
          <!-- Agrega más opciones aquí para otros idiomas -->
        </select>
        <q-btn round @click="men = true">
          <q-avatar size="42px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-btn>
        <template class="items-center">
          <q-menu v-model="men">
            <q-list
              class="column justify-center items-start"
              style="min-width: 100px"
            >
              <q-item clickable v-close-popup v-if="rol === null">
                <q-item-section @click="cardUno = true"
                  >Registrarse</q-item-section
                >
              </q-item>
              <q-item clickable v-close-popup v-if="rol === null">
                <q-item-section @click="card = true"
                  >Iniciar sesión</q-item-section
                >
              </q-item>
              <q-item clickable v-close-popup v-if="rol !== null">
                <q-item-section @click="clear">Cerrar sesión</q-item-section>
              </q-item>
              <q-item v-if="rol !== null">
                <q-item-section>
                  <img
                    src="https://cdn.quasar.dev/img/avatar2.jpg"
                    alt="Foto de perfil"
                    class="perfil-foto"
                  />
                </q-item-section>
                <q-item-section>
                  <div>{{ userName }}</div>
                  <div>{{ Email }}</div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </template>
      </q-toolbar>

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
              type="password"
            />

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

      <q-dialog v-model="cardUno">
        <div class="q-pa-lg">
          <q-form
            @submit.prevent="register()"
            @reset="onResetUno"
            ref="myForm"
            class="bg-white q-pa-lg"
          >
            <q-input
              filled
              v-model="nameU"
              label="Su nombre*"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Usuario incorrecta',
              ]"
            />

            <q-input
              filled
              v-model="email"
              label="Email"
              type="email"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Rellene el campo']"
            />

            <q-input
              filled
              v-model="passW"
              label="Su contraseña *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 6) || 'Contraseña incorrecta',
              ]"
              type="password"
            />

            <div>
              <q-btn label="Registar" type="submit" color="primary" />
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
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
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
          <q-item-section> {{ $t("tourPackage") }} </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/about" active-class="my-menu-link">
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>

          <q-item-section> {{ $t("about") }} </q-item-section>
        </q-item>

        <q-expansion-item
          v-if="rol === 'Admin' || rol === 'SuperAdmin'"
          icon="inventory_2"
          :label="$t('gestion')"
          caption=""
        >
          <q-item clickable v-ripple to="/contracts">
            <q-item-section avatar>
              <q-icon name="book" />
            </q-item-section>
            <q-item-section> {{ $t("contracts") }} </q-item-section>
          </q-item>
          <q-expansion-item icon="business" :label="$t('hotelera')" caption="">
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
              <q-item-section> {{ $t("meals") }} </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/season">
              <q-item-section avatar>
                <q-icon name="sunny" />
              </q-item-section>
              <q-item-section> {{ $t("season") }} </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-item clickable v-ripple to="/activities">
            <q-item-section avatar>
              <q-icon name="directions_run" />
            </q-item-section>
            <q-item-section> {{ $t("actividades") }} </q-item-section>
          </q-item>
          <q-expansion-item
            icon="local_shipping"
            :label="$t('transort')"
            caption=""
          >
            <q-item clickable v-ripple to="/vehicle">
              <q-item-section avatar>
                <q-icon name="directions_car" />
              </q-item-section>
              <q-item-section> {{ $t("vehicles") }} </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/modality">
              <q-item-section avatar>
                <q-icon name="grid_view" />
              </q-item-section>
              <q-item-section> {{ $t("modality") }}</q-item-section>
            </q-item>
          </q-expansion-item>
          <q-item clickable v-ripple to="/provinces">
            <q-item-section avatar>
              <q-icon name="travel_explore" />
            </q-item-section>
            <q-item-section> {{ $t("provinces") }} </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/users">
            <q-item-section avatar>
              <q-icon name="supervisor_account" />
            </q-item-section>
            <q-item-section> {{ $t("users") }} </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          v-if="rol === 'Admin' || rol === 'SuperAdmin'"
          icon="list"
          label="Reportes"
          caption=""
        >
          <q-item clickable v-ripple to="/reportHotelContracts">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section> Contratos de Hoteles Conciliados </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/reportHotelSeason">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>
              Listado de Temporadas de los Contratos de Hoteles
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/reportListTransportContract">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section> Listado de Contratos Transporte </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/reportActiveHotels">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section> Listado de Hoteles Activos </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/reportTourPackages">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section> {{ $t("tourPackage") }} </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { api } from "src/boot/axios";
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const name = ref(null);
    const password = ref(null);
    const nameU = ref("");
    const email = ref("");
    const passW = ref("");
    const accept = ref(false);
    const myForm = ref(null);

    const register = async () => {
      myForm.value.resetValidation();
      const newUser = {
        userName: nameU.value,
        password: passW.value,
        email: email.value,
      };
      const response = await api.post("/api/User", newUser);
    };
    return {
      password,
      accept,
      name,
      nameU,
      passW,
      email,
      myForm,
      leftDrawerOpen,
      rol: localStorage.getItem("role"),
      userName: localStorage.getItem("username"),
      Email: localStorage.getItem("email"),
      locale: localStorage.getItem("userLocale") || "en-US",
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
        onReset();
      },
      clear() {
        localStorage.clear();
        location.reload();
      },
      onReset() {
        name.value = null;
        password.value = null;
      },
      onResetUno() {
        nameU.value = null;
        email.value = null;
        passW.value = null;
      },
      men: ref(false),
      card: ref(false),
      cardUno: ref(false),
      register,
    };
  },
  created() {
    this.$i18n.locale = this.locale;
  },
  methods: {
    async iniciarSesion() {
      try {
        const response = await api.post(
          `/api/User/login/${this.name}/${this.password}`
        );

        api.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
        localStorage.setItem("token", response.data.token);

        const base64Url = response.data.token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        const data = JSON.parse(jsonPayload);

        const roles = Object.keys(data)
          .filter((key) => key.includes("role"))
          .map((key) => data[key]);

        localStorage.setItem("username", data.UserName);
        localStorage.setItem("email", data.Email);
        localStorage.setItem("role", roles[0]);
        localStorage.setItem("userId", data.Id);

        this.$router.push("/");
        location.reload();
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    },
    cambiarIdioma(locale) {
      this.locale = locale;
      this.$i18n.locale = this.locale;
      localStorage.setItem("userLocale", this.locale);
    },
  },
};
</script>
<style lang="scss">
.my-menu-link {
  color: #1976d2;
}
.custom-select {
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
}

.custom-select option {
  background-color: white;
  color: black;
  border: none;
  border-radius: 2px;
}

.custom-select:focus {
  outline: none; /* borde blanco al seleccionar */
}

.perfil-foto {
  width: 30px; /* Ajusta el tamaño según tus necesidades */
  height: 30px;
  border-radius: 50%;
}
</style>

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

        <q-btn round @click="card = true">
          <q-avatar size="42px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-btn>
        <q-dialog v-model="card">
          <div class="q-pa-lg">
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="bg-white q-pa-lg"
            >
              <q-input
                filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                type="number"
                v-model="age"
                label="Your age *"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type your age',
                  (val) => (val > 0 && val < 100) || 'Please type a real age',
                ]"
              />

              <q-toggle
                v-model="accept"
                label="I accept the license and terms"
              />

              <div>
                <q-btn label="Submit" type="submit" color="primary" />
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

            <q-item-section> Inicio</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/about" active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> About </q-item-section>
          </q-item>

          <q-expansion-item icon="drafts" label="Gestión" caption="">
            <q-item clickable v-ripple to="/vehicle">
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>
              <q-item-section> Vehiculo </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/hotel">
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>
              <q-item-section> Hotel </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/activities">
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>
              <q-item-section> Actividades </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/contracts">
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>
              <q-item-section> Contratos </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/modality">
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>
              <q-item-section> Modalidad</q-item-section>
            </q-item>
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
import { defineComponent, ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);
    return {
      name,
      age,
      accept,
      leftDrawerOpen,
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
        age.value = null;
        accept.value = false;
      },
      card: ref(false),
    };
  },
};
</script>
<style lang="scss">
.my-menu-link {
  color: #1976d2;
}
</style>

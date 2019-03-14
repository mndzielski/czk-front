<template>
  <v-app>
    <v-toolbar
      fixed
      dense
      dark
      color="red darken-4"
      app
      :clipped-left="layout.clipped"
    >
      <v-toolbar-side-icon @click.native.stop="layout.drawer = !layout.drawer"></v-toolbar-side-icon>

      <router-link
        to="/"
        style="text-decoration: none; color: currentColor;"
      >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-menu
          v-if="account.user"
          v-model="menu"
          attach
          :close-on-content-click="false"
          offset-y
          left
        >
          <v-btn
            slot="activator"
            flat
          >KONTO</v-btn>
          <v-card>
            <v-list>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title> {{ account.user.username }} </v-list-tile-title>
                  <v-list-tile-sub-title> {{ account.user.email }} </v-list-tile-sub-title>
                </v-list-tile-content>

              </v-list-tile>
            </v-list>

            <v-divider class="my-0"></v-divider>

            <v-list>
              <v-list-tile @click="menu = false;">
                <router-link
                  to="/login"
                  tag="v-list-tile-title"
                >Wyloguj się</router-link>
              </v-list-tile>
            </v-list>

          </v-card>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer
      dark
      class="red darken-4"
      fixed
      :clipped="layout.clipped"
      v-model="layout.drawer"
      hide-overlay
      disable-resize-watcher
      app
    >
      <v-list
        dense
        expand
      >
        <v-list-tile :to="'/'">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Strona główna</v-list-tile-title>
        </v-list-tile>
        <v-list-group
          v-model="item.active"
          v-for="(item, i) in navigationMenu.menu"
          :key="i"
          :prepend-icon="item.action"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(subItem, i) in item.items"
            :key="i"
            :to="subItem.to"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <main
      class="red lighten-5 main-image"
      style="height: 100%;"
    >
      <v-content class="height-100">
        <v-container
          style="max-width: 1400px !important;"
          fluid
          align-center
          fill-height
        >
          <v-layout
            align-center
            justify-center
            row
            fill-height
          >
            <v-flex
              xl8
              lg8
              md9
              sm12
              xs12
              class="height-100"
            >
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-snackbar
        v-model="snackbar.active"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
        :left="true"
      >
        {{ snackbar.text }}
        <v-btn
          dark
          flat
          @click="snackbar.active = false"
        >
          Zamknij
        </v-btn>
      </v-snackbar>

    </main>

    <v-footer
      dark
      absolute
      app
      height="auto"
    >
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-actions
          v-if="!account.user"
          class="red darken-2 justify-center"
        >
          <router-link
            tag="strong"
            class="subheading"
            to="/login"
          >Strefa pracownika</router-link>
        </v-card-actions>
        <v-card-actions class="red darken-4 justify-center">
          <span>&copy; 2018 - 2019 <strong>Centrum Zarządzania Kryzysowego</strong></span>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  data() {
    return {
      title: "Centrum Zarządzania Kryzysowego",
      layout: {
        clipped: true,
        drawer: false
      },
      menu: false
    };
  },
  computed: {
    ...mapState({
      account: state => state.account,
      navigationMenu: state => state.navigationMenu,
      snackbar: state => state.snackbar,
    })
  }
};
</script>
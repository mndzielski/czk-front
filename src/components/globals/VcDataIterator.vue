<template>
  <div>
    <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-list"
      :content-props="{'three-line': true}"
      row
      wrap
      :content-class="'red lighten-4'"
      hide-actions
      no-data-text="Brak danych"
      no-results-text="Brak danych"
      :total-items="totalElements"
    >
      <template
        slot="item"
        slot-scope="props"
      >
        <v-list-tile
          xs12
          @click.prevent="info(props.item)"
        >
          <slot
            name="item-content"
            :item="props.item"
          ></slot>

          <v-list-tile-action
            v-if="infoEnable"
            class="v-list__tile__action__hover"
          >
            <v-btn
              @click.stop="info(props.item)"
              icon
              ripple
            >
              <v-icon color="grey darken-1">info</v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action
            v-if="editEnable"
            class="v-list__tile__action__hover"
          >
            <v-btn
              @click.stop="edit(props.item)"
              icon
              ripple
            >
              <v-icon color="grey darken-1">edit</v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action
            v-if="removeEnable"
            class="v-list__tile__action__hover"
          >
            <v-btn
              @click.stop="remove(props.item)"
              icon
              ripple
            >
              <v-icon color="grey darken-1">delete</v-icon>
            </v-btn>
          </v-list-tile-action>

        </v-list-tile>
        <v-divider v-if="props.index !== items.length - 1"></v-divider>
      </template>
    </v-data-iterator>
    <div class="text-xs-center pt-2">
      <v-pagination
        v-model="pagination.page"
        :length="totalPages"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import {restapi} from "@/restapi/restapi";

export default {
  props: ["url", "params", "infoEnable", "editEnable", "removeEnable", "sortBy"],
  data: function() {
    return {
      items: [],
      totalElements: 0,
      totalPages: 0,
      rowsPerPageItems: [6],
      pagination: {}
    };
  },
  watch: {
    pagination: {
      handler: function handler() {
        this.fetch();
      },
      deep: true
    }
  },
  methods: {
    refresh: function() {
      this.fetch();
    },
    edit: function(item) {
      this.$emit("edit", item);
    },
    remove: function(item) {
      this.$emit("remove", item);
    },
    info: function(item) {
      this.$emit("info", item);
    },
    fetch: function() {
      this.$vuetify.goTo(0, { duration: 0 });
      var page = this.pagination.page;
      var size = this.pagination.rowsPerPage;
      var sort = this.sortBy || 'id';
      var _this = this;

      var params = Object.assign({}, this.params, {
        page: page - 1,
        size: size,
        sort: sort
      });

      restapi.get(
        _this.url,
        true,
        params,
        response => {
          _this.items = response.data.content;
          _this.totalElements = response.data.totalElements;
          _this.totalPages = response.data.totalPages;
        },
        error => {
          console.log(error);
        },
        () => {}
      );
    }
  }
};
</script>

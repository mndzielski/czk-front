<template>
  <div style="width: 100%;">
    <vc-info-dialog v-model="infoDialog">
      <template
        slot="content"
        slot-scope="props"
      >
        <slot
          name="info-dialog-content"
          :item="props.item"
        ></slot>
      </template>
    </vc-info-dialog>

    <v-flex
      v-for="(item, index) in items"
      :key="index"
      xs12
      class="mb-2 mt-3"
    >
      <v-card color="red lighten-4">
        <v-card-title class="py-1 no-flex-wrap">
          <slot
            name="item-title"
            :item="item"
          ></slot>

          <v-spacer></v-spacer>
          <slot
            name="item-title-actions"
            :item="item"
            :index="index"
          ></slot>
          <v-btn
            v-if="infoBtn"
            @click.native="info(item)"
            icon
          >
            <v-icon>info</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>
        <slot
          name="item-content"
          :item="item"
        ></slot>
      </v-card>
    </v-flex>

    <v-layout align-center>
      <v-flex text-xs-center>
        <v-btn
          v-if="!last"
          @click.native="loadNextPage"
          :loading="loading"
          flat
          color="primary"
        >
          Załaduj więcej
        </v-btn>
        <p
          v-else
          class="text-md-center"
        >{{items.length !== 0 ? 'Koniec wyników' : 'Brak wyników'}}</p>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import {restapi} from "@/restapi/restapi";

var initialData = function() {
  return {
    items: [],
    totalElements: 0,
    totalPages: 0,
    loading: false,
    last: false,
    pagination: {
      page: 1,
      rowsPerPage: 3
    }
  };
};
export default {
  props: {
    value: Object,
    infoBtn: {
      type: Boolean,
      default: true
    },
    infoDialog: Object
  },
  data: function() {
    return initialData();
  },
  mounted: function() {
    this.refresh();
  },
  methods: {
    info: function(item) {
      this.infoDialog.item = item;
      this.infoDialog.show = true;
    },
    refresh: function() {
      this.fetch();
    },
    reset: function() {
      Object.assign(this.$data, initialData());
      this.refresh();
    },
    loadNextPage: function() {
      this.pagination.page++;
      this.fetch();
    },
    fetch: function() {
      var page = this.pagination.page;
      var size = this.pagination.rowsPerPage;
      var sort = this.value.sortBy || "id";
      var _this = this;

      _this.loading = true;

      var params = {
        page: page - 1,
        size: size,
        sort: sort
      };

      params = Object.assign({}, params, this.value.getParams());

      restapi.get(
        _this.value.url, false,
        params,
        response => {
          _this.items = _this.items.concat(response.data.content);
          _this.last = response.data.last;
          _this.totalElements = response.data.totalElements;
          _this.totalPages = response.data.totalPages;
        },
        error => {
          console.log(error);
        },
        () => {
          _this.loading = false;
        }
      );
    }
  }
};
</script>

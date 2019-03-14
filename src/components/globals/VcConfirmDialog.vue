<template>
  <vc-dialog
    ref="dialog"
    v-model="value"
    :width="450"
  >
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <slot></slot>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        flat
        @click="close"
      >
        Nie
      </v-btn>
      <v-btn
        color="primary"
        flat
        @click="confirm"
      >
        Tak
      </v-btn>
    </v-card-actions>
  </vc-dialog>
</template>

<script>
import VcDialog from "./VcDialog";
import {restapi} from "@/restapi/restapi";

export default {
  components: { VcDialog },
  props: ["value"],
  data: function() {
    return {};
  },
  methods: {
    confirm: function() {
      var _this = this;
      restapi.post(
        _this.value.url,
        true,
        null,
        null,
        response => {
          if (typeof _this.value.onSuccess === "function") {
            try {
              _this.value.onSuccess(response.data);
            } catch (e) {
              console.error(e);
            }
          }
          _this.close();
        },
        error => {
          if (typeof _this.value.onError === "function") {
            _this.value.onError(error);
          }
        },
        () => {}
      );
    },
    close: function() {
      this.$refs.dialog.close();
    }
  },
  mounted: function() {
    var _this = this;
    document.addEventListener("keydown", function(e) {
      if (_this.value.show && e.keyCode === 27) {
        _this.close();
      }
    });
  }
};
</script>

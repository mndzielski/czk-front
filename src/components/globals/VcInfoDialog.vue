<template>
  <vc-dialog ref="dialog" v-model="value" :width="1000">
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <slot name="content" :item="value.item"></slot>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" flat @click="close">
        Zamknij
      </v-btn>
    </v-card-actions>
  </vc-dialog>
</template>

<script>
import VcDialog from "./VcDialog";
export default {
  components: { VcDialog },
  props: ["value"],
  data: function() {
    return {};
  },
  methods: {
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


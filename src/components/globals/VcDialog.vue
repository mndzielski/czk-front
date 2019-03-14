<template>
  <v-dialog v-model="value.show" @input="onDialogClose" :fullscreen="fullscreen" :hide-overlay="fullscreen" :transition="fullscreen ? 'dialog-bottom-transition' : 'dialog-transition'" :width="width" lazy :persistent="persistent" scrollable>
    <v-fade-transition>
      <v-card v-if="value.show">
        <v-toolbar class="title grey lighten-3 elevation-0">
          <v-btn v-if="fullscreen" flat @click="close" icon color="red">
            <v-icon>close</v-icon>
          </v-btn>
          {{ value.title }}
          <v-spacer></v-spacer>
          <slot name="title-actions"></slot>
          <v-btn v-if="!fullscreen" flat @click="close" icon color="red">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <slot></slot>
      </v-card>
    </v-fade-transition>
  </v-dialog>

</template>

<script>
export default {
  props: {
    value: Object,
    width: Number,
    persistent: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {};
  },
  methods: {
    onDialogClose: function(event) {
      console.log("onDialogClose");
    },
    close: function() {
      console.log("close");
      this.value.show = false;
    }
  }
};
</script>

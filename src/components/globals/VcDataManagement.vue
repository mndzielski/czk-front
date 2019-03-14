<template>
  <div>
    <vc-confirm-dialog v-model="confirmDialog">
      Potwierdź wykonanie operacji.
    </vc-confirm-dialog>

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

    <vc-modify-dialog v-model="modifyDialog">
      <template
        slot="content"
        slot-scope="props"
      >
        <slot
          name="modify-dialog-content"
          :item="props.item"
        ></slot>
      </template>
    </vc-modify-dialog>

    <vc-data-iterator
      ref="vcDataIterator"
      :url="iteratorDetails.url"
      :params="iteratorDetails.params"
      :infoEnable="infoDetails !== null"
      :editEnable="editDetails !== null"
      :removeEnable="removeDetails !== null"
      @info="info"
      @edit="edit"
      @remove="remove"
      :sortBy="sortBy"
    >
      <template
        slot="item-content"
        slot-scope="props"
      >
        <slot
          name="data-iterator-content"
          :item="props.item"
        ></slot>
      </template>
    </vc-data-iterator>

    <v-btn
      v-if="addDetails !== null"
      @click="add"
      fixed
      dark
      fab
      bottom
      right
      color="pink"
      style="bottom: 40px;"
    >
      <v-icon>add</v-icon>
    </v-btn>

  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    iteratorDetails: Object,
    infoDetails: {
      type: Object,
      default: function() {
        return null;
      }
    },
    addDetails: {
      type: Object,
      default: function() {
        return null;
      }
    },
    editDetails: {
      type: Object,
      default: function() {
        return null;
      }
    },
    removeDetails: {
      type: Object,
      default: function() {
        return null;
      }
    },
    initialObject: {
      type: Object,
      default: function() {
        return {};
      }
    },
    onChangeItem: {
      type: Function,
      default: function() {
        return null;
      }
    },
    customize: {
      type: Function,
      default: function(v) {
        return v;
      }
    },
    sortBy: {
      type: String,
      default: "id"
    }
  },
  data: function() {
    return {
      confirmDialog: {
        _this: this,
        show: false,
        onSuccess: function(data) {
          console.log(data);
          this._this.refresh();
        },
        onError: function(error) {
          this._this.showErrorSnackbar({ text: "Wystąpił błąd!" });
        }
      },
      modifyDialog: {
        _this: this,
        show: false,
        item: Object.assign({}, this.initialObject),
        onSuccess: function(data) {
          console.log(data);
          this._this.refresh();
        },
        onChangeItem: this.onChangeItem,
        onError: function(error) {
          this._this.showErrorSnackbar({ text: "Wystąpił błąd!" });
        }
      },
      infoDialog: {
        show: false,
        item: {}
      }
    };
  },
  methods: {
    ...mapActions("snackbar", ["showSuccessSnackbar", "showErrorSnackbar"]),
    refresh: function() {
      this.$refs.vcDataIterator.refresh();
    },
    cleanObject: function(object) {
      var obj = Object.assign({}, object);
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
      }
      return obj;
    },
    add: function() {
      var dialog = this.modifyDialog;
      dialog.url = this.addDetails.url;
      dialog.title = this.addDetails.title;
      dialog.item = JSON.parse(
        JSON.stringify(Object.assign({}, this.initialObject))
      );
      dialog.show = true;
    },
    edit: function(item) {
      var _this = this;
      var dialog = this.modifyDialog;
      dialog.url = this.editDetails.url;
      dialog.title = this.editDetails.title;
      dialog.item = JSON.parse(
        JSON.stringify(Object.assign({}, _this.initialObject))
      );
      this.$nextTick(function() {
        dialog.item = this.customize(
          JSON.parse(
            JSON.stringify(
              Object.assign({}, _this.initialObject, _this.cleanObject(item))
            )
          )
        );
      });
      dialog.show = true;
    },
    remove: function(item) {
      var dialog = this.confirmDialog;
      dialog.url = this.removeDetails.url + item.id;
      dialog.title = this.removeDetails.title;
      dialog.show = true;
    },
    info: function(item) {
      var dialog = this.infoDialog;
      dialog.title = this.infoDetails.title;
      dialog.item = Object.assign({}, item);
      dialog.show = true;
    }
  }
};
</script>

<template>
  <vc-dialog
    ref="dialog"
    :persistent="true"
    v-model="value"
    :width="600"
  >
    <v-card-text style="overflow-x: hidden;">
      <v-form
        ref="form"
        v-model="form.valid"
        lazy-validation
      >
        <v-container grid-list-md>
          <v-layout wrap>
            <slot
              name="content"
              :item="value.item"
            ></slot>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        flat
        @click="close"
      >
        Zamknij
      </v-btn>
      <v-btn
        color="primary"
        flat
        @click="submit"
      >
        Zapisz
      </v-btn>
    </v-card-actions>
  </vc-dialog>

</template>

<script>
import VcDialog from "./VcDialog";
import {restapi} from "@/restapi/restapi";
import { mapState, mapActions } from "vuex";

export default {
  components: { VcDialog },
  props: ["value", "initialObject"],
  data: function() {
    return {
      form: {
        valid: false
      },
      prevObject: Object.assign({}, this.initialObject)
    };
  },
  mounted: function() {},
  computed: {
    item: function() {
      return this.value.item;
    }
  },
  watch: {
    item: {
      handler: function(newValue, oldValue) {
        if (typeof this.value.onChangeItem === "function") {
          this.value.onChangeItem(newValue, this.prevObject);
        }
        this.prevObject = JSON.parse(JSON.stringify(newValue));
      },
      deep: true
    }
  },
  methods: {
    ...mapActions("snackbar", ["showSuccessSnackbar", "showErrorSnackbar"]),
    
    submit: function() {
      var _this = this;

      if (this.$refs.form.validate()) {
        //url, requireAuth, data, params, success, error, final
        restapi.post(
          _this.value.url,
          true,
          _this.value.item,
          null,
          response => {
            if (typeof _this.value.onSuccess === "function") {
              try {
                _this.value.onSuccess(response.data);
              } catch (e) {
                console.error(e);
              }
            }
            _this.showSuccessSnackbar({ text: "Zapisano" });
            _this.close();
          },
          error => {
            if (typeof _this.value.onError === "function") {
              try {
                _this.value.onError(error);
              } catch (e) {
                console.error(e);
              }
            }
            _this.showErrorSnackbar({ text: "Wystąpił błąd!" });
          },
          () => {}
        );
        console.log("valid");
      } else {
        console.log("invalid");
      }
    },
    close: function() {
      this.$refs.dialog.close();
    }
  }
};
</script>

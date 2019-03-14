<template>
  <vc-secure-info v-if="account.user"></vc-secure-info>
  <vc-public-info v-else></vc-public-info>
</template>
<script>
import { mapState, mapActions } from "vuex";

import VcPublicInfo from "./public/VcPublicInfo";
import VcSecureInfo from "./secure/VcSecureInfo";

export default {
  components: { VcPublicInfo, VcSecureInfo },
  computed: {
    ...mapState({
      account: state => state.account
    })
  }
};
</script>

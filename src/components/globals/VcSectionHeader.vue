<template>
  <v-card color="red lighten-4" class="elevation-2 mt-2 mb-3" :max-width="maxWidth">
    <v-card-text class="px-4">
      <section>
        <h2 class="title font-weight-regular ellipsis pb-1 mb-3" v-text="title"></h2>
        <slot></slot>
      </section>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["title", "max-width"]
};
</script>

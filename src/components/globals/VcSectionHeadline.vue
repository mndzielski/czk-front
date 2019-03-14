<template>
  <div>
    <h2 class="body-2 ellipsis secondary--text mb-1" v-text="title"></h2>
    <v-card color="red lighten-4" class="elevation-2 mt-2 mb-3">
      <v-card-text class="px-4">
        <section>
          <slot></slot>
        </section>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

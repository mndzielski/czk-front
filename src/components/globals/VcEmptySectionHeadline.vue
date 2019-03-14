<template>
  <div>
    <h2 class="body-2 ellipsis secondary--text mb-1" v-text="title"></h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

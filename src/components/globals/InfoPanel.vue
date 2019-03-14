<template>
  <v-layout class="my-3">
    <v-flex xs12 sm10 offset-sm1>
      <v-card color="red lighten-4">
        <v-img :src="img" height="200px">
        </v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline display-1">{{title}}</h3>
            <br/>
            <slot>
            </slot>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["title", "img"]
};
</script>

<template>
  <v-flex
    xs12
    class="my-2"
  >
    <v-card color="red lighten-4">
      <v-card-title>
        <v-flex xs12>
          <div class="my-2 title text-xs-center">
            <div>404 - strona nie istnieje</div>
            <div class="mt-3">
              <router-link to="/">Powrót na stronę główną</router-link>
            </div>
          </div>
        </v-flex>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {};
</script>

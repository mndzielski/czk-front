<template>
  <div>
    <vc-section-header title="Informacje o projekcie">
      <div>System Ostrzegania to rozwiązanie, mające na celu informowanie społeczeństwa o zagrożeniach,
        a także pełniące funkcję edukacyjną poprzez poradniki postępowania w sytuacjach kryzysowych.
      </div>
    </vc-section-header>

    <v-card
      color="red lighten-4"
      class="mx-auto my-2"
      to="/secure/announcements"
    >
      <v-card-text class="pt-4">
        <h3 class="display-1 font-weight-light mb-2">Komunikaty</h3>
        <div class="font-weight-light title mb-2">
          Zarządzanie kominikatami: dodawanie, edycja, usuwanie
        </div>
      </v-card-text>
    </v-card>
    <v-card
      color="red lighten-4"
      class="mx-auto my-2"
      to="/secure/categories"
    >
      <v-card-text class="pt-4">
        <h3 class="display-1 font-weight-light mb-2">Kategorie</h3>
        <div class="font-weight-light title mb-2">
          Zarządzanie kategoriami: dodawanie, edycja, usuwanie
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {};
</script>

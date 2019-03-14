<template>
  <div>
    <vc-section-header title="Informacje o projekcie">
      <div>System Ostrzegania to rozwiązanie, mające na celu informowanie społeczeństwa o zagrożeniach,
        a także pełniące funkcję edukacyjną poprzez poradniki postępowania w sytuacjach kryzysowych.
      </div>
    </vc-section-header>

    <vc-weather-info></vc-weather-info>

    <v-card
      color="red lighten-4"
      class="mx-auto my-2"
      to="/public/announcements"
    >
      <v-card-text class="pt-4">
        <h3 class="display-1 font-weight-light mb-2">Komunikaty</h3>
        <div class="font-weight-light title mb-2">
          Przeglądaj udostępnione komunikaty
        </div>
      </v-card-text>
    </v-card>
    <v-card
      color="red lighten-4"
      class="mx-auto my-2"
      to="/public/emergency-numbers"
    >
      <v-card-text class="pt-4">
        <h3 class="display-1 font-weight-light mb-2">Numery alarmowe</h3>
        <div class="font-weight-light title mb-2">
          Numery alarmowe do służb ratunkowych
        </div>
      </v-card-text>
    </v-card>
    <v-card
      color="red lighten-4"
      class="mx-auto my-2"
      to="/public/critical-infrastructure"
    >
      <v-card-text class="pt-4">
        <h3 class="display-1 font-weight-light mb-2">Infrastruktura krytyczna</h3>
        <div class="font-weight-light title mb-2">
          Ochrona infrastruktury krytycznej
        </div>
      </v-card-text>
    </v-card>
    <v-card
      color="red lighten-4"
      class="mx-auto my-2"
      to="/public/guides"
    >
      <v-card-text class="pt-4">
        <h3 class="display-1 font-weight-light mb-2">Poradniki</h3>
        <div class="font-weight-light title mb-2">
          Poradniki jak zachować się w sytuacjach zagrożenia
        </div>
      </v-card-text>
    </v-card>
    <v-card
      color="red lighten-4"
      class="mx-auto my-2"
      to="/public/settings"
    >
      <v-card-text class="pt-4">
        <h3 class="display-1 font-weight-light mb-2">Ustawienia</h3>
        <div class="font-weight-light title mb-2">
          Personalizacja wyszukiwań komunikatów
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import VcWeatherInfo from "components/VcWeatherInfo";

export default {
  components: { VcWeatherInfo },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>

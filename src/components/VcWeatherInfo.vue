<template>
  <v-flex xs12 class="my-2">
    <v-card color="red lighten-4">
      <v-card-title>
        <v-flex xs12>
          <div class="my-2 title text-xs-center">
            Sprawdź jakość powietrza w swoim mieście
          </div>
          <v-form ref="form" @submit.prevent=";" v-model="form.valid" lazy-validation>

            <v-text-field v-model="search" append-icon="search" solo label="Wyszukaj miasto..." type="text" @click:append="findWeather" @keyup.enter="findWeather"></v-text-field>
          </v-form>
        </v-flex>
        <div style="width: 100%;">
          <div v-if="!!result" class="layout align-center justify-center row fill-height" style="width: 100%;">
            <div class="">
              <img :src="imgSrc" />
            </div>
            <div class="display-2 font-weight-regular mr-4">
              {{ parseInt(result.main.temp) }}°C
            </div>
            <div>
              <div class="headline font-weight-light">{{ parseInt(result.main.pressure) }} hPa</div>
              <div class="text-uppercase font-weight-light">{{ result.weather[0].description }}</div>
            </div>
          </div>
          <div v-if="airQuality" class="text-xs-center" style="width: 100%;">
            Jakość powietrza: {{ airQuality }}
          </div>
        </div>
      </v-card-title>
    </v-card>
    <div class="text-xs-right">
      <small>Wspomagane przez <a href="https://openweathermap.org/" target="_blank">openweathermap.org</a> i <a href="https://airly.eu/pl/" target="_blank">airly.eu</a></small>
    </div>
  </v-flex>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  data: function() {
    return {
      search: null,
      result: null,
      airResult: null,
      form: {
        valid: false
      }
    };
  },
  methods: {
    ...mapActions("snackbar", ["showSuccessSnackbar", "showErrorSnackbar"]),
    findWeather: function() {
      if (this.$refs.form.validate()) {
        var _this = this;
        _this.result = null;
        _this.airResult = null;
        var params = {
          appid: "269582289cdfae32c9885ba732f5f51f",
          units: "metric",
          lang: "pl",
          q: this.search
        };

        axios
          .get("http://api.openweathermap.org/data/2.5/weather", {
            params: params
          })
          .then(function(response) {
            _this.result = response.data;

            var coord = response.data.coord;

            var airApiParams = {
              lat: coord.lat,
              lng: coord.lon,
              maxDistanceKM: -1
            };

            axios
              .get("https://airapi.airly.eu/v2/measurements/nearest", {
                params: airApiParams,
                headers: {
                  Accept: "application/json",
                  apikey: "1MjlVlgwzo0t0rA2d9iZiC0ijylJpwGp",
                  "Accept-Language": "pl"
                }
              })
              .then(function(response) {
                var val = response.data.current.indexes[0].value;
                _this.airResult = val === null ? -1 : val;
              })
              .catch(function() {
                console.log("error");

              });
          })
          .catch(function() {
            _this.showErrorSnackbar({text: "Nie znaleziono miasta."})
          });
      }
    }
  },
  computed: {
    imgSrc: function() {
      return this.result
        ? "http://openweathermap.org/img/w/" +
            this.result.weather[0].icon +
            ".png"
        : "";
    },
    airQuality: function() {
      var airResult = this.airResult;

      if (airResult === null) return null;

      if (airResult === -1) return "brak informacji";
      if (airResult <= 25) return "dobra";
      if (airResult <= 50) return "niska";
      if (airResult <= 75) return "zła";
      return "bardzo zła";
    }
  }
};
</script>

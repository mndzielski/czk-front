<template>
  <v-flex
    d-flex
    class="pa-0 mt-2"
  >
    <v-menu
      class="pr-1"
      :close-on-content-click="false"
      v-model="menuDropdown"
      lazy
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        :label="dateLabel"
        persistent-hint
        v-model="dateFormatted"
        :rules="[$rules.required, $rules.date]"
        @change="parseDate(dateFormatted)"
      ></v-text-field>
      <v-date-picker
        locale="pl-pl"
        v-model="date"
        no-title
        @input="menuDropdown = false"
      ></v-date-picker>
    </v-menu>

    <v-combobox
      class="v-list__tile__small"
      v-model="time"
      :items="items"
      :append-icon="null"
      :menu-props="{maxHeight:'200px'}"
      :label="timeLabel"
      :rules="[$rules.required, $rules.hour]"
    ></v-combobox>
  </v-flex>
</template>

<script>
export default {
  props: ["date-time", "dateLabel", "timeLabel"],
  data: function() {
    return {
      dateAndTime: "",
      date: "",
      dateFormatted: "",
      time: "",
      menuDropdown: false
    };
  },
  computed: {
    items: function() {
      var interval = 30;
      var times = [];
      var tt = 0;
      for (var i = 0; tt < 24 * 60; i++) {
        var hh = Math.floor(tt / 60);
        var mm = tt % 60;
        times[i] = ("0" + (hh % 24)).slice(-2) + ":" + ("0" + mm).slice(-2);
        tt = tt + interval;
      }
      return times;
    }
  },
  watch: {
    dateTime: function(val) {
      this.dateAndTime = val;
      var dateAndTime = this.$moment(this.dateAndTime, "YYYY-MM-DD HH:mm", true);
      if (dateAndTime.isValid()) {
        this.date = dateAndTime.format("YYYY-MM-DD");
        this.time = dateAndTime.format("HH:mm");
      } else {
        this.date = "";
        this.time = "";
      }
    },
    date: function(val) {
      this.dateFormatted = this.formatDate(this.date);
      this.dateAndTime = this.date + " " + this.time;
    },
    time: function(val) {
      this.dateAndTime = this.date + " " + this.time;
    },
    dateAndTime: function(val) {
      if (this.$moment(val, "YYYY-MM-DD HH:mm", true).isValid())
        this.$emit("date-time-change", val);
    }
  },
  methods: {
    formatDate: function formatDate(date) {
      if (!date) return null;

      var dateSplit = date.split("-");
      var year = dateSplit[0],
        month = dateSplit[1],
        day = dateSplit[2];

      return day + "." + month + "." + year;
    },
    parseDate: function parseDate(date) {
      if (!date) {
        this.date = "";
        return;
      }

      var dateSplit = date.split(".");
      var year = dateSplit[2],
        month = dateSplit[1],
        day = dateSplit[0];

      date = year + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");

      if (this.$moment(date, "YYYY-MM-DD", true).isValid()) {
        this.date = date;
      } else {
        this.dateFormatted = this.formatDate(this.date);
      }
    }
  }
};
</script>

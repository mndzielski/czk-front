<template>
  <div>
    <vc-section-header title="Komunikaty">
      <div>W tej sekcji zobaczysz komunikaty dla wybranych przez Ciebie województw. Możesz dostosować wyświetlaną
        treść zmieniając swoje
        <router-link to="/public/settings">ustawienia.</router-link>
      </div>
    </vc-section-header>

    <v-expansion-panel class="mb-3">
      <v-expansion-panel-content class="red lighten-4">
        <div slot="header">Filtr</div>
        <v-container
          grid-list-md
          pa-0
        >
          <v-layout
            row
            wrap
          >
            <v-flex xs12>
              <v-card class="red lighten-4">
                <v-card-text>
                  <div>Województwa</div>
                  <v-radio-group
                    class="mt-1"
                    v-model="iteratorDetails.params.provinces"
                  >
                    <v-radio
                      label="Wszystkie województwa"
                      :value="null"
                    ></v-radio>
                    <div v-if="checkedAdministrativeProvinces.length !== 0">
                      <v-radio
                        label="Moje województwa"
                        :value="checkedAdministrativeProvinces"
                      ></v-radio>
                      <v-divider class="mt-1 mb-2"></v-divider>
                      <v-radio
                        v-for="(item, index) in checkedAdministrativeProvinces"
                        :key="item"
                        :label="findProvince(item) | lowercase"
                        :value="[item]"
                      ></v-radio>
                    </div>
                  </v-radio-group>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-card class="red lighten-4">
                <div class="text-xs-right pa-2">
                  <v-btn @click="reset">Zastosuj</v-btn>
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <vc-empty-section-headline title="Komunikaty">
      <vc-data-iterator-viewer
        ref="vcDataIteratorViewer"
        v-model="iteratorDetails"
        :infoDialog="infoDialog"
      >

        <template
          slot="info-dialog-content"
          slot-scope="props"
        >

          <div class="v-table__overflow">
            <table
              class="v-table"
              v-if="props.item.type"
            >
              <tbody>
                <tr>
                  <td>Typ:</td>
                  <td><strong>{{ props.item.type.name }}</strong></td>
                </tr>
                <tr>
                <tr>
                  <td>Tytuł:</td>
                  <td><strong>{{ props.item.title }}</strong></td>
                </tr>
                <tr>
                  <td>Opis:</td>
                  <td><strong>{{ props.item.description }}</strong></td>
                </tr>
                <tr>
                  <td>Data od:</td>
                  <td><strong>{{ props.item.dateFrom }}</strong></td>
                </tr>
                <tr>
                  <td>Data do:</td>
                  <td><strong>{{ props.item.dateTo }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <template
          slot="item-title"
          slot-scope="props"
        >
          <v-icon
            class="mr-3"
            v-text="props.item.type.icon"
          >
          </v-icon>
          <div class="title ellipsis">{{ props.item.title }}</div>
        </template>

        <template
          slot="item-title-actions"
          slot-scope="props"
        >
          <v-btn
            @click="sendEmail(props.item)"
            flat
            icon
          >
            <v-icon title="Wyślij w wiadomości email">mail</v-icon>
          </v-btn>
          <v-btn
            @click="shareOnTwitter(props.item)"
            flat
            icon
          >
            <v-icon title="Podziel się na twitterze">mdi-twitter</v-icon>
          </v-btn>
        </template>

        <template
          slot="item-content"
          slot-scope="props"
        >
          <v-card-text class="px-3 pb-0">
            <div class="body-1 one-line-block-center mb-2">
              <v-icon class="mr-2">access_time</v-icon>
              <b>{{ countTimeInterval(props.item.dateFrom, props.item.dateTo)}}&nbsp;</b>
            </div>

            <div class="body-1 one-line-block-top">
              <v-icon class="mr-2">subject</v-icon>
              {{ props.item.description }}&nbsp;
            </div>
          </v-card-text>
          <v-card-actions class="px-3 grey--text">

            <div
              class="body-1 ellipsis"
              :title="$moment(props.item.created, 'YYYY-MM-DD HH:mm', true).format('DD.MM.YYYY HH:mm')"
            >
              {{ $moment(props.item.created, 'YYYY-MM-DD HH:mm', true).fromNow() }}
            </div>
            <span class="mx-1">&nbsp;•&nbsp;</span>
            <div class="body-1 ellipsis text-lowercase">{{ findProvince(props.item.province) }}</div>
            <span class="mx-1">&nbsp;•&nbsp;</span>
            <div class="body-1 ellipsis one-line-block-center">
              <v-icon
                class="mr-2"
                v-text="props.item.category.icon"
              ></v-icon>
              {{ props.item.category.name }}
            </div>
          </v-card-actions>
        </template>
      </vc-data-iterator-viewer>
    </vc-empty-section-headline>
  </div>
</template>

<script>
import { AdministrativeDivisions } from "assets/AdministrativeDivisions";
import { restapi } from "@/restapi/restapi";
import { mapState, mapActions } from "vuex";

var LocalStorageManager = {
  get: function(key, defaultValue) {
    var item = localStorage.getItem(key);
    var val = JSON.parse(item === undefined ? null : item);
    return val !== null ? val : defaultValue;
  },
  set: function(key, val) {
    if (val) localStorage.setItem(key, JSON.stringify(val));
  }
};

export default {
  data: function() {
    return {
      administrativeDivisions: AdministrativeDivisions.getAll(),
      categories: [],
      infoDialog: {
        title: "Szczegóły komunikatu",
        show: false,
        item: {}
      },
      iteratorDetails: {
        url: "/api/public/announcements/fetch",
        sortBy: "created,desc",
        params: {
          provinces: null,
          categories: null
        },
        getParams: function() {
          var params = this.params;
          var provinces = params.provinces ? params.provinces.join(", ") : null;
          var categories = params.categories
            ? params.categories.join(", ")
            : null;
          return {
            provinces: provinces,
            categories: categories
          };
        }
      },
      checkedAdministrativeProvinces: LocalStorageManager.get(
        "checkedProvinces",
        []
      )
    };
  },
  methods: {
    ...mapActions("snackbar", ["showSuccessSnackbar", "showErrorSnackbar"]),
    findProvince: function(province) {
      return province
        ? this.administrativeDivisions[province].NAME
        : "brak informacji";
    },
    findDistricts: function(province, districts) {
      let _districts = this.administrativeDivisions[province].DISTRICTS;
      if (!_districts) return;

      let arr = [];

      districts.forEach(value => {
        arr.push(_districts[value].NAME);
      });

      return arr;
    },
    findCategory: function(category) {
      console.log({ category: category });
      var c = this.categories.find(function(c) {
        return c.id === parseInt(category);
      });

      return c ? c.name : "";
    },
    countTimeInterval: function(_dateFrom, _dateTo) {
      var dateFrom = this.$moment(_dateFrom, "YYYY-MM-DD HH:mm", true);
      var dateTo = this.$moment(_dateTo, "YYYY-MM-DD HH:mm", true);

      var isActualYear =
        dateFrom.isSame(this.$moment(), "year") &&
        dateTo.isSame(this.$moment(), "year");

      if (dateFrom.isSame(dateTo, "day"))
        return (
          dateFrom.format(
            "D MMMM" + (isActualYear ? " " : " YYYY ") + "HH:mm"
          ) +
          " - " +
          dateTo.format("HH:mm")
        );

      if (dateFrom.isSame(dateTo, "year"))
        return (
          dateFrom.format(
            "D MMMM" + (isActualYear ? " " : " YYYY ") + "HH:mm"
          ) +
          " - " +
          dateTo.format("D MMMM" + (isActualYear ? " " : " YYYY ") + "HH:mm")
        );

      return (
        dateFrom.format("D MMMM YYYY HH:mm") +
        " - " +
        dateTo.format("D MMMM YYYY HH:mm")
      );
    },
    reset: function() {
      this.$refs.vcDataIteratorViewer.reset();
    },
    sendEmail: function(item) {
      var emailInMemory = localStorage.getItem("email");
      var email = prompt(
        "Wprowadź adres email na który wysłać wiadomość.",
        !!emailInMemory ? emailInMemory : ""
      );
      if (!email) return;
      var _this = this;
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!emailRegex.test(String(email).toLowerCase())) {
        _this.showErrorSnackbar({ text: "Zły format adresu email!" });
        return;
      }

      localStorage.setItem("email", email);
  
      let announcement = {
        title: item.title,
        description: item.description,
        category: item.category.name,
        type: item.type.name,
        province: this.findProvince(item.province),
        wholeProvince: item.wholeProvince,
        timeInterval: this.countTimeInterval(item.dateFrom, item.dateTo),
        districts: this.findDistricts(item.province, item.districts)
      };

      console.log(announcement);

      restapi.post(
        "/api/public/announcements/send-email",
        false,
        announcement,
        {
          email: email
        },
        response => {
          _this.showSuccessSnackbar({ text: "Wiadomość wysłana!" });
        },
        error => {
          _this.showErrorSnackbar({ text: "Nie udało się wysłać wiadomości!" });
        },
        () => {}
      );
    },
    shareOnTwitter: function(item) {
      var w = 600,
        h = 300;
      var dualScreenLeft =
        window.screenLeft !== undefined ? window.screenLeft : window.screenX;
      var dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : window.screenY;

      var width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width;
      var height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height;

      var left = width / 2 - w / 2 + dualScreenLeft;
      var top = height / 2 - h / 2 + dualScreenTop;
      var text = `${item.type.name}: ${
        item.title
      } - województwo ${this.findProvince(
        item.province
      )}\nOkres obowiązywania: ${this.countTimeInterval(
        item.dateFrom,
        item.dateTo
      )}\n${item.description}`;
      var newWindow = window.open(
        "https://twitter.com/intent/tweet?text=" +
          encodeURIComponent(text.substring(0, 270)),
        "Twitter",
        "scrollbars=yes, width=" +
          w +
          ", height=" +
          h +
          ", top=" +
          top +
          ", left=" +
          left
      );

      if (window.focus) {
        newWindow.focus();
      }
    }
  }
};
</script>

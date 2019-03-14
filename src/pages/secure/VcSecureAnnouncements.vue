<template>
  <div>
    <vc-section-header title="Zarządzanie komunikatami">
      <div>W tej sekcji możesz zarządzać komunikatami.</div>
    </vc-section-header>

    <vc-section-headline title="Komunikaty">

      <vc-data-management
        :infoDetails="infoDetails"
        :addDetails="addDetails"
        :editDetails="editDetails"
        :removeDetails="removeDetails"
        :iteratorDetails="iteratorDetails"
        :initialObject="initialObject"
        :onChangeItem="onChangeItem"
        :sortBy="sortBy"
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
          slot="modify-dialog-content"
          slot-scope="props"
        >
          <v-flex xs12>
            <v-text-field
              v-model="props.item.title"
              label="Tytuł"
              :rules="[$rules.required]"
              counter
              maxlength="250"
            ></v-text-field>
          </v-flex>
          <v-flex
            xs12
            sm6
          >
            <vc-date-time-picker
              :date-time="props.item.dateFrom"
              dateLabel="Data od"
              timeLabel="Godzina od"
              @date-time-change="props.item.dateFrom = $event"
            ></vc-date-time-picker>
          </v-flex>
          <v-flex
            xs12
            sm6
          >
            <vc-date-time-picker
              :date-time="props.item.dateTo"
              dateLabel="Data do"
              timeLabel="Godzina do"
              @date-time-change="props.item.dateTo = $event"
            ></vc-date-time-picker>
          </v-flex>
          <v-flex
            xs12
            sm6
          >
            <v-autocomplete
              v-model="props.item.type.id"
              item-text="name"
              item-value="id"
              :items="types"
              label="Typ"
              :rules="[$rules.required]"
            ></v-autocomplete>
          </v-flex>
          <v-flex
            xs12
            sm6
          >

            <v-autocomplete
              v-model="props.item.category.id"
              item-text="name"
              item-value="id"
              :items="categories"
              label="Kategoria"
              :rules="[$rules.required]"
            ></v-autocomplete>
          </v-flex>

          <v-flex
            xs12
            sm6
          >
            <v-autocomplete
              v-model="props.item.province"
              item-text="NAME"
              item-value="PROVINCE"
              :items="provinces"
              label="Województwo"
              :rules="[$rules.required]"
            ></v-autocomplete>
          </v-flex>
          <v-flex
            xs12
            sm6
          >
            <v-checkbox
              :disabled="!props.item.province"
              ref="wholeProvince"
              label="Całe województwo"
              v-model="props.item.wholeProvince"
              :rules="[$rules.requiredConditionalArray(props.item.districts)]"
              @change="resetValidation([$refs.wholeProvince, $refs.districts])"
            ></v-checkbox>
          </v-flex>
          <v-flex xs12>

            <v-autocomplete
              :disabled="!!props.item.wholeProvince || !props.item.province"
              ref="districts"
              item-text="NAME"
              item-value="DISTRICT"
              :items="districts(props.item.province)"
              v-model="props.item.districts"
              label="Powiaty"
              multiple
              persistent-hint
              :rules="[$rules.requiredArrayConditional(props.item.wholeProvince)]"
              @change="resetValidation([$refs.wholeProvince, $refs.districts])"
            ></v-autocomplete>

          </v-flex>
          <v-flex xs12>
            <v-textarea
              label="Opis"
              :rules="[$rules.required]"
              maxlength="1000"
              v-model="props.item.description"
              counter
            ></v-textarea>

          </v-flex>
        </template>
        <template
          slot="data-iterator-content"
          slot-scope="props"
        >
          <v-list-tile-avatar>
            <v-icon
              class="mr-3"
              v-text="props.item.type.icon"
            ></v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title class="subheading">
              <span>{{ findProvince(props.item.province) }}</span>: <b>{{ props.item.title }}</b> 
            </v-list-tile-title>
            <v-list-tile-sub-title>
              <span>{{ props.item.description }}</span>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
      </vc-data-management>
    </vc-section-headline>
  </div>
</template>
<script>
import { AdministrativeDivisions } from "assets/AdministrativeDivisions";
import { restapi } from "@/restapi/restapi";

export default {
  data: function() {
    return {
      types: [],
      categories: [],
      administrativeDivisions: AdministrativeDivisions.getAll(),
      provinces: AdministrativeDivisions.getNames(),
      iteratorDetails: {
        url: "/api/public/announcements/fetch"
      },
      infoDetails: {
        title: "Szczegóły komunikatu"
      },
      addDetails: {
        url: "/api/secure/announcements/save",
        title: "Dodaj komunikat"
      },
      editDetails: {
        url: "/api/secure/announcements/save",
        title: "Edytuj komunikat"
      },
      removeDetails: {
        url: "/api/secure/announcements/delete/",
        title: "Usuń komunikat"
      },
      initialObject: {
        id: null,
        type: { id: null },
        category: { id: null },
        wholeProvince: false,
        province: null,
        districts: [],
        title: null,
        description: null,
        guides: [],
        dateFrom: null,
        dateTo: null
      },
      sortBy: "created,desc"
    };
  },
  methods: {
    districts: function(v) {
      if (!v) return [];

      var data = this.administrativeDivisions[v].DISTRICTS;
      return Object.keys(data).map(function(value) {
        return {
          DISTRICT: value,
          NAME: data[value].NAME
        };
      });
    },
    findProvince: function(province) {
      return province
        ? this.administrativeDivisions[province].NAME
        : "brak informacji";
    },
    onChangeItem: function(newVal, oldVal) {
      if (!!oldVal.province && oldVal.province !== newVal.province) {
        console.log("clear province");
        if (newVal.districts) {
          while (newVal.districts.length > 0) {
            newVal.districts.pop();
          }
        }
      }
    },
    resetValidation(inputs) {
      setTimeout(() => {
        inputs.forEach(input => {
          input.validate();
        });
      }, 0);
    }
  },
  mounted() {
    var _this = this;
    restapi.get(
      "/api/secure/categories/find-all",
      true,
      {},
      response => {
        _this.categories = response.data;
      },
      error => {
        console.log(error);
      },
      () => {}
    );

    restapi.get(
      "/api/secure/types/find-all",
      true,
      {},
      response => {
        _this.types = response.data;
      },
      error => {
        console.log(error);
      },
      () => {}
    );
  }
};
</script>

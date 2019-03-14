<template>
  <div>
    <vc-section-header title="Zarządzanie kategoriami">
      <div>W tej sekcji możesz zarządzać kategoriami.</div>
    </vc-section-header>

    <vc-section-headline title="Kategorie">
      <vc-data-management
        :infoDetails="infoDetails"
        :addDetails="addDetails"
        :editDetails="editDetails"
        :removeDetails="removeDetails"
        :iteratorDetails="iteratorDetails"
      >
        <template
          slot="info-dialog-content"
          slot-scope="props"
        >
          <div class="v-table__overflow">
            <table
              class="v-table"
              v-if="props.item"
            >
              <tbody>
                <tr>
                  <td>Nazwa:</td>
                  <td><strong>{{ props.item.name }}</strong></td>
                </tr>
                <tr>
                <tr>
                  <td>Ikona:</td>
                  <td><strong>{{ props.item.icon }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
        <template
          slot="modify-dialog-content"
          slot-scope="props"
        >
          <v-flex
            xs12
            sm6
          >
            <v-text-field
              v-model="props.item.name"
              :rules="[$rules.required]"
              label="Nazwa"
            ></v-text-field>
          </v-flex>
          <v-flex
            xs12
            sm6
          >
            <v-text-field
              v-model="props.item.icon"
              label="Ikona"
              hint="ikona pojawi się po prawej stronie"
              :rules="[$rules.required]"
              persistent-hint
              required
              :append-outer-icon="props.item.icon"
            ></v-text-field>
          </v-flex>
        </template>
        <template
          slot="data-iterator-content"
          slot-scope="props"
        >
          <v-list-tile-content>
            <v-list-tile-title><b>Nazwa:</b> {{ props.item.name }}</v-list-tile-title>
            <v-list-tile-sub-title><b>Ikona:</b> {{ props.item.icon }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
      </vc-data-management>
    </vc-section-headline>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      iteratorDetails: {
        url: "/api/secure/categories/fetch"
      },
      infoDetails: {
        title: "Szczegóły kategorii"
      },
      addDetails: {
        url: "/api/secure/categories/save",
        title: "Dodaj kategorię"
      },
      editDetails: {
        url: "/api/secure/categories/save",
        title: "Edytuj kategorię"
      },
      removeDetails: {
        url: "/api/secure/categories/delete/",
        title: "Usuń kategorię"
      }
    };
  }
};
</script>

<template>
  <v-container
    class="pa-0"
    grid-list-md
  >
    <v-layout
      row
      wrap
    >
      <v-flex
        v-for="(guide, i) in guides"
        :key="i"
        xs12
        sm6
      >
        <v-card :to="guide.url">
          <v-img
            height="200px"
            :src="guide.img"
          ></v-img>
          <v-card-title>
            <div>
              <span>{{ guide.name }}</span><br>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>
<script>
import paths from "@/_helpers/paths";

export default {
  data() {
    return {
      guides: [
        {
          name: "Powodzie",
          img: "/static/threats/flood.jpg",
          url: paths.commonThreats.flood.url
        },
        {
          name: "Pożary",
          img: "/static/threats/fire.jpg",
          url: paths.commonThreats.fire.url
        },
        {
          name: "Wypadki drogowe",
          img: "/static/threats/traffic-collision.jpg",
          url: paths.commonThreats.trafficCollision.url
        }
      ]
    };
  },
  mounted() {
      console.log(this.guides);
  }
};
</script>

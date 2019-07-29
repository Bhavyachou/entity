<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Entity</span>
        <span class="font-weight-light">Onboard Utility</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    
    <router-view />
    
  </v-app>
</template>

<script>

import EntityOnboard from "@/components/EntityOnboard";
export default {
  name: "App",
  components: {
    EntityOnboard
  },
  data() {
    return {
      //
    };
  }
};
</script>

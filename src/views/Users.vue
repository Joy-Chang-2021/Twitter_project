<template>
    <div class="app-tripple-column">
    <div class="left-container">
      <NavBar />
    </div>
    <div class="middle-container">
      <router-view />
    </div>
    <div class="right-container">
      <Popular />
    </div>
  </div>
</template>

<script>
import NavBar from "./../components/NavBar";
import Popular from "./../components/Popular";

export default {
  components: {
    NavBar,
    Popular,
  },
}
</script>

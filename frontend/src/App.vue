<template>
  <div class="wrap">
    <header>
      <p>Will's Perpetual Camera Roll</p>
    </header>
    <Transition mode="out-in">
      <router-view v-if="status == 'loading'" />
      <loading-view v-else />
    </Transition>
  </div>
</template>

<script>
import LoadingView from "@/views/LoadingView";
export default {
  components: {
    LoadingView,
  },
  computed: {
    status() {
      return this.$store.state.topLevelStatus;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/interdisplay/inter-display.css";

body,
html {
  margin: 0px;
  box-sizing: border-box;
  font-family: "InterDisplay";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background-color: #151518;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
}

header {
  position: sticky;
  z-index: 99999;
  top: 0px;
  background-color: #15151850;
  backdrop-filter: saturate(180%) blur(20px);
  padding: 1em;
  p {
    margin: 0px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease-in-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="wrap">
    <header>
      <p>Will's Perpetual Camera Roll</p>
    </header>
    <router-view v-if="status !== 'loading'" />
    <div id="loading-wrap" v-else>
      <p>Loading</p>
      <p>While you wait, check out my Twitter</p>
      <TwitterTimeline
        url="willpakpoy?ref_src=twsrc%5Etfw"
        height="500"
        width="380"
        lang="en"
        theme="dark"
        doNotTrack
      ></TwitterTimeline>
    </div>
  </div>
</template>

<script>
import TwitterTimeline from "vue-twitter-timeline";

export default {
  components: {
    TwitterTimeline,
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

#loading-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

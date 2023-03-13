<template>
  <div id="loading-wrap">
    <p>Loading...</p>
    <img src="@/assets/747.svg" />
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
#loading-wrap {
  z-index: 2;
  position: fixed;
  top: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

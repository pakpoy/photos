<template>
  <div class="photo-detail-outer">Hello</div>
</template>

<script>
export default {
  props: {
    showPhotoDetail: Boolean,
    showing: String,
  },
  emits: ["update:firstName", "update:lastName"],
};
</script>

<style lang="scss">
.photo-detail-outer {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 11;
  top: 0px;
  background-color: #0e0e0ed0;
}
</style>

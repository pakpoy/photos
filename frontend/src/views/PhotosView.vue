<template>
  <div class="photo-groups">
    <photo-group
      v-for="photoGroup of photosGrouped"
      :key="photoGroup"
      :id="`photoGroup-${photoGroup[0].datePhotographedGrouping}`"
      :photoGroup="photoGroup"
    />
  </div>
</template>

<script>
import PhotoGroup from "@/components/PhotoGroup";
import _ from "lodash";

export default {
  components: { PhotoGroup },
  computed: {
    photos() {
      return this.$store.state.photos;
    },
    photosGrouped() {
      const photos = _(this.$store.state.photos)
        .groupBy((item) => item.datePhotographedGrouping)
        .value();
      console.log(typeof photos);
      return photos;
    },
  },
};
</script>

<style lang="scss">
h1 {
  text-align: left;
  padding: 0 1em;
}
.photos-group {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-flow: dense;
  gap: 1em;
  padding: 1em;

  div.photo-render {
    aspect-ratio: 1 / 1;
    background-size: cover;
    background-position: center;
    border-radius: 4px;
    transition: 0.2s ease-in-out;
    border: 2px solid #151518;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    p {
      opacity: 0;
      margin: 0px;
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0) 100%
      );
      width: 100%;
      text-align: left;
      padding: 1em;
    }
    &:hover {
      transform: scale(1.01);
      transition: 0.2s ease-in-out;
      border: 2px solid #fff;
      p {
        opacity: 1;
        transition: opacity 0.3s;
      }
    }
  }
}
</style>

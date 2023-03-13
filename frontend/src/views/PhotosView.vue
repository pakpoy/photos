<template>
  <div class="photo-groups">
    <div
      class="photo-group-outer"
      v-for="photoGroup of photosGrouped"
      :key="photoGroup"
      :id="`photoGroup-${photoGroup[0].datePhotographedGrouping}`"
    >
      <h1>{{ dateToDate(photoGroup[0].datePhotographedLocalTZ) }}</h1>
      <div class="photos-group">
        <photo-render-background-div
          v-for="photo of photoGroup"
          :key="photo._id"
          class="photo"
          :imageUrl="`/api/photos/${photo._id}/thumb.webp`"
          :style="span()"
          ><p>
            {{ photographedDaysAgo(photo.exif["DateTimeOriginal"]) }}
          </p></photo-render-background-div
        >
      </div>
    </div>
  </div>
</template>

<script>
import PhotoRenderBackgroundDiv from "@/components/PhotoRenderBackgroundDiv";
import moment from "moment";
import _ from "lodash";

export default {
  components: { PhotoRenderBackgroundDiv },
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
  methods: {
    span() {
      const random = Math.floor(Math.random() * (3 - 1 + 1) + 1);
      if (random == 1) {
        return null;
      } else if (random == 2) {
        return `grid-column: span 2; grid-row: span 2`;
      } else if (random == 3) {
        return `grid-column: span 3; grid-row: span 3`;
      }
    },
    photographedDaysAgo(date) {
      var b = date.split(/\D/);
      const timestamp = new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);
      return moment(timestamp).fromNow();
    },
    dateToDate(date) {
      return moment(date).format("LL");
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

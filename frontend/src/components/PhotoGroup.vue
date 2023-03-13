<template>
  <div>
    <h1>{{ dateToDate(photoGroup[0].datePhotographedLocalTZ) }}</h1>
    <div class="photos-group">
      <photo-render-background-div
        v-for="photo of photoGroup"
        :key="photo._id"
        class="photo"
        :imageUrl="`/api/photos/${photo._id}/thumb.webp`"
        :style="span()"
        @click="showPhotoDetail = true"
        v-once
        ><p>
          {{ photographedDaysAgo(photo.exif["DateTimeOriginal"]) }}
        </p></photo-render-background-div
      >
      <Teleport to="#photo-detail">
        <Transition>
          <photo-detail
            v-if="showPhotoDetail"
            v-model:show-photo-detail="showPhotoDetail"
            v-model:showing="showing"
          />
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import PhotoRenderBackgroundDiv from "@/components/PhotoRenderBackgroundDiv";
import PhotoDetail from "@/components/PhotoDetail";

export default {
  props: { photoGroup: Object },
  components: {
    PhotoRenderBackgroundDiv,
    PhotoDetail,
  },
  data: function () {
    return {
      showPhotoDetail: false,
      showing: null,
    };
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

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.25s ease-in-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

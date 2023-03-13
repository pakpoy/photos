<template>
  <div
    class="photo-render"
    :style="`background-image: url('${image}')`"
    ref="image"
  >
    <slot />
  </div>
</template>

<script>
import axios from "axios";

function _arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export default {
  props: {
    imageUrl: String,
  },
  data: function () {
    return {
      loaded: false,
      image: "",
      observer: null,
    };
  },
  methods: {
    async render() {
      const image = await axios({
        responseType: "arraybuffer",
        url: this.imageUrl,
        method: "GET",
        headers: { Authorization: "Bearer " + this.$store.state.token },
      });
      this.image = `data:${
        image.headers["content-type"]
      };base64,${_arrayBufferToBase64(image.data)}`;
    },
    intersectionChange(entry) {
      entry.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) {
          return;
        }
        this.observer.unobserve(target);
        this.render().then(() => {
          console.log("rendered");
        });
      });
    },
  },
  created() {
    this.observer = new IntersectionObserver(this.intersectionChange, {
      root: this.$refs.image,
      rootMargin: "600px",
      threshold: 0.01,
    });
  },
  mounted() {
    this.observer.observe(this.$refs.image);
  },
};
</script>

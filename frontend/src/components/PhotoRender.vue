<template>
  <img :src="image" />
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
    };
  },
  async mounted() {
    const image = await axios({
      responseType: "arraybuffer",
      url: this.imageUrl,
      method: "GET",
      headers: { Authorization: "Bearer " + this.$store.state.token },
    });
    this.image = `data:image/webp;base64,${_arrayBufferToBase64(image.data)}`;
  },
};
</script>

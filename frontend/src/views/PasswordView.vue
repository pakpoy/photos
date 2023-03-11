<template>
  <div class="password">
    <p>please enter password</p>
    <input type="password" v-model="password" @keyup.enter="submitPassword()" />
    <p>best viewed on a computer</p>
  </div>
</template>

<script>
export default {
  computed: {
    password: {
      get() {
        return this.$store.state.password;
      },
      set(to) {
        this.$store.commit("setPassword", to);
      },
    },
  },
  methods: {
    submitPassword() {
      this.$store.dispatch("setToken", this.password);
    },
  },
};
</script>

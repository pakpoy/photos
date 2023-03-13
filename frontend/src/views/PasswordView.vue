<template>
  <div class="password-wrap">
    <div class="password">
      <h1>Will's Perpetual<br />Camera Roll</h1>
      <input
        type="password"
        v-model="password"
        @keyup.enter="submitPassword()"
        placeholder="password"
      />
      <p>best viewed on a computer</p>
    </div>
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

<style lang="scss">
.password-wrap {
  display: flex;
  justify-content: center;
  margin-top: 17.5%;
  .password {
    h1 {
      margin: 0;
      padding: 0;
      margin-bottom: 0.6em;
      font-weight: 500;
      line-height: 0.89em;
    }
    input {
      width: 100%;
      background-color: transparent;
      border: 1px solid #dddddd50;
      padding: 1.1em;
      border-radius: 0.8em;
      color: #ffffff;
    }
    text-align: left;
    background-color: #ffffff10;
    padding: 2em;
    border-radius: 1em;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
      0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
      0 16px 16px rgba(0, 0, 0, 0.12);
  }
}
</style>

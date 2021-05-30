<template>
  <div class="home">
    <b-card style="max-width: 20rem" class="mx-auto mt-5">
      <img alt="Vue logo" src="../assets/logo.png" />
      <b-form-input
        v-model="email"
        class="mb-2"
        type="email"
        placeholder="Enter email"
        required
      ></b-form-input>

      <b-form-input
        v-model="password"
        class="mb-2"
        type="password"
        aria-describedby="password-help-block"
        placeholder="Password"
      ></b-form-input>

      <b-button @click="login()" variant="primary">Log In</b-button>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
          computed: {
    email: {
      get() {
        return this.$store.state.email
      },

      set(value) {
        this.$store.commit('updateEmail', value)
      } 
    },
    password: {
      get() {
        return this.$store.state.password
      },

      set(value) {
        this.$store.commit('updatePassword', value)
      } 
    }
  },
    methods: {
    ...mapActions(["login"]),
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <b-navbar toggleable type="dark" variant="dark" class="mb-3">
    <div class="container">
      <b-navbar-brand href="#">Otto Klaus</b-navbar-brand>
      <router-link :to="{name: 'Inventario'}" class="nav-link">Inventario</router-link>
      <router-link :to="{name: 'AgregarProducto'}" class="nav-link">Agregar producto</router-link>

      <b-nav-item class="ml-auto" @click="logout">Log out</b-nav-item>
    </div>
  </b-navbar>
</template>

<script>
import Firebase from "firebase"

export default {
  name: "Navbar",
  methods: {
    logout() {
      Firebase.auth()
        .signOut()
        .then((accept) => {
          console.log(accept);
          this.$router.push("login");
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

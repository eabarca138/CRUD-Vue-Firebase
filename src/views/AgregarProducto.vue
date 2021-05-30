<template>
  <div>
    <Navbar />

    <form class="mt-5 pt-3 container border ">
      <legend>Agregar Productos</legend>

      <label>Código</label>
      <input type="text" class="form-control mt-3" v-model="juguete.codigo" />
      <label>Nombre</label>
      <input type="text" class="form-control mt-3" v-model="juguete.nombre" />
      <label>Stock</label>
      <input type="text" class="form-control mt-3" v-model.number="juguete.stock" />
      <label>Precio</label>
      <input type="text" class="form-control mt-3" v-model.number="juguete.precio" />

      <button type="button" class="btn btn-primary my-3" @click="addProd">
        Agregar Producto
      </button>
    </form>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

import { mapActions } from "vuex";

export default {
  name: "agregarProducto",
  components: { Navbar },

  data() {
    return {
      juguete: {
        codigo: "",
        nombre: "",
        stock: 0,
        precio: 0
      }
    }
  },

  methods: {
    ...mapActions(["agregarProducto"]),
    addProd() {
      const juguete = this.juguete;
      if (!juguete.codigo || !juguete.nombre || !juguete.stock || !juguete.precio) return alert('Completa todos los campos');

      this.agregarProducto(juguete);
      alert('Producto agregado')
    },
  },
};
</script>

<style lang="scss" scoped></style>

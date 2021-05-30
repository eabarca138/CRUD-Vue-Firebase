<template>
  <div class="home">
    <Navbar />

    <b-container class="mb-5">
      <b-table striped hover :items="juguetes" :fields="fields">
        <template #cell(actions)="row">
          <b-button size="sm" @click="editar(row.item)" class="my-1 me-4" variant="primary" >Actualizar</b-button>

          <b-button size="sm" @click="borrar(row.item)" variant="danger">Eliminar</b-button>
        </template>
      </b-table>

    <button disabled @click="cargaI" class="btn btn-primary">carga Inicial</button>
    </b-container>


    <Actualizar />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Actualizar from "../components/Actualizar.vue";

export default {
  name: "Inventario",
  components: { Navbar, Actualizar },
  data() {
    return {
      ...mapState(["juguetes"]),
      fields: [
        {
          label: "Código",
          key: "codigo",
        },
        {
          label: "Juguete",
          key: "nombre",
        },
        {
          label: "Stock",
          key: "stock",
        },
        {
          label: "Precio",
          key: "precio",
        },
        {
          key: "actions",
          label: "Actualizar/Eliminar",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["borrarProducto", "cargaInicialDB"]),
    cargaI() {
      this.cargaInicialDB();
    },

    borrar(juguete) {
      this.borrarProducto(juguete);
    },
    ...mapMutations(["booleanEditar", "editarJuguete"]),

    editar(juguete) {
      this.booleanEditar();
      this.editarJuguete(juguete);
    },
  },
};
</script>

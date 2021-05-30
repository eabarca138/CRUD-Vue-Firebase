import Vue from "vue";
import Vuex from "vuex";
import router from '@/router'
import firebase from "firebase"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: "",
    password: "",
    juguetes: [
      /*       {
        codigo: "A0001",
        nombre: "Figura Cuphead",
        stock: 100,
        precio: 9990
      },
      {
        codigo: "A0002",
        nombre: "Figura Max Steel",
        stock: 50,
        precio: 8990
      },
      {
        codigo: "A0003",
        nombre: "Auto Hot Wheels",
        stock: 1000,
        precio: 1190
      },
      {
        codigo: "A0004",
        nombre: "Cartas españolas",
        stock: 200,
        precio: 990
      },
      {
        codigo: "A0005",
        nombre: "Cartas inglesas",
        stock: 200,
        precio: 1490
      },
      {
        codigo: "A0006",
        nombre: "Furby",
        stock: 500,
        precio: 39990
      }, */
    ],
    editar: false,
    jugueteEditar: {
      nombre: "",
      precio: "",
      codigo: "",
      id: "",
      stock: "",
    },
  },
  mutations: {
    updateEmail(state, email) {
      state.email = email;
    },
    updatePassword(state, password) {
      state.password = password;
    },

    guardarProductos(state, payload) {
      const juguete = payload;
      if (!juguete) return;
      state.juguetes.push(juguete);
    },
    booleanEditar(state) {
      state.editar = true;
    },
    editarJuguete(state, payload) {
      const juguete = payload;
      state.jugueteEditar = juguete;
    },

    borrarJuguete(state, payload) {
      const juguete = payload;
      if (!juguete) return;
      const index = state.juguetes.indexOf(juguete);
      const index2 = state.juguetes.indexOf(index);
      console.log(index2);
      state.juguetes.splice(index, 1);
    },

    agregarJuguete(state, payload) {
      const juguete = payload;
      if (!juguete) return;
      state.juguetes.push(juguete);
    },
  },
  actions: {
    login({ state }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(state.email, state.password)
        .then((userCredential) => {
          console.log(userCredential);
          router.push("inventario");
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    cargaInicialDB({ state }) {
      state.juguetes.forEach(async (juguete) => {
        try {
          let db = firebase.firestore();
          await db.collection("juguetes").add(juguete);
        } catch (error) {
          console.log(error);
        }
      });
    },

    async getJuguetes({ commit }) {
      const db = firebase.firestore();
      try {
        const req = await db.collection("juguetes").get();
        if (req) {
          req.docs.forEach((juguete) => {
            const obj = juguete.data();
            const id = juguete.id;
            obj.id = id;
            commit("guardarProductos", obj);
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async borrarProducto({ commit }, payload) {
      const juguete = payload;
      if (!juguete) return;
      const idFirebase = juguete.id;

      // Eliminar desde Firebase
      try {
        const db = firebase.firestore();
        const req = await db.collection("juguetes").doc(idFirebase).delete();
        console.log(req);
      } catch (error) {
        console.log(error);
      }

      // Eliminar desde Vuex
      commit("borrarJuguete", juguete);
    },

    async agregarProducto({ commit }, payload) {
      const juguete = payload;
      if (!juguete) return;

      // Agregar Firebase
      try {
        let db = firebase.firestore();
        await db.collection("juguetes").add(juguete);
      } catch (error) {
        console.log(error);
      }

      //Agregar a Vuex
      commit("agregarJuguete", juguete);
    },

    async updateProducto({ commit }, payload) {
      const juguete = payload;
      if (!juguete) return;
      const idFirebase = juguete.id;
      
      // Actualizar Firebase
      try {
        const req = await firebase
          .firestore()
          .collection("juguetes")
          .doc(idFirebase)
          .update({
            stock: juguete.stock,
            nombre: juguete.nombre,
            precio: juguete.precio
          });
        console.log(req);
      } catch (error) {
        console.log(error);
      }
      // Actualizar Vuex
      commit("editarJuguete");
    },
  },
  modules: {},
});


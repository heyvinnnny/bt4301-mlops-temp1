<template>
  <div class="login-card">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>
  
<script>
import firebase from "@/uifire.js";
import db from "@/main.js";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDocs, getFirestore, collection } from "firebase/firestore";

//https://softauthor.com/firebase-vuejs-role-based-authentication-authorization/

// export default {
//   data() {
//     return {
//       email: '',
//       password: '',
//       access: ''
//     }
//   },
//   methods: {
//     async login() {
//       try {
//         const db = getFirestore(firebase);
//         const querySnapshot = await getDocs(collection(db, 'login'));
//         querySnapshot.forEach((doc) => {
//           if (doc.data().email === this.email && doc.data().password === this.password) {
//             this.access = doc.data().access;
//           }
//         });
//         if (this.access === 'Admin') {
//           this.$router.push('/dashboard')
//         } else if (this.access === 'Executive') {
//           this.$router.push('/dashboard')
//         } else {
//           this.$router.push('/dashboard')
//         }
//       } catch (error) {
//         this.$toast.error(error.message);
//       }
//     }
//   }
// }


// This method keeps having timeout, cannot connect to Firebase. Need to evaluate
// export default {
//   data() {
//     return {
//       email: '',
//       password: '',
//       error: null
//     }
//   },
//   methods: {
//     async login() {
//       try {
//         const auth = getAuth();
//         const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
//         const user = userCredential.user;
//         const db = getFirestore();
//         const userData = await getDoc(doc(db, 'users', user.uid));
//         const access = userData.get('access')
//         // Redirect the user to the appropriate dashboard based on their access level
//         if (access === 'Admin') {
//           this.$router.push('/dashboard')
//         } else if (access === 'Executive') {
//           this.$router.push('/dashboard')
//         } else {
//           this.$router.push('/dashboard')
//         }
//       } catch (error) {
//         this.$toast.error(error.message);
//       }
//     }
//   }
// }

//authentication only version without any access controls
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        this.$emit('authenticated')
        this.$toast.success("Welcome to DataPower");
        this.$router.push('/dashboard')
      } catch (error) {
        this.$toast.error(error.message);
      }
    }
  }
}
  </script>
  
  <style scoped>
  .login-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button[type="submit"] {
  display: block;
  background-color: #3490dc;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  width: 100%;
}

.error-message {
  color: red;
  margin-top: 10px;
}
  </style>
  
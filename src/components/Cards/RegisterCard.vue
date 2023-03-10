<template>
    <div class="register-form">
      <form @submit.prevent="register">
        <div>
          <label>Name</label>
          <input v-model="name" type="text" required />
        </div>
        <div>
          <label>Email</label>
          <input v-model="email" type="email" required />
        </div>
        <div>
          <label>Password</label>
          <input v-model="password" type="password" required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input v-model="confirmPassword" type="password" required />
        </div>
        <div>
          <label>Role</label>
          <select v-model="access" required>
            <option value="admin">Admin</option>
            <option value="executive">Executive</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import "firebase/compat/auth";
import "firebaseui/dist/firebaseui.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDocs, addDoc, getFirestore, collection } from "firebase/firestore";
  

//able to input user details into firebase but there is some issues with validation (e.g. no message prompt)
export default {
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const access = ref('')

    const register = async () => {
      if (password.value !== confirmPassword.value) {
        alert('Passwords do not match')
        return
      }

      try {
        const auth = getAuth();
        const db = getFirestore();
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
        const user = userCredential.user

        //adding info works well (for authentication only)
        await addDoc(collection(db, 'users'), {
          name: name.value,
          email: email.value,
          password: password.value,
          access: access.value,
          uid: user.uid
        })
        //this.$toast.success("You have registered successfully!");

        //this is not working
        this.$router.push('/dashboard')
        alert('Registration successful!')
        
      } catch (error) {
        // error do prompt though
        //this.$toast.error(error.message);
        alert('Registration failed. Please try again.')
      }
    }

    return { name, email, password, confirmPassword, access, register }
  }
}
</script>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.register-form input {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  background-color: #f3f3f3;
  font-size: 16px;
  width: 300px;
}

.register-form button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #0080ff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  width: 300px;
  transition: all 0.3s ease;
}

.register-form button:hover {
  background-color: #0066cc;
}

.register-form .error-message {
  color: red;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
}
</style>
  
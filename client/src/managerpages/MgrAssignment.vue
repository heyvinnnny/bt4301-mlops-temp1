<template>
    <div>
      <h1>Manager Assign Page</h1>
      <form @submit.prevent="submitForm">
        <label for="deployment">Deployment:</label>
        <select v-model="selectedDeployment" id="deployment" required>
          <option v-for="deployment in deployments" :key="deployment._id" :value="deployment._id">
            {{ deployment.deploymentName }}
          </option>
        </select>
  
        <label for="users">Users:</label>
        <select v-model="selectedUsers" id="users" multiple required>
          <option v-for="user in users" :key="user._id" :value="user._id">
            {{ user.name }}
          </option>
        </select>
  
        <button type="submit">Assign</button>
      </form>
      <br>
      <div v-show="isSuccess" class="success-message">You have successfully assigned the deployment to the user.</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
        deployments: [],
        selectedDeployment: null,
        selectedUsers: [],
        isSuccess: false
      };
    },
    async created() {
      try {
        const userResponse = await fetch('http://localhost:3000/users?access=User&status=Approved');
        const deploymentResponse = await fetch('http://localhost:3000/deployments');
        this.users = await userResponse.json();
        this.deployments = await deploymentResponse.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    methods: {
      async submitForm() {
        try {
          const response = await fetch('http://localhost:3000/mgrassignment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              deployment: this.selectedDeployment,
              users: this.selectedUsers,
            }),
          });
  
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
  
          this.isSuccess = true;

          // Redirect or show success message
          console.log('Successfully assigned deployment');
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      },
    },
  };
  </script>


<style scoped>
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    margin: 0 auto;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
  }

  label {
    font-weight: bold;
    margin-bottom: 10px;
  }

  select {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  select:focus {
    outline: none;
    border-color: #007bff;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0056b3;
  }

  button:focus {
    outline: none;
  }


  .success-message {
  background-color: green;
  color: #ffffff;
  font-size: 1.2rem;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  animation: slide-down 0.3s ease-out;
}

@keyframes slide-down {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>

  
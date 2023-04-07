<template>
    <div class="manager-approval">
      <h1>Approval Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Access</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.access }}</td>
            <td>{{ user.status }}</td>
            <td>
              <button style="margin-right:10px;" @click="approveUser(user._id)" v-if="user.status === 'Pending'">Approve</button>
              <button @click="rejectUser(user._id)" v-if="user.status === 'Pending'">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
   
<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    try {
        const token = localStorage.getItem('token');  

    // Include the token in the Authorization header
        const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const res = await axios.get('http://localhost:3000/users/pending', config);
    this.users = res.data;
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    async approveUser(userId) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.put(`http://localhost:3000/users/approval/${userId}`, { status: 'Approved' }, config);
        this.updateUserStatus(userId, 'Approved');
      } catch (err) {
        console.error(err);
      }
    },
    async rejectUser(userId) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.put(`http://localhost:3000/users/approval/${userId}`, { status: 'Rejected' }, config);
        this.updateUserStatus(userId, 'Rejected');
      } catch (err) {
        console.error(err);
      }
    },
    updateUserStatus(userId, newStatus) {
      const userIndex = this.users.findIndex(user => user._id === userId);
      if (userIndex !== -1) {
        this.users[userIndex].status = newStatus;
      }
    },
  },
};
</script>

<style scoped>
.manager-approval {
  margin: 50px auto;
  max-width: 900px;
}

h1 {
  color: #5C5E60;
  font-size: 36px;
  margin-bottom: 30px;
  text-align:center;
  font-weight:800;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  color: #5C5E60;
  font-weight: bold;
  text-transform: uppercase;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

button {
  background-color: #5C5E60;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 12px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
}

button:hover {
  background-color: #44464a;
}

button:active {
  transform: translateY(1px);
}

</style>
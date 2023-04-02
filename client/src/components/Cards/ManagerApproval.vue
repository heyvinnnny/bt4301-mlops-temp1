<template>
    <div class="manager-approval">
      <h1>Manager Approval Dashboard</h1>
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
              <button @click="approveUser(user._id)" v-if="user.status === 'Pending'">Approve</button>
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
width: 100%;
max-width: 960px;
margin: 0 auto;
padding: 2rem;
}

table {
width: 100%;
border-collapse: collapse;
margin-bottom: 2rem;
}

th,
td {
border: 1px solid #ccc;
padding: 0.5rem;
text-align: left;
}

th {
background-color: #f2f2f2;
font-weight: bold;
}
</style>
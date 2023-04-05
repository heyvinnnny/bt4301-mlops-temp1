<template>
  <div class="row">
      <MgrUserCard></MgrUserCard>
  </div>
</template>

<script>
import EditProfileForm from "./UserProfile/EditProfileForm.vue";
import MgrUserCard from "./UserProfile/MgrUserCard.vue";
import MembersCard from "./UserProfile/MembersCard.vue";
export default {
    components: {
      EditProfileForm,
      MgrUserCard,
      MembersCard,
  },
};
</script>

<style></style>

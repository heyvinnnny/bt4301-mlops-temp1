<template>
  <div >
    <div class="col-md-6 col-xl-12">
      <card :title="table.title">
        <div class="log-entry">
          <div class="main-info">
            <p>Deployment Created</p>
            <p>{{ createDate }}</p>
            <p>{{ creatorEmail }}</p>
          </div>

          <div class="main-info">
            <p>Applied</p>
            <p>{{ appliedDate }}</p>
            <p>{{ appliedByEmail }}</p>
          </div>

          <p>Indication of new deployment was created.</p>

          <button @click="toggleDetails">
            {{ showMore ? "Show more details" : "Show less details" }}
          </button>

          <div v-if="!showMore" class="extended-info">
            <div class="updated-request">
              <h4>Updated requested</h4>
              <p>Reviewed by {{ reviewerEmail }} on {{ reviewDate }}</p>
              <p>Comments</p>
            </div>

            <div class="approval-request">
              <h4>Approval Requested</h4>
              <p>Changes: Telling user that new deployment was created</p>
              <p>Changed by {{ changedByEmail }} on {{ changedDate }}</p>
            </div>

            <div class="reviewers">
              <h4>Reviewers</h4>
              <p>{{ reviewerName }}</p>
            </div>
          </div>
        </div>
    </card>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      table: {
          title: "Governance",
      },
      showMore: true,
      createDate: "2022-10-01",
      creatorEmail: "creator@example.com",
      appliedDate: "2022-10-02",
      appliedByEmail: "applied@example.com",
      reviewerEmail: "reviewer@example.com",
      reviewDate: "2022-10-03",
      changedByEmail: "changer@example.com",
      changedDate: "2022-10-04",
      reviewerName: "John Doe",
    };
  },
  methods: {
    toggleDetails() {
      this.showMore = !this.showMore;
    },
  },
};
</script>

<style scoped>
.activity-log {
  width: 150%;
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.log-entry {
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}

.main-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.extended-info {
  margin-top: 15px;
}
</style>
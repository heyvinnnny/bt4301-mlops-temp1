<template>
<div id="profile-description">
            <div class="text show-more-height">
                Some random text 
                <br /><br />
                At Cobalt we help people and businesses throughout the world realize their full potential. <br />
                We make this simple mission come to life every day through our passion to create technologies <br><br>and develop products that touch just about every kind of customer.
            </div>
            <div class="show-more">(Show More)</div>
</div><!-- [End] #profile-description -->
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      showMore: false,
      showMoreText: '(Show More)'
    }
  },
  methods: {
    toggleShowMore() {
      this.showMore = !this.showMore;
      this.showMoreText = this.showMore ? '(Show Less)' : '(Show More)';
    }
  },
  mounted() {
    $('.show-more').click(() => {
      this.toggleShowMore();
    });
  }
}
</script>


<style scoped>
#profile-description {
  max-width: 400px; 
  margin-top: 50px; 
  position:relative;
}
#profile-description .text {
/*   width: 660px;  */
  margin-bottom: 5px; 
  color: #777; 
  padding: 0 15px; 
  position:relative; 
  font-family: Arial; 
  font-size: 14px; 
  display: block;
}
#profile-description .show-more {
/*   width: 690px;  */
  color: #777; 
  position:relative; 
  font-size: 12px; 
  padding-top: 5px; 
  height: 20px; 
  text-align: center; 
  background: #f1f1f1; 
  cursor: pointer;
}
#profile-description .show-more:hover { 
    color: #1779dd;
}
#profile-description .show-more-height { 
  height: 65px; 
  overflow:hidden; 
}

</style>
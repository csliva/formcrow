<template>

  <div id="formcrow">
    <div class="formcrow__window">
      <div v-bind:class="{ active: view_toggle }" class="formcrow__slide">
        <label>{{query}}</label>
        <input v-on:keyup.13="submitQuery" type="text" v-model="query_input" />
        <button type="button" v-on:click="submitQuery">Next</button>
      </div>
      <div v-bind:class="{ active: !view_toggle }" class="formcrow__slide">
        <label>What's the best way to reach out?</label>
        <toggle-button
          v-model="contact_toggle"
          :value="true"
          :labels="{checked: 'Phone', unchecked: 'Email'}"
          :color="{checked: '#00FF00', unchecked: '#FF0000'}"
        />
        <input v-on:keyup.13="submitFormCrow" type="text" v-model="contact_input" />
        <button v-on:click="submitFormCrow" type="button">Submit</button>
      </div>
    </div>
  </div>

</template>

<script>
window.onbeforeunload = function() {
  console.log("leaving")
  return;
}
export default {
  props: {
    query: { type: String, default: "How can we help you best?" },
    prime_color: {type: String, default: "#ababab"}
  },
  data: function(){
    return {
      query_input: "",
      ip: "",
      contact_input: "",
      contact_toggle: true,
      view_toggle: true
    }
  },
  created: function(){
    let that = this;
    window.fetch('https://api.ipify.org', {
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
      }).then(function(response) {
        response.text().then(function(iptext){ that.ip = iptext })
      }).catch(function(err) {
        // Error :(
        console.log(err)
      });
  },
  methods: {
    submitQuery(){
      this.view_toggle = !this.view_toggle
    },
    submitFormCrow(){
      let that = this
      fetch('http://localhost:3000/submissions', {
        method: 'post',
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({submission: that.query_input, contact: that.contact_input})
      }).then(res=>res.json())
      .then(res => console.log(res));
    }
  },
}
</script>

<style lang="scss" scoped>
   @import '../sass/main.sass'
</style>

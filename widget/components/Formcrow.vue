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
        <input type="text" />
        <button type="button">Submit</button>
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
      //false = email, true = phone
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
  },
}
</script>

<style scoped>
  #formcrow a {
    display: inline-block;
    border: 1px solid #ddd;
    padding: 10px 20px;
    margin-right: 10px;
    text-transform: uppercase;
    color: #999;
    text-decoration: none;
  }
  #formcrow a:hover {
    color: #333;
    border-color: #888;
  }
  .formcrow__window{
    width: 500px;
    display: block;
    overflow: hidden;
  }
  .formcrow__slide{
    width: 500px;
    display: block;
    overflow: hidden;
    transform: translate(50vw, 0px);
    transition: transform .5s ease-out;
  }
  .active{
    transform: translate(0px, 0px);
    transition: all .5s ease-out;
  }
</style>

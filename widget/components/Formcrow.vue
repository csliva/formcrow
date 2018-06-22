<template>
  <div id="formcrow" class="formcrow"  v-bind:style="{'--prime-color': prime_color}">
    <div v-bind:class="{ 'formcrow__window--start': view_state == 1,
        'formcrow__window--active': view_state == 2,
        'formcrow__window--complete': view_state == 3 } ">
      <div class="formcrow__slide">
        <label class="formcrow__label">{{query}}</label>
        <input v-on:keyup.13="submitQuery" type="text" v-model="query_input" />
        <button class="formcrow__next" type="button" v-on:click="submitQuery">&rarr;</button>
      </div>
      <div class="formcrow__slide">
        <label class="formcrow__label">What's the best way to reach out?</label>
        <toggle-button
          v-model="contact_toggle"
          :value="true"
          :labels="{checked: 'Phone', unchecked: 'Email'}"
          :color="{checked: '#00FF00', unchecked: '#FF0000'}"
          :width='100'
          :height='25'
        />
        <input v-on:keyup.13="submitFormCrow" type="text" v-model="contact_input" />
        <span>{{contact_input | filter_phone }}</span>
        <span>{{contact_input | filter_email }}</span>
        <button v-on:click="submitFormCrow" type="button">Submit</button>
      </div>
      <div class="formcrow__slide">
        <p>Thank you for your submission!</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    query: { type: String, default: "How can we help you best?" },
    prime_color: {type: String, default: "#fafafa"},
    uid: {type: String}
  },
  data: function(){
    return {
      query_input: "",
      ip: "",
      contact_input: "",
      contact_toggle: true,
      view_state: 1
    }
  },
  created: function(){
    //get IP Address
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
      //If form has been started without submission, submit before closing the page
      window.onbeforeunload = function() {
        if(that.query_input){
          that.submitFormCrow();
        }
        return;
      }
  },
  filters: {
    filter_phone: function (phone) {
      if (!phone) return '';
      return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(phone);
    },
    filter_email: function (email){
      if(!email) return '';
      return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
    }
  },
  methods: {
    submitQuery(){
      this.view_state = this.view_state + 1
    },
    submitFormCrow(){
      let that = this
      fetch('http://localhost:3000/lead', {
        method: 'post',
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({submission: that.query_input, contact: that.contact_input, ip: that.ip})
      }).then(res=>res.json())
      .then(res => {
        this.view_state = this.view_state + 1;
        that.query_input = "";
        that.contact_input = "";
      });
    }
  },
}
</script>

<style lang="css" scoped>
.formcrow {
  width: 100%;
  background-color: white;
  padding: 24px;
  font-size: 24px;
}
.formcrow__label{
  width: 100%;
  display: block;
}
.formcrow input{
  width: 100%;
  font-size: 16px;
  line-height: 18px;
  padding: 4px;
  margin: 16px 0;
}
.formcrow__next{
  border: 0;
  background-color: var(--prime-color);
  border-radius: 100%;
  width: 32px;
  height: 32px;
  color: white;
}
.formcrow__next:focus{
  outline: none;
  filter: opacity(80%);
}
</style>

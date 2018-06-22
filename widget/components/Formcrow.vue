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
          :labels="{checked: 'Phone', unchecked: 'Email'}"
          :color="{checked: '#00FF00', unchecked: '#FF0000'}"
          :sync="true"
          :width='100'
          :height='25'
        />
        <input v-on:keyup.13="submitFormCrow" type="text" v-model="contact_input" />
        <button class="formcrow__submit" v-on:click="submitFormCrow" type="button">Submit</button>
        <span>{{ testContact }}</span>
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
      filled: false,
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
  computed: {
    testContact: function(){
      if (!this.contact_input) {return ''}
      if ((/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(this.contact_input)){
        this.contact_toggle = true
        this.filled = true
        return '✓'
      };
      if ((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.contact_input)){
        this.contact_toggle = false
        this.filled = true
        return '✓'
      };
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
  width: calc(100% - 70px);
  font-size: 16px;
  line-height: 18px;
  padding: 4px;
  margin: 16px 0;
}
.formcrow__next, .formcrow__submit{
  border: 0;
  background-color: var(--prime-color);
  width: 60px;
  height: 30px;
  color: white;
  vertical-align: middle;
  transform: translateX(-8px);
}
.formcrow__next:hover, .formcrow__submit:hover{
  filter: opacity(85%);
}
.formcrow__next:focus, .formcrow__submit:focus{
  outline: none;
  filter: opacity(70%);
}
.formcrow input:focus{
  outline: none;
  filter: drop-shadow(2px 4px 3px #eaeaea);
}
</style>

<template>
  <div id="formcrow" class="formcrow"  v-bind:style="{'--prime-color': prime_color, '--text-color': this.colors[3]}">
    <transition name="fade" mode="out-in">
      <div v-if="view_state==1" :key="1" class="formcrow__slide">
        <label class="formcrow__label">{{query}}</label>
        <input v-on:keyup.13="submitQuery" type="text" v-model="query_input" />
        <button class="formcrow__next" type="button" v-on:click="submitQuery">&rarr;</button>
      </div>
      <div v-if="view_state==2" :key="2" class="formcrow__slide">
        <label class="formcrow__label">Give us an email or number to reach you!</label>
        <toggle-button id="formcrow__toggle"
          v-model="contact_toggle"
          :labels="{checked: 'Phone', unchecked: 'Email'}"
          :color="{checked: this.colors[1], unchecked: this.colors[2]}"
          :sync="true"
          :width='100'
          :height='25'
        />
        <input type="checkbox" class="formcrow__honey" v-model="honey">
        <input v-on:keyup.13="submitFormCrow" type="text" v-model="contact_input" />
        <button class="formcrow__submit" v-on:click="submitFormCrow" type="button">Submit</button>
      </div>
      <div v-if="view_state==3" :key="3" class="formcrow__slide">
        <p>Thank you! We'll be in touch!</p>
      </div>
    </transition>
    <span class="formcrow__error">{{error}}</span>
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
      contact_toggle: false,
      view_state: 1,
      colors: this.setColors(this.prime_color),
      error: "",
      valid: false,
      honey: false
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
  watch: {
    contact_input: function(){
      if (!this.contact_input) {this.valid = false}
      if ((/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(this.contact_input)){
          this.contact_toggle = true
          this.valid = true
          this.error = ""
        };
      if ((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.contact_input)){
          this.contact_toggle = false
          this.valid = true
          this.error = ""
        };
    }
  },
  methods: {
    submitQuery(){
      if(this.query_input.length >= 5){
        this.error = ""
        this.view_state = this.view_state + 1
        //include ajax submission 
      }
      else {
        this.error = "We'd love a little more input. Could you write a few more words?"
      }
    },
    submitFormCrow(){
      this.contactValidation
      if(this.valid){
      let that = this
      fetch('http://localhost:3000/lead', {
        method: 'post',
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({submission: that.query_input, contact: that.contact_input, ip: that.ip, formId: that.uid})
      }).then(res=>res.json())
      .then(res => {
        this.view_state = this.view_state + 1;
        that.query_input = "";
        that.contact_input = "";
      });
    } else { this.error = "Woops, it looks like you need a valid email or phone number"}
    },
    setColors: function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);
    var l2 = Math.abs(100 % l+20)
    var l3 = Math.abs(100 % l+40)
  //  var l4 = Math.abs(100 % l+60)
  //  var s4 = Math.abs(100 % s+40)
  var c4;
  if(l <= 50){ c4 = 'hsl(0,0%,100%)';}
  if(l > 50){ c4 = 'hsl(0,0%,0%)';}

    var c1= 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    var c2= 'hsl(' + h + ', ' + s + '%, ' + l2 + '%)';
    var c3= 'hsl(' + h + ', ' + s + '%, ' + l3 + '%)';
    //var c4= 'hsl(' + h + ', ' + s4 + '%, ' + l4 + '%)';
    return [c1, c2, c3, c4]
    },
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
.formcrow__error{color: red; opacity: 0.7; font-size: 12px; line-height: 12px;}
.formcrow__next, .formcrow__submit{
  border: 0;
  background-color: var(--prime-color);
  width: 60px;
  height: 30px;
  vertical-align: middle;
  transform: translateX(-8px);
}
.formcrow__next, .formcrow__submit, #formcrow__toggle >>> .v-switch-label{
  color: var(--text-color);
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
.fade-enter-active, .fade-leave-active {
    transition: all .5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: translateX(-10px);
}
.formcrow__honey {
  position: absolute;
  left: -10000px;
}
</style>

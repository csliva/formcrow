import Vue from 'vue'

//polyfill
import 'document-register-element/build/document-register-element'

// include vue-custom-element plugin to Vue
import VueCustomElement from 'vue-custom-element'
Vue.use(VueCustomElement)

import VueColor from 'vue-color'
Vue.use(VueColor)

// import and register your component(s)
import CreateForm from './components/CreateForm'
Vue.customElement('create-form', CreateForm)

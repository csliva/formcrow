import Vue from 'vue'

//polyfill
import 'document-register-element/build/document-register-element'

// include vue-custom-element plugin to Vue
import VueCustomElement from 'vue-custom-element'
Vue.use(VueCustomElement)

import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)

// import and register your component(s)
import FormCrow from './components/FormCrow'
Vue.customElement('form-crow', FormCrow)

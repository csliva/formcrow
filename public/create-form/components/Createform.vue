<template>

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
      filled: false,
      view_state: 1,
      colors: this.setColors(this.prime_color)
    }
  },
  computed: {
    testContact: function(){
    }
  },
  methods: {
    submitQuery(){
      this.view_state = this.view_state + 1
    },
  },
}
</script>

<style lang="css" scoped>

</style>

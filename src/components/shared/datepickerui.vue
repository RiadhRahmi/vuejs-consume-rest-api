<template>
  <input @input="$emit('update-date', $event.target.value)">
</template>

<script>
  // import $ from 'jquery'
  // import 'jquery-ui/ui/widgets/datepicker.js'
  // import 'jquery-ui'

  export default {
    props: ['dateFormat']
    ,
    mounted: function () {
      let self = this;
      $(this.$el).datepicker({
        dateFormat: this.dateFormat,
        onSelect: function (date) {
          self.$emit('update-date', date);
        },
        on: ('')
      });
    },
    beforeDestroy: function () {
      $(this.$el).datepicker('hide').datepicker('destroy');
    }
  }
</script>

<style scoped>

</style>

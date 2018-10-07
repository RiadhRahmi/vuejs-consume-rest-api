import Vue from 'vue'

Vue.filter('prefix', function (value, prefix1, prefix2) {
  if (!value) return ''
  value = value.toString()
  return prefix1 + ' ' + prefix2 + ' ' + value;
})

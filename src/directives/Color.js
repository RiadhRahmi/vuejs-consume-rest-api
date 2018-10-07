import Vue from 'vue'

Vue.directive('mycolor', {
  bind(el, binding, vnode) {

    if (binding.arg == 'color') {
      el.style.color = binding.value.toString();
    }
    else {
      el.style.color = 'red';
    }
  }
});

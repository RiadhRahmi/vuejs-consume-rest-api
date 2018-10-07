export default {
  bind: function (el, binding, vnode, oldVnode) {
    $(el).datepicker({
      onSelect: function (date) {
        vnode.context.article.published_at = date;
      }
    });
  },
  update: function (el, binding, vnode, oldVnode) {
    $(el).datepicker('setDate', binding.value);
  },
  unbind: function (el) {
    $(el).datepicker('destory');
  }
}

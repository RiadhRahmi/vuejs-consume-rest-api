import * as moment from 'moment';
import 'bootstrap-daterangepicker';

export default {
  bind: function (el, binding, vnode, oldVnode) {

    $(el).daterangepicker({
      onSelect: function (date) {
        vnode.context.searchArticle.published_at = date;
      },
      alwaysShowCalendars: true,
      format: 'M/dd/yyyy',
      separator: ' to ',
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'),
          moment().subtract(1, 'month').endOf('month')]
      }
    });
  }
}


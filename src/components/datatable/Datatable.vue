<template>
  <div class="col-xs-12 table-responsive">
    <code>query: {{ query }}</code>
    <datatable v-bind="$data"/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Datatable from 'vue2-datatable-component'

  Vue.use(Datatable);
  import mockData from '../../_mockData/index';

  export default {

    data() {
      return {
        columns: [
          {title: 'User ID', field: 'uid', sortable: true},
          {title: 'Username', field: 'name', sortable: true},
          {title: 'Age', field: 'age', sortable: true},
          {title: 'Email', field: 'email', sortable: true},
          {title: 'Country', field: 'country', sortable: true}
        ],
        data: [],
        total: 0,
        query: {}
      }
    },
    watch: {
      query: {
        handler(query) {
          mockData(query).then(({rows, total}) => {
            this.data = rows
            this.total = total
          })
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>

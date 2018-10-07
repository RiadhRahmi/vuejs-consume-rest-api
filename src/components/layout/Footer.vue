<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <span class="text-muted">@{{ app_name }}, Place sticky footer content here.</span>
        </div>
      </div>
    </div>
  </footer>
</template>


<script>
  import EventBus from '../../event-bus/event-bus';

  export default {
    data() {
      return {
        app_name: ''
      }
    },
    created() {
      EventBus.$on('i-got-clicked', data => {
        this.app_name = data;
      });
    }
  }

</script>



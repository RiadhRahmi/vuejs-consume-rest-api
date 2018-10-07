<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="pb-2 mt-4 mb-2 border-bottom">
          <h1>
            {{ pagetitle }}
          </h1>
        </div>
      </div>
    </div>

    <div class="row" v-show="showAlert">
      <div class="col-12">
        <b-alert show dismissible :variant="colorAlert">
          {{ messageAlert }}
        </b-alert>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <form @submit.prevent="editArticle">
          <div class="form-group">
            <label for="title">Title</label>
            <input v-model.lazy="article.title" type="text" class="form-control"
                   id="title" placeholder="Enter title">
          </div>

          <div class="form-group">
            <label for="author">Author</label>
            <input v-model.lazy="article.author" type="text" class="form-control" id="author"
                   placeholder="Enter author">
          </div>

          <div class="form-group">
            <label for="published_at">Published at </label>
            <input type="text" autocomplete="off"
                   class="form-control" id="published_at"
                   placeholder="Enter date published"
                   v-datepicker='article.published_at'
                   v-model="article.published_at">
          </div>


          <div class="form-group">
            <label for="body">Description</label>
            <textarea v-model.lazy="article.body" class="form-control"
                      id="body" rows="5" placeholder="Enter description"></textarea>
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
  import datepicker from '../../directives/datepicker'
  import ArticleService from '../../services/articleService'

  export default {
    directives: {
      datepicker
    },
    data() {
      return {
        pagetitle: 'Edit Article',
        showAlert: false,
        colorAlert: 'success',
        messageAlert: '',
        article: {
          title: '',
          author: '',
          published_at: '',
          body: '',
        },
      }
    },
    methods: {
      editArticle() {
        let article = {
          title: this.article.title,
          author: this.article.author,
          published_at: this.article.published_at,
          body: this.article.body,
        };
        ArticleService.update(this.article.id, article).then(response => {
          if (response.status == 200) {
            this.$router.push('/articles');
          } else {
            this.showAlert = true;
            this.colorAlert = 'danger';
            this.messageAlert = "failed operation";
          }
        }, error => {
          this.showAlert = true;
          this.colorAlert = 'danger';
          this.messageAlert = 'failed operation' + error.toString();
        });
      },
      getArticle() {
        let id = this.$route.params.id;
        ArticleService.getByID(id).then(response => {
          if (response.status == 200) {
            this.showAlert = false;
            this.article = response.data;
          } else {
            this.showAlert = true;
            this.colorAlert = 'danger';
            this.messageAlert = response.data;
          }

        }, error => {
          this.showAlert = true;
          this.colorAlert = 'danger';
          this.messageAlert = 'failed operation' + error.toString();
        });
      }
    },
    mounted() {
      this.getArticle();
    }
  }
</script>

<style scoped>

</style>

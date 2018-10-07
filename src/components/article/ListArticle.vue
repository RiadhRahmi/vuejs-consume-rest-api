<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="pb-2 mt-4 mb-2 border-bottom">
          <h1>
            {{ pagetitle }}
            <router-link to="/articles/add" tag="button" class="btn btn-primary float-right">
              <i class="fas fa-plus"></i> Nouveau Article
            </router-link>
          </h1>
        </div>
      </div>
    </div>

    <div class="row" v-if="showAlert">
      <div class="col-12">
        <b-alert show dismissible :variant="colorAlert">
          {{ messageAlert }}
        </b-alert>
      </div>
    </div>

    <div class="row filter-search">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Recherche
            <i v-b-toggle="'collapseSearch'" class="fas search-icon fa-angle-down float-right"
               aria-controls="collapseExample"></i>
          </div>
          <b-collapse id="collapseSearch">
            <div class="card-body">
              <form>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    {{ searchArticle.published_at }}
                    <input type="text" autocomplete="off" name="published_at"
                           class="form-control" placeholder="Published at"
                           v-model="searchArticle.published_at"
                           v-daterangerpicker="searchArticle.published_at">
                  </div>
                  <div class="form-group col-md-4">
                    <input type="text" name="title" autocomplete="on" class="form-control"
                           placeholder="Title" v-model.lazy="searchArticle.title">
                  </div>
                  <div class="form-group col-md-4">
                    <input type="text" name="author" autocomplete="on"
                           class="form-control" placeholder="Author"
                           v-model.lazy="searchArticle.author">
                  </div>
                </div>
                <div class="row d-flex justify-content-end">
                  <div class="form-group  col-sm-12 col-md-2">
                    <button class="btn btn-secondary btn-block" @click.prevent="recherche">
                      <i class="fas fa-search"></i>&nbsp;&nbsp;Recherche
                    </button>
                  </div>
                  <div class="form-group   col-sm-12 col-md-2">
                    <button class="btn btn-secondary btn-block" @click.prevent="resetForm">
                      <i class="fas fa-redo-alt"></i>&nbsp;&nbsp;Reset
                    </button>
                  </div>
                  <div class="form-group col-sm-12 col-md-2">
                    <button class="btn btn-secondary btn-block" @click.prevent="exportArticles">
                      <i class="fas fa-file-excel"></i>&nbsp;&nbsp;Export
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </b-collapse>
        </div>
      </div>
    </div>

    <div v-if="articles">

      <div class="row">
        <div class="col-12 mt-3 mb-3">
          <b>Total : {{articles['total']}} articles </b>
        </div>
      </div>
      <div class="row" v-if="!articles['total']">
        <div class="col-12 text-center">
          <b> Empty Page </b>
        </div>
      </div>

      <div class="row">
        <div class="col-4" v-for="article in articles['data'] ">
          <div class="card">
            <img class="card-img-top" v-bind:src="article.image" v-bind:alt="article.title">
            <div class="card-body">
              <h5 class="card-title">{{ article.title}}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Author: {{ article.author}}</h6>
              <p class="card-text">
                <small class="text-muted">
                  Published at: {{ article.published_at}}
                </small>
              </p>
              <button type="button" class="btn btn-primary btn-sm mr-1" @click="showArticle(article.id)">
                <i class="fas fa-search"></i>
              </button>
              <router-link :to="'/articles/'+ article.id +'/edit'" tag="button" v-if="isRole('admin')"
                           class="btn btn-success btn-sm mr-1">
                <i class="far fa-edit"></i>
              </router-link>
              <button type="button" class="btn btn-danger btn-sm mr-1" v-if="isRole('admin')"
                      @click="openModal(article.id)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5" v-if="articles['total'] > articles['per_page']">
        <div class="col-12">
          <b-pagination align="center" :total-rows="articles['total']"
                        v-model="currentPage" :per-page="articles['per_page']"
                        :hide-goto-end-buttons="true"
                        :hide-ellipsis="true">
          </b-pagination>

        </div>
      </div>

    </div>

    <!--modal-->
    <b-modal ref="modalDeleteArticleRef"
             title="Confirmation Delete Article"
             @ok="deleteArticle" ok-variant="danger" cancel-variant="primary"
             ok-title="OK" cancel-title="Close">
      <p>Are you sure you want to delete article N° {{ idArticle }}</p>
    </b-modal>


  </div>
</template>

<script>
  import {exportAsExcelFile} from "../../shared/excel";
  import daterangerpicker from "../../directives/daterangerpicker";
  import {AuthService} from "../../services/authService";
  import ArticleService from "../../services/articleService";

  export default {
    directives: {
      daterangerpicker
    },
    data() {
      return {
        pagetitle: 'List Articles',
        showAlert: false,
        colorAlert: 'success',
        messageAlert: '',
        articles: [],
        currentPage: 1,
        idArticle: '',
        searchArticle: {
          published_at: '',
          title: '',
          author: ''
        }
      }
    },
    methods: {
      showArticle(id) {
        this.$router.push('/articles/' + id + '/show');
      },
      showModal() {
        this.$refs.modalDeleteArticleRef.show();
      },
      hideModal() {
        this.$refs.modalDeleteArticleRef.hide();
      },
      openModal(id) {
        this.idArticle = id;
        this.showModal();
      },
      getArticles(nbrePage) {

        ArticleService.get(nbrePage).then(response => {
            this.articles = response.data;
          }, error => {
            this.showAlert = true;
            this.colorAlert = 'danger';
            this.messageAlert = 'failed operation' + error.toString();
          });
      },
      deleteArticle() {
        this.hideModal();
        ArticleService.delete(this.idArticle).then(response => {
            if (response.status == 200) {
              this.getArticles(this.currentPage);
              this.showAlert = true;
              this.colorAlert = 'success';
              this.messageAlert = "operation with success";
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
      recherche() {
        // delete this.searchArticle.export;
        ArticleService.recherche(this.searchArticle).then(response => {
          if (response.status == 200) {
            this.articles = response.data;
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
      resetForm() {
        this.searchArticle.title = '';
        this.searchArticle.published_at = '';
        this.searchArticle.author = '';
        this.recherche();
      },
      exportArticles() {
        this.searchArticle.export = true;
        ArticleService.export(this.searchArticle).then(response => {
          if (response.status == 200) {
            exportAsExcelFile(response.data, 'articles');
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
      isRole: function (val) {
        return new AuthService().isRole(val);
      }
    },
    created() {
      this.getArticles(1);
    },
    watch: {
      currentPage: function (val) {
        this.getArticles(val);
      }
    }


  }
</script>

<style scoped>

</style>

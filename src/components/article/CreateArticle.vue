<template>
  <div>

    <div class="row">
      <div class="col-12">
        <div class="pb-2 mt-4 mb-2 border-bottom">
          <h1 v-mycolor:color="'green'">
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
        <form>
          <div class="form-group">
            <label for="title"> {{ $t("title") }}</label>
            <input v-model="article.title" type="text"
                   :class="[$v.article.title.$dirty ? ($v.article.title.$invalid ? ' is-invalid ' :  ' is-valid ') : ' ' , 'form-control' ]"
                   @input="$v.article.title.$touch()" id="title" placeholder="Enter title">
            <div v-if="$v.article.title.$invalid" :class="$v.article.title.$invalid ? 'invalid-feedback' : ''">
              <span v-if="!$v.article.title.required"> title is required </span>
              <span v-if="!$v.article.title.minLength">
                min Length of title is {{ $v.article.title.$params.minLength.min }} letters
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="author">{{ $t("author") }}</label>
            <input v-model="article.author" type="text"
                   :class="[$v.article.author.$dirty ?
                    ($v.article.author.$invalid ? ' is-invalid ' :  ' is-valid ') : ' ' , 'form-control' ]"
                   @input="$v.article.author.$touch()"
                   id="author" placeholder="Enter author">
            <div v-if="$v.article.author.$invalid" :class="$v.article.author.$invalid ?
             'invalid-feedback' : ''">
              <span v-if="!$v.article.author.required"> author is required </span>
            </div>
          </div>

          <div class="form-group">
            <label for="published_at">{{ $t("published_at") }}</label>
            <app-datepickerui v-model="article.published_at" type="text" id="published_at"
                              :class="[$v.article.published_at.$dirty ? ($v.article.published_at.$invalid ?
                               ' is-invalid ' :  ' is-valid ') : ' ' , 'form-control' ]"
                              placeholder="Enter date published" autocomplete="off" @update-date="updateDate"
                              date-format="dd/mm/yy"></app-datepickerui>

            <div v-if="$v.article.published_at.$invalid"
                 :class="$v.article.published_at.$invalid ? 'invalid-feedback' : ''">
              <span v-if="!$v.article.published_at.required"> published at is required </span>
            </div>
          </div>

          <div class="form-group">
            <label for="image">{{ $t("image") }}</label>
            <input type="file" id="image" @change="onFileChanged($event)"
                   :class="[$v.article.image.$dirty ? ($v.article.image.$invalid ? ' is-invalid ' :
                    ' is-valid ') : ' ' , 'form-control-file ' ]"
                   @input="$v.article.image.$touch()">
            <div v-if="$v.article.image.$invalid" :class="$v.article.image.$invalid ? 'invalid-feedback' : ''">
              <span v-if="!$v.article.image.required"> image is required </span>
            </div>
          </div>

          <div class="form-group">
            <label for="body">{{ $t("description") }}</label>
            <textarea v-model="article.body" id="body" rows="5"
                      :class="[$v.article.body.$dirty ? ($v.article.body.$invalid ? ' is-invalid ' :
                       ' is-valid ') : ' ' , 'form-control' ]"
                      @input="$v.article.body.$touch()"
                      placeholder="Enter description"></textarea>
            <div v-if="$v.article.body.$invalid" :class="$v.article.body.$invalid ? 'invalid-feedback' : ''">
              <span v-if="!$v.article.body.required"> body is required </span>
              <span v-if="!$v.article.body.minLength">
                min Length of body is {{ $v.article.body.$params.minLength.min }} letters
              </span>
            </div>
          </div>
          <button type="submit" :disabled="$v.$invalid" class="btn btn-primary"
                  @click.prevent="createArticle">
            {{ $t("submit") }}
          </button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
  import Vuelidate from 'vuelidate'
  import Vue from 'vue'

  Vue.use(Vuelidate);
  // import $ from 'jquery'
  // import 'jquery-ui/ui/widgets/datepicker.js';
  // import $ from 'jquery'
  import Datepickerui from '../shared/datepickerui.vue'
  import {required, minLength} from 'vuelidate/lib/validators'
  import ArticleService from '../../services/articleService'

  export default {
    components: {
      appDatepickerui: Datepickerui
    },
    data() {
      return {
        pagetitle: 'Add Article',
        showAlert: false,
        colorAlert: 'success',
        messageAlert: '',
        article: {
          title: '',
          author: '',
          published_at: '',
          image: null,
          body: '',
        },
      }
    },
    validations: {
      article: {
        title: {
          required,
          minLength: minLength(3)
        },
        body: {
          required,
          minLength: minLength(10)
        },
        author: {
          required,
        },
        published_at: {
          required,
        },
        image: {
          required,
        },
      }
    },
    methods: {
      updateDate: function (date) {
        this.article.published_at = date;
        this.$v.article.published_at.$touch();
      },
      onFileChanged(event) {
        this.article.image = event.target.files[0];
      },
      createArticle() {
        let article = new FormData();
        article.append('title', this.article.title);
        article.append('author', this.article.author);
        article.append('published_at', this.article.published_at);
        article.append('image', this.article.image);
        article.append('body', this.article.body);

        ArticleService.post(article).then(response => {
          if (response.status == 201) {
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
      }

    },
    mounted() {
      // let vm = this;
      // $(this.$el).find(".datepicker").css('border', 'solid 1px red');
      // $(this.$el).find(".datepicker").datepicker({
      //   onSelect: function (date) {
      //     vm.article.published_at = date;
      //   }
      // });
    }
  }
</script>

<style scoped>

</style>

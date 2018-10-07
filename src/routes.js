import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);


const ifNotAuthenticated = (to, from, next) => {
  const roles = ['admin', 'editor'];
  let role = null;
  if (to.matched.some(record => record.meta.role)) {
    to.matched.some(record => {
      role = record.meta.role;
    });
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    if (role) {
      if (roles[currentUser.role] === role) {
        return next();
      }
      return next('/page403');
    } else {
      return next();
    }
  }
  return next('/login');
}

const ifAuthenticated = (to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    return next('/');
  }
  return next();
}


const routes = [
  {
    path: '', component: view('layout/Dashboard'), name: 'home',
    meta: {
      breadcrumb: 'Home'
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/axios', component: view('users/AxiosListUser'), name: 'axiosListUser',
    meta: {
      breadcrumb: {
        label: 'Axios',
        parent: 'home'
      }
    },
    beforeEnter: ifNotAuthenticated,
  }, {
    path: '/vuex', component: view('vuex/Parent'), name: 'parent',
    meta: {
      breadcrumb: {
        label: 'Parent',
        parent: 'home'
      }
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/datatable', component: view('datatable/Datatable'), name: 'datatable',
    meta: {
      breadcrumb: {
        label: 'Datatable',
        parent: 'home'
      }
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/vue-datatable', component: view('datatable/VueDataTable'), name: 'vue-datatable',
    meta: {
      breadcrumb: {
        label: 'vueDataTable',
        parent: 'home'
      }
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/login', component: view('auth/Login'), name: 'login',
    meta: {
      breadcrumb: {
        label: 'Login',
        parent: 'home'
      }
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/register', component: view('auth/Register'), name: 'register',
    meta: {
      breadcrumb: {
        label: 'Register',
        parent: 'home'
      }
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/profil', component: view('auth/Profil'), name: 'profil',
    meta: {
      breadcrumb: {
        label: 'Profil',
        parent: 'home'
      }
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/users', component: view('users/ListUser'), name: 'listUser',
    meta: {
      role: 'admin',
      breadcrumb: {
        label: 'List User',
        parent: 'home'
      }
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/users/add', component: view('users/CreateUser'), name: 'createUser',
    meta: {
      role: 'admin',
      breadcrumb: {
        label: 'Create User',
        parent: 'listUser'
      }
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/articles', component: view('article/Articles'),
    children: [
      {
        path: '', component: view('article/ListArticle'), name: 'listArticle',
        meta: {
          breadcrumb: {
            label: 'List Article',
            parent: 'home'
          }
        },
        beforeEnter: ifNotAuthenticated,
      },
      {
        path: 'add', component: view('article/CreateArticle'), name: 'createArticle',
        meta: {
          breadcrumb: {
            label: 'Create Article',
            parent: 'listArticle'
          }
        },
        beforeEnter: ifNotAuthenticated,
      },
      {
        path: ':id/edit', component: view('article/EditArticle'), name: 'editArticle',
        meta: {
          breadcrumb: {
            label: 'Edit Article',
            parent: 'listArticle'
          }
        },
        beforeEnter: ifNotAuthenticated,
      },
      {
        path: ':id/show', component: view('article/ShowArticle'), name: 'showArticle',
        meta: {
          breadcrumb: {
            label: 'Show Article',
            parent: 'listArticle'
          }
        },
        beforeEnter: ifNotAuthenticated,
      },
    ]
  },
  {
    path: '/page403', component: view('errors/page403'), name: 'page403',
    meta: {
      breadcrumb: {
        label: 'Page 403',
        parent: 'home'
      }
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '*', component: view('errors/page404'), name: 'page404',
    meta: {
      breadcrumb: {
        label: 'Page 404',
        parent: 'home'
      }
    },
    beforeEnter: ifNotAuthenticated,
  }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * @param  {string}   name     the filename (basename) of the view to load.
 */
function view(name) {
  return function (resolve) {
    require(['./components/' + name + '.vue'], resolve);
  }
};

export const router = new VueRouter({
  routes: routes,
  mode: 'history',
})

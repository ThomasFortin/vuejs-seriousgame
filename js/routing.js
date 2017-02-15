/*------------------
 |   Routing file  |
  -----------------*/

// Components
Vue.component(`apprentice-part`, apprenticePart);
Vue.component(`evaluation-part`, evaluationPart);

// Creation of the router
var router = new VueRouter({
    routes: [
        { path: '/', component: Home, name:'home' },
        { path: '/apprentissage', component: Learning, name:'learning' },
        { path: '/evaluation', component: Evaluation, name:'evaluation' },
    ]
});

// Vue Instance
new Vue({
    el: '#app',
    router: router,
    data: store
});


// Routing file

var Home = { template: "<section><h2>Accueil</h2></section>" }
var Learning = { template: '<section><h2>Apprentissage</h2></section>' }
var Evaluation = { template: '<section><h2>Évaluation</h2></section>' }

var router = new VueRouter({
    routes: [
        { path: '/', component: Home, name:'home' },
        { path: '/apprentissage', component: Learning, name:'learning' },
        { path: '/evaluation', component: Evaluation, name:'evaluation' },
    ]
});

var application = new Vue({
    el: '#app',
    router: router
})

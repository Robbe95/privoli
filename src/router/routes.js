import MainLayout from '../layouts/Main.vue'
import Index from '../pages/Index.vue'
import Contact from '../pages/Contact.vue'
import About from '../pages/About.vue'
import Preorder from '../pages/Preorder.vue'
import Game from '../pages/Game.vue'

export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        component: Index,
        name: 'index',
        path: '',
      },
      {
        component: Index,
        name: '/product',
        path: '/product',
      },

      {
        component: Contact,
        name: 'contact',
        path: 'contact',
      },
      {
        component: About,
        name: 'about',
        path: 'about',
      },
      {
        component: Preorder,
        name: 'preorder',
        path: 'preorder',
      },

      {
        component: Game,
        name: 'game',
        path: 'game',
      },

    ],
  },
]

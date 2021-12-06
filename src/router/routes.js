import MainLayout from '../layouts/Main.vue'
import Index from '../pages/Index.vue'
import Contact from '../pages/Contact.vue'

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
        component: Contact,
        name: 'contact',
        path: 'contact',
      },

    ],
  },
]

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

export function tippy(app) {
  app.use(VueTippy, {
    directive: 'tippy',
    component: 'tippy',
    componentSingleton: 'tippy-singleton',
    defaultProps: {
      placement: 'top',
      allowHTML: true,
      theme: 'dark-custom',
      duration: [200, 200],
    },
  })
}
import Alpine from 'alpinejs'
import ajax from '@imacrayon/alpine-ajax'

export default function () {
  window.Alpine = Alpine
  Alpine.plugin(ajax)
}

import {toast} from 'react-toastify'
import {Slide, Zoom, Flip, Bounce} from 'react-toastify'

export const showToast = msg => {
  toast(msg, {
    transition: Flip
  })
}

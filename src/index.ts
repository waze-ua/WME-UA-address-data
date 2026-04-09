import { NAME } from './name'
import { TRANSLATION, SETTINGS } from './translations'
import { UAAddressData } from './ua-address-data'
import css from './style.css'

$(document).on('bootstrap.wme', () => {
  WMEUI.addTranslation(NAME, TRANSLATION)
  WMEUI.addStyle(css)

  new UAAddressData(NAME, SETTINGS)
})

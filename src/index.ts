import { NAME, TRANSLATION, SETTINGS } from './translations'
import { UAAddressData } from './ua-address-data'
import css from './style.css'

WMEUI.addTranslation(NAME, TRANSLATION)
WMEUI.addStyle(css)

$(document).on('bootstrap.wme', () => {
  new UAAddressData(NAME, SETTINGS)
})

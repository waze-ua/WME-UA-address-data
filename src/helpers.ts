import { NAME } from './name'

export function displayHtmlPage (res) {
  if (res.responseText.match(/Authorization needed/)
    || res.responseText.match(/ServiceLogin/)) {
    alert(NAME + ':\n' +
      'Для використання цього скрипта потрібна авторизація. Це одноразова дія.\n' +
      'Зараз ви будете перенаправлені на сторінку авторизації, де потрібно буде схвалити запит.\n' +
      'Після підтвердження закрийте сторінку та перезавантажте WME.')
  }
  let w = window.open()
      w.document.open()
      w.document.write(res.responseText)
      w.document.close()
      w.location = res.finalUrl
}

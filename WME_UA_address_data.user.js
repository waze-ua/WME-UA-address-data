// ==UserScript==
// @name         WME UA-address data
// @version      2025.03.17.001
// @description  Shows polygons and addresses on a map in different locations
// @namespace    https://greasyfork.org/users/160654-waze-ukraine
// @author       madnut, Sapozhnik, Anton Shevchuk
// @match        https://*.waze.com/editor*
// @match        https://*.waze.com/*/editor*
// @exclude      https://*.waze.com/user/editor*
// @connect      google.com
// @connect      script.googleusercontent.com
// @grant        GM_xmlhttpRequest
// @require      https://update.greasyfork.org/scripts/389765/1090053/CommonUtils.js
// @require      https://update.greasyfork.org/scripts/450160/1218867/WME-Bootstrap.js
// @require      https://update.greasyfork.org/scripts/452563/1218878/WME.js
// @require      https://update.greasyfork.org/scripts/450221/1137043/WME-Base.js
// @require      https://update.greasyfork.org/scripts/450320/1555192/WME-UI.js
// @updateURL    https://github.com/waze-ua/WME-UA-address-data/raw/main/WME_UA_address_data.user.js
// @downloadURL  https://github.com/waze-ua/WME-UA-address-data/raw/main/WME_UA_address_data.user.js
// @connect      stat.waze.com.ua
// @icon data:image/png;base64,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
// ==/UserScript==

/* jshint esversion: 8 */

/* global require */
/* global $, jQuery */
/* global W */
/* global I18n */
/* global OpenLayers */
/* global WME, WMEBase */
/* global WMEUI, WMEUIHelper, WMEUIHelperPanel, WMEUIHelperModal, WMEUIHelperTab, WMEUIShortcut, WMEUIHelperFieldset */
/* global Container, Settings, SimpleCache, Tools  */

(function () {
  'use strict'

  const requestsTimeout = 10000 // in ms

  // Script name, used as unique identifier
  const NAME = 'Address Polygons'

  // Translations
  const TRANSLATION = {
    'en': {
      title: NAME,
      description: 'Shows polygons and addresses on a map in different locations',
      polygons: 'Polygons list',
      settings: 'Settings',
      buttons: {
        reload: 'Reload list',
        control: 'Offset',
        x: 'Horizontal',
        y: 'Vertical',
        up: '↑',
        down: '↓',
        left: '←',
        right: '→',
      },
      options: {
        showLayer: 'Show polygons layer',
        showPolygonName: 'Show addresses',
        showRegionName: 'Show region',
        fillPolygons: 'Fill polygons with colors 🌈'
      }
    },
    'uk': {
      title: 'UA адреси',
      description: 'Відображення адрес та їх полігонів',
      polygons: 'Список полігонів',
      settings: 'Налаштування',
      buttons: {
        reload: 'Завантажити список',
        control: 'Зсув полігонів',
        x: 'По горизонталі',
        y: 'По вертикалі',
        up: '↑',
        down: '↓',
        left: '←',
        right: '→',
      },
      options: {
        showLayer: 'Показувати шар з полігонами',
        showPolygonName: 'Показувати адреси',
        showRegionName: 'Показувати область/р-н в назві',
        fillPolygons: 'Заливати полігони кольором (красіво 🌈)'
      }
    },
  }

  const SETTINGS = {
    offset: {
      x: 4,
      y: 5,
    },
    options: {
      showLayer: true,
      showPolygonName: true,
      showRegionName: false,
      fillPolygons: true
    },
    polygons: {}
  }

  const STYLE = '.address-polygons legend { font-size: 14px; font-weight: bold; margin: 0px 0px 10px 0px; padding: 10px 0px 0px 0px; }' +
    '.address-polygons > .control-label { font-size: 14px; font-weight: bold; margin: 0px 0px 10px 0px; padding: 10px 0px 0px 0px; }' +
    '.address-polygons > .controls > fieldset { border: 1px solid #ddd; padding: 4px; }' +
    '.address-polygons .address-polygons-offset-x label, .address-polygons .address-polygons-offset-y label { font-weight: 400 }' +
    '.address-polygons .address-polygons-offset-x label::after { content: attr(data-after); display: inline-block; padding: 2px; margin: 2px; }' +
    '.address-polygons .address-polygons-offset-y label::after { content: attr(data-after); display: inline-block; padding: 2px; margin: 2px; }' +
    'p.address-polygons-info { border-top: 1px solid #ccc; color: #777; font-size: x-small; margin-top: 15px; padding-top: 10px; text-align: center; }'

  WMEUI.addTranslation(NAME, TRANSLATION)
  WMEUI.addStyle(STYLE)

  class UAAddressData extends WMEBase {
    constructor (name, settings) {
      super(name, settings)

      this.layer = null

      this.polygons = null

      this.tabOptions = {
        showLayer: {
          title: I18n.t(this.name).options.showLayer,
          description: I18n.t(this.name).options.showLayer,
          callback: (event) => {
            this.settings.set(['options', 'showLayer'], event.target.checked)
            this.getLayer().setVisibility(event.target.checked)
            document.querySelector('#layer-switcher-item_address_polygons').checked = event.target.checked
          }
        },
        showPolygonName: {
          title: I18n.t(this.name).options.showPolygonName,
          description: I18n.t(this.name).options.showPolygonName,
          callback: (event) => {
            this.settings.set(['options', 'showPolygonName'], event.target.checked)
            this.drawBorders()
          }
        },
        showRegionName: {
          title: I18n.t(this.name).options.showRegionName,
          description: I18n.t(this.name).options.showRegionName,
          callback: (event) => {
            this.settings.set(['options', 'showRegionName'], event.target.checked)
            this.drawBorders()
          }
        },
        fillPolygons: {
          title: I18n.t(this.name).options.fillPolygons,
          description: I18n.t(this.name).options.fillPolygons,
          callback: (event) => {
            this.settings.set(['options', 'fillPolygons'], event.target.checked)
            this.drawBorders()
          }
        }
      }
    }

    init () {
      this.log('init')
      this.addTab()
      this.addMenuSwitcher()
    }

    /**
     * @return {OpenLayers.Layer.Vector}
     */
    getLayer () {
      if (!this.layer) {
        this.layer = this.createLayer()
      }
      return this.layer
    }

    createLayer () {
      let layer = new OpenLayers.Layer.Vector(this.name, {
        displayInLayerSwitcher: true,
        uniqueName: 'AddressPolygons',
        visibility: this.settings.get('options', 'showLayer')
      })
      W.map.addLayer(layer)
      return layer
    }

    /**
     * @return {[]}
     */
    getPolygons () {
      return this.polygons
    }

    setPolygons (polygons) {
      console.log(`Total ${polygons.Default.length} polygons`)
      this.polygons = polygons
    }

    addTab () {
      /** @type {WMEUIHelper} */
      this.helper = new WMEUIHelper(this.name)

      /** @type {WMEUIHelperTab} */
      this.tab = this.helper.createTab(
        I18n.t(this.name).title,
        {
          image: GM_info.script.icon
        }
      )
      this.tab.addText('description', I18n.t(this.name).description)

      let button = this.tab.addButton(
        'reload',
        I18n.t(this.name).buttons.reload,
        I18n.t(this.name).buttons.reload,
        () => {
          this.disabled = false
          this.loadPolygons()
        },
        'S+81'
      )

      button.html().className += ' waze-btn-blue'

      // Add settings section
      let fsSettings = this.helper.createFieldset(I18n.t(this.name).settings)
      let options = this.settings.get('options')
      for (let item in options) {
        if (options.hasOwnProperty(item) && this.tabOptions[item]) {
          fsSettings.addCheckbox(
            'settings-' + item,
            this.tabOptions[item].title,
            this.tabOptions[item].callback,
            this.settings.get('options', item)
          )
        }
      }
      this.tab.addElement(fsSettings)

      /**
       * @type {WMEUIHelperControlInput}
       */
      let fsKeys = this.helper.createFieldset(I18n.t(this.name).buttons.control)

      let offsetX = fsKeys.addRange(
        'offset-x',
        I18n.t(this.name).buttons.x,
        (event) => {
          this.settings.set(['offset', 'x'], event.target.value)
          event.target.nextSibling.setAttribute('data-after', event.target.value)
          this.drawBorders()
        },
        this.settings.get('offset', 'x'),
        -20,
        20,
        0.1
      )
      offsetX.html().getElementsByTagName('label')[0].setAttribute('data-after', this.settings.get('offset', 'x'))

      let offsetY = fsKeys.addRange(
        'offset-y',
        I18n.t(this.name).buttons.y,
        (event) => {
          this.settings.set(['offset', 'y'], event.target.value)
          event.target.nextSibling.setAttribute('data-after', event.target.value)
          this.drawBorders()
        },
        this.settings.get('offset', 'y'),
        -20,
        20,
        0.1
      )
      offsetY.html().getElementsByTagName('label')[0].setAttribute('data-after', this.settings.get('offset', 'y'))

      this.tab.addElement(fsKeys)

      this.tab.addText(
        'info',
        '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
      )
      this.tab.inject()

      this.refreshOffset()
    }

    refreshOffset () {
      document.querySelector('.address-polygons-offset-x label')?.setAttribute('data-after', this.settings.get('offset', 'x'))
      document.querySelector('.address-polygons-offset-y label')?.setAttribute('data-after', this.settings.get('offset', 'y'))
    }

    addMenuSwitcher () {
      // add layer switcher to layer's menu
      let ul = document.querySelector('.collapsible-GROUP_DISPLAY')
      let li = document.createElement('li')
      let checkbox = document.createElement('wz-checkbox')
      checkbox.id = 'layer-switcher-item_address_polygons'
      checkbox.type = 'checkbox'
      checkbox.className = 'hydrated'
      checkbox.checked = this.getLayer().getVisibility()
      checkbox.appendChild(document.createTextNode(I18n.t(NAME).title))
      checkbox.onclick = () => {
        let newState = !this.getLayer().getVisibility()
        this.getLayer().setVisibility(newState)
        this.settings.set(['options', 'showLayer'], newState)
        document.querySelector('#address-polygons-settings-showLayer').checked = newState
      }
      li.append(checkbox)
      ul.append(li)
    }

    loadPolygons () {
      console.log("Load polygons from server")
      const url = 'http://stat.waze.com.ua/address_map/address_map.php'
      sendHTTPRequest(url, (res) => {
        if (validateHTTPResponse(res)) {
          let out = JSON.parse(res.responseText)
          if (out.result === 'success') {
            this.setPolygons(out.data.polygons)
            this.drawBorders()
          } else {
            alert(NAME + ': Помилка отримання бази з сервера або ця область не містить інформації про адреси!')
          }
        }
      })
    }

    drawBorders () {
      this.getLayer().destroyFeatures()

      let data = this.getPolygons()

      if (data) {
        let parser = new OpenLayers.Format.WKT()
        parser.internalProjection = W.map.getProjectionObject()
        parser.externalProjection = new OpenLayers.Projection('EPSG:4326')

        Object.keys(data).forEach((group) => {
          data[group].forEach((item) => {
            let feature = parser.read(item.polygon)
            if (feature) {
              feature.geometry.move(
                parseFloat(this.settings.get('offset', 'x')),
                parseFloat(this.settings.get('offset', 'y'))
              )
              //feature.fid = item.polygon.hashCode()
              feature.style = new BorderStyle(this.settings, item.color, item.name, item.status === 'active')
              this.getLayer().addFeatures(feature)
            }
          })
        })
      }
    }
  }

  function BorderStyle (settings, color, label, visible = true) {
    this.fill = settings.get('options', 'fillPolygons')
    this.fillColor = color // #ee9900
    this.fillOpacity = 0.4
    this.stroke = true
    this.strokeColor = color
    this.strokeOpacity = 1
    this.strokeWidth = 3
    this.strokeLinecap = 'round' // [butt | round | square]
    this.strokeDashstyle = 'longdash' // [dot | dash | dashdot | longdash | longdashdot | solid]

    if (!settings.get('options', 'showRegionName')) {
      let parts = label.split("\n")
      parts = parts.slice(-2)
      label = parts.join("\n")
    }

    this.label = settings.get('options', 'showPolygonName') ? label : null

    this.labelOutlineColor = 'black'
    this.labelOutlineWidth = 1
    this.fontSize = 13
    // this.fontColor = color;
    this.fontColor = 'white'
    this.fontOpacity = 1
    // this.fontWeight = "bold";
    this.display = visible ? '' : 'none'
  }

  function sendHTTPRequest (url, callback) {
    // transform from EPSG:900913 to EPSG:4326
    let urPos = new OpenLayers.LonLat(W.map.getCenter().lon, W.map.getCenter().lat)
      urPos.transform(
        new OpenLayers.Projection('EPSG:900913'),
        new OpenLayers.Projection('EPSG:4326')
      )

    GM_xmlhttpRequest({
      url: `${url}?lat=${urPos.lat}&lon=${urPos.lon}`,
      method: 'GET',
      timeout: requestsTimeout,
      onload: function (res) {
        if (callback) {
          callback(res)
        }
        document.querySelector('.address-polygons-reload').disabled = false
      },
      onreadystatechange: function (res) {
      },
      ontimeout: function () {
        document.querySelector('.address-polygons-reload').disabled = false
        alert(NAME + ': Вибачте, запит скинуто за часом!')
      },
      onerror: function () {
        document.querySelector('.address-polygons-reload').disabled = false
        alert(NAME + ': Вибачте, помилка запиту!')
      }
    })
  }

  function validateHTTPResponse (res) {
    let result = false,
      displayError = true,
      errorMsg
    if (res) {
      switch (res.status) {
        case 200:
          displayError = false
          if (res.responseHeaders.match(/content-type:\s?application\/json/i)) {
            result = true
          } else if (res.responseHeaders.match(/content-type:\s?text\/html/i)) {
            displayHtmlPage(res)
          }
          break
        default:
          errorMsg = 'Error: unsupported status code - ' + res.status
          console.warn(res.responseHeaders)
          console.warn(res.responseText)
          break
      }
    } else {
      errorMsg = 'Помилка: відповідь порожня!'
    }

    if (displayError) {
      if (!errorMsg) {
        errorMsg = 'Помилка обробки запиту. Відповідь: ' + res.responseText
      }
      alert(NAME + ' ' + errorMsg)
    }
    return result
  }

  function displayHtmlPage (res) {
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

  $(document).on('bootstrap.wme', () => {
    let Instance = new UAAddressData(NAME, SETTINGS)

    Instance.init()
  })

})()

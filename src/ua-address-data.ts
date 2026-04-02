import { NAME, SETTINGS, requestsTimeout } from './translations'
import { layerConfig } from './layers'
import { displayHtmlPage } from './helpers'

export class UAAddressData extends WMEBase {
  polygons: any
  tabOptions: any
  helper: any

  constructor (name, settings) {
    super(name, settings)

    this.polygons = null

    this.tabOptions = {
      showPolygonName: {
        title: I18n.t(this.name).options.showPolygonName,
        description: I18n.t(this.name).options.showPolygonName,
        callback: (event) => {
          this.settings.set(['options', 'showPolygonName'], event.target.checked)
          this.drawPolygons()
        }
      },
      showRegionName: {
        title: I18n.t(this.name).options.showRegionName,
        description: I18n.t(this.name).options.showRegionName,
        callback: (event) => {
          this.settings.set(['options', 'showRegionName'], event.target.checked)
          this.drawPolygons()
        }
      },
      fillPolygons: {
        title: I18n.t(this.name).options.fillPolygons,
        description: I18n.t(this.name).options.fillPolygons,
        callback: (event) => {
          this.settings.set(['options', 'fillPolygons'], event.target.checked)
          this.drawPolygons()
        }
      }
    }

    this.initHelper()

    this.initTab()

    this.initLayer()

    this.initHandlers()

    this.createShortcut()
  }

  initHelper() {
    this.helper = new WMEUIHelper(this.name)
  }

  initTab () {
    /** @type {WMEUIHelperTab} */
    let tab = this.helper.createTab(
      I18n.t(this.name).title,
      {
        sidebar: this.wmeSDK.Sidebar,
        image: GM_info.script.icon
      }
    )
    tab.addText('description', I18n.t(this.name).description)

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
    tab.addElement(fsSettings)

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
        this.drawPolygons()
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
        this.drawPolygons()
      },
      this.settings.get('offset', 'y'),
      -20,
      20,
      0.1
    )
    offsetY.html().getElementsByTagName('label')[0].setAttribute('data-after', this.settings.get('offset', 'y'))

    tab.addElement(fsKeys)

    tab.addText(
      'info',
      '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
    )
    tab.addText('blue', 'made in')
    tab.addText('yellow', 'Ukraine')
    tab.inject().then(() => this.log('Script Tab Initialized') )

    this.refreshOffset()
  }

  /**
   * Initial the layer: set visibility to true and add the checkbox for this layer
   */
  initLayer () {
    this.wmeSDK.Map.addLayer({
      layerName: this.name,
      styleRules: layerConfig.defaultRule.styleRules,
      styleContext: layerConfig.defaultRule.styleContext
    });

    this.wmeSDK.Map.setLayerZIndex({ layerName: this.name, zIndex: 9999 });
    this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: this.settings.get('layer')});

    this.wmeSDK.LayerSwitcher.addLayerCheckbox({ name: this.name });
    this.wmeSDK.LayerSwitcher.setLayerCheckboxChecked({ name: this.name, isChecked: this.settings.get('layer') })

    if (this.settings.get('layer')) {
      this.loadPolygons()
    }
  }

  initHandlers () {
    let zoom = this.wmeSDK.Map.getZoomLevel()

    this.wmeSDK.Events.on({
      eventName: "wme-layer-checkbox-toggled",
      eventHandler: (e) => {
        if (e.name === this.name) {
          this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: e.checked });
          this.settings.set(['layer'], e.checked)
          if (e.checked) {
            this.loadPolygons()
          }
        }
      },
    });

    this.wmeSDK.Events.on({
      eventName: "wme-map-zoom-changed",
      eventHandler: () => {
        if (zoom > this.wmeSDK.Map.getZoomLevel()
          &&  this.wmeSDK.Map.isLayerVisible({ layerName: this.name })) {
          this.loadPolygons()
        }
      },
    });

    this.wmeSDK.Events.on({
      eventName: "wme-map-move-end",
      eventHandler: () => {
        if (this.wmeSDK.Map.isLayerVisible({ layerName: this.name })) {
          this.loadPolygons()
        }
      },
    });
  }

  /**
   * Create the shortcut
   */
  createShortcut () {
    let shortcut = {
      callback: () => this.togglePolygons(),
      description: I18n.t(this.name).description,
      shortcutId: this.id,
      shortcutKeys: 'S+81',
    };

    if (this.wmeSDK.Shortcuts.areShortcutKeysInUse({ shortcutKeys: shortcut.shortcutKeys })) {
      this.log('Shortcut already in use')
      shortcut.shortcutKeys = null
    }
    this.wmeSDK.Shortcuts.createShortcut(shortcut);
  }

  /**
   * @return {[]}
   */
  getPolygons () {
    return this.polygons
  }

  setPolygons (polygons) {
    this.log(`Total ${polygons.Default.length} polygons`)
    this.polygons = polygons
  }

  loadPolygons () {
    this.log("Load polygons from server")

    this.wmeSDK.LayerSwitcher.setLayerCheckboxChecked({ name: this.name, isChecked: true })

    const url = 'https://stat.waze.com.ua/address_map/address_map.php'
    this.sendHTTPRequest(url, (res) => {
      if (this.validateHTTPResponse(res)) {
        let out = JSON.parse(res.responseText)
        if (out.result === 'success') {
          this.setPolygons(out.data.polygons)
          this.drawPolygons()
        } else {
          this.log('Error during load polygons from server')
        }
      }
    })

    this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: true});
  }

  drawPolygons () {
    this.wmeSDK.Map.removeAllFeaturesFromLayer({ layerName: this.name });
    this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: false });

    let data = this.getPolygons()

    if (data) {
      let invalid = 0

      Object.keys(data).forEach((group) => {
        data[group].forEach((item) => {

          let multiPolygon = wellknown.parse(item.polygon)

          let polygon = multiPolygon.coordinates[0]

          let label = ''

          if (this.settings.get('options', 'showPolygonName')) {
            label = item.name

            if (!this.settings.get('options', 'showRegionName')) {
              label = label.split("\n").slice(-2).join("\n")
            }
          }

          let feature = turf.polygon(
            polygon,
            {
              styleName: "stylePolygon",
              style: {
                fill: this.settings.get('options', 'fillPolygons') ? 0.5 : 0,
                label: label,
                color: item.color,
                status: item.status === 'active'
              },
            },
            { id: "polygon_" + item.center }
          )

          if (feature) {
            // Apply the offset
            feature.geometry.coordinates[0] = this.translateCoordinatesArray(
              feature.geometry.coordinates[0],
              this.settings.get('offset', 'x'),
              this.settings.get('offset', 'y')
            )
            try {
              this.wmeSDK.Map.addFeatureToLayer({ layerName: this.name, feature: feature });
            } catch (e) {
              invalid++
            }
          }
        })
      })

      if (invalid > 0) {
        this.log('Skipped ' + invalid + ' polygons')
      }
    }

    this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: true });
  }

  togglePolygons () {
    if (this.wmeSDK.Map.isLayerVisible({ layerName: this.name })) {
      this.wmeSDK.LayerSwitcher.setLayerCheckboxChecked({ name: this.name, isChecked: false })
      this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: false });
    } else {
      this.loadPolygons()
    }
  }

  refreshOffset () {
    document.querySelector('.address-polygons-offset-x label')?.setAttribute('data-after', this.settings.get('offset', 'x'))
    document.querySelector('.address-polygons-offset-y label')?.setAttribute('data-after', this.settings.get('offset', 'y'))
  }

  /**
   * Translates an array of [lon, lat] coordinates by an offset defined in meters.
   *
   * @param {number[][]} coordinates - Array of coordinate pairs: [[lon1, lat1], [lon2, lat2], ...]
   * @param {number} metersLon - The distance in meters to offset East/West (longitude).
   * @param {number} metersLat - The distance in meters to offset North/South (latitude).
   * @returns {number[][]} A new array of translated coordinate pairs.
   */
  translateCoordinatesArray(coordinates, metersLon, metersLat) {
    if (!coordinates || coordinates.length === 0) {
      return [];
    }

    // --- 1. Determine Conversion Factors based on Current Latitude ---
    // Use the latitude of the first point for the calculation
    const currentLon = parseFloat(coordinates[0][0]);
    const currentLat = parseFloat(coordinates[0][1]);

    const EARTH_RADIUS_M = 6371000;
    const latInRadians = currentLat * (Math.PI / 180);

    // Calculate Latitude Offset (Degrees)
    const deltaLat = parseFloat(metersLat) / EARTH_RADIUS_M;
    const offsetLatDeg = deltaLat * (180 / Math.PI);

    // Calculate Longitude Offset (Degrees)
    const denominatorLon = EARTH_RADIUS_M * Math.cos(latInRadians);
    const deltaLon = parseFloat(metersLon) / denominatorLon;
    const offsetLonDeg = deltaLon * (180 / Math.PI);

    // --- 2. Apply Offsets to All Coordinates using map() ---
    // The map function iterates over every [lon, lat] pair
    return coordinates.map(coordinates => {
      const originalLon = parseFloat(coordinates[0]);
      const originalLat = parseFloat(coordinates[1]);

      // Apply the calculated degree offsets
      const newLon = originalLon + offsetLonDeg;
      const newLat = originalLat + offsetLatDeg;

      // Return the new translated coordinate pair
      return [newLon, newLat];
    });
  }

  sendHTTPRequest (url, callback) {
    let center = this.wmeSDK.Map.getMapCenter()
    let zoom = this.wmeSDK.Map.getZoomLevel()
    let radius = 1000

    if (zoom < 16) {
      this.log('Please Zoom In to receive an information about polygons');
      return
    } else {
      switch (zoom) {
        case 16:
          radius = 1000
          break;
        case 17:
          radius = 600
          break;
        case 18:
        default:
          radius = 400
          break;
      }
    }

    GM_xmlhttpRequest({
      url: `${url}?lat=${center.lat}&lon=${center.lon}&radius=${radius}`,
      method: 'GET',
      timeout: requestsTimeout,
      onload: function (res) {
        if (callback) {
          callback(res)
        }
      },
      onreadystatechange: (res) => {},
      ontimeout: () => this.log('Connection Timeout ⛓️‍💥'),
      onerror: () => this.log('Server Error 🛑')
    })
  }


  validateHTTPResponse (res) {
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
}

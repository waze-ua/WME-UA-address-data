import { NAME } from './name'

export const requestsTimeout = 10000 // in ms

export const SETTINGS = {
  offset: {
    x: 4,
    y: 5,
  },
  options: {
    showPolygonName: true,
    showRegionName: false,
    fillPolygons: true
  },
  layer: false,
  polygons: {}
}

// Translations
export const TRANSLATION = {
  'en': {
    title: NAME,
    description: 'Shows polygons and addresses on a map in different locations',
    polygons: 'Polygons list',
    settings: 'Settings',
    buttons: {
      control: 'Offset',
      x: 'Horizontal',
      y: 'Vertical',
      up: '↑',
      down: '↓',
      left: '←',
      right: '→',
    },
    options: {
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
      control: 'Зсув полігонів',
      x: 'По горизонталі',
      y: 'По вертикалі',
      up: '↑',
      down: '↓',
      left: '←',
      right: '→',
    },
    options: {
      showPolygonName: 'Показувати адреси',
      showRegionName: 'Показувати область/р-н в назві',
      fillPolygons: 'Заливати полігони кольором (красіво 🌈)'
    }
  },
}

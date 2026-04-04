export const layerConfig = {
  defaultRule: {
    styleContext: {
      fill: (context) => {
        const style = context?.feature?.properties?.style;
        if (!style)
          return style;
        return style?.fill;
      },
      label: (context) => {
        const style = context?.feature?.properties?.style;
        if (!style)
          return style;
        return style?.label;
      },
      color: (context) => {
        const style = context?.feature?.properties?.style;
        if (!style)
          return style;
        return style?.color;
      },
    },
    styleRules: [
      {
        predicate: (properties) => properties.styleName === "stylePolygon",
        style: {
          fillOpacity: '${fill}',
          fillColor: '${color}',
          stroke: true,
          strokeColor: '${color}',
          strokeOpacity: 1,
          strokeWidth: 3,
          strokeLinecap: 'round', // [butt | round | square]
          strokeDashstyle: 'longdash',
          graphicZIndex: 100,
          label: "${label}",
          labelOutlineColor: '#000',
          labelOutlineWidth: 1,
          labelAlign: 'cm',
          fontColor: '#fff',
          fontSize: '12px',
          fontFamily: 'Courier New, monospace',
          // fontWeight: 'bold',
          labelYOffset: 24,
        },
      }
    ],
  },
};

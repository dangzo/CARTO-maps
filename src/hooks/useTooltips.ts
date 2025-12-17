import type { PickingInfo } from '@deck.gl/core';

export default function useTooltips() {
  const getTooltip = ({ object }: PickingInfo) => {
    if (!object?.properties) {
      return null;
    }

    const propertiesList = Object.entries(object.properties)
      .map(([key, value]) => `<li><b>${key}:</b> ${value}</li>`)
      .join('');

    return {
      html: `
        <div>
          <b>Properties:</b>
          <ul style="margin: 5px 0; padding-left: 20px; font-size: 14px;">
            ${propertiesList}
          </ul>
        </div>
      `,
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '5px',
        borderRadius: '3px',
      },
    };
  };

  return {
    getTooltip,
  };
};

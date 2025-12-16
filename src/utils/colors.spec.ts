import { hexToRgbA } from './colors';

describe('hexToRgbA', () => {
  it('should convert hex color to RGBA tuple, with alpha set to 80% (204)', () => {
    expect(hexToRgbA('#ff5733')).toEqual([255, 87, 51, 204]);
    expect(hexToRgbA('#000000')).toEqual([0, 0, 0, 204]);
    expect(hexToRgbA('#ffffff')).toEqual([255, 255, 255, 204]);
    expect(hexToRgbA('#4a00f0')).toEqual([74, 0, 240, 204]);
  });

  it('should allow custom alpha value', () => {
    expect(hexToRgbA('#ff5733', 255)).toEqual([255, 87, 51, 255]);
    expect(hexToRgbA('#000000', 128)).toEqual([0, 0, 0, 128]);
    expect(hexToRgbA('#ffffff', 0)).toEqual([255, 255, 255, 0]);
  });
});

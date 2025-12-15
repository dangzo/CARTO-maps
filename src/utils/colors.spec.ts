import { hexToRgb } from './colors';

describe('hexToRgb', () => {
  it('should convert hex color to RGB tuple', () => {
    expect(hexToRgb('#ff5733')).toEqual([255, 87, 51]);
    expect(hexToRgb('#000000')).toEqual([0, 0, 0]);
    expect(hexToRgb('#ffffff')).toEqual([255, 255, 255]);
    expect(hexToRgb('#4a00f0')).toEqual([74, 0, 240]);
  });
});

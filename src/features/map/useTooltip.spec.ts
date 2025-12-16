import useTooltip from './useTooltip';
import { renderHookWithProviders } from '@/utils/test-utils';

describe('useTooltip', () => {
  it('should return a getTooltip function', () => {
    const { result } = renderHookWithProviders(() => useTooltip());
    expect(typeof result.current.getTooltip).toBe('function');
  });
});

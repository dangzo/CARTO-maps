import { renderHookWithProviders } from '@/utils/test-utils';
import useTooltips from './useTooltips';

describe('useTooltips hook', () => {
  it('should return getTooltip function', () => {
    const { result } = renderHookWithProviders(() => useTooltips());
    expect(typeof result.current.getTooltip).toBe('function');
  });
});

import { expect, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

// Extend Vitest's expect
expect.extend(matchers);

// Auto-clean between tests
afterEach(() => {
  cleanup();
});

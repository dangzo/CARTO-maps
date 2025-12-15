import React, { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { render, renderHook, type RenderOptions, type RenderHookOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { setupStore } from '@/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }

  return { ...render(ui, { wrapper: Wrapper,
    ...renderOptions }),
  store };
}

export function renderHookWithProviders<TProps, TResult>(
  hook: (props: TProps) => TResult,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions & RenderHookOptions<TProps> = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }

  return renderHook(hook, { wrapper: Wrapper,
    ...renderOptions });
}

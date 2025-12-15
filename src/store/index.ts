import { combineReducers, configureStore } from '@reduxjs/toolkit';
import layerControlsReducer from './slices/layerControlsSlice';
import dataSourcesReducer from './slices/dataSourcesSlice';

export const store = configureStore({
  reducer: {
    layerControls: layerControlsReducer,
    dataSources: dataSourcesReducer,
  },
});

const rootReducer = combineReducers({
  layerControls: layerControlsReducer,
  dataSources: dataSourcesReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

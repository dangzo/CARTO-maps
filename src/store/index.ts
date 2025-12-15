import { combineReducers, configureStore } from '@reduxjs/toolkit';
import layerControlsReducer from './slices/layerControlsSlice';

export const store = configureStore({
  reducer: {
    layerControls: layerControlsReducer,
  },
});

const rootReducer = combineReducers({
  layerControls: layerControlsReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

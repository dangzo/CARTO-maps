import { configureStore } from '@reduxjs/toolkit';
import layerControlsReducer from './slices/layerControlsSlice';

export const store = configureStore({
  reducer: {
    layerControls: layerControlsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import essentialReducer from './slices/essential.slice';
import { essentialListeners } from './effects/essential.effects';

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    essential: essentialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

const listeners = [essentialListeners];
listeners.forEach((listener) => listener(listenerMiddleware.startListening));

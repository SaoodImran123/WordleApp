import { configureStore } from '@reduxjs/toolkit';
import activeRowReducer from './rowSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            activeRow: activeRowReducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']

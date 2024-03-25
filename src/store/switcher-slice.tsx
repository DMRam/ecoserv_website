import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

const language: string = ''

const initialState = {
    language: 'French'
};

const sliceMenu = createSlice({
    name: "ui",
    initialState,
    reducers: {
        sliceOnChangeLanguage(state, action) {
            state.language = action.payload
        },
    },
});

export const { sliceOnChangeLanguage } =
    sliceMenu.actions;
export const selectUI = (state: RootState) => state.ui;

export default sliceMenu.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

const language: string = ''
const modalContactForm = false

const initialState = {
    language: 'French',
    modalContactForm
};

const sliceMenu = createSlice({
    name: "ui",
    initialState,
    reducers: {
        sliceOnChangeLanguage(state, action) {
            state.language = action.payload
        },
        sliceToggleModal(state) {
            state.modalContactForm = !state.modalContactForm
        },
    },
});

export const { sliceOnChangeLanguage, sliceToggleModal } =
    sliceMenu.actions;
export const selectUI = (state: RootState) => state.ui;

export default sliceMenu.reducer;
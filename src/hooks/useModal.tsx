import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { sliceToggleModal } from '../store/switcher-slice'

export const useModal = () => {
    const dispatch = useAppDispatch();
    const modalState = useAppSelector((state) => state.ui.modalContactForm);

    const switchModal = () => {
        dispatch(sliceToggleModal())
    }

    return { modalState, switchModal }
}

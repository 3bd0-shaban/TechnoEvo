'use client';
import { FC } from 'react'
import { Toaster } from 'react-hot-toast'

interface ToastProps {
  
}

const Toast: FC<ToastProps> = ({}) => {
    return <Toaster
        position="top-center"
        reverseOrder={false}
    />
}

export default Toast
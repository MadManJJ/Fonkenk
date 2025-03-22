'use client'
import { Provider as ReactReduxProvider } from "react-redux"
import { store } from "./store"

export default function ReduxProvider( { children } : { children:React.ReactNode } ){

    return ( // is for dispatch and selector // loading={null} is a compoent for waiting for the state is loaded 
        <ReactReduxProvider store={store}> 
                { children }
        </ReactReduxProvider>
    )
}
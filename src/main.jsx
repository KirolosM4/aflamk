import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux";
import Store from './redux/Store.js';

createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
        <BrowserRouter>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>



)

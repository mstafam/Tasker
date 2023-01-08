import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { AuthContextProvider } from "./AuthContext.js";
import { TaskContextProvider } from './taskContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <TaskContextProvider>
                <App />
            </TaskContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);

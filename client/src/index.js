import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from "./AuthContext";
import { TaskContextProvider } from './taskContext';

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

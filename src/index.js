import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./component/App";
import 'bootstrap/dist/css/bootstrap.css';
import "./resources/css/custom.css";
import { ExpensesContextProvider } from './context/expenses_context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ExpensesContextProvider>
       <App/>
    
    </ExpensesContextProvider>);

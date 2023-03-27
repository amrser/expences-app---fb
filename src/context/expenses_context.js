import React, { useState } from "react";

export const ExpensesContext=React.createContext({
    expenses:[],
    setExpenses: (expense)=>{}
});

export const ExpensesContextProvider=(props)=>{
    let [expenses, setExpenses]= useState([])

    return(
        <ExpensesContextProvider value={{
        expenses:expenses,
        setExpenses:setExpenses,
    }}>
        {props.children}
    </ExpensesContextProvider>
    )
};
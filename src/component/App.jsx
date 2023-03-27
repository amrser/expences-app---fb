import { getQueriesForElement } from "@testing-library/react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { ExpensesContext } from "../context/expenses_context";

import logo from "../resources/img/m1.png";
import ExpencesForm from "./ExpencesForm";
import ExpencesTable from "./ExpencesTable";

const App =()=>{
    // let expenses=[];
    // let [expenses, setExpenses]= useState([])
    // let onNewExpensesHandler=(expense)=>{
    //     setExpenses((prevExpenses)=>{
    //         return[expense,...prevExpenses]
    //     });
    //     Swal.fire({
    //         icon: "success",
    //         title: "Great",
    //         text: "Expenses inserted succseefuly",
    //         timer: 1500,
    
    //     })
    // }
 
    let context=useContext(ExpensesContext)
    let fetchExpenses=()=>{
        fetch("https://react-expenses-app-2bb04-default-rtdb.firebaseio.com/expenses.json",{
            method:"GET",
            headers:{
                accept:"application/json" 
            },
        }).then((result)=>{
            return result.json();
        }).then((response)=>{
            console.log(response);
            let fetchedExpenses=[];
            for(let key in response){
                let expense = response[key];
                expense.id = key;
                fetchedExpenses.push(expense);
            };
            context.setExpenses(fetchedExpenses);
        })
        Swal.fire({
                    icon: "success",
                    title: "Great",
                    text: "Expenses inserted succseefuly",
                    timer: 1500,
            
                })
    }
    useEffect(fetchExpenses,[]);
    return   (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-6">
                        <img src={logo} className="img-fluid" alt=""/>
                    </div>
                    <div className="col-sm-6 mt-5">
                        <div className="row tit">
                        <h4 className="">wellcom to AMRO Expense Manager </h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim~ ad minim veniam
                        </p>
                        </div>
                        <ExpencesForm />
                    </div>
                </div>

                <div className="row mt-5 mb-5">
                    <div className="custom-card ">
                        <ExpencesTable />
                    </div>
                </div>
            </div>

    )
   
   
}
export default App;
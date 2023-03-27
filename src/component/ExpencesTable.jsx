
import { useContext } from "react";
import { ExpensesContext } from "../context/expenses_context";
import ExpencesRow from "./ExpencesRow";

const ExpencesTable = (props)=>{
    let context= useContext(ExpensesContext)
   return(
    <table className="table ">
        <thead>
            <tr>
            <th> Title</th>
            <th> Date</th>
            <th>value</th>
            <th>Description</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            <tr id="addRow"></tr>
            {context.expenses.map((element)=>(
            <ExpencesRow 
                key={element.id} 
                expense={element} 
            />))}
        </tbody>
    </table>
   )
}
export default ExpencesTable;
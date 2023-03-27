import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import Swal from "sweetalert2";
import { ExpensesContext } from "../context/expenses_context";
const ExpencesRow =(props)=>{
    let context= useContext(ExpensesContext);
    let onExpensesDeleteHandler=()=>{
        Swal.fire({
            icon: "question",
            title:"Are you sure",
            text: "Expense well be deleted",
            showCancelButton: true,
            cancelButtonText: "cancel",
            cancelButtonColor: '#2ea835',
            confirmButtonText: "delet",
            confirmButtonColor:"#f8102a",
        }).then((result)=>{
            if(result.isConfirmed){
                deletExpense();
            }
        });
        // Swal.fire({
        //     icon: "question",
        //     title:"Are you sure",
        //     text: "Expense well be deleted",
        //     showCancelButton: true,
        //     cancelButtonText: "cancel",
        //     cancelButtonColor: '#2ea835',
        //     confirmButtonText: "delet",
        //     confirmButtonColor:"#f8102a",
        // }).then((result)=>{
        //     if(result.isConfirmed){
        //         let filterdExpenses=expenses.filter((element)=>element.id!==id);
        //         Swal.fire( 'deleted', 'Expenses deleted succseefuly','success');
        //     }
        // });
       
    };
    let deletExpense=()=>{
        fetch(`https://react-expenses-app-2bb04-default-rtdb.firebaseio.com/expenses/${props.expense.id}.json`,{
            method:"DELETE",
            headers:{
                accept:"application/json",
            },
        }).then((result)=>{
            return result.json();
        })
        .then((response)=>{
            // props.onExpensesDelete(props.expense.id);
            let filterdExpenses=context.expenses.filter(
                (element)=>element.id!==props.expense.id
                );
            context.setExpenses(filterdExpenses);
            Swal.fire( 'deleted', 'Expenses deleted succseefuly','success');
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    return (<tr>
        <td>{ props.expense.title }</td>
        <td>{ props.expense.date }</td>
        <td>{ props.expense.value }</td>
        <td colSpan="2">{ props.expense.descreption} </td>
        <td className="text-right"><a onClick={onExpensesDeleteHandler} href="#" className="delete" >
            {/* <i className="fa fa-trash-o"aria-hidden="true"/> */}
            <FontAwesomeIcon icon={faTrashAlt} />
            </a></td>
        </tr>
        ) 
};
export default ExpencesRow;
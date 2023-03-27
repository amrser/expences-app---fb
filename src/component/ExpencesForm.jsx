import { useContext } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";
import { ExpensesContext } from "../context/expenses_context";

let ExpencesForm = (props) => {
    let titleRef=useRef();
    let dateRef=useRef();    
    let valueRef=useRef();   
    let descriptionRef=useRef();
    let context = useContext(ExpensesContext);

    let onSubmetedHandler = (event) =>{
         event.preventDefault();
        if(checkData()){
            saveExpense();
        }
    };
    let clear = () => {
        titleRef.current.value="";
        dateRef.current.value ="";
        valueRef.current.value ="";
        descriptionRef.current.value =""
    };

    let saveExpense=()=>{
        let newExpense={
            id : Math.random(),
            title : titleRef.current.value,
            date : dateRef.current.value,
            value : valueRef.current.value,
            descreption : descriptionRef.current.value,
           }
           fetch(
                "https://react-expenses-app-2bb04-default-rtdb.firebaseio.com/expenses.json",
                {
                     method: "POST",
                     body: JSON.stringify(newExpense),
                        headers:{
                           accept: "aplication/json",
                        },
                }
            )
            .then((result)=>{
                return result.json();
            })
            .then((response)=>{
                context.setExpenses((prevExpenses)=>{
                    return [newExpense,...prevExpenses]
                });
                newExpense.id=response.name;
                clear();
               
            })
            .catch((error)=>{
                console.error(error);
           })

           
    }

    let checkData = () => {
        if(
            titleRef.current.value != ""&&
            dateRef.current.value != ""&&
            valueRef.current.value != ""&&
            descriptionRef.current.value != "" 
        ) {
            return true;
        }
        showMessge("Enter Required Data");
        return false;
    };
    let showMessge=(messege)=>{
        Swal.fire({
            icon:"error",
            title:"Oops!",
            text: messege,
            showConfirmButton:false,
            showCancelButton:false,
            timer:1500
        })
    }
   return (
       
        <form className="row" onSubmit={onSubmetedHandler}>
                <div className="mb-3 col-md-6">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control addTitle" aria-describedby=""
                    ref={titleRef}/>
                    
                </div>
                <div className="mb-3 col-md-6">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control addDate" aria-describedby=""
                    ref={dateRef}/>
                    
                </div>
                <div className="mb-3 col-md-6">
                    <label className="form-label">Value</label>
                    <input type="number" className="form-control addValue" aria-describedby=""
                    ref={valueRef}/>
                    
                </div>
                <div className="mb-3 col-md-6">
                    <label htmlFor="title" className="form-label">Description</label>
                    <input type="text" className="form-control addDescrption" aria-describedby=""
                     ref={descriptionRef}/>
                   
                </div>
                <div className="mb-3 col-md-12 text-right">
                   <button type="submit" className="btn btn-primary addBtn">Add</button>
                </div>
        </form>
    )
};
export default ExpencesForm;
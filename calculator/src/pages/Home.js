import Calculator from './Home_pages/Calculator.js';
import { useNavigate } from 'react-router-dom';
import React,{useState} from 'react';
import { useEffect } from "react";



//delete the session
const Logout=()=>{
  const navigat = useNavigate();
 
  const deletesession=()=>{
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('userId');
   navigat('/login');
  }
 

  return (
    <>
    
      <h3  onClick={deletesession} className='btn bg-dark text-light px-5'>logout</h3>
   
   
    </>
  )
}


function Home() {

  const navigat = useNavigate();
  useEffect(()=>{},[navigat]);
  //check session
    if(!sessionStorage.getItem('login')){
      navigat('/login');
  }

  
  //data  array include name , expression ,result 
  const [namestack, setnameStack] = useState([]);
  const [digitstack, setdigitStack] = useState([]);
  const [resultstack, setresultStack] = useState([]);
  
  //function to add data inside array
  const handleDataChange = ({name,result,expression}) => {
    setnameStack([...namestack,name]);
    setdigitStack([...digitstack,expression]);
    setresultStack([...resultstack,result]);
    
  };


  //build the stack of componenet include all data which is saved
  const SavedataStack= ()=>{
    return namestack.map((name, index) => (
      <Results key={index} name={name} digit={digitstack[index]} result={resultstack[index]} deletedatacallback={handleDataDelete} />
    ));
  }

    //when delete icon is pressed it delete the data from array
    const handleDataDelete = ({index}) => {
      // Create copies of the arrays to avoid directly modifying the state
      const updatedNameStack = [...namestack];
      const updatedDigitStack = [...digitstack];
      const updatedResultStack = [...resultstack];
    
      // Remove the data entry at the specified index from each array
      updatedNameStack.splice(index, 1);
      updatedDigitStack.splice(index, 1);
      updatedResultStack.splice(index, 1);
    
      // Update the state with the modified arrays
      setnameStack(updatedNameStack);
      setdigitStack(updatedDigitStack);
      setresultStack(updatedResultStack);
    };
    


    return(
        <>  
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5 vh-100">
                {/* Left component */}
                <Calculator DataChange={handleDataChange}/>

              </div>
              <div className="col-md-7">
                {/* Right component */}
                <Logout/>
                <h1 className='mt-2'>Your Calculations</h1>
                <div className='container-fluid border mt-4'>
                 <div className="col-12 d-flex flex-row ">
                  <div className='col-4'><h4 >Name</h4></div>
                  <div className='col-5'><h4 >Calculation</h4></div>
                  <div className='col-4'><h4 >Result</h4></div>
                </div> 
                </div>
                  <SavedataStack/>
                  
              </div>
            </div>
          </div>
        </>
    )
}



//componenet of stack data which is saved
const Results=(props)=>{

  //callback fuction call when clicked on delete button
  const callback=()=>{
    props.deletedatacallback({index:props.key});
  }
  
  const fetchdatacall=()=>{
    fetchdata({name:props.name,expression:props.digit,result:props.result });
  }

  return(
      <>
          <div className='container-fluid border'>
                 <div className="col-12 d-flex flex-row">
                  <div className='col-4'><h4 >{props.name}</h4></div>
                  <div className='col-5'><h4 >{props.digit}</h4></div>
                  <div className='col-1'><h4 >{props.result}</h4></div>
                  <button className="reload-button btn btn-sm" onClick={fetchdatacall}><i class="fas fa-sync-alt fs-xs"></i></button>
                  <button className='btn btn-sm fa-xs' onClick={callback}><i className="fas fa-trash-alt"></i></button>
                </div> 
          </div>
      </>
    );
}

//save data into database when user click on reload button
const fetchdata=({name,expression,result})=>{
  alert('Syncing the data')
  fetch('http://localhost:5000/saveHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id:sessionStorage.getItem('userId'), name,expression,result })
      })
        .then(response => {
          if (!response.ok) {
            alert('Netwoek Error ,cant\'t Sync');
          }

          return response.json();//convert json to object
        }).then(data => {

          if (data.hasOwnProperty('Error')) {
            alert(data.Error);
            return;
          }
          alert('Synced');
        });
}
export default Home;
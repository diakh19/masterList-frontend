import React,{useState,useEffect} from 'react'
import { deletePassenger, listPassengers } from '../services/PassengerService';
import { useNavigate } from 'react-router-dom';

export const ListPassengers = () => {
    const [passengers,setPassengers]=useState([]);
    
    const navigator=useNavigate();

    useEffect(()=>{
     getAllPassengers();
    },[])

    function getAllPassengers(){
        listPassengers().then((response)=>{
            setPassengers(response.data);
         }).catch(error=>{
            console.error(error);
         })
    }
    
    function addNewPassenger()
    {
      navigator('/add-passenger');
    }

    function updatePassenger(id){
        navigator(`/edit-passenger/${id}`);
    }

    function removePassenger(id){
         console.log(id);
         deletePassenger(id).then((response)=>{
            getAllPassengers();
         }).catch(error=>{
            console.error(error);
         })
    }

  return (
    <>
    {(passengers.length>0)?
    <div className='container' style={{marginTop:"75px",marginBottom:"80px"}}>
        <h2 className='text-center'> SAVED PASSENGERS</h2>
        <button className='btn btn-outline-dark mb-2'onClick={addNewPassenger}>ADD PASSENGER</button>
        <div className='table-responsive'>
        <table className='table table-striped table-hover table-bordered'>
            <thead>
                <tr>
                    <th style={{verticalAlign:"middle"}}>S.NO.</th>
                    <th style={{verticalAlign:"middle"}}>Passenger Name</th>
                    <th style={{verticalAlign:"middle"}}>Passenger Type</th>
                    <th style={{verticalAlign:"middle"}}>Gender</th>
                    <th style={{verticalAlign:"middle"}}>Berth</th>
                    <th style={{verticalAlign:"middle"}}>Food</th>
                    <th style={{verticalAlign:"middle"}}>DOB</th>
    
                    <th style={{verticalAlign:"middle"}}>ID type</th>
                    <th style={{verticalAlign:"middle"}}>Id no.</th>
                    <th style={{verticalAlign:"middle"}}>Senior Citizen</th>
                    <th style={{verticalAlign:"middle"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    passengers.map((passenger,num)=>
                        <tr key={passenger.id}>
                            <td>{num+1}</td>
                           <td style={{verticalAlign:"middle"}}>{passenger.fullName}</td>
                           <td style={{verticalAlign:"middle"}}>{passenger.passengerType}</td>
                           <td style={{verticalAlign:"middle"}}>{passenger.gender}</td>
                           <td style={{verticalAlign:"middle"}}>{passenger.berth}</td>
                           <td style={{verticalAlign:"middle"}}>{passenger.food}</td>
                           <td style={{verticalAlign:"middle"}}>{passenger.dob}</td>
                           <td style={{verticalAlign:"middle"}}>{passenger.idType}</td>
                           <td style={{verticalAlign:"middle"}}>{passenger.idNumber}</td>
                           <td style={{verticalAlign:"middle"}}>{passenger.seniorCitizen?'true':'false'}</td>
                           
                           <td style={{display:"flex",justifyContent:"space-between"}}>
                            <button className='btn btn-info ' onClick={()=> updatePassenger(passenger.id)}>Update</button>
                            <button className='btn btn-danger' onClick={()=>removePassenger(passenger.id)} style={{marginLeft:"10px"}}>Delete</button>
                           </td>
                        </tr>)
                }
                
            </tbody>
        </table>
        </div>
              </div>
              : <div className="text-center" style={{ marginTop: "25%" }}>
                  <h2 className='text-center ' > NO ACTIVE  PASSENGERS</h2>
                  <button type="button" className='btn btn-outline-dark mb-2 mt-2' onClick={addNewPassenger}>ADD PASSENGER</button>
              </div>

            }
     </>
  )
}


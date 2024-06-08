import React, { useState, useEffect } from 'react'
import { deletePassenger, listPassengers } from '../services/PassengerService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { toast } from "react-toastify"

export const ListPassengers = () => {
    const [passengers, setPassengers] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllPassengers();
    }, [])

    function getAllPassengers() {
        listPassengers().then((response) => {
            setPassengers(response.data);
        }).catch(error => {
            console.error(error);
            alert("Connection with Server is lost.Passengers list is not accessible at moment.Please try again after some time")
        })
    }

    function addNewPassenger() {
        navigator('/add-passenger');
    }

    function updatePassenger(id) {
        navigator(`/edit-passenger/${id}`);
    }

    function removePassenger(id) {
        console.log(id);
        deletePassenger(id).then((response) => {
            getAllPassengers();

        }).catch(error => {
            console.error(error);
            alert("Connection with Server is lost .Passenger is not deleted.Please try again after some time")
        })
        alert("Passenger deleted successfully");
    }

    return (
        <>
            {(passengers.length > 0) ?
                <div className='container container1' >

                    <h2 className='text-center margin' > SAVED PASSENGERS</h2>
                    <button className='btn btn-outline-dark mb-2' onClick={addNewPassenger}>ADD PASSENGER</button>
                    <div className='table-responsive'>
                        <table className='table table-striped table-hover table-bordered'>
                            <thead>
                                <tr>
                                    <th >S.NO.</th>
                                    <th >Passenger Name</th>
                                    <th >Passenger Type</th>
                                    <th >Gender</th>
                                    <th >Berth</th>
                                    <th >Food</th>
                                    <th >DOB</th>
                                    <th >ID type</th>
                                    <th >Id No.</th>
                                    <th >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    passengers.map((passenger, num) =>
                                        <tr key={passenger.id}>
                                            <td>{num + 1}</td>
                                            <td >{passenger.fullName}</td>
                                            <td >{passenger.passengerType}</td>
                                            <td >{passenger.gender}</td>
                                            <td >{passenger.berth}</td>
                                            <td >{passenger.food}</td>
                                            <td >{passenger.dob}</td>
                                            <td >{passenger.idType}</td>
                                            <td >{passenger.idNumber}</td>
                                            <td >
                                                <div className="actions ">
                                                    <button className='btn btn-info ' onClick={() => updatePassenger(passenger.id)}>Update</button>
                                                    <button className='btn btn-danger' onClick={() => removePassenger(passenger.id)} style={{ marginLeft: "10px" }}>Delete</button>
                                                </div>

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


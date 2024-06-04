import React, { useState, useEffect } from 'react'
import { deletePassenger, listPassengers } from '../services/PassengerService';
import { useNavigate } from 'react-router-dom';

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
                                    <th className="items">S.NO.</th>
                                    <th className="items">Passenger Name</th>
                                    <th className="items">Passenger Type</th>
                                    <th className="items">Gender</th>
                                    <th className="items">Berth</th>
                                    <th className="items">Food</th>
                                    <th className="items">DOB</th>
                                    <th className="items">ID type</th>
                                    <th className="items">Id no.</th>
                                    <th className="items">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    passengers.map((passenger, num) =>
                                        <tr key={passenger.id}>
                                            <td>{num + 1}</td>
                                            <td className="items">{passenger.fullName}</td>
                                            <td className="items">{passenger.passengerType}</td>
                                            <td className="items">{passenger.gender}</td>
                                            <td className="items">{passenger.berth}</td>
                                            <td className="items">{passenger.food}</td>
                                            <td className="items">{passenger.dob}</td>
                                            <td className="items">{passenger.idType}</td>
                                            <td className="items">{passenger.idNumber}</td>
                                            <td className="actions">
                                                <button className='btn btn-info ' onClick={() => updatePassenger(passenger.id)}>Update</button>
                                                <button className='btn btn-danger' onClick={() => removePassenger(passenger.id)} style={{ marginLeft: "10px" }}>Delete</button>
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


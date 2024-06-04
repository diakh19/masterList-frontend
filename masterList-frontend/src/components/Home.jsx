import React from 'react'
import '../Passenger.css';

export const Home = () => {
    return (
        <div>
            <div className='image'>
                <div className="card mx-auto outer" >
                    <img className="card-img-top" src="src/images/passenger.png" alt="Card image cap"></img>
                    <div className="card-body text-center">
                        <h5 className="card-title">My Profile</h5>
                        <p className="card-text">LETS BEGIN THE JOURNEY!!</p>
                        <div className='actions'>
                            <a href="/passengers" className="btn btn-primary" style={{ marginRight: "10px" }}>VIEW / MODIFY PASSENGERS</a>
                            <a href='/add-passenger' className="btn btn-primary" >ADD PASSENGER</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

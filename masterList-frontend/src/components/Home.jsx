import React from 'react'
import '../Passenger.css';

export const Home = () => {
    return (
        <div>
            <div style={{ backgroundImage: "url(src/images/train.jpg)", width: '100%', height: "100vh", backgroundRepeat: "round", backgroundsize: "cover", overflow: "scroll" }}>
                <div className="card " style={{ width: "20rem", margin: "auto", marginTop: "15%" ,marginBottom:"80px"}}>
                    <img className="card-img-top" src="src/images/passenger.png" alt="Card image cap"></img>
                    <div className="card-body text-center">
                        <h5 className="card-title">My Profile</h5>
                        <p className="card-text">LETS BEGIN THE JOURNEY!!</p>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <a href="http://localhost:3000/passengers" className="btn btn-primary" style={{ marginRight: "10px" }}>VIEW / MODIFY PASSENGERS</a>
                            <a href='http://localhost:3000/add-passenger' className="btn btn-primary" >ADD PASSENGER</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

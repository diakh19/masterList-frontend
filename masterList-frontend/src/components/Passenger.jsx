import React, { useEffect, useState } from 'react'
import { createPassenger, getPassenger, updatePassenger } from '../services/PassengerService';
import { useNavigate, useParams } from 'react-router-dom';
import '../Passenger.css';
import Form from 'react-bootstrap/Form';



export const Passenger = () => {

  const [fullName, setFullName] = useState('');
  const [passengerType, setPassengerType] = useState('');
  const [gender, setGender] = useState('');
  const [berth, setBerth] = useState('');
  const [food, setFood] = useState('');
  const [dob, setDob] = useState('');
  const [seniorCitizen, setIsSenior] = useState(false);
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNo] = useState('');


  const [errors, setErrors] = useState({
    fullName: '',
    passengerType: '',
    gender: '',
    berth: '',
    food: '',
    dob: '',
    idType: '',
    idNumber: ''
  })
  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getPassenger(id).then((response) => {
        setFullName(response.data.fullName);
        setPassengerType(response.data.passengerType);
        setGender(response.data.gender);
        setBerth(response.data.berth);
        setFood(response.data.food);
        setDob(response.data.dob);
        setIsSenior(response.data.seniorCitizen);
        setIdType(response.data.idType);
        setIdNo(response.data.idNumber);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])


  function saveOrUpdatePassenger(e) {
    e.preventDefault();
    if (validateForm()) {
      const passenger = { fullName, passengerType, gender, berth, food, dob, seniorCitizen, idType, idNumber };
      // console.log(passenger);
      if (id) {
        updatePassenger(id, passenger).then((response) => {
          // console.log(response.data);
          navigator('/passengers');
        }).catch(error => {
          console.error(error);
        })
      }
      else {
        createPassenger(passenger).then((response) => {
          // console.log(response.data);
          navigator('/passengers');
        }).catch(error => {
          console.error(error);
        })
      }
    }
  }

  function resetAll(e) {
    setBerth('');
    setDob('');
    setFood('');
    setFullName('');
    setGender('');
    setIdNo('');
    setIdType('');
    setIsSenior('false');
    setPassengerType('');
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors }
    if (fullName.trim()) {
      errorsCopy.fullName = '';
    }
    else {
      errorsCopy.fullName = "Full name is required";
      valid = false;
    }

    if (passengerType.trim()) {
      errorsCopy.passengerType = '';
    }
    else {
      errorsCopy.passengerType = "passenger Type is required";
      valid = false;
    }

    if (gender.trim()) {
      errorsCopy.gender = '';
    }
    else {
      errorsCopy.gender = "gender is required";
      valid = false;
    }

    if (berth.trim()) {
      errorsCopy.berth = '';
    }
    else {
      errorsCopy.berth = "berth is required";
      valid = false;
    }

    if (food.trim()) {
      errorsCopy.food = '';
    }
    else {
      errorsCopy.food = "food is required";
      valid = false;
    }

    if (dob.trim()) {
      errorsCopy.dob = '';
    }
    else {
      errorsCopy.dob = "DOB is required";
    }

    if (idType.trim()) {
      errorsCopy.idType = '';
    }
    else {
      errorsCopy.idType = "field is required";
      valid = false;
    }

    if (idType != 'NOID') {
      if (idNumber.trim()) {
        errorsCopy.idNumber = '';
      }
      else {
        errorsCopy.idNumber = "field is required";
        valid = false;
      }
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className='text-center'>Update Passenger</h2>
    }
    else {
      return <h2 className='text-center'>Add Passenger</h2>
    }
  }

  const onchange = (event) => setBerth(event.target.value);
  const onchangeF = (event) => setFood(event.target.value);
  const onchangeS = (event) => 
  {
    if (event.target.value == 'YES')
      setIsSenior(true);
    else
      setIsSenior(false);
  }

  const onchangeI = (event) =>  setIdType(event.target.value);
  
  return (
    <div className='card offset-md-3 offset-md-3' style={{ width: "50em", marginTop: "114px", marginBottom: "80px" }}>
      <br></br>
      <div className='card-body'>

        <h1 className="heading"> {pageTitle()} </h1>

        <Form>
          <div className={`mb-3 row border-0 form-control ${errors.passengerType ? 'is-invalid' : ''}`} style={{ display: "flex" }}>
            <label htmlFor="passengerType" className="col-sm-3 col-form-label">Passenger type</label>
            <div className="col-sm-9" style={{ paddingTop: "calc(.375rem + var(--bs-border-width))" }}>
              <div className="form-check form-check-inline">Name
                <input className="form-check-input" type="radio" name="passengerType" id="passengerType1" value="Normal User" onChange={(e) =>
                  setPassengerType(e.target.value)} checked={passengerType === "Normal User"} />
                <label className="form-check-label" for="passengerType1">Normal User</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="passengerType" id="passengerType2" value="Person With Disablity/Escort" onChange={(e) =>
                  setPassengerType(e.target.value)} checked={passengerType === "Person With Disablity/Escort"} />
                <label className="form-check-label" for="passengerType2">Person With Disablity/Escort</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="passengerType" id="passengerType3" value="Journalist" onChange={(e) =>
                  setPassengerType(e.target.value)} checked={passengerType === "Journalist"} />
                <label className="form-check-label" for="passengerType3">Journalist</label>
              </div>
              {errors.passengerType && <div className='invalid-feedback' style={{ display: "flex" }}>{errors.passengerType}</div>}
            </div>
          </div>



          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Name*:</label>
            <div className="col-sm-7">
              <input type="text" placeholder='Enter Passenger name'
                name='fullName'
                value={fullName} className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} id="inputPassword"
                onChange={(e) => setFullName(e.target.value)} />
              {errors.fullName && <div className='invalid-feedback'>{errors.fullName}</div>}
            </div>
          </div>


          <div className="mb-3 row">
            <label htmlFor="inputDate" className="col-sm-3 col-form-label">Date Of Birth*:</label>
            <div className="col-sm-7">
              <input type="date" placeholder='Enter Passenger DOB'
                name='dob'
                value={dob}
                className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                onChange={(e) =>
                  setDob(e.target.value)} for="inputDate" />
              {errors.dob && <div className='invalid-feedback'>{errors.dob}</div>}
            </div>
          </div>



          <div className={`mb-3 row border-0 form-control ${errors.passengerType ? 'is-invalid' : ''}`} style={{ display: "flex" }}>
            <label htmlFor="gender" className="col-sm-3 col-form-label">Gender*:</label>
            <div className="col-sm-7 " style={{ paddingTop: "calc(.375rem + var(--bs-border-width))" }}>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" id="male" value="MALE" onChange={(e) =>
                  setGender(e.target.value)} checked={gender === "MALE"} />
                <label className="form-check-label" for="male">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" value="FEMALE" name="gender" onChange={(e) =>
                  setGender(e.target.value)} checked={gender === "FEMALE"} id="female" />
                <label className="form-check-label" for="female">Female</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" value="TRANS" name="gender" onChange={(e) =>
                  setGender(e.target.value)} checked={gender === "TRANS"} id="trans" />
                <label className="form-check-label" for="trans">TransGender</label>
              </div>
              {errors.gender && <div className='invalid-feedback' style={{ display: "flex" }}>{errors.gender}</div>}
            </div>
          </div>


          <div className="mb-3 row">
            <label htmlFor="berth" className="col-sm-3 col-form-label">Berth preference*:</label>
            <div className="col-sm-7">
              <select name="berth" id="berth" onChange={onchange} className={` form-select form-control ${errors.berth ? 'is-invalid' : ''}`}  >
                <option selected disabled value="">Select Berth Preference</option>
                <option value='Lower' id='Lower' selected={berth === 'Lower' ? true : false}>Lower</option>
                <option value='Middle' id='Middle' selected={berth === 'Middle' ? true : false}  >Middle</option>
                <option value='Upper' id='Upper' selected={berth === 'Upper' ? true : false}  >Upper</option>
                <option value='No Preference' id='No Preference' selected={berth === 'No Preference' ? true : false} >No Preference</option>
              </select>
              {errors.berth && <div className='invalid-feedback'>{errors.berth}</div>}
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="food" className="col-sm-3 col-form-label">Food Choice*:</label>
            <div className="col-sm-7">
              <select name="food" id="food" onChange={onchangeF} className={` form-select form-control ${errors.food ? 'is-invalid' : ''}`}  >
                <option selected disabled value="">Select Food choice</option>
                <option value='VEG' id='VEG' selected={food === 'VEG' ? true : false}>VEG</option>
                <option value='NONVEG' id='NONVEG' selected={food === 'NONVEG' ? true : false}  >NON-VEG</option>
                <option value='NOFOOD' id='NOFOOD' selected={food === 'NOFOOD' ? true : false}  >NO FOOD</option>
              </select>
              {errors.food && <div className='invalid-feedback'>{errors.food}</div>}
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="seniorCitizen" className="col-sm-3 col-form-label">Senior Citizen Concession:</label>
            <div className="col-sm-7">
              <select name="seniorCitizen" id="seniorCitizen" onChange={onchangeS} className='form-select'  >
                <option selected disabled value="">Select Concession</option>
                <option value='YES' id='YES' selected={seniorCitizen == true}>YES</option>
                <option value='NO' id='NO' selected={seniorCitizen == false}  >NO</option>
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="idType" className="col-sm-3 col-form-label">Id Card Type:</label>
            <div className="col-sm-7">
              <select name="idType" id="idType" onChange={onchangeI} className={` form-select form-control ${errors.idType ? 'is-invalid' : ''}`}  >
                <option selected disabled value="">Select ID TYPE</option>
                <option value='PAN' id='PAN' selected={idType === 'PAN' ? true : false}>PAN CARD</option>
                <option value='AADHAAR' id='AADHAAR' selected={idType === 'AADHAAR' ? true : false}  >AADHAAR CARD</option>
                <option value='NOID' id='NOID' selected={idType === 'NOID' ? true : false}  >NO ID</option>
              </select>
              {errors.idType && <div className='invalid-feedback'>{errors.idType}</div>}
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="idNumber" className="col-sm-3 col-form-label">Id Card Number:</label>
            <div className="col-sm-7">
              <input
                type='text'
                placeholder='Id Card Number'
                name='idNumber'
                disabled={idType === 'NOID' ? true : false}
                value={idNumber}
                className={`form-control ${errors.idNumber ? 'is-invalid' : ''}`}
                onChange={(e) => setIdNo(e.target.value)} id='idNumber'
              />
              {errors.idNumber && <div className='invalid-feedback'>{errors.idNumber}</div>}
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <button type="button" class="btn btn-primary btn-lg" onClick={saveOrUpdatePassenger} style={{ marginRight: "25px" }}
            >Save</button>
            <button type="button" class="btn btn-secondary btn-lg" onClick={resetAll} >Reset</button>
          </div>

        </Form>
      </div>
    </div>
  )
}
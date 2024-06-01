import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createPassenger, getPassenger, updatePassenger, listPassengers } from '../services/PassengerService';
import { useNavigate, useParams } from 'react-router-dom';
import '../Passenger.css';
import Form from 'react-bootstrap/Form';


export const Passenger = () => {

  const navigator = useNavigate();
  const { id } = useParams();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    passengerType: Yup.string().required('passenger Type is required'),
    gender: Yup.string().required('gender is required'),
    berth: Yup.string().required('berth preference is required'),
    food: Yup.string().required('Food choice is required'),
    dob: Yup.string().required('dob is required'),

    idType: Yup.string().required('id Type is required'),
    idNumber: Yup.string().required('Card Number is required')

  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    if (id) {
      getPassenger(id).then((response) => {
        reset(response.data);
      }).catch(error => {
        console.error(error);
      });
    }
  }, [id, reset]);

  useEffect(() => {
    listPassengers().then((response) => {
      setPassengers(response.data);
    }).catch(error => {
      console.error(error);
    }

    )
  }, []);

  const onSubmit = (data) => {
    if (id) {
      getPassenger(id).then((response) => {
        if (((response.data.idType === data.idType) && (response.data.idNumber === data.idNumber)) || ((response.data.idType != data.idType) && (response.data.idNumber != data.idNumber))) {
          updatePassenger(id, data).then((response) => {

            navigator('/passengers');
          }).catch(error => {
            console.error(error);
          })
        }

        else {
          alert("Passenger can't be updated as another passenger with same id no and type exists already")
          navigator('/passengers');

        }

      })
    }
    else {
      if (isDuplicate(data)) {
        alert("Passenger already exists");
        reset();
      }
      else {
        createPassenger(data).then(() => {
          navigator('/passengers');
        }).catch(error => {
          console.error(error);
        });
      }

    }
  };


  const isDuplicate = (passenger) => {
    return passengers.some(p => p.idType === passenger.idType && p.idNumber === passenger.idNumber);
  };

  const pageTitle = () => {
    return id ? <h2 className='text-center'>Update Passenger</h2> : <h2 className='text-center'>Add Passenger</h2>
  }


  const pageBottom = () => {
    return id ? <div style={{ display: "flex" }}><button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting} style={{ marginRight: "25px" }}
    >Update</button> </div> : (<div style={{ display: "flex" }}>
      <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting} style={{ marginRight: "25px" }}
      >Save</button>
      <button type="reset" className="btn btn-secondary btn-lg" onClick={reset} style={{ marginRight: "25px" }}>Reset</button> </div>)
  }


  return (
    <>
      <div style={{
        margin: "50px", justifyContent: "center",
        display: "flex"
      }}>
        <div className='card ' style={{ width: "50em", marginTop: "100px", marginBottom: "80px" }}>
          <br></br>
          <div className='card-body'>
            <button type='button' className="btn btn-outline-dark" onClick={() => navigator('/passengers')}>&lt;-</button>
            <h1 className="heading"> {pageTitle()} </h1>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className={`mb-3 row border-0 form-control ${errors.passengerType ? 'is-invalid' : ''}`} style={{ display: "flex" }}>
                <label htmlFor="passengerType" className="col-sm-3 col-form-label">Passenger type</label>
                <div className="col-sm-9" style={{ paddingTop: "calc(.375rem + var(--bs-border-width))" }}>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="passengerType" id="passengerType1" value="Normal User" {...register('passengerType')} />
                    <label className="form-check-label" htmlFor="passengerType">Normal User</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="passengerType" id="passengerType2" value="Person With Disablity/Escort" {...register('passengerType')} />
                    <label className="form-check-label" htmlFor="passengerType">Person With Disablity/Escort</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="passengerType" id="passengerType3" value="Journalist"{...register('passengerType')} />
                    <label className="form-check-label" htmlFor="passengerType">Journalist</label>
                  </div>
                  {errors.passengerType && <div className='invalid-feedback' style={{ display: "flex" }}>{errors.passengerType.message}</div>}
                </div>
              </div>



              <div className="mb-3 row">
                <label htmlFor="fullName" className="col-sm-3 col-form-label">Name*:</label>
                <div className="col-sm-7" name='fullName'>
                  <input type="text" placeholder='Enter Passenger name'
                    name='fullName'

                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} id="inputPassword"
                    {...register('fullName')} />
                  {errors.fullName && <div className='invalid-feedback'>{errors.fullName.message}</div>}
                </div>
              </div>


              <div className="mb-3 row">
                <label htmlFor="dob" className="col-sm-3 col-form-label">Date Of Birth*:</label>
                <div className="col-sm-7">
                  <input type="date" placeholder='Enter Passenger DOB'
                    name='dob'

                    className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                    id='dob'
                    {...register('dob')} />
                  {errors.dob && <div className='invalid-feedback'>{errors.dob.message}</div>}
                </div>
              </div>



              <div className={`mb-3 row border-0 form-control ${errors.passengerType ? 'is-invalid' : ''}`} style={{ display: "flex" }}>
                <label htmlFor="gender" className="col-sm-3 col-form-label">Gender*:</label>
                <div className="col-sm-7 " style={{ paddingTop: "calc(.375rem + var(--bs-border-width))" }}>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" id="male" value="MALE" {...register('gender')} />
                    <label className="form-check-label" htmlFor="gender">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="FEMALE" name="gender" {...register('gender')} id="female" />
                    <label className="form-check-label" htmlFor="gender">Female</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="TRANS" name="gender" {...register('gender')} id="trans" />
                    <label className="form-check-label" htmlFor="gender">TransGender</label>
                  </div>
                  {errors.gender && <div className='invalid-feedback' style={{ display: "flex" }}>{errors.gender.message}</div>}
                </div>
              </div>


              <div className="mb-3 row">
                <label htmlFor="berth" className="col-sm-3 col-form-label">Berth preference*:</label>
                <div className="col-sm-7">
                  <select name="berth" id="berth" className={` form-select form-control ${errors.berth ? 'is-invalid' : ''}`} {...register('berth')} >
                    <option selected value="">Select Berth Preference</option>
                    <option value='Lower' id='Lower' >Lower</option>
                    <option value='Middle' id='Middle'  >Middle</option>
                    <option value='Upper' id='Upper'   >Upper</option>
                    <option value='No Preference' id='No Preference'  >No Preference</option>
                  </select>
                  {errors.berth && <div className='invalid-feedback'>{errors.berth.message}</div>}
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor="food" className="col-sm-3 col-form-label">Food Choice*:</label>
                <div className="col-sm-7">
                  <select name="food" id="food" className={` form-select form-control ${errors.food ? 'is-invalid' : ''}`}  {...register('food')}   >
                    <option selected value="">Select Food choice</option>
                    <option value='VEG' id='VEG' >VEG</option>
                    <option value='NON-VEG' id='NONVEG'   >NON-VEG</option>
                    <option value='NO FOOD' id='NOFOOD'  >NO FOOD</option>
                  </select>
                  {errors.food && <div className='invalid-feedback'>{errors.food.message}</div>}
                </div>
              </div>


              <div className="mb-3 row">
                <label htmlFor="idType" className="col-sm-3 col-form-label">Id Card Type:</label>
                <div className="col-sm-7">
                  <select name="idType" id="idType" className={` form-select form-control ${errors.idType ? 'is-invalid' : ''}`} {...register('idType')} >
                    <option selected value="">Select ID TYPE</option>
                    <option value='PAN' id='PAN' >PAN CARD</option>
                    <option value='AADHAAR' id='AADHAAR'   >AADHAAR CARD</option>

                  </select>
                  {errors.idType && <div className='invalid-feedback'>{errors.idType.message}</div>}
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor="idNumber" className="col-sm-3 col-form-label">Id Card Number:</label>
                <div className="col-sm-7">
                  <input
                    type='text'
                    placeholder='Id Card Number'
                    name='idNumber'

                    // value={idNumber}
                    className={`form-control ${errors.idNumber ? 'is-invalid' : ''}`}
                    {...register('idNumber')} id='idNumber'
                  />
                  {errors.idNumber && <div className='invalid-feedback'>{errors.idNumber.message}</div>}
                </div>
              </div>

              {/* <div style={{ display: "flex" }}>
                <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting} style={{ marginRight: "25px" }}
                >Save</button>
                <button type="reset" className="btn btn-secondary btn-lg" onClick={reset} style={{ marginRight: "25px"} } >Reset</button>
                
              </div> */}
              {pageBottom()}

            </Form>
          </div>
        </div>
      </div>




    </>
  )
}
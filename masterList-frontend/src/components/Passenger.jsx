import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createPassenger, getPassenger, updatePassenger, listPassengers } from '../services/PassengerService';
import { useNavigate, useParams } from 'react-router-dom';
import '../Passenger.css';
import Form from 'react-bootstrap/Form';
import { PageTitle } from '../Helpers/PageTitle';
import { PageBottom } from '../Helpers/PageBottom';
import { toast } from 'react-toastify';


export const Passenger = () => {

  const navigator = useNavigate();
  const { id } = useParams();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required')
      .min(2, 'Full Name must be at least 2 characters')
      .max(25, 'Full Name must not exceed 25 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Full Name must contain only letters and spaces'),

    passengerType: Yup.string().required('passenger Type is required'),
    gender: Yup.string().required('gender is required'),
    berth: Yup.string().required('berth preference is required'),
    food: Yup.string().required('Food choice is required'),
    dob: Yup.date()
    .required('dob is required')
    .max(new Date(),'Date Of Birth cannot be in future')
    .min(new Date('1900-01-01'),'Date Of Birth cannot be before 1st january,1900'),

    idType: Yup.string().required('id Type is required'),

    idNumber: Yup.string()
      .required('ID number is required')
      .length(10,'Id number must be exactly 10 characters long')
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [passengers, setPassengers] = useState([]);

  const [passenger, setPassenger] = useState();

  useEffect(() => {
    if (id) {
      getPassenger(id).then((response) => {
        setPassenger(response.data);
        reset(response.data);

      }).catch(error => {
        console.error(error);
        alert("Connection with server lost.Passenger can't be retrieved right now.Try again later")
      });
    }
  }, [id, reset]);

  useEffect(() => {
    listPassengers().then((response) => {
      setPassengers(response.data);
    }).catch(error => {
      console.error(error);
    })
  }, []);

  const onSubmit = async (data) => {
    if (id) {
      if (((passenger.idType === data.idType) && (passenger.idNumber === data.idNumber)) || ((passenger.idType != data.idType)&&(passenger.idNumber != data.idNumber))) {
        try {
          await updatePassenger(id, data)
          navigator('/passengers');
        }
        catch (error) {
          console.error(error);
          alert('Connection with server lost.Passenger is not  updated right now .Please try again after some time')
        }
      }
      else {
        alert("Connection with server lost.Passenger can't be updated as another passenger with same id no and type exists already")
        navigator('/passengers');
      }
    }

    else {
      if (isDuplicate(data)) {
        alert("Passenger already exists");
        reset();
      }
      else {
        try {
          await createPassenger(data)
          navigator('/passengers');
        }
        catch (error) {
          console.error(error);
          alert('Connection with server lost.New Passenger is not created at moment.Please try again after some time')
        }
      }
    }
  };

  const isDuplicate = (passenger) => {
    return passengers.some(p => p.idType === passenger.idType && p.idNumber === passenger.idNumber);
  };

  return (
    <>
      <div className='top'>
        <div className='card top1'>
          <br></br>
          <div className='card-body'>
            <button type='button' className="btn btn-outline-dark" onClick={() => navigator('/passengers')}>&lt;-</button>
            <div className='d'>
              <h1 className="heading"><PageTitle id={id} /></h1>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)} style={{ padding: "11px" }}>
              <div className={`mb-3 row border-0 form-control ${errors.passengerType ? 'is-invalid' : ''}`} style={{ display: "flex" }}>
                <label htmlFor="passengerType" className="col-sm-3 col-form-label" style={{ paddingLeft: "0px" }}>Passenger type</label>
                <div className="col-sm-9 row rad" style={{paddingLeft:"20px"}}>
                  <div className="col-xs-9 col-md-3  form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="passengerType" id="passengerType1" value="Normal User" {...register('passengerType')} />
                    <label className="form-check-label" htmlFor="passengerType1">Normal User</label>
                  </div>
                  <div className="col-xs-9 col-md-3  form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="passengerType" id="passengerType2" value="Person With Disablity/Escort" {...register('passengerType')} />
                    <label className="form-check-label" htmlFor="passengerType2">Person With Disablity/Escort</label>
                  </div>
                  <div className="col-xs-9 col-md-3 form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="passengerType" id="passengerType3" value="Journalist"{...register('passengerType')} />
                    <label className="form-check-label" htmlFor="passengerType3">Journalist</label>
                  </div>
                  {errors.passengerType && <div className='invalid-feedback' style={{ display: "flex" }}>{errors.passengerType.message}</div>}
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor="fullName" className="col-sm-3 col-form-label">Name*:</label>
                <div className="col-sm-7" name='fullName'>
                  <input type="text" placeholder='Enter Passenger name'
                    name='fullName'
                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} id="fullName"
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

              <div className={`mb-3 row border-0 form-control ${errors.gender ? 'is-invalid' : ''}`} style={{ display: "flex" }}>
                <label htmlFor="gender" className="col-sm-3 col-form-label" style={{ paddingLeft: "0px" }}>Gender*:</label>
                <div className="col-sm-9 row rad " style={{paddingLeft:"20px"}} >
                  <div className="col-xs-9 col-md-3 form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" id="gender1" value="MALE" {...register('gender')} />
                    <label className="form-check-label" htmlFor="gender1">Male</label>
                  </div>
                  <div className=" col-xs-9 col-md-3 form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="FEMALE" name="gender" {...register('gender')} id="gender2" />
                    <label className="form-check-label" htmlFor="gender2">Female</label>
                  </div>
                  <div className="col-xs-9 col-md-3 form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="TRANS" name="gender" {...register('gender')} id="gender3" />
                    <label className="form-check-label" htmlFor="gender3">TransGender</label>
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
                    className={`form-control ${errors.idNumber ? 'is-invalid' : ''}`}
                    {...register('idNumber')} id='idNumber'
                  />
                  {errors.idNumber && <div className='invalid-feedback'>{errors.idNumber.message}</div>}
                </div>
              </div>

              <PageBottom id={id} reset={reset} isSubmitting={isSubmitting} />
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
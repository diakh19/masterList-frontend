import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/passengers";

export const listPassengers = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createPassenger = (passenger) => axios.post(REST_API_BASE_URL, passenger);

export const getPassenger = (passengerId) => axios.get(REST_API_BASE_URL + '/' + passengerId);

export const updatePassenger = (passengerId, passenger) => axios.put(REST_API_BASE_URL + '/' + passengerId, passenger);

export const deletePassenger = (passengerId) => axios.delete(REST_API_BASE_URL + '/' + passengerId);
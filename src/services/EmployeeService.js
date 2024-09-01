import axios from "axios";

const REST_API_BASE_URL ="http://localhost:9091/api/v1/employees";

export const listEmployees = () => axios.get (REST_API_BASE_URL);

export const createEmployee =(employee) => axios.post(REST_API_BASE_URL, employee);
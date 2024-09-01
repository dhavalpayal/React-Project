import React, { useState,useEffect } from 'react';
import { createEmployee, getEmployee, upadateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailId, setEmailId] = useState('')
  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    emailId: ''
  })

  const navigateor = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmailId(response.data.emailId);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])

  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (validateForm()) {

      const employee = { firstName, lastName, emailId }
      console.log(employee)

      if (id) {
        upadateEmployee(id, employee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error => {
          console.error(error);
        })
      } else {
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigateor('/')
        }).catch(error => {
          console.error(error);
        })
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors }

    if (firstName.trim()) {
      errorsCopy.firstName = '';
    }
    else {
      errorsCopy.firstName = 'FirstName is required';
      valid = false;
    }

    if (firstName.trim()) {
      errorsCopy.lastName = '';
    }
    else {
      errorsCopy.lastName = 'LastName is required';
      valid = false;
    }

    if (firstName.trim()) {
      errorsCopy.emailId = '';
    }
    else {
      errorsCopy.emailId = 'Email is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className='text-center'>Update Employee</h2>
    }
    else {
      return <h2 className='text-center'>Add Employee</h2>
    }
  }

  return (
    <div className='container'>
      <br /><br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-lable'>First Name:</label>
                <input
                  type='text'
                  placeholder='Enter Employee FirstName'
                  name='firstName'
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value)}>
                </input>
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-lable'>Last Name:</label>
                <input
                  type='text'
                  placeholder='Enter Employee LastName'
                  name='lastName'
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value)}>
                </input>
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-lable'>Email:</label>
                <input
                  type='text'
                  placeholder='Enter Employee EmailId'
                  name='emailId'
                  value={emailId}
                  className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmailId(e.target.value)}>
                </input>
                {errors.emailId && <div className='invalid-feedback'>{errors.emailId}</div>}
              </div>

              <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent
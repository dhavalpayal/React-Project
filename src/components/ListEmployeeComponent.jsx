import React, {useEffect, useState} from 'react'
import { listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'


const ListEmployeeComponent = () => {
    const [employee, setEmployee] = useState([])
    const navigateor = useNavigate();
    
    useEffect (() => {
        listEmployees().then((response) => {
           //setEmployee=response.data;

            // employees=response.data;
            console.log(employee);
            setEmployee(response.data);
        }) .catch(error => {
                 console.error (error);
        })
    }, [])

    function addNewEmployee(){
          navigateor('/add-employee');
    }

    function updateEmployee(id){
        navigateor(`/edit-employee/ ${id}`)
    }
    
  return (
    <div className='container'>
        <h2 className='text-center'>List of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-borderd'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    employee.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.emailId}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent
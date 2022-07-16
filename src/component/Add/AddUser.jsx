import React, { useState, useEffect } from 'react'
import { useFormik, Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { City } from 'country-state-city';
import { filteredDivisions, getStateCode, validate } from './Useable';
import axios from 'axios';
import { toast } from "react-toastify";

const AddUser = () => {

    const history = useHistory();
    const [adduser, setAdduser] = useState({
        first_name: '',
        last_name: '',
        user_type: '',
        division:'',
        district:'',
    });
    const handleInput = (e) => {
        e.preventDefault();
        setAdduser({...adduser, [e.target.name]:e.target.value});
    }

    const stateCode = getStateCode(adduser.division);
    //to get all the cities of a particular state;
    let citiesOfState = City.getCitiesOfState("BD", stateCode);
    
    const userSubmit = (e) => {
        e.preventDefault(e);
        const data = {
            first_name:adduser.first_name,
            last_name:adduser.last_name,
            user_type:adduser.user_type,
            division:adduser.division,
            district:adduser.district,
        }
        axios.post(`https://60f2479f6d44f300177885e6.mockapi.io/users`,data).then(res=>{
            if(res.data){
                toast.success('User Addedd Successfully');
                history.push("/");
            }
        })
    }


    return(
        <>
        <button className='btn btn-primary'  data-bs-toggle="modal" data-bs-target="#adduser">Add User</button>
        <div className="modal fade" id="adduser" aria-labelledby="adduserLabel" aria-hidden="true">
        <div className="modal-dialog add-new-user">
            <div className="modal-content">
                <div className="modal-header">
                    
                    <h5 className="modal-title" id="adduserLabel">Add New User</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={userSubmit}>
                    <div className='single-input'>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            required="required"
                            onChange={handleInput}
                            value={adduser.first_name}
                        />
                    </div>
                    <div className='single-input'>
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            required="required"
                            onChange={handleInput}
                            value={adduser.last_name}
                        />
                    </div>
                    <div className='single-input'>
                        <label htmlFor="role">User Role</label>
                        <select className="form-select" 
                        name="user_type"
                        onChange={handleInput}
                        value={adduser.user_type}
                        >
                            <option>User Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    {adduser.user_type=== 'employee' ?
                    <>
                        <div className='single-input'>
                            <label htmlFor="role">Division</label>
                            <select
                                id="division"
                                name="division"
                                className="form-select"
                                onChange={handleInput}
                                value={adduser.division}
                            >
                                <option value="">Select Division</option>
                                {
                                    filteredDivisions.map((division,idx) => {
                                        return (
                                            <option key={idx} value={division.name}>{division.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='single-input'>
                            <label htmlFor="role">District</label>

                            <select
                                id="district"
                                name="district"
                                className="form-select"
                                onChange={handleInput}
                                value={adduser.district}
                            >
                                <option value="">Select District</option>
                                {
                                    citiesOfState.map((city,idx) => {
                                        return (
                                            <option key={idx} value={city.name}>{city.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </>
                    :''
                    }
                    <div className='single-input'>
                        <button
                        type='submit'
                          className='btn btn-primary'>Submit User</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
export default AddUser;
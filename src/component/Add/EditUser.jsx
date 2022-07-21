import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { City } from 'country-state-city';
import { filteredDivisions, getStateCode, validate } from './Useable';

const EditUser = (props) => {
    const history = useHistory();
    const location = useLocation();

    const [updateuser, setAdduser] = useState({
        first_name:location.first_name,
        last_name:location.last_name,
        user_type:location.user_type,
        division:location.division,
        district:location.district,
    });
    const handleInput = (e) => {
        e.preventDefault();
        setAdduser({...updateuser, [e.target.name]:e.target.value});
    }

    const stateCode = getStateCode(updateuser.division);
    //to get all the cities of a particular state;
    let citiesOfState = City.getCitiesOfState("BD", stateCode);
    
    const userSubmit = (e) => {
        e.preventDefault(e);
        const data = updateuser;
        axios.put(`https://60f2479f6d44f300177885e6.mockapi.io/users/${location.id}`, data).then(res=>{
            if(res.data){
                toast.success('User Updated Successfully');
                history.push("/");
            }
        })
    }

    console.log(location.first_name);


    return(
        <div className="eidt-page mt-5 mb-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="card" >
                            <div className="card-header text-center">
                                <strong>Edit User</strong>
                            </div>
                            <div className="card-bdoy" style={{padding:'15px'}}>
                            <form onSubmit={userSubmit}>
                                <div className='single-input'>
                                    <label htmlFor="first_name">First Name </label>
                                    <input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        required="required"
                                        onChange={handleInput}
                                        value={updateuser.first_name}
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
                                        value={updateuser.last_name}
                                    />
                                </div>
                                <div className='single-input'>
                                    <label htmlFor="role">User Role</label>
                                    <select className="form-select" 
                                    name="user_type"
                                    onChange={handleInput}
                                    value={updateuser.user_type}
                                    >
                                        <option>User Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="employee">Employee</option>
                                    </select>
                                </div>
                                {updateuser.user_type=== 'employee' ?
                                <>
                                    <div className='single-input'>
                                        <label htmlFor="role">Division</label>
                                        <select
                                            id="division"
                                            name="division"
                                            className="form-select"
                                            onChange={handleInput}
                                            value={updateuser.division}
                                        >
                                            <option value="">{updateuser.division}</option>
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
                                            value={updateuser.district}
                                        >
                                            <option value="">{updateuser.district}</option>
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
                                    className='btn btn-primary'>Update User</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditUser;
import React, { useState, useEffect } from 'react'
import { useFormik, Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { City } from 'country-state-city';
import { filteredDivisions, getStateCode, validate } from './Useable';
import axios from 'axios';
import { toast } from "react-toastify";

const AddUser = () => {

    const history = useHistory();

    const [values, setAdduser] = useState({
        division: '',
    });
    const handleDivision = (e) => {
        setAdduser({...values, [e.target.name]:e.target.value});
        console.log(values.division);
    }

    const stateCode = getStateCode(values.division);
        //to get all the cities of a particular state;
    let citiesOfState = City.getCitiesOfState("BD", stateCode);
    



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


                    <Formik
                    initialValues={{ 
                        first_name: '',
                        last_name: '',
                        user_type: '',
                        division: '',
                        district: ''
                    }}
                    validate={values => {
                       
                        const errors = {};
                        if (!values.first_name) {
                            errors.first_name = 'Required';
                        } else if ( values.first_name.length < 2 ) {
                            errors.first_name = 'Must be use 2 Characters';
                        }else if ( values.first_name.length > 10 ) {
                            errors.first_name = 'Must be use > 10 Characters';
                        }

                        if (!values.last_name) {
                            errors.last_name = 'Required';
                        } else if ( values.last_name.length < 2 ) {
                            errors.last_name = 'Must be use 2 Characters';
                        }else if ( values.last_name.length > 10 ) {
                            errors.last_name = 'Must be use > 10 Characters';
                        }

                        if (!values.user_type) {
                            errors.user_type = 'Required';
                        }

                        if(values.user_type === 'employee'){
                            if (!values.division) {
                                errors.division = 'Required';
                            }
                            if (!values.district) {
                                errors.district = 'Required';
                            }
                        }
                       

                        return errors;
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                       
                        const data = {
                            first_name:values.first_name,
                            last_name:values.last_name,
                            user_type:values.user_type,
                            division:values.division,
                            district:values.district,
                        }
                        axios.post(`https://60f2479f6d44f300177885e6.mockapi.io/users`,data).then(res=>{
                            if(res.data){
                                toast.success('User Addedd Successfully');
                                history.push("/");
                            }
                        })
                    }}
                    >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        // handleChanged,
                        /* and other goodies */
                    }) => (
                    <form onSubmit={handleSubmit}>
                    <div className='single-input'>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.first_name}
                        />
                        <small className='text-danger'>{errors.first_name && touched.first_name && errors.first_name}</small>
                    </div>
                    <div className='single-input'>
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.last_name}
                        />
                        <small className='text-danger'>{errors.last_name && touched.last_name && errors.last_name}</small>
                    </div>
                    <div className='single-input'>
                        <label htmlFor="role">User Role</label>
                        <select className="form-select" 
                        name="user_type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.user_type}
                        >
                            <option value=''>User Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                        <small className='text-danger'>{errors.user_type && touched.user_type && errors.user_type}</small>
                    </div>
                    {values.user_type=== 'employee' ?
                    <>
                        <div className='single-input'>
                            <label htmlFor="role">Division</label>
                            <select
                                id="division"
                                name="division"
                                className="form-select"
                                onChange={(e)=>{
                                    handleChange(e)
                                    handleDivision(e)
                                }}
                                onBlur={handleBlur}
                                value={values.division}
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
                            <small className='text-danger'>{errors.division && touched.division && errors.division}</small>
                        </div>
                        <div className='single-input'>
                            <label htmlFor="role">District</label>

                            <select
                                id="district"
                                name="district"
                                className="form-select"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.district}
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
                            <small className='text-danger'>{errors.district && touched.district && errors.district}</small>
                        </div>
                    </>
                    :''
                    }
                    <div className='single-input'>
                        <button className='btn btn-primary' type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </div>
                    </form>
                    )}
                    </Formik>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
export default AddUser;
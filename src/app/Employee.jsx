import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'

const Employee = () => {
    const history = useHistory();
    const [employee, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=employe`).then(res=>{
            if(res.data){
                setEmployee(res.data);
            }
            setLoading(false);
            console.log(res.data);
        })
       
    },[]);

    const deleteUser = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        axios.delete(`https://60f2479f6d44f300177885e6.mockapi.io/users/${id}`).then(res=>{
            if(res.data){
                toast.success("User Deleted SuccessFully");
                thisClicked.closest("tr").remove();
            }
        })
    }

    var View_All_Employee = '';
    if(loading){
        return(
            <strong>Loading All Employee.....</strong>
        )
    }else{
        View_All_Employee = 
        employee.map((item,id)=>{
            const handleDetails = (id) => {
                // history.push(`/view-user/${id}`);
                history.push({
                    pathname: `/view-user/${item.id}`,
                    first_name: item.first_name,
                    last_name: item.last_name,
                    user_type: item.user_type,
                    division: item.division,
                    district: item.district,
                })
                
            }
            const handleUpdate = (id) => {
                history.push({
                    pathname: `/edit-user/${item.id}`,
                    id: item.id,
                    first_name: item.first_name,
                    last_name: item.last_name,
                    user_type: item.user_type,
                    division: item.division,
                    district: item.district,
                })
            }
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.user_type}</td>
                    <td style={{
                        textAlign:'center'
                    }}>
                        <span
                        style={{
                            cursor:'pointer',
                            // marginLeft:'15px'
                        }}
                        onClick={handleUpdate}
                        ><i className="bi bi-pencil-square"></i></span>
                        <span
                        style={{
                            cursor:'pointer',
                            marginLeft:'15px'
                        }}
                        onClick={handleDetails}
                        ><i className="bi bi-eye"></i></span>
                        <span
                        style={{
                            cursor:'pointer',
                            marginLeft:'15px',
                            color:'red'
                        }}
                        onClick={(e)=>deleteUser(e, item.id)}
                        ><i className="bi bi-trash3"></i></span>
                    </td>
                </tr>
            )
        })
    }

    return(
        <div className='all-data-a' style={{marginTop:'30px'}}>
            <div className='container'>
                <table className="table table-responsive table-bordered table-striped  table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Type</th>
                            <th style={{
                                textAlign:'center'
                            }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {View_All_Employee}
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}
export default Employee;
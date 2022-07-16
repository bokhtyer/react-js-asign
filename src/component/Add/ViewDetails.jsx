import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";

const ViewDetails = () => {
    
    const location = useLocation();

    // useEffect(() => {
    //     console.log(location.pathname); // result: '/secondpage'
    //     console.log(location.search); // result: '?query=abc'
    //     console.log(location.state.detail); // result: 'some_value'
    // }, [location]);
    var User_DD = '';
    if(location.user_type === 'employee'){
        User_DD = <>
        <li className="list-group-item">Division <strong className='f-right'>{location.division}</strong></li>
        <li className="list-group-item">District <strong className='f-right'>{location.district}</strong></li>
        </>
    }

    return(
        <div className="view_details_page">
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-8 offset-lg-2 mt-5'>
                        <ul className="list-group">
                            <li className="list-group-item">First Name <strong className='f-right'>{location.first_name}</strong></li>
                            <li className="list-group-item">Last Name <strong className='f-right'>{location.last_name}</strong></li>
                            <li className="list-group-item">User Role <strong className='f-right'>{location.user_type}</strong></li>
                            {User_DD}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewDetails;
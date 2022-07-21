import React from 'react'
import './css/Home.css'
import Admin from './Admin'
import Employee from './Employee'
import AdminPagination from './AdminPagination'

const Home = () => {
    return(
        <div className='all-data-a' style={{marginTop:'30px'}}>
            <div className='container'>
                
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="admin-tab" data-bs-toggle="tab" data-bs-target="#admin" type="button" role="tab" aria-controls="admin" aria-selected="true">Admin</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="employee-tab" data-bs-toggle="tab" data-bs-target="#employee" type="button" role="tab" aria-controls="employee" aria-selected="false">Employee</button>
                    </li>
                </ul>
                    <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="admin" role="tabpanel" aria-labelledby="admin-tab">
                        <AdminPagination />
                    </div>
                    <div className="tab-pane fade" id="employee" role="tabpanel" aria-labelledby="employee-tab">
                        <Employee />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;
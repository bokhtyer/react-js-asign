import React from 'react'
import { Link } from 'react-router-dom'
import AddUser from './Add/AddUser'

const Header = () => {
    return(
        <header className='header'>
            <div className='container'>
                <div className='row'>
                    <div className='col-6 align-self-center'>
                        <div className='menu'>
                            <ul>
                                <li><Link to='/'>Home</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-6 text-right'>
                        <AddUser />
                        
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;
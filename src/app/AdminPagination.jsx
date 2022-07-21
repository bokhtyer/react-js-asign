import React, { useState, useEffect } from "react";
import axios from 'axios';
import PaginationComponent from './PaginationComponent'

const AdminPagination = () => {
    
    const [items, setItems] = useState([]);


    useEffect(()=>{
        fetch(`https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=admin`).then(
            res=>res.json().then(data=>{
                setItems(data);
            })
        )
    },[])

    // const handlePageClick = (data) =>{
    //     console.log(data.selected)
    // }
    return(
        <>
        
        <PaginationComponent data={items} />

        </>
    )
}

export default AdminPagination;


// `https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=admin&page=${currentPage}&_limit=${limit}`
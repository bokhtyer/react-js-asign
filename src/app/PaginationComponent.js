import React,{ useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'

const PaginationComponent = (props) => {
    const { data } = props;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;
    const history = useHistory();

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

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
    return (
        <>
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
            {
                currentItems.map((item,idx)=>{
                    const handleDetails = (id) => {
                        history.push({
                            pathname: `/view-user/${item.id}`,
                            first_name: item.first_name,
                            last_name: item.last_name,
                            user_type: item.user_type,
                            division: item.division,
                            district: item.district,
                        })
                    };
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
                        <tr key={idx}>
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
            </tbody>
        </table>
        
        <div className="paginations">
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
            />
        </div>
        </>
    );

}
export default PaginationComponent;
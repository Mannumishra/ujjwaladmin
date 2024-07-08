import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const SubcCategory = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page

    const getApiData = async () => {
        try {
            let res = await axios.get("https://ujjwalbackend.onrender.com/api/subcategory");
            const newData = res.data.data;
            setData(newData.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    const deleteRecord = async (_id) => {
        try {
            let res = await axios.delete("https://ujjwalbackend.onrender.com/api/subcategory/" + _id);
            if (res.status === 200) {
                toast.success("Subcategory Deleted Successfully");
            }
            getApiData();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    // Logic for displaying current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div className="container-fluid" style={{ marginTop: 70 }}>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    {/* // style={{position:"fixed" ,left:"25%"}} */}
                    <div className="col-md-9">  
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h2>Subcategory</h2>
                            <span>
                                <Link to='/createsubcategory' className='btn btn-success'>
                                    Create Machine Subcategory
                                </Link>
                            </span>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Category Name</th>
                                    <th>Subcategory Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{item.categoryname}</td>
                                        <td>{item.subcategoryName}</td>
                                        <td>
                                            <Link to={`/updatesubcategory/${item._id}`}>
                                                <button className='btn btn-success'>Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => { deleteRecord(item._id) }}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            <nav>
                                <ul className='pagination'>
                                    {pageNumbers.map(number => (
                                        <li key={number} className='page-item'>
                                            <Link onClick={() => setCurrentPage(number)} to='/subcategory' className='page-link'>
                                                {number}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubcCategory;

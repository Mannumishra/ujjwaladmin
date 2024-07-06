import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Banner = () => {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(2) // Number of items per page

    const getApiData = async () => {
        try {
            let res = await axios.get("https://ujjwalbackend.onrender.com/api/banner")
            const newData = res.data.data
            setData(newData.reverse())
        } catch (error) {
            console.log(error);
        }
    }

    const deleteRecord = async (_id) => {
        try {
            let res = await axios.delete("https://ujjwalbackend.onrender.com/api/banner/" + _id)
            if (res.status === 200) {
                toast.success("Banner Deleted Successfully")
            }
            getApiData()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getApiData()
    }, [])

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <>
            <div className="container-fluid" style={{ marginTop: 80 }}>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h2>Banner</h2>
                            <span><Link to='/createbanner' className='btn btn-dark'>Add Banner</Link></span>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    {/* <th>Description</th> */}
                                    <th>Banner Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        {/* <td>{item.description}</td> */}
                                        <td><img src={item.image} alt="" style={{ height: 100 }} /></td>
                                        <td>
                                            <Link to={`/banner/${item._id}`}>
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
                        <nav>
                            <ul className='pagination'>
                                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
                                    <li key={i} className='page-item'>
                                        <button onClick={() => paginate(i + 1)} className='page-link'>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner

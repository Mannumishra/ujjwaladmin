import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Product = () => {
    const [data, setData] = useState([])
    console.log(data)
    const getApiData = async () => {
        try {
            let res = await axios.get("https://ujjwalbackend.onrender.com/api/product")
            setData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    const deleteRecord = async (_id) => {
        try {
            let res = await axios.delete("https://ujjwalbackend.onrender.com/api/product/" + _id)
            if (res.status === 200) {
                toast.success("Product deleted successfully")
                getApiData()
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getApiData()
    }, [])
    return (
        <>
            <div className="container-fluid" style={{ marginTop: 80 }}>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9 mb-5">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h2>Machine</h2>
                            <span><Link to='/createproduct' className='btn btn-dark'>Add A New Machine</Link></span>
                        </div>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Subcategory</th>
                                        {/* <th>Description</th> */}
                                        <th>Image1</th>
                                        <th>Image2</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.productname}</td>
                                            <td>{item.categoryname}</td>
                                            <td>{item.subcategoryName}</td>
                                            {/* <td>{item.productdescription}</td> */}
                                            <td>
                                                <a href={item.image1} target='_blank' rel="noopener noreferrer">
                                                    <img src={item.image1} alt="" style={{ height: 50 }} />
                                                </a>
                                            </td>
                                            <td>
                                                <a href={item.image2} target='_blank' rel="noopener noreferrer">
                                                    <img src={item.image2} alt="" style={{ height: 50 }} />
                                                </a>
                                            </td>
                                            {/* <td>
                                                <a href={item.image3} target='_blank' rel="noopener noreferrer">
                                                    <img src={item.image3} alt="" style={{ height: 50 }} />
                                                </a>
                                            </td>
                                            <td>
                                                <a href={item.image4} target='_blank' rel="noopener noreferrer">
                                                    <img src={item.image4} alt="" style={{ height: 50 }} />
                                                </a>
                                            </td> */}
                                            <td>
                                                <Link to={`/updateproduct/${item._id}`}>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product

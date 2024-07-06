import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'
import toast from 'react-hot-toast'

const Contact = () => {
    const [data, setData] = useState([])

    const getApiData = async () => {
        try {
            let res = await axios.get("https://ujjwalbackend.onrender.com/api/contact")
            console.log(res)
            setData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    const deleteRecord = async (_id) => {
        try {
            let res = await axios.delete("https://ujjwalbackend.onrender.com/api/category/" + _id)
            if (res.status === 200) {
                toast.success("Record delete successfully")
                getApiData()
            }
        } catch (error) {
            toast.error("Record not deleted")
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
                    <div className="col-md-9">
                        <div className='text-center fs-4 mb-2'>Contact List</div>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Address</th>
                                    <th>Company Name</th>
                                    <th>Message</th>
                                    <th>Data</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, index) =>
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.address}</td>
                                            <td>{item.companyname}</td>
                                            <td>{item.message}</td>
                                            <td>{new Date(item.updatedAt).toLocaleDateString().toLowerCase()}</td>
                                            <td><button className='btn btn-danger' onClick={() => { deleteRecord(item._id) }}>Delete</button></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
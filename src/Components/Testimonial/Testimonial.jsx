import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Testimonial = () => {
    const [data, setData] = useState([]);

    const deleteRecord = async (_id) => {
        try {
            const res = await axios.delete(`https://ujjwalbackend.onrender.com/api/category/api/testimonial/${_id}`);
            if (res.status === 200) {
                toast.success("Testimonial Deleted Successfully");
                getApiData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getApiData = async () => {
        try {
            const res = await axios.get("https://ujjwalbackend.onrender.com/api/category/api/testimonial");
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    return (
        <div className="container-fluid"  style={{marginTop:80}}>
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h2>Testimonials</h2>
                        <Link to='/createtestimonial' className='btn btn-dark'>Create Testimonial</Link>
                    </div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Message</th>
                                <th>Image</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.message}</td>
                                    <td><img src={item.image} alt="" style={{ height: 50 }} /></td>
                                    <td><Link to={`/updatetestimonial/${item._id}`} className='btn btn-success'>Edit</Link></td>
                                    <td><button className='btn btn-danger' onClick={() => deleteRecord(item._id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;

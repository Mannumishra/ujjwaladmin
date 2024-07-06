import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast/headless';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
    const { _id } = useParams()
    const navigate = useNavigate()
    const [catedata, setCatedata] = useState([])
    const getApiCateData = async () => {
        try {
            let res = await axios.get("https://ujjwalbackend.onrender.com/api/category/api/category")
            setCatedata(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    const [data, setData] = useState({
        productname: '',
        categoryname: '',
        productdescription: '',
        image: '',
        image1: '',
        image2: '',
        image3: ''
    });

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const getInputfile = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const getApiData = async () => {
        try {
            let res = await axios.get("https://ujjwalbackend.onrender.com/api/category/api/product/" + _id)
            console.log(res);
            setData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    const postData = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("productname", data.productname);
            formData.append("categoryname", data.categoryname);
            formData.append("productdescription", data.productdescription);
            formData.append("image", data.image);
            formData.append("image1", data.image1);
            formData.append("image2", data.image2);
            formData.append("image3", data.image3);
            const res = await axios.put("https://ujjwalbackend.onrender.com/api/category/api/product/" + _id, formData);
            if (res.status === 200) {
                toast.success("Product Updated created")
                navigate("/product")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        getApiData()
        getApiCateData()
    }, [])
    return (
        <div className="container-fluid" style={{ marginTop: 80 }}>
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <h1 className="mt-5">Add Product</h1>
                    <form onSubmit={postData} className="mt-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Product Name:</label>
                            <input type="text" id="name" name="productname" onChange={getInputData} value={data.productname} className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category">Select Category</label>
                            <select name="categoryname" id="category" onChange={getInputData} className="form-control" value={data.categoryname}>
                                <option disabled>Chose Category</option>
                                {
                                    catedata.map((item, index) =>
                                        <option key={index}>{item.categoryname}</option>
                                    )
                                }
                            </select>
                        </div>
                       <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea id="description" name="productdescription" rows="4" cols="50" onChange={getInputData} value={data.productdescription} className="form-control"></textarea>
                        </div> <div className="mb-3">
                            <label htmlFor="pic1" className="form-label">Picture 1:</label>
                            <input type="file" name="image" onChange={getInputfile} className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pic2" className="form-label">Picture 2:</label>
                            <input type="file" name="image1" onChange={getInputfile} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pic3" className="form-label">Picture 3:</label>
                            <input type="file" name="image2" onChange={getInputfile} className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pic4" className="form-label">Picture 4:</label>
                            <input type="file" name="image3" onChange={getInputfile} className="form-control" />
                        </div>

                        <button type="submit" className="btn btn-dark w-100" style={{ marginBottom: 100 }}>Update Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;

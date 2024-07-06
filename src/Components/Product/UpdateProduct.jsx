import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';

function UpdateProduct() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const editor = useRef(null);

    const [catedata, setCatedata] = useState([]);
    const getApiCateData = async () => {
        try {
            let res = await axios.get("https://ujjwalbackend.onrender.com/api/category");
            setCatedata(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [subcatedata, setSubcatedata] = useState([]);
    const getApiSubData = async () => {
        try {
            let res = await axios.get("https://ujjwalbackend.onrender.com/api/subcategory");
            setSubcatedata(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [data, setData] = useState({
        categoryname: '',
        subcategoryName: '',
        productname: '',
        details: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        productDetails: ''
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
            let res = await axios.get("https://ujjwalbackend.onrender.com/api/product/" + _id);
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const postData = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("categoryname", data.categoryname);
            formData.append("subcategoryName", data.subcategoryName);
            formData.append("details", data.details);
            formData.append("productname", data.productname);
            formData.append("image1", data.image1);
            formData.append("image2", data.image2);
            formData.append("image3", data.image3);
            formData.append("image4", data.image4);
            formData.append("productDetails", data.productDetails);
            setLoading(true);
            const res = await axios.put("https://ujjwalbackend.onrender.com/api/product/" + _id, formData);
            if (res.status === 200) {
                toast.success("Product updated");
                navigate("/product");
            }
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getApiData();
        getApiCateData();
        getApiSubData();
    }, []);

    const handleEditorChange = (content) => {
        setData({ ...data, productDetails: content });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postData(e);
    };

    return (
        <div className="container-fluid" style={{ marginTop: 80 }}>
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <h1 className="mt-5">Update Product</h1>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="productname">Product Name <sup className='text-danger'>*</sup></label>
                                <input type="text" name="productname" onChange={getInputData} value={data.productname} id="productname" className='form-control' placeholder='Product name' />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="category">Select Category <sup className='text-danger'>*</sup></label>
                                <select name="categoryname" id="category" onChange={getInputData} className="form-control" value={data.categoryname}>
                                    <option disabled>Choose Category</option>
                                    {catedata.map((item, index) =>
                                        <option key={index} value={item.categoryname}>{item.categoryname}</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="subcategory">Select SubCategory <sup className='text-danger'>*</sup></label>
                                <select name="subcategoryName" id="subcategory" onChange={getInputData} className="form-control" value={data.subcategoryName}>
                                    <option disabled>Choose SubCategory</option>
                                    {subcatedata.map((item, index) =>
                                        <option key={index} value={item.subcategoryName}>{item.subcategoryName}</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="details">Product Details <sup className='text-danger'>*</sup></label>
                                <textarea name="details" id="details" value={data.details} onChange={getInputData} className='form-control' placeholder='Product details'></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <label htmlFor="image1" className="form-label">Picture 1: <sup className='text-danger'>*</sup></label>
                                <input type="file" name="image1" onChange={getInputfile} className="form-control" />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="image2" className="form-label">Picture 2: <sup className='text-danger'>*</sup></label>
                                <input type="file" name="image2" onChange={getInputfile} className="form-control" />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="image3" className="form-label">Picture 3: <sup className='text-danger'>*</sup></label>
                                <input type="file" name="image3" onChange={getInputfile} className="form-control" />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="image4" className="form-label">Picture 4: <sup className='text-danger'>*</sup></label>
                                <input type="file" name="image4" onChange={getInputfile} className="form-control" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label>Product Details: <sup className='text-danger'>*</sup></label>
                            <JoditEditor
                                ref={editor}
                                value={data.productDetails}
                                onChange={handleEditorChange}
                                placeholder="Enter product details here..."
                            />
                        </div>
                        <button type="submit" className="btn btn-dark w-100" style={{ marginBottom: 100 }}>{loading ? "Please wait..." : "Update Product"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;

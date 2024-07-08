import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';

function CreateProduct() {
    const navigate = useNavigate();
    const [loding, setLoding] = useState(false)
    const editor = useRef(null);
    const [catedata, setCatedata] = useState([]);

    const getApiData = async () => {
        try {
            let res = await axios.get("https://ujjwalbackend.onrender.com/api/category");
            console.log(res);
            setCatedata(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [subcatedata, setSubcatedata] = useState([]);

    const getApiSubData = async () => {
        try {
            let res = await axios.get("https://ujjwalbackend.onrender.com/api/subcategory");
            console.log(res);
            setSubcatedata(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [data, setData] = useState({
        categoryname: '',
        subcategoryName: "",
        productname: "",
        details: "",
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

    const postData = async (e) => {
        e.preventDefault();
        console.log(data)
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
            setLoding(true)
            const res = await axios.post("https://ujjwalbackend.onrender.com/api/product", formData);
            console.log(res.data);
            if (res.status === 200) {
                toast.success("New Product created");
                navigate("/product");
                setLoding(false)
            }
        } catch (error) {
            console.error('Error:', error);
            setLoding(false)
        }
    };

    useEffect(() => {
        getApiData();
        getApiSubData()
    }, []);

    const handleEditorChange = (content) => {
        setData({ ...data, productDetails: content });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', data);
        postData(e);
    };

    return (
        <div className="container-fluid" style={{ marginTop: 80 }}>
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <h1 className="">Add A New Product</h1>
                    <div className="container-fluid">
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="">Product Name <sup className='text-danger'>*</sup></label>
                                    <input type="text" name="productname" onChange={getInputData} value={data.productname} id="" className='form-control' placeholder='Product name' />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="category">Select Category <sup className='text-danger'>*</sup></label>
                                    <select name="categoryname" id="category" onChange={getInputData} className="form-control">
                                        <option disabled selected>Choose Category</option>
                                        {catedata.map((item, index) =>
                                            <option key={index} value={item.categoryname}>{item.categoryname}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="category">Select SubCategory <sup className='text-danger'>*</sup></label>
                                    <select name="subcategoryName" id="category" onChange={getInputData} className="form-control">
                                        <option disabled selected>Choose Category</option>
                                        {subcatedata.map((item, index) =>
                                            <option key={index} value={item.subcategoryName}>{item.subcategoryName}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="category">Product Details <sup className='text-danger'>*</sup></label>
                                    <textarea name="details" id="" value={data.details} onChange={getInputData} className='form-control' placeholder='Product details'></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="pic1" className="form-label">Picture 1: <sup className='text-danger'>*</sup></label>
                                    <input type="file" name="image1" onChange={getInputfile} className="form-control" />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="pic2" className="form-label">Picture 2: <sup className='text-danger'>*</sup></label>
                                    <input type="file" name="image2" onChange={getInputfile} className="form-control" />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="pic3" className="form-label">Picture 3: <sup className='text-danger'>*</sup></label>
                                    <input type="file" name="image3" onChange={getInputfile} className="form-control" />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="pic4" className="form-label">Picture 4: <sup className='text-danger'>*</sup></label>
                                    <input type="file" name="image4" onChange={getInputfile} className="form-control" />
                                </div>
                            </div>
                            <div className=''>
                                <label>Product Details: <sup className='text-danger'>*</sup></label>
                                <JoditEditor
                                    ref={editor}
                                    value={data.productDetails}
                                    onChange={handleEditorChange}
                                    placeholder="Enter product details here..."
                                />
                            </div>

                            <button type="submit" className="btn btn-dark w-100" style={{ marginBottom: 100 }}>{loding ? "Please wait...." : "Add New Product"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;

import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const UpdateSubcategory = () => {
    const [data, setData] = useState({
        categoryname: "",
        subcategoryName: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { _id } = useParams()
    const [categoryData, setCategoryData] = useState([])

    const getCategoryData = async () => {
        try {
            const res = await axios.get("https://ujjwalbackend.onrender.com/api/category")
            setCategoryData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getInputData = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const getApiData = async () => {
        try {
            let res = await axios.get("https://ujjwalbackend.onrender.com/api/subcategory/" + _id)
            setData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const postData = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let res = await axios.put("https://ujjwalbackend.onrender.com/api/subcategory/" + _id, data)
            if (res.status === 200) {
                toast.success("Subcategory is Updated")
                navigate("/subcategory")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getApiData()
        getCategoryData()
    }, [])

    return (
        <>
            <div className="container-fluid" style={{ marginTop: 70 }}>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h2 className='p-2 test-light text-center'>Update Product Subcategory</h2>
                        <div className="form-container">
                            <form onSubmit={postData}>
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        <label htmlFor="categoryname" className="form-label">Category Name <sup className='text-danger'>*</sup></label>
                                        <select name="categoryname" id="categoryname" className="form-control" onChange={getInputData} value={data.categoryname}>
                                            <option value="">Please Select Category</option>
                                            {categoryData.map((category, index) => (
                                                <option key={index} value={category.categoryname}>{category.categoryname}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <label htmlFor="subcategoryName" className="form-label">SubCategory Name <sup className='text-danger'>*</sup></label>
                                        <input type="text" name="subcategoryName" id="subcategoryName" className="form-control" onChange={getInputData} value={data.subcategoryName} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success w-100" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Subcategory'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateSubcategory

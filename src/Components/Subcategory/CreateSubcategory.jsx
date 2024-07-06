import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const CreateSubcategory = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        categoryname: "",
        subcategoryName: ""
    })
    const [categoryData, setCategoryData] = useState([])
    const [loading, setLoading] = useState(false)

    const getCategorydata = async () => {
        try {
            const res = await axios.get("https://ujjwalbackend.onrender.com/api/category")
            const categoryData = res.data.data
            setCategoryData(categoryData)
            console.log(categoryData)
        } catch (error) {
            console.log(error)
        }
    }    
    const getInputData = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let res = await axios.post("https://ujjwalbackend.onrender.com/api/subcategory", data)
            console.log(res)
            if (res.status === 200) {
                toast.success("Product Category is created")
                navigate("/subcategory")
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCategorydata()
    }, [])

    return (
        <>
            <div className="container-fluid" style={{ marginTop: 80 }}>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h2 className=' p-2 text-dark text-center'>Create Machine Category</h2>
                        <div className="form-container">
                            <form onSubmit={postData}>
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        <label htmlFor="subcategoryName" className="form-label">Select Machine Category <sup className='text-danger'>*</sup></label>
                                        <select name="categoryname" id="subcategoryname" className="form-control" onChange={getInputData}>
                                            <option value="">Please Select Category</option>
                                            {categoryData.map((category, index) => (
                                                <option key={index} value={category.categoryname}>{category.categoryname}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <label htmlFor="categoryName" className="form-label">Machine SubCategory Name <sup className='text-danger'>*</sup></label>
                                        <input type="text" name="subcategoryName" id="categoryName" className="form-control" onChange={getInputData} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                                    {loading ? 'Loading...' : 'Add Machine Subcategory'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateSubcategory

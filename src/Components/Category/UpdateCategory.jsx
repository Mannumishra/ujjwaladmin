import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const UpdateCategory = () => {
    const [data, setData] = useState({
        categoryname: "",
        image: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { _id } = useParams()
    
    const getInputData = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    
    const getFileData = (e) => {
        const { name, files } = e.target
        setData({ ...data, [name]: files[0] })
    }
    
    const getApiData = async () => {
        try {
            let res = await axios.get("https://ujjwalbackend.onrender.com/api/category/" + _id)
            console.log(res)
            setData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    const postData = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("categoryname", data.categoryname)
        formData.append("image", data.image)
        setLoading(true)
        try {
            let res = await axios.put("https://ujjwalbackend.onrender.com/api/category/" + _id, formData)
            if (res.status === 200) {
                toast.success("Product Category is Updated")
                navigate("/category")
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
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
                        <h2 className='p-2 text-dark text-center'>Update Product Category</h2>
                        <div className="form-container">
                            <form onSubmit={postData}>
                                <div className="mb-2">
                                    <label htmlFor="categoryname" className="form-label">Category Name</label>
                                    <input type="text" name="categoryname" value={data.categoryname} id="categoryname" className="form-control" onChange={getInputData} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="image" className="form-label">Category Image</label>
                                    <input type="file" name="image" id="image" className="form-control" onChange={getFileData} />
                                </div>
                                <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Product Category'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateCategory

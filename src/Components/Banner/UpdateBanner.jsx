import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const UpdateBanner = () => {
    const [data, setData] = useState({
        image: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { _id } = useParams()
    
   
    
    const getFileData = (e) => {
        const { name, files } = e.target
        setData({ ...data, [name]: files[0] })
    }
    
    const getApiData = async () => {
        try {
            let res = await axios.get("https://ujjwalbackend.onrender.com/api/banner/" + _id)
            console.log(res)
            setData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    const postData = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("image", data.image)
        setLoading(true)
        try {
            let res = await axios.put("https://ujjwalbackend.onrender.com/api/banner/" + _id, formData)
            if (res.status === 200) {
                toast.success("Banner is Updated")
                navigate("/banner")
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
                        <h2 className='p-2 text-dark text-center'>Update Banner</h2>
                        <div className="form-container">
                            <form onSubmit={postData}>
                                <div className="mb-2">
                                    <label htmlFor="image" className="form-label">Banner Image <sup className='text-danger'>*</sup></label>
                                    <input type="file" name="image" id="image" className="form-control" onChange={getFileData} />
                                </div>
                                <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Banner'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateBanner

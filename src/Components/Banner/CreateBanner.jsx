import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const CreateBanner = () => {
    const [data, setData] = useState({
        image: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const getFileData = (e) => {
        const { name, files } = e.target
        setData({ ...data, [name]: files[0] })
    }
    
    const postData = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("image", data.image)
        setLoading(true)
        try {
            let res = await axios.post("https://ujjwalbackend.onrender.com/api/banner", formData)
            console.log(res)
            if (res.status === 200) {
                toast.success("New Banner is created")
                navigate("/banner")
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <>
            <div className="container-fluid" style={{ marginTop: 80 }}>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h2 className='p-2 text-dark text-center'>Create Banner</h2>
                        <div className="form-container">
                            <form onSubmit={postData}>
                                <div className="mb-2">
                                    <label htmlFor="productImage" className="form-label">Machine Category Image</label>
                                    <input type="file" name="image" id="productImage" className="form-control" onChange={getFileData} />
                                </div>
                                <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                                    {loading ? 'Loading...' : 'Add Banner'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateBanner

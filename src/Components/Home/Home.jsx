import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'

const Home = () => {
    return (
        <>
            <div className="container-fluid" style={{ marginTop: 80 }}>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9 mb-5">
                        <div className="container-fluid">
                            <h1 className="mt-4">Dashboard</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
                            <div className="row">
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-secondary text-white mb-4">
                                        <div className="card-body">Banner</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <Link className="small text-white stretched-link" to="/banner">View Details</Link>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-primary text-white mb-4">
                                        <div className="card-body">Category</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <Link className="small text-white stretched-link" to="/category">View Details</Link>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-success text-white mb-4">
                                        <div className="card-body">Subcategory</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <Link className="small text-white stretched-link" to="/subcategory">View Details</Link>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-warning text-white mb-4">
                                        <div className="card-body">Product</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <Link className="small text-white stretched-link" to="/product">View Details</Link>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-dark text-white mb-4">
                                        <div className="card-body">Contact</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <Link  className="small text-white stretched-link" to="/contact">View Details</Link>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
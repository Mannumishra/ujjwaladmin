import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <div className="list-group position-fixed" style={{ width: "20%" }}>
                <Link to="/" className="list-group-item list-group-item-action">Home</Link>
                <Link to="/banner" className="list-group-item list-group-item-action list-group-item-warning">Banner</Link>
                <Link to="/category" className="list-group-item list-group-item-action list-group-item-danger">Category</Link>
                <Link to="/subcategory" className="list-group-item list-group-item-action list-group-item-dark">Subcategory</Link>
                <Link to="/product" className="list-group-item list-group-item-action list-group-item-light">Product</Link>
                <Link to="/contact" className="list-group-item list-group-item-action list-group-item-warning">Contact</Link>
                {/* <Link to="/newsletter" className="list-group-item list-group-item-action list-group-item-info">Newsletter</Link> */}
            </div>
        </>
    )
}

export default Sidebar
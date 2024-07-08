import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import Testimonial from './Components/Testimonial/Testimonial';
import CreateTestimonial from './Components/Testimonial/CreateTestimonial';
import UpdateTestimonial from './Components/Testimonial/UpdateTestimonial';
import Newsletter from './Components/Newsletter/Newsletter';
import Contact from './Components/Contact/Contact';
import Product from './Components/Product/Product';
import CreateProduct from './Components/Product/CreateProduct';
import UpdateProduct from './Components/Product/UpdateProduct';
import Category from './Components/Category/Category';
import CreateCategory from './Components/Category/CreateCategory';
import UpdateCategory from './Components/Category/UpdateCategory';
import CreateSubcategory from './Components/Subcategory/CreateSubcategory';
import SubcCategory from './Components/Subcategory/Subcategory';
import UpdateSubcategory from './Components/Subcategory/UpdateSubcategory';
import Banner from './Components/Banner/Banner';
import UpdateBanner from './Components/Banner/UpdateBanner';
import CreateBanner from './Components/Banner/CreateBanner';
import Login from './Components/Login/Login';
import toast, { Toaster } from 'react-hot-toast';
import Footer from './Components/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/navbar/Navbar';

function App() {
  const login = sessionStorage.getItem("login")
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {
            login ? <Route path='/' element={<Home />} /> :
              <Route path='/' element={<Login />} />
          }
          {
            login ? <>
              <Route path='/testimonial' element={<Testimonial />} />
              <Route path='/createtestimonial' element={<CreateTestimonial />} />
              <Route path='/updatetestimonial/:_id' element={<UpdateTestimonial />} />

              <Route path='/newsletter' element={<Newsletter />} />

              <Route path='/contact' element={<Contact />} />

              <Route path='/product' element={<Product />} />
              <Route path='/createproduct' element={<CreateProduct />} />
              <Route path='/updateProduct/:_id' element={<UpdateProduct />} />

              <Route path='/category' element={<Category />} />
              <Route path='/createcategory' element={<CreateCategory />} />
              <Route path='/updatecategory/:_id' element={<UpdateCategory />} />

              <Route path='/subcategory' element={<SubcCategory />} />
              <Route path='/createsubcategory' element={<CreateSubcategory />} />
              <Route path='/updatesubcategory/:_id' element={<UpdateSubcategory />} />

              <Route path='/banner' element={<Banner />} />
              <Route path='/createbanner' element={<CreateBanner />} />
              <Route path='/banner/:_id' element={<UpdateBanner />} />
            </> : toast.error("Please Login")
          }
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;

import Layout from "./layout";
import { useState, useEffect } from "react";
import Footer from './footer';
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "./loading";
import PropTypes from 'prop-types';


function Vendors({user}) {
    console.log('user', user)
    const apiUrl = import.meta.env.VITE_URL;
    const [vendors, setVendors ] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const vendorNumber = 5;

    useEffect(() => {
        async function vendorFunc () {
            try{
                const res = await axios.get(`${apiUrl}vendors`)
                setVendors(res.data)
                setLoading(false)
            }catch(err){
                console.error(err);
            }
        }
        vendorFunc()
    },[])

    const lastOne = currentPage * vendorNumber;
    const firstOne = lastOne - vendorNumber;
    const currentVendors = vendors.slice(firstOne, lastOne);

    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(vendors.length / vendorNumber); i++) {
        paginationNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <>
            <Layout 
                title='Vendors'
                user={user}
            />
            <div className="h-screen min-w-screen ">
                {loading ?
                    <div className="flex justify-center content-center h-full">
                        <LoadingSpinner/>
                    </div>
                    :(
                        (currentVendors.map((vendor)=> (
                            <div key={vendor._id} className="border p-4 my-4 flex justify-around">
                                <div>
                                    <h1 className="text-xl font-bold mb-2">{vendor.vendor_name}</h1>
                                    <p className="text-gray-500">Bank Account No: {vendor.bank_account}</p>
                                    <p className="text-gray-700">Bank Name: {vendor.Bank_name}</p>
                                </div>
                                <div className="text-right flex flex-col gap-3">
                                    <Link to={`/vendor/${vendor._id}/update`}><button className="bg-blue-500 text-white px-4 py-2 rounded">Update</button></Link>
                                    <Link to={`/vendor/${vendor._id}/delete`}><button className="text-black border-solid border-2 border-gray px-4 py-2 rounded-lg">Delete</button></Link>
                                </div>
                            </div>
                        ))))}
                <div className="flex justify-center mt-4">
                    {paginationNumbers.map((pageNumber) => (
                        <button key={pageNumber}
                        className={`mx-2 px-4 py-2 rounded hover:bg-blue-500 border ${currentPage === pageNumber ? 'bg-blue-500 text-white' : ''}`}
                        onClick={()=>paginate(pageNumber)}>{pageNumber}</button>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    ) 
}

Vendors.propTypes = {
    user: PropTypes.object,
}

export default Vendors;
import Layout from "./layout";
import Footer from './footer';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from "./loading";
import PropTypes from 'prop-types';

function Delete({user}) {
    const apiUrl = import.meta.env.VITE_URL;
    const  [vendorData, setVendorData] = useState({
        vendor_name: '',
        bank_account: '',
        Bank_name: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        country: '',
        zip_code: ''
    })
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function vendorFunc () {
            try{
                const res = await axios.get(`${apiUrl}vendor/${id}/delete`)
                setVendorData(res.data)
                setLoading(false)
            }catch(err){
                console.error(err);
            }
        }
        vendorFunc()
    },[])

    const notify = () => toast.success('vendor deleted successfully', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    const deleteVendor = async () => {
            try{
                const response = await axios.post(`${apiUrl}vendor/${id}/delete`);
                console.log(response.data);
                notify();
                navigate('/vendors')
            } 
            catch (error) {
                console.error('Error deleting vendor', error);
            }
        };


    return (
        <>
            <Layout 
                title='Delete'
                user={user}
            />
            <div className='m-auto flex flex-col items-center w-screen h-screen'>
                {loading ?
                    <div className="flex justify-center content-center h-screen min-w-screen ">
                        <LoadingSpinner/>
                    </div>
                    :(
                        <>
                            <h1 className='text-5xl px-2 py-8'>Delete Vendor: {vendorData.vendor_name}</h1>
                            <p>Do you really want to delete this Vendor?</p>
                            <button 
                                type='submit' 
                                onClick={deleteVendor}
                                className=' bg-red-500 m-5 py-2.5 px-5 me-2 mb-5 text-sm font-medium text-white focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
                                Delete
                            </button>
                        </>
                    )}
                </div>
                <ToastContainer/>
                <Footer/>
        </>
    ) 
}

Delete.propTypes = {
    user: PropTypes.object,
}

export default Delete;
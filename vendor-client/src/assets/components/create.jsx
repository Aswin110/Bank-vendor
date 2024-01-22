import Layout from "./layout";
import Footer from './footer';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Create() {
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

    const notify = () => toast.success('vendor posted', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    const [vendorErrors, setVendorErrors] = useState({});
    const navigate = useNavigate();

    function formValidation() {
        const errors = {};

        if(!vendorData.vendor_name.trim()) {
            errors.vendor_name = 'Vendor name is required';
        }

        if (isNaN(Number(vendorData.bank_account)) || vendorData.bank_account.length < 9 || vendorData.bank_account.length > 18) {
            errors.bank_account = 'Bank account number must be between 9 and 18 characters';
        }

        if (!vendorData.Bank_name.trim()) {
            errors.Bank_name = 'Bank name is required';
        }

        if (!vendorData.address_line_1.trim()) {
            errors.address_line_1 = 'Address Line 1 is required';
        }

        if (!vendorData.address_line_2.trim()) {
            errors.address_line_2 = 'Address Line 2 is required';
        }

        if (!vendorData.city.trim()) {
            errors.city = 'City is required';
        }

        if (!vendorData.country.trim()) {
            errors.country = 'Country is required';
        }

        if (isNaN(Number(vendorData.zip_code)) || vendorData.zip_code.length !== 6) {
            errors.zip_code = 'Zip code must be 6 characters';
        }
        setVendorErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const  postVendor= async(e) =>{
        e.preventDefault();
        if (formValidation()){
            try {
                const response = await axios.post(`${apiUrl}vendor/create`, vendorData);
                console.log(response.data);
                notify();
                
                setVendorData({
                  vendor_name: '',
                  bank_account: '',
                  Bank_name: '',
                  address_line_1: '',
                  address_line_2: '',
                  city: '',
                  country: '',
                  zip_code: ''
                });
                navigate('/vendors')
              } catch (error) {
                console.error('Error posting vendor', error);
              }
        } else {
            console.log('vendor failed to post')
        }
    }
    return (
        <>
            <Layout 
                title='Create'
            />
            <div className='m-auto flex flex-col items-center'>
                <h1 className='text-5xl px-2 py-8'>New Vendor</h1>
                <form action="/vendor/create" method='POST' onSubmit={postVendor} className='flex flex-col gap-4'>
                    <label htmlFor ="vendor_name">Vendor Name:</label>
                    <input 
                        type="text" 
                        id='vendor_name' 
                        name='vendor_name'
                        value={vendorData.vendor_name}
                        onChange={(e)=> setVendorData((prevUser)=>({...prevUser, vendor_name: e.target.value}))} 
                        placeholder='vendor name' 
                        required={true} 
                        className='p-2 rounded border-solid border-2 border-indigo-600'
                    />
                    <label htmlFor ="bank_account">Bank Account Number:</label>
                    <input 
                        type="tel" 
                        id='bank_account' 
                        name='bank_account' 
                        value={vendorData.bank_account}
                        onChange={(e)=> setVendorData((prevUser)=>({...prevUser, bank_account: e.target.value}))} 
                        placeholder='Bank Account no' 
                        required={true}  
                        className='p-2 rounded border-solid border-2 border-indigo-600 outline-none appearance-none'
                    />
                    <label htmlFor ="Bank_name">Bank Name:</label>
                    <input 
                        type="text" 
                        id='Bank_name' 
                        name='Bank_name' 
                        value={vendorData.Bank_name}
                        onChange={(e)=> setVendorData((prevUser)=>({...prevUser, Bank_name: e.target.value}))} 
                        placeholder='Bank_name'
                        required={true}  
                        className='p-2 rounded border-solid border-2 border-indigo-600'
                    />
                    <label htmlFor ="address_line_1">Address Line 1:</label>
                    <input 
                        type="text" 
                        id='address_line_1' 
                        name='address_line_1' 
                        value={vendorData.address_line_1}
                        onChange={(e)=> setVendorData((prevUser)=>({...prevUser, address_line_1: e.target.value}))} 
                        placeholder='Address Line 1' 
                        required={true} 
                        className='p-2 rounded border-solid border-2 border-indigo-600'
                    />
                    <label htmlFor ="address_line_2">Address Line 2:</label>
                    <input 
                        type="text" 
                        id='address_line_2' 
                        name='address_line_2' 
                        value={vendorData.address_line_2}
                        onChange={(e)=> setVendorData((prevUser)=>({...prevUser, address_line_2: e.target.value}))}                        
                        placeholder='Address Line 2' 
                        required={true}  
                        className='p-2 rounded border-solid border-2 border-indigo-600'
                    />
                    <label htmlFor ="city">City:</label>
                    <input 
                        type="text" 
                        id='city' 
                        name='city' 
                        value={vendorData.city}
                        onChange={(e)=> setVendorData((prevUser)=>({...prevUser, city: e.target.value}))}                        
                        placeholder='City'
                        required={true}  
                        className='p-2 rounded border-solid border-2 border-indigo-600'
                    />
                    <label htmlFor ="country">Country:</label>
                    <input 
                        type="text" 
                        id='country' 
                        name='country' 
                        value={vendorData.country}
                        onChange={(e)=> setVendorData((prevUser)=>({...prevUser, country: e.target.value}))}                      
                        placeholder='Country' 
                        required={true} 
                        className='p-2 rounded border-solid border-2 border-indigo-600'
                    />
                    <label htmlFor ="zip_code">Zip Code:</label>
                    <input 
                        type="tel" 
                        id='zip_code' 
                        name='zip_code' 
                        value={vendorData.zip_code}
                        onChange={(e)=> setVendorData((prevUser)=>({...prevUser, zip_code: e.target.value}))}                  
                        placeholder='Zip Code' 
                        required={true}  
                        className='p-2 rounded border-solid border-2 border-indigo-600'
                    />
                    <button 
                        type='submit' 
                        className='py-2.5 px-5 me-2 mb-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
                        Submit
                    </button>
                </form>
                {vendorErrors.bank_account && <div className="text-red-500">Bank account number must be between 9 and 18 Numbers</div>}
                {vendorErrors.zip_code && <div className="text-red-500">Zip code must be 6 numbers</div>}
                </div>
                <ToastContainer/>
                <Footer/>
        </>
    ) 
}

export default Create;
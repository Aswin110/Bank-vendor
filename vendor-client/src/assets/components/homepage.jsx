import Layout from "./layout";
import peopleImage from '../../images/people.jpg'
import Footer from "./footer";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function HomePage({user}) {


    return (
        <>
            <Layout 
                title='Home Page'
                user={user}
            />

            <div className="min-h-screen min-w-screen bg-cover bg-center flex justify-between overflow-hidden" style={{backgroundImage: `url(${peopleImage})`}}>
                <div className="text-white text-6xl p-9">
                    <div>WELCOME TO </div>
                    <div>OUR PAGE</div>
                </div>
                <div className="text-white p-9">A Non-Profitable-Organization</div>
            </div>

            <div className="p-10 flex flex-col items-center justify-center">
                <div>
                    <h1 className="text-4xl p-10">BANK VENDORS</h1>
                </div>
                <p className='mx-auto'>Welcome to Bank Vendor, a very basic website developed to <Link to="/vendor/create" className="underline">create</Link>, update and delete <Link to="/vendors" className="underline">vendors</Link>.</p>
            </div>


            <Footer/>
        </>
    ) 
}

HomePage.propTypes = {
    user: PropTypes.object,
}

export default HomePage;
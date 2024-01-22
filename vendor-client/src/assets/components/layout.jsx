import { Helmet, HelmetProvider } from 'react-helmet-async';
import {Link} from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function Layout({title, user}) {
    const apiUrl = import.meta.env.VITE_URL;
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const closeDropdown = () => {
        setIsOpen(false);
    }

    useEffect(()=>{
        const handleClick = (event) => {
            if(ref.current && !ref.current.contains(event.target)){
                closeDropdown();
            }
        }

        document.addEventListener('click', handleClick);
        
        return () => {
            document.removeEventListener('click', handleClick);
        }
    },[ref])

    const logOut = () => {
        window.open(
            `${apiUrl}auth/logout`,
            "_self"
        )
    }



    return(
        <HelmetProvider>
            <>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <div className="h-full flex flex-col bg-slate-300">
                    <div className="sticky top-0 px-6 py-3 flex justify-between flex-wrap">
                        <Link className='py-2' to="/">HOME</Link>
                        <button onClick={toggleDropdown} onMouseEnter={toggleDropdown} ref={ref}>
                            {user&&<img className='rounded-full h-10 w-10 grayscale hover:grayscale-0 cursor-pointer' src={user.profilePicture} alt="profile picture" />}
                        </button>
                        {isOpen&&(<nav className="absolute top-12 right-0 bg-white border rounded shadow-md">
                            <ul className="flex flex-col gap-4 py-2">
                                <>
                                    <li>
                                        <div className="px-4 py-2">{user.displayName}</div>
                                    </li>
                                    <hr />
                                    <li>
                                        <Link className="px-4 py-2" to="/vendor/create">Create Vendor</Link>
                                    </li>
                                    <li>
                                        <Link className="px-4 py-2" to="/vendors">Vendors List</Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={logOut}
                                        >
                                            <Link className="px-4 py-2" to="/login">Log out</Link>
                                        </button>
                                    </li>
                                </>
                            </ul>
                        </nav>)}
                    </div>
                </div>
            </>
        </HelmetProvider>
    )
}

Layout.propTypes = {
    user: PropTypes.object,
    title: PropTypes.string,
}

export default Layout;
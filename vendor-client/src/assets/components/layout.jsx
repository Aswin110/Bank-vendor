import { Helmet, HelmetProvider } from 'react-helmet-async';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

function Layout({title, user}) {
    const apiUrl = import.meta.env.VITE_URL;
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
                        <Link to="/">HOME</Link>
                        {user&&<img className='rounded-full h-10 w-10 grayscale hover:grayscale-0 cursor-pointer' src={user.profilePicture} alt="profile picture" />}
                        <nav>
                            <ul className="flex gap-4">
                                <>
                                    <li>
                                        <Link className="px-4 py-2" to="/vendor/create">New-Vendor</Link>
                                    </li>
                                    <li>
                                        <Link className="px-4 py-2" to="/vendors">Vendors</Link>
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
                        </nav>
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
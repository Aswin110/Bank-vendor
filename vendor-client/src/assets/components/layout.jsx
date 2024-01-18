import  {useState} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {Link} from 'react-router-dom'

function Layout({title}) {
    const [user, setUser] = useState(undefined);

    return(
        <HelmetProvider>
            <>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <div className="h-full flex flex-col bg-slate-300">
                    <div className="sticky top-0 px-6 py-3 flex justify-between flex-wrap">
                        <Link to="/">HOME</Link>
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
                                        <Link className="px-4 py-2" to="/login">Log out</Link>
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

export default Layout;
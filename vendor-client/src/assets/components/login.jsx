import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function LogIn() {
    const apiUrl = import.meta.env.VITE_URL;
    const googleAuth = () => {
        window.open(
            `${apiUrl}auth/google/callback`,
            "_self"
        )
    }

    return (
        <>
            <div className='m-auto flex flex-col items-center'>
                <h1 className='text-5xl px-2 py-8'>Log in</h1>
                <form action="/login" method='POST' className='flex flex-col gap-4'>
                    <label htmlFor ="email">E-mail:</label>
                    <input type="email" id='email' name='email' placeholder='E-mail' required={true} className='p-2 rounded border-solid border-2 border-indigo-600'/>
                    <label htmlFor ="password">Password:</label>
                    <input type="password" id='password' name='password' placeholder='Password' required={true} className='p-2 rounded border-solid border-2 border-indigo-600'/>
                    <button type='submit' className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700' >Log In</button>
                </form>
                <div>or</div>
                <button className="border-black border-2 py-2.5 px-2 hover:bg-gray-100 focus:ring-2"
                    onClick={googleAuth}
                >
                        <FontAwesomeIcon className="px-2" icon={faGoogle} bounce />
                        <span  >Sign in with Google</span>
                </button>
                <div className="px-4 py-2">New Here ? <Link className='text-sky-400' to='/signup'>Sign Up</Link></div>
            </div>
        </>
    ) 
}

export default LogIn;
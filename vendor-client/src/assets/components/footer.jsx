import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,  } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {


    return (
        <>
            <footer className="bg-back">

                <div className=" bg-black mx-auto max-w-screen flex justify-around gap-9 px-4 py-20 text-white">
                    <div className='flex flex-col justify-between'>
                        <h1 className="font-black pb-5">BANK</h1>
                        <p className=" pb-5">This website help to create Vendors.</p>
                        <p>
                            <FontAwesomeIcon icon={faEnvelope} /> aswinashok110@gmail.com
                        </p>
                    </div>

                    <div className='flex flex-col justify-between'>
                        <div className=" pb-5 ">Social media</div>
                        <div className=" pb-5 flex gap-3 ">
                            <a href="https://www.linkedin.com/in/aswin-ashok-/">
                                <FontAwesomeIcon icon={faLinkedin}/>
                            </a>
                            <a href="https://github.com/Aswin110/Bank-vendor.git">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                        </div>
                        <div className=" pb-5 text-justify">
                            Build with React, Node, Express, MongoDb and Tailwind and hosted on
                        </div>
                    </div>  

                </div>
                
            </footer>
        </>
    ) 
}

export default Footer;
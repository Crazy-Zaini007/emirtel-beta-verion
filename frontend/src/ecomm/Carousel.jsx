import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import picture1 from './assets/carousel22.png'
import cable from './assets/cabling 3.png'
import wifi from './assets/wifi_93158.png'
import phone from './assets/telephone_11517921.png'
import sound from './assets/sound1.png'
import fiber from './assets/optical-fiber_11644760.png'
import cctv from './assets/cctv1.png'
import microWave from './assets/microwave1.png'
import cloud from './assets/upload_9955990.png'
import software from './assets/software2.png' 
import marketing from './assets/marketing1.png' 
import repair from './assets/repair-tools_1.png' 
import { Fade,Slide  } from "react-awesome-reveal";
import Navbar from './Navbar'
import Footer from './Footer'
export default function Carousel() {
const[option1, setOption1]=useState(false)
const[option2, setOption2]=useState(false)
const[option3, setOption3]=useState(false)
const[option4, setOption4]=useState(false)
const[option5, setOption5]=useState(false)
const[option6, setOption6]=useState(false)
const[option7, setOption7]=useState(false)
const[option8, setOption8]=useState(false)


    return (
        <>
      <Navbar></Navbar>
            <div className="container pt-4 home_page mb-2">
                <div className="row justify-content-center">
                    <div className='col-lg-12 col-xl-6 col-md-12 pt-md-5'>
                        <Slide><h2>Leading Business Communication <span>Solution Provider</span></h2></Slide>
                        <Fade direction="right"><p>Welcome to <strong>Al Moaeed Technologies</strong>, your trusted partner for cutting-edge IT, telecom, structural cabling, fiber optics, and electronics repair services. As a leading provider in the industry, we specialize in delivering tailored solutions to meet the diverse needs of businesses across various sectors.
                          Experience the difference of working with a trusted partner who understands your connectivity needs. Contact us today to earn more.</p></Fade>
                        {/* <Link className="btn m-1 " to='/'>Get Started</Link> */}
                        {/* <Link  className="btn m-1 login_btn px-4 rounded" to='/login_seller'>Login</Link> */}

                    </div>
                    <div className="col-sm-1">

                    </div>
                    <div className="col-lg-6 col-xl-5 col-md-12 text-center">
                        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                   <Slide direction="right" > <img src={picture1} className="d-block w-100" alt="" /></Slide>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row solutions mb-2 mt-4">
                    <Fade ><h4 className='text-center mb-md-5 mb-3'>Services & Solutions</h4></Fade>
                    
                    <Slide className="col-xl-4 col-md-6 my-1 p-0">
                        <div className="service text-center  m-1 bg-white rounded py-4 px-2  ">
                            <img src={cable} alt="service" />

                            <h3 className='my-2'>Structural Cabling / Networking</h3>
                            <p>Enhance Connectivity and Efficiency with Expert Structural Cabling Solutions In today's fast-paced digital landscape, <span style={!option1 ? {display:"none"}:{}}>seamless connectivity forms the backbone of every successful business operation. Whether you're establishing a new infrastructure or upgrading existing systems, investing in top-notch structural cabling is paramount. Our comprehensive structural cabling solutions ensure optimal performance, scalability, and reliability for your network infrastructure needs.</span> <Link className='read_more_btn' onClick={()=>setOption1(!option1)}>{!option1 ? "Read more...":"Read less..."}</Link></p>
                        </div>
                    </Slide>
                    <Fade direction="right" className="col-xl-4 col-md-6 my-1 p-0 ">
                        <div className="service text-center m-1   bg-white rounded py-4 px-2 ">

                            <img src={wifi} alt="service" />

                            <h3 className='my-2'>WIFI Solutions</h3>
                            <p>Tailored WiFi Solutions for Modern Businesses In the digital age, seamless connectivity is the lifeline of modern businesses<span style={!option2 ? {display:"none"}:{}}>At Al Moaeed Technologies, we offer cutting-edge WiFi solutions designed to optimize your network performance and elevate your business operations to new heights.</span> <Link className='read_more_btn' onClick={()=>setOption2(!option2)}>{!option2 ? "Read more...":"Read less..."}</Link></p>
                         
                        </div>
                    </Fade>
                    <Slide className="col-xl-4 col-md-6 my-1 p-0">
                        <div className="service text-center m-1 bg-white rounded py-4 px-2 ">

                            <img src={phone} alt="service" />

                            <h3 className='my-2'>Telephone Systems</h3>
                            <p>Seamlessly Connect with IP and Traditional Telephone Systems: IP Phones and Digital Phones In today's fast-paced business <span style={!option3 ? {display:"none"}:{}}>environment, efficient communication is the key to success. At Al Moaeed Technologies, we offer a comprehensive range of IP and traditional telephone systems, including IP phones and digital phones, PABX, designed to streamline communication and enhance productivity for businesses of all sizes.</span> <Link className='read_more_btn' onClick={()=>setOption3(!option3)}>{!option3 ? "Read more...":"Read less..."}</Link></p>
                            
                        </div>
                    </Slide>
                    <Slide className="col-xl-4 col-md-6 my-1 p-0">
                        <div className="service text-center  m-1 bg-white rounded py-4 px-2 ">

                            <img src={cloud} alt="service" />
                            <h3 className='my-2'>Cloud Services</h3>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, voluptatum odit nam magnam debitis excepturi!</p>
                            <Link className='btn btn-sm ' to='/ecomm/cloud/services'>Explore now</Link>
                        </div>
                    </Slide>
                    <Fade direction="left" className="col-xl-4 col-md-6 my-1 p-0">
                        <div className="service text-center  m-1 bg-white rounded py-4 px-2 ">
                            <img src={software} alt="service" />
                            <h3 className='my-2'>Software Development</h3>
                            <p>We help you design and develop the future of your company’s digital products and business, Explore now.</p>
                            <Link className='btn btn-sm ' to='/ecomm/software/services'>Explore now</Link>
                        </div>
                    </Fade>
                    <Slide direction="right" className="col-xl-4 col-md-6 my-1 p-0">
                        <div className="service text-center m-1 bg-white rounded py-4 px-2 ">
                            <img src={marketing} alt="service" />
                            <h3 className='my-2'>Marketing Solutions</h3>
                            <p>Generate sales online and beat the industry, through Brand awareness, Digital Marketing & E-Commerce Solutions with us!</p>
                            <Link className='btn btn-sm ' to='/ecomm/marketing/services'>Explore now</Link>
                        </div>
                    </Slide>

                    <Slide className="col-xl-4 col-md-6 my-1 p-0">
                        <div className="service text-center  m-1 bg-white rounded py-4 px-2 ">
                            <img src={sound} alt="service" />

                            <h3 className='my-2'>Sound Systems</h3>
                            <p>Amplify Your Message: Tailored Public Address and Sound Systems In today's fast-paced world, effective communication is key <span style={!option4 ? {display:"none"}:{}}>to success. At Al Moaeed Technologies, we specialize in providing cutting-edge public address and sound systems that amplify your message and engage your audience like never before.</span> <Link className='read_more_btn' onClick={()=>setOption4(!option4)}>{!option4 ? "Read more...":"Read less..."}</Link></p>
                           
                        </div>
                    </Slide>
                    <Fade direction="right" className="col-xl-4 col-md-6 my-1 p-0">
                        <div className="service text-center m-1  bg-white rounded py-4 px-2 ">
                            <img src={fiber} alt="service" />

                            <h3 className='my-2'>Fiber Optics Solutions</h3>
                            <p>Elevate Your Network Performance with Cutting-Edge Fiber Optic Solutions and Splicing Services In today's digitally driven <span style={!option5 ? {display:"none"}:{}}>world, businesses require robust connectivity solutions to stay competitive. At Al Moaeed Technologies, we specialize in delivering top-tier fiber optic solutions and expert splicing services, empowering your network with unmatched speed, reliability, and scalability.</span> <Link className='read_more_btn' onClick={()=>setOption5(!option5)}>{!option5 ? "Read more...":"Read less..."}</Link></p>
                        
                        </div>
                    </Fade>
                    <Slide direction="right" className="col-xl-4 col-md-6 my-1 p-0">
                        <div className="service text-center  m-1 bg-white rounded py-4 px-2 ">

                            <img src={cctv} alt="service" />

                            <h3 className='my-2'>CCTV Solutions</h3>
                            <p>Enhance Security: Advanced IP and Analogue CCTV Solutions Protecting your assets and ensuring the safety of your premises <span style={!option6 ? {display:"none"}:{}}>is paramount in today's world. At Al Moaeed Technologies, we specialize in providing advanced IP and analogue CCTV solutions designed to safeguard your property and assets with unparalleled reliability and efficiency.</span> <Link className='read_more_btn' onClick={()=>setOption6(!option6)}>{!option6 ? "Read more...":"Read less..."}</Link></p>
                            <p></p>
                        </div>
                    </Slide>


                    <Slide direction="right" className="col-xl-4 col-md-6 my-1 p-0">
                        <div className="service text-center  m-1 bg-white rounded py-4 px-2 ">
                            <img src={microWave} alt="service" />

                            <h3 className='my-2'>Microwave Radios</h3>
                            <p>In an era where connectivity is crucial, microwave radio technology stands as a beacon of high-speed, reliable communication. <span style={!option7 ? {display:"none"}:{}}>At Ecomm, we specialize in delivering cutting-edge microwave radio solutions that empower businesses with lightning-fast data transmission and seamless connectivity.</span> <Link className='read_more_btn' onClick={()=>setOption7(!option7)}>{!option7 ? "Read more...":"Read less..."}</Link></p>
                           
                        </div>
                    </Slide>
                    <Slide direction="left" className="col-xl-4 col-md-6 my-1 p-0">
                        <div className="service text-center m-1 bg-white rounded py-4 px-2 ">
                            <img src={repair} alt="service" />

                            <h3 className='my-2'>Electronics Repair</h3>
                            <p>We provide guaranteed electronics repairs with excellence of professional technicians,<span style={!option8 ? {display:"none"}:{}}> worth decades of electronics knowledge Swift, top-notch circuit board repairs for laptop, latest tech for smartphones, TVs, industrial electronics and much more with our sophisticated electronics test equipment. Your satisfaction is guaranteed and we ensure repair in quick time! Contact us at mobile 054 203 6693 or send your query via our website for instant bookings.</span> <Link className='read_more_btn' onClick={()=>setOption8(!option8)}>{!option8 ? "Read more...":"Read less..."}</Link></p>
                            <Link className='btn btn-sm ' to='/ecomm/electronics_repairs'>Explore now</Link>
                        </div>
                    </Slide>
                  

                </div>


            </div>
            <Footer></Footer>
        </>
    )
}

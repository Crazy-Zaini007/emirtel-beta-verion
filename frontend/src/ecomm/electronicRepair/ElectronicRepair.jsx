import React from 'react'
import laptopicon from '../assets/icons/laptop-icons.png'
import graphic_card_icon from '../assets/icons/graphic-card-icon.png'
import game_console_icon from '../assets/icons/game-controller-icon.png'
import tablets_icon from '../assets/icons/tablets-icon.png'
import phone_icon from '../assets/icons/smartphones-icon.png'
import drones_icon from '../assets/icons/drones-icon.png'
import cameras_icon from '../assets/icons/cameras-icon.png'
import industrial_icon from '../assets/icons/industrial-icon.png'

import { Fade,Slide  } from "react-awesome-reveal";
import Navbar from '../Navbar'
import Footer from '../Footer'

export default function ElectronicRepair() {
  return (
    <>
    <Navbar></Navbar>
    <div className='electronics'>
     <div className="container-fluid services">
        <div className="row ">
        <div className="col-md-12 main_soft_top text-center py-5">
           <Fade><h2>Electronics Repairing</h2>   </Fade>  
            </div>
        </div>
        </div> 
        <div className="container top">
          <div className="row my-4">
            <h4 className='text-center my-1'>What We provide ?</h4>
            <p className='text-center my-1'>We are providing the repairing services listed below.</p>
          </div>
        </div>
      
        <div className="container top">
          <div className="row my-4">
           <Slide> <h5 className='text-center my-1'>1- Laptops Repairing</h5></Slide>
          </div>
        </div>
        <div className="container-fluid">
        <div className="row bottom justify-content-center border_col_1">
          <div className="col-md-5 px-md-5 px-4 py-md-4 py-3 my-auto">
           
          </div>
          <div className="col-md-6 px-md-5 px-2 py-4 my-auto">
            <div className="text my-auto">
              <div className="row py-4 px-3  m-0 ">
                <div className="col-md-12 px-3 py-2 ">
                <Fade direction="right">
                <img src={laptopicon} alt="" />
                  <h4 className='mt-2'>Laptop Repairing</h4>
                  <p>When it comes to the best and quickest electronic repair service for laptops, our team excels in delivering top-notch solutions. Whether it's a broken screen, malfunctioning keyboard, or software issues, our experts have the expertise to swiftly diagnose and repair all laptop brands and models. With a focus on quality and efficiency, we use state-of-the-art tools and genuine parts to ensure that your laptop is restored to its optimal condition in no time.
                  </p>
                </Fade>
                  </div>
                 
              </div>
            </div>
          </div>
        </div> 
        <div className="container top">
          <div className="row my-5">
            <Slide direction="right"><h5 className='text-center my-1'>2- Graphics Cards Repairing</h5></Slide>
          </div>
        </div> 
        <div className="row bottom border_col_2">
         
          <div className="col-md-6 px-md-5 px-2 py-4 my-auto">
            <div className="text my-auto">
              <div className="row py-4 px-3  m-0 ">
                <div className="col-md-12 px-3 py-2 ">
                <Fade direction="left">
                <img src={graphic_card_icon} alt="" />
                  <h4 className='mt-2'>Graphics Cards Repairing</h4>
                  <p>Need a fast and reliable electronic repair service for your graphics card? Look no further! Our skilled technicians specialize in diagnosing and fixing a wide range of graphics card issues, from overheating problems to driver conflicts and hardware failures. Using advanced diagnostic tools and techniques, we can quickly identify the root cause of the issue and provide the necessary repairs to get your graphics card running smoothly again, ensuring optimal performance for your gaming or professional needs.
                  </p>
                </Fade>
                  </div>
                 

              </div>
            </div>
          </div>

        </div>  

        <div className="container top">
          <div className="row my-5">
          <Slide direction="left"><h5 className='text-center my-1'>3- Game Consoles Repairing</h5></Slide>
          </div>
        </div> 
          <div className="row bottom justify-content-center border_col_3">
          <div className="col-md-5 px-md-5 px-4 py-md-4 py-3 my-auto">
          </div>
          <div className="col-md-6 px-md-5 px-2 py-4 my-auto">
            <div className="text my-auto">
              <div className="row py-4 px-3  m-0 ">
                <div className="col-md-12 px-3 py-2 ">
                <Fade direction="right">
                <img src={game_console_icon} alt="" />
                  <h4 className='mt-2'>Game Consoles</h4>
                  <p>When your game console is on the fritz, you need a repair service that can get you back in the game ASAP. Our experienced technicians are well-versed in repairing all major game console brands, including PlayStation, Xbox, and Nintendo. Whether it's a red ring of death, disc read errors, or software glitches, we have the expertise and tools to fix it quickly and effectively. Don't let a malfunctioning game console ruin your gaming experience – trust our speedy repair service to get you back to gaming in no time.
                  </p>
                </Fade>
                  </div>
                 

              </div>
            </div>
          </div>
        </div> 

        <div className="container top">
          <div className="row my-5">
           <Slide direction='right'> <h5 className='text-center my-1'>4- Tablets Repairing</h5></Slide>
          </div>
        </div> 
        <div className="row bottom border_col_4">
         
          <div className="col-md-6 px-md-5 px-2 py-4 my-auto">
            <div className="text my-auto">
              <div className="row py-4 px-3  m-0 ">
                <div className="col-md-12 px-3 py-2 ">
                <Fade direction='left'>
                <img src={tablets_icon} alt="" />
                  <h4 className='mt-2'>Tablets Repairing</h4>
                  <p>Looking for the best and quickest electronic repair service for your tablet? You've come to the right place! Our skilled technicians are proficient in repairing all major tablet brands, including Apple iPad, Samsung Galaxy Tab, and Microsoft Surface. Whether your tablet has a cracked screen, battery issues, or software problems, we can diagnose and fix it efficiently to ensure that you're back to browsing, streaming, and gaming on your device in no time.
                  </p>
                </Fade>
                  </div>
                 

              </div>
            </div>
          </div>

        </div>  


        <div className="container top">
          <div className="row my-5">
            <Slide direction='left'><h5 className='text-center my-1'>5- SmartPhones Repairing</h5></Slide>
          </div>
        </div> 
          <div className="row bottom justify-content-center border_col_5">
          <div className="col-md-5 px-md-5 px-4 py-md-4 py-3 my-auto">
          </div>
          <div className="col-md-6 px-md-5 px-2 py-4 my-auto">
            <div className="text my-auto">
              <div className="row py-4 px-3  m-0 ">
                <div className="col-md-12 px-3 py-2 ">
                <Fade direction='right'>
                <img src={phone_icon} alt="" />
                  <h4 className='mt-2'>SmartPhones Repairing</h4>
                  <p>When your smartphone is in need of repair, our fast and reliable service is here to help. From cracked screens and water damage to battery replacements and software issues, our technicians have the expertise to fix it all. We specialize in repairing popular smartphone brands such as Apple iPhone, Samsung Galaxy, Google Pixel, and OnePlus. With our quick turnaround times and quality repairs, you can trust us to get your smartphone back in working order so you can stay connected on the go.
                  </p>
                </Fade>
                  </div>
                 

              </div>
            </div>
          </div>
        </div> 


        <div className="container top">
          <div className="row my-5">
            <Slide direction='right'><h5 className='text-center my-1'>6- Drones Repairing</h5></Slide>
          </div>
        </div> 
        <div className="row bottom border_col_6">
         
          <div className="col-md-6 px-md-5 px-2 py-4 my-auto">
            <div className="text my-auto">
              <div className="row py-4 px-3  m-0 ">
                <div className="col-md-12 px-3 py-2 ">
               <Fade direction='left'>
               <img src={drones_icon} alt="" />
                  <h4 className='mt-2'>Drones Repairing</h4>
                  <p>If your drone is grounded due to technical issues, our electronic repair service can have you back in the air in no time. Whether it's motor failure, gimbal malfunctions, or connectivity issues, our experienced technicians can diagnose and repair all major drone brands, including DJI, Parrot, and Yuneec. With our fast and efficient service, you'll be capturing stunning aerial footage again in no time.
                  </p>
               </Fade>
                  </div>
              </div>
            </div>
          </div>

        </div> 

        <div className="container top">
          <div className="row my-5">
            <Slide direction='left'><h5 className='text-center my-1'>7- Cameras Repairing</h5></Slide>
          </div>
        </div> 
          <div className="row bottom justify-content-center border_col_7">
          <div className="col-md-5 px-md-5 px-4 py-md-4 py-3 my-auto">
          </div>
          <div className="col-md-6 px-md-5 px-2 py-4 my-auto">
            <div className="text my-auto">
              <div className="row py-4 px-3  m-0 ">
                <div className="col-md-12 px-3 py-2 ">
                <Fade direction='right'>
                <img src={cameras_icon} alt="" />
                  <h4 className='mt-2'>Cameras Repairing</h4>
                  <p>Don't let a malfunctioning camera ruin your photo or video shoot – our electronic repair service specializes in fixing all types of camera issues. Whether it's a DSLR, mirrorless, or point-and-shoot camera, our skilled technicians can diagnose and repair problems such as lens errors, sensor issues, and shutter malfunctions. With our quick turnaround times and attention to detail, you can trust us to get your camera back in working order so you can capture all of life's precious moments without missing a beat.
                  </p>
                </Fade>
                  </div>
              </div>
            </div>
          </div>
        </div> 

        <div className="container top">
          <div className="row my-5">
            <Slide direction='right'><h5 className='text-center my-1'>8- Industrial Electronics Repairing</h5></Slide>
          </div>
        </div> 
        <div className="row bottom border_col_8">
         
          <div className="col-md-6 px-md-5 px-2 py-4 my-auto">
            <div className="text my-auto">
              <div className="row py-4 px-3  m-0 ">
                <div className="col-md-12 px-3 py-2 ">
              <Fade direction='left'>
              <img src={industrial_icon} alt="" />
                  <h4 className='mt-2'>Industrial Electronics Repairing</h4>
                  <p>Elevate your industrial electronics with our professional repair services. From complex control systems to specialized machinery components, we guarantee expert solutions tailored to your needs. Our experts deliver precision repairs with a commitment to excellence, ensuring minimal downtime and maximum productivity. With swift turnaround times and a satisfaction guarantee, trust us to bring your industrial electronics back to peak performance. Contact us today to experience the difference of trusted professionals dedicated to revitalizing your critical equipment. Your satisfaction is our priority as we redefine the standard for industrial electronics repair.
                  </p>
              </Fade>
                  </div>
              </div>
            </div>
          </div>

        </div> 

        </div>
        
    </div>
    <Footer></Footer>
    </>
  )
}

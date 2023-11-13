import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from "swiper/modules"
import {MdLocationOn} from "react-icons/md"
import {FaBed , FaBath, FaParking, FaChair, FaShare} from "react-icons/fa"
import {useSelector} from "react-redux"
import Contact from "../components/Contact"




export default function Listing () {
    // SwiperCore.use([Navigation])
    const [listing,setListing] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [copied,setCopied] = useState(false);
    const [contact,setContact] = useState(false)
    const params = useParams();
    const {currentUser} = useSelector(state=>state.user)
  useEffect(()=>{   
    const fetchListing =async ()=>{


        try {
            const res = await fetch(`/api/listing/get/${params.listingId}`);
            const data = await res.json();
            if(data.success === false){
                setError(true);
                setLoading(false);
                return;
            }
            setListing(data);
            setLoading(false)
            setError(false)
        } catch (error) {
            setError(true);
            setLoading(false)
        }
        
    }
    fetchListing();
  } , [params.listingId])
    return <main>
        {
            loading && <p className='text-center my-7 text-2xl'>Loading...</p>
        }
        {
            error && <p className='text-center my-7 text-2xl text-red-700'>Something Went Wrong...</p>
        }
        {listing && !loading && !error && (
            <>
                <Swiper navigation modules={[Navigation]}>
                    {listing.imageUrls.map((url)=>(
                        <SwiperSlide key={url}>
                            <div className='h-[550px]' style={{background : `url(${url}) center no-repeat`,backgroundSize : "cover"}}>
                            </div>
                        </SwiperSlide>
                        ))}
                </Swiper>
                <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                    <FaShare className='text-slate-500' onClick={()=>{navigator.clipboard.writeText(window.location.href);
                        setCopied(true);
                        setTimeout(() => {
                            setCopied(false)
                        },2000);
                        
                    }}
                        
                    />
                </div>
                {
                    copied && (
                        <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>Link copied!</p>
                    )
                }
                <div className='max-w-4xl mx-auto my-7 flex flex-col gap-4'>
                    <p className='font-semibold'>{`${listing.name}- $${listing.regularPrice} / Month`}</p>
                    <p className='flex items-center align-middle gap-2 text-sm'>{<MdLocationOn/>}<span>{listing.address}</span></p>
                    <div className='flex gap-4'>
                        <p className='bg-red-900 w-full max-w-[200px] text-center text-white p-1 rounded-md'>{listing.type === "rent" ? "For Rent" : "For Sale"}</p>
                        {
                            listing.offer && (
                                <p className='bg-green-900 w-full max-w-[200px] text-center text-white p-1 rounded-md'>${+listing.regularPrice - +listing.discountPrice} OFF</p>
                            )
                        }
                        </div>
                        <p className='text-slate-800'><span className='font-semibold text-black'>Description - </span>{listing.description}</p>
                        <ul className='font-semibold text-sm text-green-900 flex items-center flex-wrap gap-4 sm:gap-6'>
                            <li className='flex items-center gap-1 whitespace-nowrap'>
                                <FaBed className='text-lg'/>
                                {listing.bedrooms > 1 ? `${listing.bedrooms} bedrooms` : `${listing.bedrooms} bed` }
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap'>
                                <FaBath className='text-lg'/>
                                {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : `${listing.bathrooms} bath` }
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap'>
                                <FaParking className='text-lg'/>
                                {listing.parking > 1 ? `Parking Spot` : `No Parking` }
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap'>
                                <FaChair className='text-lg'/>
                                {listing.furnished ? ` Furnished` : `Unfurnished` }
                            </li>
                        </ul>
                        {currentUser && listing.userRef !== currentUser._id && !contact && (
                            <button onClick={()=>setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>Contact landlord</button>
                        )}
                        {contact && <Contact listing={listing}/>}
                </div>
            </>
        )}
    </main>
}

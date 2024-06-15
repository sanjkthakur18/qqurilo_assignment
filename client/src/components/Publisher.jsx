import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const Publisher = () => {
    const [data, setData] = useState()
    const baseUrl = 'https://www.google.com'

    const handlePublisher = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:4000/api/publisher/666d69e6f2d042b62e17da92/get-publisher`)
            console.log(res);
            setData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handlePublisher()
    }, [])

    const handleAddStats = async (e, adId) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://127.0.0.1:4000/api/publisher/666d69e6f2d042b62e17da92/update-count/${adId}`)
            setData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {
                data?.ads?.map(ad => (
                    <div onClick={() => handleAddStats(ad._id)} key={ad._id} className="w-[50%] text-center h-[100vh] mx-auto rounded overflow-hidden">
                        <NavLink to={ad.adId.adUrl} target="_blank" >
                            <img src={ad.adId.img[0]} alt={ad.name} className="w-[50%] mt-10 object-cover overflow-hidden mx-auto rounded-lg shadow-xl" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{ad.adId.name}</div>
                            </div>
                        </NavLink>
                    </div>
                ))
            }
        </div>
    )
}

export default Publisher

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Publisher = () => {
    const [data, setData] = useState()
    const baseUrl = 'https://www.google.com'

    const handlePublisher = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:4000/api/publisher/666b2776907ea6ba87c65341/get-publisher`)
            setData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handlePublisher()
    }, [])

    const handleAddStats = async (adId) => {
        try {
            const res = await axios.get(`http://127.0.0.1:4000/api/publisher/666b2776907ea6ba87c65341/update-count/${adId}`)
            setData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {
                data?.ads?.map(ad => (
                    <Link onClick={handleAddStats} to={`${baseUrl}/${ad.siteId}/${ad.zoneId}`} target="_blank" key={ad.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                        <img src={ad.adId.img[0]} alt={ad.name} className="w-full" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{ad.name}</div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Publisher
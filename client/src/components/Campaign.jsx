import React, { useContext, useState } from 'react'
import { CampaignContext } from '../store/campaignContext'

const Campaign = () => {
    const { state, campaign } = useContext(CampaignContext)
    const [campData, setCampData] = useState({ name: '', category: '', type: '', bidvalue: 0, siteUrl: '' })
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')

    const formData = new FormData()

    formData.append('name', campData.name)
    formData.append('category', campData.category)
    formData.append('type', campData.type)
    formData.append('bidvalue', campData.bidvalue)
    formData.append('siteUrl', campData.siteUrl)
    formData.append('img', file)

    const handleChange = (evt) => {
        setCampData({ ...campData, [evt.target.name]: evt.target.value })
    }

    const handleImg = (evt) => {
        setFile(evt.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        try {
            await campaign(formData)
            console.log(campData, file)
            // setCampData({ name: '', category: '', type: '', bidvalue: 0, file: null })
            setFile(null)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Create Ad Campaign</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
                        <input
                            required
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="John Doe"
                            name='name' value={campData.name} onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Add URL</label>
                        <input
                            required
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="https://www.google.com"
                            name='siteUrl' value={campData.siteUrl} onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="category">Category</label>
                        <select
                            required
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            value={campData.category} onChange={handleChange} name="category"
                        >
                            <option value="">Select Category</option>
                            <option value='Main Stream'>Main Stream</option>
                            <option value='Adults'>Adults</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="type">Ads Type</label>
                        <select
                            required
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            value={campData.type} onChange={handleChange} name="type"
                        >
                            <option value="">Select Ad Type</option>
                            <option value='Banner Ad'>Banner Ad</option>
                            <option value='Direct Link'>Direct Link</option>
                            <option value='Pop Under'>Pop Under</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="bidvalue">Bid Value</label>
                        <input
                            required
                            type="number"
                            name='bidvalue'
                            value={campData.bidvalue} onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="25"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="ads-picture">Campaign Picture</label>
                        <input
                            required
                            type="file"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            onChange={handleImg}
                        />
                    </div>
                    <div className="text-red-500 mb-4">{errorMessage}</div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Create Campaign
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Campaign

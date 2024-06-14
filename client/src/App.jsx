import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Campaign from './components/Campaign'
import Publisher from './components/Publisher'
import { CampaignProvider } from './store/campaignContext'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <CampaignProvider>
        <Routes>
          <Route path='/' element={<Campaign />} />
        </Routes>
      </CampaignProvider>
      <Routes>
        <Route path='/publisher' element={<Publisher />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
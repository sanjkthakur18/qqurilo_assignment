import { createContext, useReducer } from "react"
import axios from 'axios'
import { initialState, campaignReducer } from "../reducer/campaignReducer"

const CampaignContext = createContext()

const CampaignProvider = ({ children }) => {
    const [state, dispatch] = useReducer(campaignReducer, initialState)

    const campaign = async (campData) => {
        dispatch({ type: 'CREATE_CAMPAIGN_REQUEST' });
        try {
            const res = await axios.post('http://127.0.0.1:4000/api/ads/add-campaign', campData);
            console.log(res.data);
            dispatch({ type: 'CREATE_CAMPAIGN_SUCCESS', payload: res.data })
        } catch (error) {
            dispatch({ type: 'CREATE_CAMPAIGN_FAILURE', payload: error.message })
        }
    }

    return (
        <CampaignContext.Provider value={{ state, campaign }}>
            {children}
        </CampaignContext.Provider>
    )
}

export { CampaignProvider, CampaignContext }
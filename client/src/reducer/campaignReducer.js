const initialState = {
    loading: false,
    error: null,
    success: false
}

const campaignReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_CAMPAIGN_REQUEST': return { ...state, loading: true, error: null }
        case 'CREATE_CAMPAIGN_SUCCESS': return { ...state, loading: false, success: true }
        case 'CREATE_CAMPAIGN_FAILURE': return { ...state, loading: false, error: action.payload }
        default: return state
    }
}

export { initialState, campaignReducer }
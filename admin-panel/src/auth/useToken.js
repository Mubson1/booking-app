//custom use state to set a token into localStorage

import { useState } from 'react'

const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        return localStorage.getItem('token');
    })

    const setToken = newToken => {
        localStorage.setItem('token', newToken);
        setTokenInternal(newToken)
    }
    
    return [token, setToken]
}

export default useToken

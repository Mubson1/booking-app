import useToken from "./useToken";
import { useState, useEffect } from "react";

const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = token => {
        const encodedPayload = token.split('.')[1]
        return JSON.parse(atob(encodedPayload))
    }

    const [user, setUser] = useState(() => {
        if(!token) return null
        return getPayloadFromToken(token)
    })

    useEffect(() => {
        if(!token) {
            setUser(null)
        } else {
            setUser(getPayloadFromToken(token))
        }
    }, [token])

    return user
}

export default useUser

import axios from '../../auth/axiosInstance'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useToken from '../../auth/useToken'
import EmailVerificationFail from './EmailVerificationFail'
import EmailVerificationSuccess from './EmailVerificationSuccess'

const EmailVerificationLandingPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [ isSuccess, setIsSuccess] = useState(false)

    const {verificationString} = useParams()

    const [,setToken] = useToken();

    useEffect(() => {
        const loadVerification = async () => {
            try {
                const response = await axios.put('/authentication/verify-email', {verificationString})
                const {token} = response.data
                setToken(token)
                setIsLoading(false)
                setIsSuccess(true)
            } catch (error) {
                setIsSuccess(false)
                setIsLoading(false)
            }
        }
        loadVerification()
    }, [setToken, verificationString])

    if(isLoading) return <p>Loading...</p>
    if(!isSuccess) return <EmailVerificationFail />
    return <EmailVerificationSuccess />

}

export default EmailVerificationLandingPage

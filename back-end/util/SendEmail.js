import Sib from 'sib-api-v3-sdk'
import dotenv from 'dotenv'

dotenv.config()
export const SendEmail = ({to, from, subject, text, html}) => {
    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.SIB_API_KEY

    const tranEmailApi = new Sib.TransactionalEmailsApi()
    const sender = {
        email: from,
        name: 'HYP'
    }
    const receivers = [
        {
            email: to,
        }
    ]

    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: subject,
        textContent: text,
        htmlContent: html,
        params: {
            role: 'Frontend'
        }
    })
    .then(console.log)
    .catch(console.log)
}
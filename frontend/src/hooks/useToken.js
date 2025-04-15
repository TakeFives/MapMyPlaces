import { useState } from "react";

export const useToken = () => {
    const getToken =() =>{
        const tokenString = sessionStorage.getItem('accessToken')
        const userToken = JSON.parse(tokenString)
        return userToken?.token
    } 

    const [token, setToken] = useState(getToken())

    const saveToken = userToken => {
        sessionStorage.setItem('accessToken', JSON.stringify(userToken))
        setToken(userToken.token)
    }

    return {
        setToken: saveToken,
        token
    }
}

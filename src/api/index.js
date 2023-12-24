import {jwtDecode} from 'jwt-decode'
import axios from "axios";

const apiRequest = axios.create({
    baseURL:'http://localhost:8080/',
})

apiRequest.interceptors.request.use(  //intercepts all requests, takes 2 functions
    async (request) => {
        //grab auth token from localstorage
        console.log(request)
        const isLogOut = request.url.split('/').pop() === 'jwtLogOut'
        console.log(isLogOut)
        let accessToken = localStorage.getItem('token')
        //use jwt.decode to grab the info from inside 
        const decoded = jwtDecode(accessToken) // figure out if i can take this from the req
        //if it is expired, make a refresh request
        const expDate = new Date(decoded.exp * 1000)
        if (expDate <= new Date() && !isLogOut) {
            const refreshToken = localStorage.getItem('refresh')
            const decodedRefresh = jwtDecode(refreshToken)
            const refreshExp = new Date(decodedRefresh.exp * 1000)
            if (refreshExp <= new Date()) {
                console.log('need to find some way to navigate back to main')
            }
            //axios call to get new tokens
            const newTokens = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/users/jwtRefresh`,
                {
                    accessToken,
                    refreshToken
                }
            );
            //put tokens in localstorage
            localStorage.setItem("token", "Bearer " + newTokens.data.data)
            localStorage.setItem("refresh", "Bearer " + newTokens.data.refresh)
            //and then use the token to make the request
            accessToken = `Bearer ` + newTokens.data.data
        }
        //add authorization header
        request.headers['Authorization'] = accessToken
        //if not expired, just return request
        return request;
    }, (error) => { //intercepts all requests
        console.log('some error msg');
        return error;
    }

)

export default apiRequest;
import { Route, Routes, useNavigate } from 'react-router-dom'
import MyNavbar from '../components/MyNavbar'
import NotFoundPage from '../pages/NotFoundPage'
import HomePage from './../pages/HomePage'
import ErrorPage from './../pages/ErrorPage'
import PhoneDetailsPage from './../pages/PhoneDetailsPage'

import { Spinner } from 'react-bootstrap'
import { useEffect, useState, setTimeOut, axios } from 'react'




const AppRoutes = () => {

    const [phoneList, setPhonesList] = useState([])
    const [fetchingPhones, setFetchingPhones] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        getPhonesList()
    }, [])

    const getPhonesList = async () => {
        try {
            const response = await axios.get(`${process.env.REACT.APP.SERVER.URL}/phones`)
            setTimeOut(() => {
                setPhonesList(response.data)
                setFetchingPhones(false)
            }, 1000)
        }
        catch (error) {
            navigate('/error')
        }
    }

    if (fetchingPhones) {
        return (
            <div className='AppRoutes'>
                <Spinner animation='border' variant='info' />
            </div>

        )
    }
    return (
        <div className='AppRoutes'>
            <MyNavbar phoneList={phoneList} />
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/phone-details/:phoneId" element={<PhoneDetailsPage phoneList={phoneList} />} />

                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </div>
    )
}
export default AppRoutes
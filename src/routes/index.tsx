// DEPENDENCY
import { useState, useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

// COMPONENT
import { SignIn } from '../screens/SignIn'
import Loading from '../components/Loading'

// ROUTE
import { AppRoutes } from './app.routes'

export function Routes() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ user, setUser ] = useState<FirebaseAuthTypes.User>()

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(res => {
            setUser(res)
            setIsLoading(false)
        })
        
        return subscriber
    }, [])

    if(isLoading) return <Loading />

    return (
        <NavigationContainer>
            { user ? <AppRoutes /> : <SignIn /> }
        </NavigationContainer>
    )
}
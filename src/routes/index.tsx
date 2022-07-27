// DEPENDENCY
import { NavigationContainer } from "@react-navigation/native"

// COMPONENT
import { SignIn } from '../screens/SignIn'

// ROUTE
import { AppRoutes } from './app.routes'

export function Routes() {
    return (
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
    )
}
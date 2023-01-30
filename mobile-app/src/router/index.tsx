import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes  } from './app.routers'

export function Routes () {
    return (
        <NavigationContainer>
            <AppRoutes/>
        </NavigationContainer>
    )
}
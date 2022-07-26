// DEPENDENCY
import { useRoute } from '@react-navigation/native'

// COMPONENT
import { VStack, Text } from 'native-base'
import { Header } from '../components/Header'

type RouteParams = {
    orderId: string;
}

export function Details() {

    const route = useRoute()
    const { orderId } = route.params as RouteParams

    return (
        <VStack flex={1} bg="white.500">
            <Header title="solititation" />
            <Text>
                {orderId}
            </Text>
        </VStack>
    )
}
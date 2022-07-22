import { Center, Spinner } from 'native-base'

export default function Loading() {
    return (
        <Center flex={1} bg="white.500">
            <Spinner color="secondary.700" />
        </Center>
    )
}
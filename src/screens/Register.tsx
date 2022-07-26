// COMPONENT
import { VStack } from 'native-base'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function Register() {
    return(
        <VStack flex={1} p={6} bg="white.500">
            <Header title="New Ticket"/>
            <Input
                placeholder="Patrimony number"
            />
            <Input
                placeholder="Ticket description"
                flex={1}
                mt={5}
                multiline
                textAlignVertical="top"
            />

            <Button 
                title="Create"
                mt={5}  
            />
        </VStack>
    )
}
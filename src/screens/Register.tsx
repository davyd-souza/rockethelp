// DEPENDENCY
import { useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

// COMPONENT
import { useNativeBase, VStack } from 'native-base'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Alert } from 'react-native'

export function Register() {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ patrimony, setPatrimony ] = useState('')
    const [ description, setDescription ] = useState('')

    const navigation = useNavigation()

    const handleNewTicketRegister = () => {
        if(!patrimony || !description) return Alert.alert('New Ticket', 'Patrimony and Description are required.')

        setIsLoading(true)

        firestore()
            .collection('ticket')
            .add({
                patrimony,
                description,
                status: 'open',
                createdAt: firestore.FieldValue.serverTimestamp()
            })
            .then(() => { 
                Alert.alert('New ticket', 'Ticket was created successfully.')
                navigation.goBack()
            })
            .catch((err) => {
                console.error(err)
                setIsLoading(false)
                return Alert.alert('New Ticket', 'Something went wrong.')
            })
    }

    return(
        <VStack flex={1} p={6} bg="white.500">
            <Header title="New Ticket"/>
            <Input
                placeholder="Patrimony number"
                onChangeText={setPatrimony}
            />
            <Input
                placeholder="Ticket description"
                flex={1}
                mt={5}
                multiline
                textAlignVertical="top"
                onChangeText={setDescription}
            />

            <Button 
                title="Create"
                mt={5}
                isLoading={isLoading}
                onPress={handleNewTicketRegister}
            />
        </VStack>
    )
}
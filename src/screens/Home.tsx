// DEPENDENDCY
import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

// COMPONENT
import { VStack, HStack, IconButton, useTheme, Text, Heading, FlatList, Center } from 'native-base'
import { Filter } from '../components/Filter'
import { Button } from '../components/Button'
import { Ticket, TicketProps } from '../components/Ticket'
import Loading from '../components/Loading'

// STYLE
import Logo from '../assets/logo_secondary.svg'
import { SignOut, ChatTeardropText } from 'phosphor-react-native'

// UTIL
import { dateFormat } from '../utils/firestoreDateFormat'

export function Home() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ selected, setSelected ] = useState<'open' | 'closed'>('open')
    const [ ticket, setTicket ] = useState<TicketProps[]>([])

    const navigation = useNavigation()
    const { colors } = useTheme()

    const handleNewTicket = () => navigation.navigate('new')
    const handleOpenDetails = (ticketId: string) => navigation.navigate('details', { ticketId })
    const handleLogout = () => auth().signOut()

    useEffect(() => {
        setIsLoading(true)

        const subscriber = firestore()
            .collection('ticket')
            .where('status', '==', selected)
            .onSnapshot(snapshot => {
                 const data = snapshot.docs.map(doc => {
                    const { patrimony, description, status, createdAt } = doc.data()
                    return {
                        id: doc.id,
                        patrimony,
                        description,
                        status,
                        when: dateFormat(createdAt)
                    }
                 })
                 setTicket(data)
                 setIsLoading(false)
            })
            return subscriber
    }, [selected])

    return (
        <VStack
            flex={1}
            pb={6}
            bg="white.500"
        >
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                // bg="white.700"
                pt={12}
                pb={4}
                px={6}
            >
                <Logo />
                <IconButton
                    icon={ <SignOut size={26} color={colors.gray[500]} />}
                    onPress={handleLogout}
                />
            </HStack>

            <VStack flex={1} px={6}>
                <HStack 
                    w="full"
                    mt={4} 
                    mb={4} 
                    justifyContent="space-between" 
                    alignItems="center"
                >
                    <Heading color="gray.500">
                        Tickets
                    </Heading>

                    <Text color="gray.400">
                        {ticket.length}
                    </Text>
                </HStack>

                <HStack space={3} mb={8}>
                    <Filter 
                        type="open"
                        title="in progress"
                        onPress={() => setSelected('open')}
                        isActive={selected === 'open'}
                        />
                    <Filter 
                        type="closed"
                        title="closed"
                        onPress={() => setSelected('closed')}
                        isActive={selected === 'closed'}
                    />
                </HStack>
                {
                    isLoading ? <Loading /> :
                    <FlatList
                        data={ticket}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Ticket data={item} onPress={() => handleOpenDetails(item.id)}/>}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 50}}
                        ListEmptyComponent={() => (
                            <Center>
                                <ChatTeardropText color={colors.gray[400]} size={40}/>
                                <Text color="gray.400" fontSize="xl" mt={6} textAlign="center">
                                    There are no tickets {'\n'}
                                    {selected === 'open' ? 'in progress' : 'closed'}
                                </Text>
                            </Center>
                        )}
                    />
                }
                <Button title="New Ticket" onPress={handleNewTicket}/>
            </VStack>

        </VStack>
    )
}
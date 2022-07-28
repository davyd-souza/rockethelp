// DEPENDENCY
import { useRoute, useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { Alert } from 'react-native'

// COMPONENT
import { VStack, Text, HStack, useTheme, ScrollView, Box } from 'native-base'
import { Header } from '../components/Header'
import Loading from '../components/Loading'
import { TicketDetails } from '../components/TicketDetails'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

// STYLE
import { CircleWavyCheck, Hourglass, DesktopTower, ClipboardText } from 'phosphor-react-native'

// UTIL
import { dateFormat } from '../utils/firestoreDateFormat'

// TYPE
import { TicketProps } from '../components/Ticket'
import { TicketFirestoreDTO } from '../DTOs/TicketFirestoreDTO'

type RouteParams = {
    ticketId: string
}

type TicketDetails = TicketProps & {
    description: string;
    solution: string;
    closed: string;
}



export function Details() {
    const [ solution, setSolution ] = useState('')
    const [ isLoading, setIsLoading ] = useState(true)
    const [ ticket, setTicket ] = useState<TicketDetails>({} as TicketDetails)

    const navigation = useNavigation()
    const { colors } = useTheme()
    const route = useRoute()
    const { ticketId } = route.params as RouteParams

    const handleCloseTicket = () => {
        if(!solution) return Alert.alert('Ticket', 'Inform which ticket you are trying to close')

        firestore()
            .collection<TicketFirestoreDTO>('ticket')
            .doc(ticketId)
            .update({
                status: 'closed',
                solution,
                closedAt: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert('Ticket', 'Closed successfully.')
                navigation.goBack()
            })
            .catch(err => {
                console.error(err)
                Alert.alert('Ticket', 'Something went wrong.')
            })
    }

    useEffect(() => {
        firestore()
            .collection<TicketFirestoreDTO>('ticket')
            .doc(ticketId)
            .get()
            .then((doc) => {
                const { patrimony, description, status, createdAt, closedAt, solution } = doc.data()
                const closed = closedAt ? dateFormat(closedAt) : null
                
                setTicket({
                    id: doc.id,
                    patrimony,
                    description,
                    status,
                    solution,
                    when: dateFormat(createdAt),
                    closed
                })
                
                setIsLoading(false)
            })
    }, [])

    if(isLoading) return <Loading />

    return (
        <VStack flex={1} bg="white.500">
            <Box px={6}>
                <Header title="Ticket" />
            </Box>
            <HStack justifyContent="center" p={4}>
                {
                    ticket.status === 'closed'
                    ? <CircleWavyCheck size={22} color={colors.primary[700]} />
                    : <Hourglass size={22} color={colors.secondary[700]} />
                }

                <Text
                    fontSize="sm"
                    color={ticket.status === 'closed' ? colors.primary[700] : colors.secondary[700]}
                    ml={2}
                    textTransform="uppercase"
                >
                    {ticket.status === 'closed' ? 'Closed' : 'In Progress'}
                </Text>
            </HStack>

            <ScrollView mx={5} showsVerticalScrollIndicator={false}>
                <TicketDetails
                    title="equipment"
                    description={`Patrimony ${ticket.patrimony}`}
                    icon={DesktopTower}
                />

                <TicketDetails
                    title="ticket description"
                    description={ticket.description}
                    icon={ClipboardText}
                    footer={`Created at ${ticket.when}`}
                />

                <TicketDetails
                    title="solution"
                    icon={CircleWavyCheck}
                    description={ticket.solution}
                    footer={ticket.closed && `Closed at ${ticket.closed}`}
                >
                    {
                        ticket.status === 'open' &&
                        <Input 
                            bg="white.500"
                            placeholder="Solution description"
                            onChangeText={setSolution}
                            h={24}
                            textAlignVertical="top"
                            multiline
                        />
                    }
                </TicketDetails>
            </ScrollView>

            {
                ticket.status === 'open' &&
                <Button 
                    title="Close ticket"
                    m={5}
                    onPress={handleCloseTicket}
                />
            }
        </VStack>
    )
}
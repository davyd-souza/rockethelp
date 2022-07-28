// DEPENDENDCY
import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

// COMPONENT
import { VStack, HStack, IconButton, useTheme, Text, Heading, FlatList, Center } from 'native-base'
import { Filter } from '../components/Filter'
import { Button } from '../components/Button'
import { Ticket, TicketProps } from '../components/Ticket'

// STYLE
import Logo from '../assets/logo_secondary.svg'
import { SignOut, ChatTeardropText } from 'phosphor-react-native'

export function Home() {
    const [selected, setSelected] = useState<'progress' | 'closed'>('progress')
    const [orders, setOrders] = useState<TicketProps[]>([
        {
            id: '123',
            patrimony: '123456',
            when: '18/07/2022 at 10:00',
            status: 'progress'
        },
        {
            id: '456',
            patrimony: '789123',
            when: '26/07/2022 at 08:00',
            status: 'progress'
        },
    ])

    const navigation = useNavigation()
    const { colors } = useTheme()

    const handleNewTicket = () => navigation.navigate('new')
    const handleOpenDetails = (orderId: string) => navigation.navigate('details', { orderId })
    const handleLogout = () => auth().signOut()

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
                        {orders.length}
                    </Text>
                </HStack>

                <HStack space={3} mb={8}>
                    <Filter 
                        type="progress"
                        title="in progress"
                        onPress={() => setSelected('progress')}
                        isActive={selected === 'progress'}
                        />
                    <Filter 
                        type="closed"
                        title="closed"
                        onPress={() => setSelected('closed')}
                        isActive={selected === 'closed'}
                    />
                </HStack>
                
                <FlatList
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Ticket data={item} onPress={() => handleOpenDetails(item.id)}/>}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 50}}
                    ListEmptyComponent={() => (
                        <Center>
                            <ChatTeardropText color={colors.gray[400]} size={40}/>
                            <Text color="gray.400" fontSize="xl" mt={6} textAlign="center">
                                There are no tickets {'\n'}
                                {selected === 'progress' ? 'in progress' : 'closed'}
                            </Text>
                        </Center>
                    )}
                />

                <Button title="New Ticket" onPress={handleNewTicket}/>
            </VStack>

        </VStack>
    )
}
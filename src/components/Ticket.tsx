// COMPONENT
import { VStack, HStack, Text, useTheme, Box, Circle, Pressable, IPressableProps } from 'native-base'

// STYLE
import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native'

export type TicketProps = {
    id: string;
    patrimony: string;
    when: string;
    status: 'progress' | 'closed'
}

type Props = IPressableProps & {
    data: TicketProps
}

export function Ticket({data, ...rest}: Props) {
    const { colors } = useTheme()

    const statusColor = data.status === 'closed' ? colors.primary[500] : colors.secondary[700]
    return (
        <Pressable {...rest}>
            <HStack
                bg="white.700"
                mb={4}
                alignItems="center"
                justifyContent="space-between"
                rounded="sm"
                overflow="hidden"
            >
                <Box h="full" w={2} bg={statusColor} />
                <VStack flex={1} my={5} ml={5}>
                    <Text fontSize="md">
                        Patrimony: {data.patrimony}
                    </Text>
                    <HStack alignItems="center">
                        <ClockAfternoon size={15} color={colors.gray[400]} />
                        <Text color="gray.500" fontSize="xs" ml={1}>
                            {data.when}
                        </Text>
                    </HStack>
                </VStack>

                <Circle h={12} w={12} mr={5}>
                    {
                        data.status === 'closed'
                            ? <CircleWavyCheck size={24} color={statusColor} />
                            : <Hourglass size={24} color={statusColor} />
                    }
                </Circle>
            </HStack>     
        </Pressable>
    )
}
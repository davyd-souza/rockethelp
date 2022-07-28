// DEPENDENCY
import { ReactNode } from 'react'

// COMPONENT
import { VStack, HStack, Text, Box, useTheme } from 'native-base'

// STYLE
import { Icon, IconProps } from 'phosphor-react-native'

type Props = {
    title: string;
    description?: string;
    footer?: string;
    icon: React.ElementType<IconProps>;
    children?: ReactNode;
}

export function TicketDetails({
    title,
    description,
    footer = null,
    icon: Icon,
    children
}: Props) {
    const { colors } = useTheme()
    
    return (
        <VStack bg="white.700" p={5} mt={5} rounded="sm">
            <HStack alignItems="center" mb={4}>
                <Icon color={colors.primary[700]} />
                <Text ml={2} color="gray.500" fontSize="sm" textTransform="uppercase">
                    {title}
                </Text>
            </HStack>

            {
                !!description &&
                <Text color="gray.400" fontSize="md">{description}</Text>
            }

            { children }

            {
                !!footer &&
                <Box borderTopWidth={1} borderTopColor="primary.700" mt={3}>
                    <Text mt={3} color="gray.700" fontSize="sm">
                        { footer }
                    </Text>
                </Box>
            }
        </VStack>
    )
}
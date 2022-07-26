// COMPONENT
import { HStack, useTheme, IconButton, Heading, StyledProps } from 'native-base'

// STYLE
import { CaretLeft } from 'phosphor-react-native'

type Props = StyledProps & {
    title: string;
}

export function Header({title, ...rest}: Props) {
    const { colors } = useTheme()
    return (
        <HStack
            w="full"
            justifyContent="space-between"
            alignItems="center"
            pb={6}
            pt={12}
            {...rest}
        >
            <IconButton 
                icon={<CaretLeft color={colors.gray[400]} size={24}/>}
            />
            <Heading color="gray.500" textAlign="center" fontSize="lg" flex={1} ml={-6}>
                {title}
            </Heading>
        </HStack>
    )
}
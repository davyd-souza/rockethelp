// COMPONENT
import { Text, Button, IButtonProps, useTheme } from 'native-base'

type Props = IButtonProps & {
    title: string;
    isActive?: boolean;
    type: 'progress' | 'closed';
}

export function Filter( {title, isActive = false, type, ...rest }: Props ) {
    const { colors } = useTheme()

    const colorType = type === 'closed' ? colors.primary[500] : colors.secondary[700]
    return (
        <Button
            variant="outline"
            borderWidth={isActive ? 1 : 0}
            borderColor={colorType}
            flex={1}
            size="sm"
            {...rest}
        >
            <Text color={isActive ? colorType : "gray.500"} fontSize="xs" textTransform="uppercase">
                { title }
            </Text>
        </Button>
    )
}
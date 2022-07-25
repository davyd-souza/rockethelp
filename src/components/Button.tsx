import { Button as NativeBaseButton, IButtonProps, Heading } from 'native-base'

type Props = IButtonProps & {
    title: string;
}

export function Button( { title, ...rest }: Props) {
    return (
        <NativeBaseButton
            bg="primary.700"
            h={14}
            fontSize="sm"
            rounded="sm"
            _pressed={{
                bg: "primary.500"
            }}
            {...rest}
        >
            <Heading color="white.700" fontSize="sm">
                { title }
            </Heading>
        </NativeBaseButton>
    )
}
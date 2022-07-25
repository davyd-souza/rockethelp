import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({...rest}: IInputProps) {
  return (
    <NativeBaseInput 
        h={14}
        size="md"
        borderWidth={1}
        fontSize="md"
        fontFamily="body"
        color="gray.500"
        placeholderTextColor="gray.300"
        _focus={{
          borderColor: "secondary.700",
          bg: "white.500"
        }}
        {...rest}
    />
  );
}
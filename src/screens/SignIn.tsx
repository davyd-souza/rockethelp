// DEPENDENCY
import { useState } from 'react'

// COMPONENT
import { VStack, Heading, Icon, useTheme } from 'native-base'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

// STYLE
import Logo from '../assets/logo_primary.svg'
import { Envelope, Key } from 'phosphor-react-native'

export function SignIn() {
    const [ user, setUser ] = useState('')
    const [ password, setPassword ] = useState('')
    
    function handleSignIn() {
        console.log(user, password);
    }
    return(
        <VStack 
            flex={1} 
            alignItems="center"
            bg="white.500"
            px={8}
            pt={24}
        >
            <Logo width={168} height={87}/>
            <Heading fontSize="xl" mt={20} mb={6}>
                Log into your account
            </Heading>
            
            <Input
                placeholder="User"
                mb={4}
                InputLeftElement={ 
                    <Icon 
                        as={ <Envelope /> }
                        ml={4}
                    /> 
                }
                onChangeText={setUser}
            />
            <Input
                placeholder="Password"
                mb={8}
                InputLeftElement={
                    <Icon 
                        as={ <Key /> }
                        ml={4}                    
                    /> 
                }
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button 
                title="Entrar"
                w="full"
                onPress={handleSignIn}
            />
        </VStack>
    )
}
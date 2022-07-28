// DEPENDENCY
import { useState } from 'react'
import auth from '@react-native-firebase/auth'

// COMPONENT
import { VStack, Heading, Icon, useTheme } from 'native-base'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Alert } from 'react-native'

// STYLE
import Logo from '../assets/logo_primary.svg'
import { Envelope, Key } from 'phosphor-react-native'

export function SignIn() {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ user, setUser ] = useState('')
    const [ password, setPassword ] = useState('')
    
    const handleSignIn = () => {
        if(!user || !password) return Alert.alert('Login', 'Please inform e-mail and password')

        setIsLoading(true)
        auth()
            .signInWithEmailAndPassword(user, password)
            .catch((err) => {
                console.error(err);
                setIsLoading(false)

                if(err.code === 'auth/invalid-email' ) return Alert.alert('Login', 'Invalid e-mail.')
                if(err.code === 'auth/user-not-found' || 'auth/wrong-password') return Alert.alert('Login', 'User or password are wrong.')

                return Alert.alert('Login', 'Something went wrong')
            })
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
                isLoading={isLoading}
            />
        </VStack>
    )
}
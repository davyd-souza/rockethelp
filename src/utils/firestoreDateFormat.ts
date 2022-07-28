import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export const dateFormat = (timestamp: FirebaseFirestoreTypes.Timestamp) => {
    if(timestamp) 
        return `${timestamp.toDate().toLocaleDateString()} at ${timestamp.toDate().toLocaleTimeString()}`
}
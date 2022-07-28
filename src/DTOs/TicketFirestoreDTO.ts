// DEPENDENCY
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type TicketFirestoreDTO = {
    patrimony: string;
    description: string;
    status: 'open' | 'closed';
    solution?: string;
    createdAt: FirebaseFirestoreTypes.Timestamp;
    closedAt?: FirebaseFirestoreTypes.Timestamp;
}
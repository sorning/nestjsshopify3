import firebase from 'firebase/app'
import 'firebase/auth'

firebase.initializeApp(firebaseConfig)
const auth=firebase.auth()
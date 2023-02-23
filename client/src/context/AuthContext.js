import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase-config';

// https://stackoverflow.com/questions/60946584/react-use-context-cannot-destructure-property-currentchatbotinedit-of-object
const UserContext = createContext("");

export const UserAuth = () => {
  return useContext(UserContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
      .then(() => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("userName");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  // function resetPassword(email) {
  //   alert('')
  //   return auth.sendPasswordResetEmail(email).then((a) => {
  //     alert(a)
  //   })
  // }

  // function updateEmail(email) {
  //   return user.updateEmail(email) //segun stackoverflow es con currentUser
  // }

  // function updatePassword(password) {
  //   return user.updatePassword(password)//segun stackoverflow es con currentUser
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('AuthContextProvider.onAuthStateChanged(), user: ', firebaseUser);
      
      setUser(firebaseUser);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, isLoading, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

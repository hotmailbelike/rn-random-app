import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            console.error(
              '🚀 -> file: AuthProvider.js -> line 17 -> signIn: -> error',
              error,
            );
            return {error};
          }
        },
        signUp: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (error) {
            console.error(
              '🚀 -> file: AuthProvider.js -> line 25 -> signUp: -> error',
              error,
            );
            return {error};
          }
        },
        signOut: async (email, password) => {
          try {
            await auth().signOut();
          } catch (error) {
            console.error(
              '🚀 -> file: AuthProvider.js -> line 38 -> signOut: -> error',
              error,
            );
            return {error};
          }
        },
        requestPasswordReset: async email => {
          try {
            let res = await auth().sendPasswordResetEmail(email);
            console.log(
              '🚀 -> file: AuthProvider.js -> line 47 -> AuthProvider -> res',
              res,
            );
          } catch (error) {
            console.error(
              '🚀 -> file: AuthProvider.js -> line 49 -> requestPasswordReset: -> error',
              error,
            );
            return {error};
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

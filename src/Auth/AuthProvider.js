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
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

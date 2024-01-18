import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Routes from './src/routes';
import { AuthProvider } from './src/cotexts/AuthContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar 
          backgroundColor="#61dafb" 
          barStyle="light-content" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
import React, { useState } from "react";
import { 
    TouchableWithoutFeedback, 
    KeyboardAvoidingView, 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TextInput, 
    TouchableOpacity, 
    Platform,
    Keyboard
} from "react-native";

export default function SigIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if(email == '' || password == '') {
            return;
        }
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    }

    return(
        <TouchableWithoutFeedback
            onPress={dismissKeyboard}
        >
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                >
                <Image 
                    style={styles.logo}
                    source={require('../../assets/logo.png')}/>

                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder="Digite seu email"
                        style={styles.input}
                        placeholderTextColor="#f0f0f0"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput 
                        placeholder="Digite sua senha"
                        style={styles.input}
                        placeholderTextColor="#f0f0f0"
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Acessar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d1d2e'
    },

    logo: {
        width: 80,
        height: 80,
        marginBottom: 18
    },

    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14
    },

    input: {
        width: '95%',
        height: 40,
        backgroundColor: '#101026',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: '#FFF'
    },

    button: {
        width: '95%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#101026'
    }
});
import React, { useContext, useState } from "react";
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
    Keyboard,
    ActivityIndicator
} from "react-native";
import { AuthContext } from "../../cotexts/AuthContext";

export default function SigIn() {
    const { signIn, loading } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if(email == '' || password == '') {
            return;
        }

        await signIn({email, password});
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
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput 
                        placeholder="Digite sua senha"
                        style={styles.input}
                        placeholderTextColor="#f0f0f0"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true} 
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        {loading ? (
                            <ActivityIndicator size={25} color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>Acessar</Text>
                        )}
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
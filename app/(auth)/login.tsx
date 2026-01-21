import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        // DEMO LOGIN LOGIC
        if (!email || !password) {
            Alert.alert('Missing Details', 'Please enter both email and password.');
            return;
        }

        setLoading(true);
        Keyboard.dismiss(); 

        setTimeout(() => {
            setLoading(false);
            const mail = email.toLowerCase();

            // LINK 1: Redirect to Firm Dashboard
            if (mail.includes('firm') || mail.includes('admin') || mail.includes('main')) {
                router.replace('/(firm)/dashboard');
            }
            // LINK 2: Redirect to Verifier Scanner
            else if (mail.includes('verify') || mail.includes('police')) {
                router.replace('/(verifier)/scan-qr');
            }
            else {
                Alert.alert('Access Denied', 'Invalid Role. Try "admin@test.com" or "firm@test.com"');
            }
        }, 1500);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="boat" size={50} color={Colors.white} />
                        </View>
                        <Text style={styles.title}>Rafting Management</Text>
                        <Text style={styles.subtitle}>Secure. Transparent. Safe.</Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>Email Address</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color={Colors.textLight} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="official@govt.in"
                                placeholderTextColor="#A0A0A0"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                autoCorrect={false}
                            />
                        </View>

                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color={Colors.textLight} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter password"
                                placeholderTextColor="#A0A0A0"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color={Colors.textLight} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleLogin} disabled={loading}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24, paddingBottom: 40 },
    header: { alignItems: 'center', marginBottom: 40 },
    iconCircle: { width: 100, height: 100, backgroundColor: Colors.primary, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 26, fontWeight: '800', color: '#2D3436', textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#636E72', marginTop: 8 },
    form: { width: '100%', backgroundColor: Colors.white, padding: 24, borderRadius: 20 },
    label: { fontSize: 14, fontWeight: '600', color: '#2D3436', marginBottom: 8, marginTop: 12 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F3F5', borderRadius: 12, borderWidth: 1, borderColor: '#E9ECEF', height: 56, paddingHorizontal: 16 },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, fontSize: 16, color: '#2D3436', height: '100%' },
    eyeIcon: { padding: 8 },
    button: { backgroundColor: Colors.primary, height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 32 },
    buttonDisabled: { backgroundColor: '#A0A0A0' },
    buttonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
});
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
    const [showPassword, setShowPassword] = useState(false); // Toggle state

    // TEMPORARY: Dummy Login Logic
    // UPDATED: Logic to handle 'admin', 'main', and 'firm' logins
    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Missing Details', 'Please enter both email and password.');
            return;
        }

        setLoading(true);
        Keyboard.dismiss(); // Hide keyboard when button is pressed

        // Simulate network delay
        setTimeout(() => {
            setLoading(false);

            const mail = email.toLowerCase();

            // Logic: Admin, Main, and Firm owners go to the Dashboard
            if (mail.includes('firm') || mail.includes('admin') || mail.includes('main')) {
                router.replace('/(firm)/dashboard');
            }
            // Logic: Only Verifiers go to the Scanner
            else if (mail.includes('verify') || mail.includes('police')) {
                router.replace('/(verifier)/scan-qr');
            }
            else {
                Alert.alert('Access Denied', 'Invalid Role. Try "admin@test.com" or "firm@test.com"');
            }
        }, 1500);
    };

    return (
        // 1. Dismiss keyboard when tapping outside inputs
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* 2. Avoid Keyboard covering inputs */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header Section */}
                    <View style={styles.header}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="boat" size={50} color={Colors.white} />
                        </View>
                        <Text style={styles.title}>Rafting Management</Text>
                        <Text style={styles.subtitle}>Secure. Transparent. Safe.</Text>
                    </View>

                    {/* Form Section inside a "Card" */}
                    <View style={styles.form}>
                        {/* Email Input */}
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

                        {/* Password Input with Eye Toggle */}
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
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={22}
                                    color={Colors.textLight}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Sign In</Text>
                            )}
                        </TouchableOpacity>

                        {/* Footer / Help */}
                        <TouchableOpacity style={styles.helpLink}>
                            <Text style={styles.helpText}>Need Help? Contact Admin</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA', // Professional light gray background
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconCircle: {
        width: 100,
        height: 100,
        backgroundColor: Colors.primary,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: '#2D3436', // Dark charcoal for better readability
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#636E72',
        marginTop: 8,
        letterSpacing: 0.5,
    },
    form: {
        width: '100%',
        backgroundColor: Colors.white,
        padding: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3, // Floating Card effect
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D3436',
        marginBottom: 8,
        marginTop: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F3F5',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E9ECEF',
        height: 56,
        paddingHorizontal: 16,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#2D3436',
        height: '100%',
    },
    eyeIcon: {
        padding: 8,
    },
    button: {
        backgroundColor: Colors.primary,
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        backgroundColor: '#A0A0A0',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    helpLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    helpText: {
        color: Colors.textLight,
        fontSize: 14,
    },
});
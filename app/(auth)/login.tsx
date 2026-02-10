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
    View
} from 'react-native';

// Define Colors locally to ensure it runs immediately
const Colors = {
    primary: '#06BBCC', // Your brand color
    background: '#F0F2F5',
    white: '#FFFFFF',
    textDark: '#1F2937',
    textLight: '#9CA3AF',
    border: '#E5E7EB',
    error: '#EF4444',
};

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            if (Platform.OS === 'web') {
                alert('Please enter both email and password.');
            } else {
                Alert.alert('Missing Details', 'Please enter both email and password.');
            }
            return;
        }

        setLoading(true);
        if (Platform.OS !== 'web') Keyboard.dismiss();

        // SIMULATE API CALL
        setTimeout(() => {
            setLoading(false);
            const mail = email.toLowerCase();

            // LOGIC: Check Email to redirect to correct Role
            if (mail.includes('firm') || mail.includes('admin')) {
                router.replace('/(firm)/dashboard');
            } else if (mail.includes('verify') || mail.includes('police')) {
                router.replace('/(verifier)/scan-qr'); // Correct path for verifier
            } else {
                // Default fallback for demo
                router.replace('/(firm)/dashboard');
            }
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Platform.OS !== 'web' ? Keyboard.dismiss : undefined}>
                <ScrollView 
                    contentContainerStyle={styles.scrollContent} 
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.centerContainer}>
                        
                        {/* 1. BRANDING HEADER */}
                        <View style={styles.header}>
                            <View style={styles.logoCircle}>
                                <Ionicons name="boat" size={40} color="white" />
                            </View>
                            <Text style={styles.title}>Raft Manager</Text>
                            <Text style={styles.subtitle}>Official Verification Portal</Text>
                        </View>

                        {/* 2. LOGIN CARD */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Welcome Back</Text>
                            <Text style={styles.cardSubtitle}>Enter your credentials to access the system</Text>

                            {/* Email Input */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email Address</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="mail-outline" size={20} color={Colors.textLight} style={styles.iconLeft} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="admin@govt.in"
                                        placeholderTextColor={Colors.textLight}
                                        value={email}
                                        onChangeText={setEmail}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                    />
                                </View>
                            </View>

                            {/* Password Input */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="lock-closed-outline" size={20} color={Colors.textLight} style={styles.iconLeft} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="••••••••"
                                        placeholderTextColor={Colors.textLight}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconRight}>
                                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={Colors.textLight} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Action Button */}
                            <TouchableOpacity 
                                style={[styles.button, loading && styles.buttonDisabled]} 
                                onPress={handleLogin} 
                                disabled={loading}
                                activeOpacity={0.8}
                            >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={styles.buttonText}>Sign In</Text>
                                )}
                            </TouchableOpacity>

                            {/* Footer Help */}
                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Authorized Personnel Only</Text>
                            </View>
                        </View>
                        
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    centerContainer: {
        width: '100%',
        alignItems: 'center',
        maxWidth: 1200, // Prevent stretching too wide on 4k screens
        alignSelf: 'center',
    },
    
    // Header Styles
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.textDark,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textLight,
        marginTop: 5,
    },

    // Card Styles (Responsive for Web)
    card: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 32,
        width: '100%',
        maxWidth: 450, // Limits width on Web/Tablet
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5, // Android shadow
        borderWidth: Platform.OS === 'web' ? 1 : 0,
        borderColor: Colors.border,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.textDark,
        marginBottom: 8,
    },
    cardSubtitle: {
        fontSize: 14,
        color: Colors.textLight,
        marginBottom: 32,
    },

    // Input Styles
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textDark,
        marginBottom: 8,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        height: 50,
        paddingHorizontal: 16,
    },
    iconLeft: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.textDark,
        height: '100%',
        // Web fix to remove outline
        ...Platform.select({
            web: { outlineStyle: 'none' }
        })
    },
    iconRight: {
        padding: 4,
    },

    // Button Styles
    button: {
        backgroundColor: Colors.primary,
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Footer
    footer: {
        marginTop: 24,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: Colors.textLight,
        fontWeight: '500',
    },
});
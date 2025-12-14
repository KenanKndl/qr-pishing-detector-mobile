import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking, Platform } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { COLORS } from '../constants/theme';
import { ScannerOverlay } from '../components/ScannerOverlay';
import { ResultModal } from '../components/ResultModal';
import { ScanResult } from '../types';
import * as NavigationBar from 'expo-navigation-bar';
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * Main application screen.
 * Handles the following responsibilities:
 * 1. Camera permission management (request and status display).
 * 2. QR Code scanning logic and state management.
 * 3. Interaction with the backend (or simulation) to analyze URLs.
 * 4. Displaying the analysis results via a modal.
 */
export const HomeScreen = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);

    useEffect(() => {
        // Effect hook for handling permission changes if necessary.
    }, [permission]);

    // --- Permission Denied / Not Granted State ---
    if (!permission?.granted) {
        return (
            <View style={styles.permContainer}>
                <View style={styles.permContent}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="shield-checkmark" size={64} color={COLORS.primary} />
                    </View>
                    <Text style={styles.permTitle}>Kamera Erişimi Gerekiyor</Text>
                    <Text style={styles.permDesc}>
                        QR kodlarındaki tehditleri analiz edebilmemiz ve sizi koruyabilmemiz için kameranıza erişmemize izin vermelisiniz.
                    </Text>
                    <TouchableOpacity onPress={requestPermission} style={styles.permButton}>
                        <Text style={styles.permButtonText}>Kameraya İzin Ver</Text>
                    </TouchableOpacity>
                    {!permission?.canAskAgain && (
                        <TouchableOpacity onPress={() => Linking.openSettings()} style={styles.settingsButton}>
                            <Text style={styles.settingsText}>Ayarları Aç</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }

    /**
     * Handler triggered when a QR code is successfully scanned.
     * Initiates the analysis process and manages modal visibility.
     * * @param data - The raw data string (URL) extracted from the QR code.
     */
    const handleScan = ({ data }: BarcodeScanningResult) => {
        if (scanned) return;

        setScanned(true);
        setLoading(true);
        setModalVisible(true);

        console.log("Analyzing URL:", data);

        // Simulation of backend latency and model inference.
        // TODO: Replace with actual API call to the Python backend.
        setTimeout(() => {
            const isPhishing = Math.random() < 0.4;

            // Generate a mock score based on the simulation outcome
            const mockScore = isPhishing
                ? Math.floor(Math.random() * 40)       // 0-40 (Low Confidence/Safe Score)
                : Math.floor(Math.random() * 40) + 60; // 60-100 (High Confidence)

            setResult({
                url: data,
                status: isPhishing ? 'MALICIOUS' : 'SAFE',
                confidence: `%${mockScore}`,
                modelType: 'CNN + LSTM'
            });
            setLoading(false);
        }, 2000);
    };

    /**
     * Resets the scanning state to allow for a new scan operation.
     * Ensures Android navigation bar remains hidden after modal dismissal.
     */
    const resetScan = () => {
        setModalVisible(false);
        setScanned(false);
        setResult(null);

        if (Platform.OS === 'android') {
            NavigationBar.setVisibilityAsync("hidden");
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFill}
                facing="back"
                onBarcodeScanned={scanned ? undefined : handleScan}
                barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            />

            <ScannerOverlay />

            <ResultModal
                visible={modalVisible}
                loading={loading}
                result={result}
                onClose={resetScan}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    // Permission Screen Styles
    permContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    permContent: { alignItems: 'center', width: '100%' },
    iconCircle: {
        width: 120, height: 120,
        backgroundColor: '#E0F2FE',
        borderRadius: 60,
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 30
    },
    permTitle: {
        fontSize: 24, fontWeight: 'bold',
        color: COLORS.secondary, marginBottom: 12, textAlign: 'center'
    },
    permDesc: {
        fontSize: 16, color: COLORS.gray,
        textAlign: 'center', marginBottom: 40, lineHeight: 24
    },
    permButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16, paddingHorizontal: 32,
        borderRadius: 16, width: '100%',
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3, shadowRadius: 8, elevation: 5
    },
    permButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    settingsButton: { marginTop: 20, padding: 10 },
    settingsText: { color: COLORS.primary, fontWeight: '600' }
});
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const SCAN_SIZE = width * 0.7;

/**
 * Renders a visual overlay for the camera view.
 * Creates a transparent central scanning area surrounded by a dimmed background
 * to guide the user's focus towards the QR code.
 */
export const ScannerOverlay = () => {
    return (
        <View style={styles.container}>
            {/* Top Mask */}
            <View style={styles.overlay} />

            <View style={styles.centerRow}>
                {/* Left Mask */}
                <View style={styles.overlay} />

                {/* Central Focused Scanning Area */}
                <View style={styles.focused}>
                    <View style={styles.cornerTL} />
                    <View style={styles.cornerTR} />
                    <View style={styles.cornerBL} />
                    <View style={styles.cornerBR} />
                </View>

                {/* Right Mask */}
                <View style={styles.overlay} />
            </View>

            {/* Bottom Mask with Instruction Text */}
            <View style={[styles.overlay, styles.bottomOverlay]}>
                <View style={styles.infoContainer}>
                    <Ionicons name="scan-outline" size={24} color="white" />
                    <Text style={styles.text}>QR Kodu çerçeve içine hizalayın</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { ...StyleSheet.absoluteFillObject },
    overlay: { flex: 1, backgroundColor: COLORS.overlay },
    centerRow: { flexDirection: 'row', height: SCAN_SIZE },
    focused: { width: SCAN_SIZE, height: SCAN_SIZE, backgroundColor: 'transparent' },
    bottomOverlay: { alignItems: 'center', paddingTop: 40 },
    text: { color: 'white', fontSize: 16, fontWeight: '600', marginLeft: 10 },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 12,
        borderRadius: 30,
    },
    // Corner visual indicators
    cornerTL: { position: 'absolute', top: 0, left: 0, width: 40, height: 40, borderTopWidth: 4, borderLeftWidth: 4, borderColor: COLORS.primary, borderTopLeftRadius: 12 },
    cornerTR: { position: 'absolute', top: 0, right: 0, width: 40, height: 40, borderTopWidth: 4, borderRightWidth: 4, borderColor: COLORS.primary, borderTopRightRadius: 12 },
    cornerBL: { position: 'absolute', bottom: 0, left: 0, width: 40, height: 40, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: COLORS.primary, borderBottomLeftRadius: 12 },
    cornerBR: { position: 'absolute', bottom: 0, right: 0, width: 40, height: 40, borderBottomWidth: 4, borderRightWidth: 4, borderColor: COLORS.primary, borderBottomRightRadius: 12 },
});
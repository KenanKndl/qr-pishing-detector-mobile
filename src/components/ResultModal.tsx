import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, Alert, Platform } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { ScanResult } from '../types';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    visible: boolean;
    loading: boolean;
    result: ScanResult | null;
    onClose: () => void;
}

const getScoreAnalysis = (confidenceStr: string) => {
    const score = parseInt(confidenceStr.replace('%', '')) || 0;

    if (score >= 75) {
        return {
            label: "GÜVENLİ",
            text: "Model tehdit bulamadı.",
            color: COLORS.success,
            bg: "#DCFCE7",
            icon: "shield-checkmark" as const
        };
    } else if (score >= 50) {
        return {
            label: "DİKKAT",
            text: "Şüpheli unsurlar var.",
            color: "#D97706",
            bg: "#FEF3C7",
            icon: "alert-circle" as const
        };
    } else {
        return {
            label: "TEHLİKELİ",
            text: "Phishing saldırısı tespit edildi!",
            color: COLORS.danger,
            bg: "#FEE2E2",
            icon: "warning" as const
        };
    }
};

export const ResultModal = ({ visible, loading, result, onClose }: Props) => {
    const isSafe = result?.status === 'SAFE';
    const analysis = result ? getScoreAnalysis(result.confidence) : null;

    const handleOpenLink = async () => {
        if (!result?.url) return;
        try {
            const supported = await Linking.canOpenURL(result.url);
            if (supported) await Linking.openURL(result.url);
            else Alert.alert("Hata", "Link açılamıyor.");
        } catch {
            Alert.alert("Hata", "Bir sorun oluştu.");
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Tutamaç Çizgisi (Görsel Detay) */}
                    <View style={styles.dragIndicator} />

                    {loading ? (
                        <View style={styles.loadingBox}>
                            <ActivityIndicator size="large" color={COLORS.primary} />
                            <Text style={styles.loadingText}>URL Analiz Ediliyor...</Text>
                            <Text style={styles.loadingSubText}>Hibrit Model (CNN + LSTM)</Text>
                        </View>
                    ) : (
                        result && analysis && (
                            <>
                                {/* --- BAŞLIK ALANI --- */}
                                <View style={styles.header}>
                                    <View style={[styles.iconBadge, { backgroundColor: analysis.bg }]}>
                                        <Ionicons name={analysis.icon} size={42} color={analysis.color} />
                                    </View>
                                    <View style={styles.headerTextContainer}>
                                        <Text style={[styles.statusLabel, { color: analysis.color }]}>{analysis.label}</Text>
                                        <Text style={styles.statusDesc}>{analysis.text}</Text>
                                    </View>
                                </View>

                                {/* --- İSTATİSTİK KARTLARI (GRID) --- */}
                                <View style={styles.gridContainer}>
                                    <View style={styles.gridItem}>
                                        <Text style={styles.gridLabel}>GÜVEN SKORU</Text>
                                        <Text style={[styles.gridValue, { color: analysis.color }]}>{result.confidence}</Text>
                                    </View>
                                    <View style={styles.gridItem}>
                                        <Text style={styles.gridLabel}>KULLANILAN MODEL</Text>
                                        <Text style={styles.gridValueModel}>{result.modelType}</Text>
                                    </View>
                                </View>

                                {/* --- URL KUTUSU --- */}
                                <View style={styles.urlSection}>
                                    <Text style={styles.sectionTitle}>HEDEF BAĞLANTI</Text>
                                    <View style={styles.urlCard}>
                                        <Ionicons name="link-outline" size={20} color={COLORS.gray} style={{ marginRight: 8 }} />
                                        <Text style={styles.urlText} numberOfLines={1} ellipsizeMode="middle">
                                            {result.url}
                                        </Text>
                                    </View>
                                </View>

                                {/* --- BUTONLAR --- */}
                                <View style={styles.buttonContainer}>
                                    {isSafe ? (
                                        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleOpenLink}>
                                            <Ionicons name="globe-outline" size={20} color="white" style={styles.btnIcon} />
                                            <Text style={styles.primaryButtonText}>Web Sitesine Git</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            style={[styles.button, styles.dangerButton]}
                                            onPress={() => Alert.alert("Risk", "Emin misiniz?", [{ text: "İptal" }, { text: "Git", onPress: handleOpenLink }])}
                                        >
                                            <Ionicons name="warning-outline" size={20} color="white" style={styles.btnIcon} />
                                            <Text style={styles.primaryButtonText}>Riski Kabul Et ve Git</Text>
                                        </TouchableOpacity>
                                    )}

                                    <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={onClose}>
                                        <Ionicons name="scan-outline" size={20} color={COLORS.secondary} style={styles.btnIcon} />
                                        <Text style={styles.secondaryButtonText}>Yeni Tarama</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
    modalContent: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
        // Hafif gölge efekti
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    dragIndicator: {
        width: 40,
        height: 5,
        backgroundColor: '#E2E8F0',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 20
    },

    // Loading
    loadingBox: { alignItems: 'center', paddingVertical: 40 },
    loadingText: { marginTop: 16, fontSize: 18, fontWeight: '700', color: COLORS.secondary },
    loadingSubText: { marginTop: 6, color: COLORS.gray, fontSize: 14 },

    // Header
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    iconBadge: {
        width: 64, height: 64, borderRadius: 20,
        alignItems: 'center', justifyContent: 'center',
        marginRight: 16
    },
    headerTextContainer: { flex: 1 },
    statusLabel: { fontSize: 20, fontWeight: '900', letterSpacing: 0.5, marginBottom: 4 },
    statusDesc: { fontSize: 14, color: COLORS.gray, fontWeight: '500' },

    // Grid İstatistikler
    gridContainer: { flexDirection: 'row', gap: 12, marginBottom: 24 },
    gridItem: {
        flex: 1, backgroundColor: COLORS.background,
        padding: 16, borderRadius: 16,
        alignItems: 'center', justifyContent: 'center'
    },
    gridLabel: { fontSize: 11, fontWeight: '700', color: COLORS.gray, marginBottom: 6, letterSpacing: 0.5 },
    gridValue: { fontSize: 22, fontWeight: '800' },
    gridValueModel: { fontSize: 16, fontWeight: '700', color: COLORS.secondary },

    // URL Bölümü
    urlSection: { marginBottom: 24 },
    sectionTitle: { fontSize: 12, fontWeight: '700', color: COLORS.gray, marginBottom: 8, marginLeft: 4 },
    urlCard: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#F1F5F9', padding: 16, borderRadius: 12,
        borderWidth: 1, borderColor: '#E2E8F0'
    },
    urlText: { fontSize: 14, color: COLORS.secondary, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', flex: 1 },

    // Butonlar
    buttonContainer: { gap: 12 },
    button: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        paddingVertical: 16, borderRadius: 16,
    },
    btnIcon: { marginRight: 8 },
    primaryButton: { backgroundColor: COLORS.success, shadowColor: COLORS.success, shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 },
    dangerButton: { backgroundColor: COLORS.danger },
    secondaryButton: { backgroundColor: 'white', borderWidth: 1, borderColor: '#CBD5E1' },

    primaryButtonText: { color: 'white', fontSize: 16, fontWeight: '700' },
    secondaryButtonText: { color: COLORS.secondary, fontSize: 16, fontWeight: '700' },
});
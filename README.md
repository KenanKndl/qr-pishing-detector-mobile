# QR Phishing Detector Mobile

<div style="text-align: center;">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)

</div>

## 🚀 Overview

**QR Phishing Detector**, QR kodları aracılığıyla gerçekleştirilen oltalama (phishing) saldırılarını tespit etmek için geliştirilmiş, yapay zeka destekli yeni nesil bir mobil güvenlik uygulamasıdır.

Bu proje, mobil istemci (Client) ve Python tabanlı yapay zeka sunucusu (Server) mimarisi üzerine kurulmuştur. Uygulama, taranan URL'leri arka planda **CNN (Convolutional Neural Network)** ve **LSTM (Long Short-Term Memory)** hibrit modeline göndererek milisaniyeler içinde bir güvenlik skoru üretir ve kullanıcıyı olası tehditlere karşı uyarır.

## ✨ Key Features

* **⚡ Real-Time Scanning:** Gelişmiş kamera modülü ile QR kodları anında algılar ve milisaniyeler içinde sunucuya iletir.
* **🧠 Hybrid AI Engine:** URL yapısını analiz etmek için CNN ve LSTM modellerini birleştiren güçlü bir derin öğrenme mimarisi kullanır.
* **🛡️ Smart Risk Scoring:** Kullanıcıya sadece "Güvenli/Tehlikeli" demek yerine, 0-100 arasında bir güven skoru ve detaylı risk analizi sunar.
* **🎨 Immersive UX:** Android cihazlarda tam ekran (Immersive Mode) deneyimi, animasyonlu lazer tarama efektleri ve modern, minimalist arayüz.
* **🔒 Privacy First:** Kullanıcı kamerayı aktif etmediği sürece hiçbir veri işlenmez ve tarama yapılmaz.
* **🌓 Adaptive Feedback:** Tarama sonucuna göre dinamik renk değiştiren (Yeşil, Sarı, Kırmızı) sonuç kartları ve aksiyon butonları.

## 🛠️ Tech Stack

### Mobile Client
* **Framework:** [React Native](https://reactnative.dev/) / [Expo SDK](https://expo.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Camera:** Expo Camera
* **Navigation:** Expo Navigation Bar (Immersive Android Experience)
* **Icons:** Expo Vector Icons (Ionicons)

### AI Backend (Server)
* **Language:** Python
* **API:** Flask
* **ML Library:** TensorFlow / Keras
* **Processing:** NumPy, Pickle

## 🏃‍♂️ Getting Started

Projeyi yerel makinenizde çalıştırmak için adımları takip edin:

1.  **Repoyu klonlayın:**
    ```bash
    git clone https://github.com/KenanKndl/qr-pishing-detector-mobile.git
    cd qr-pishing-detector-mobile
    ```

2.  **Bağımlılıkları yükleyin:**
    ```bash
    npm install
    ```

3.  **Backend Ayarı:**
    Projenin çalışması için Python sunucusunun (API) ayakta olması gerekir. `src/screens/HomeScreen.tsx` dosyasındaki IP adresini kendi yerel ağ adresinizle güncelleyin:
    ```typescript
    // Örnek
    const API_URL = '[http://192.168.1.](http://192.168.1.)XX:5000/predict';
    ```

4.  **Uygulamayı başlatın:**
    ```bash
    npx expo start
    ```

## 🎨 Design Philosophy

Uygulama arayüzünde **"Güven ve Netlik"** ön planda tutulmuştur.

* **Visual Feedback:** Tarama alanındaki lazer animasyonu, uygulamanın aktif çalıştığını hissettirirken, sonuç ekranındaki renk kodları (Traffic Light System) kullanıcının durumu saniyeler içinde anlamasını sağlar.
* **Minimalism:** Gereksiz detaylardan arındırılmış, sadece taranan URL ve güvenlik skoruna odaklanan temiz bir arayüz.
* **Micro-Interactions:** Buton tıklamaları, modal geçişleri ve yükleme ekranları akıcı animasyonlarla desteklenmiştir.

## 🤝 Contributing

Katkılarınızı bekliyoruz! Lütfen bir issue açın veya Pull Request gönderin.

## 📄 License

Bu proje [MIT](LICENSE) lisansı ile lisanslanmıştır.

---

<p style="text-align: center;">
  Developed with ❤️ by <a href="https://github.com/KenanKndl">Kenan Kandilli</a>
</p>

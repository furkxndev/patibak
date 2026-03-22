<div align="center">
  <img src="https://ui-avatars.com/api/?name=P+B&background=f97316&color=fff&rounded=true&size=128" alt="PatiBak Logo" width="100"/>
  <h1>PatiBak 🐾</h1>
  <p><strong>Hayvan Dostlarımız İçin Evlat Edinme ve Geçici Yuva Platformu</strong></p>
</div>

---

## 🐶 Proje Hakkında (About the Project)

PatiBak, sokak hayvanlarına sıcak bir yuva bulmayı amaçlayan ve aynı zamanda tatile veya iş seyahatine çıkacak evcil hayvan sahiplerinin "Geçici Yuvalar (Pet Sitters)" bulmasına olanak sağlayan tam donanımlı bir mobil uygulamadır. Modern, kullanıcı dostu ve sevgi dolu tasarımıyla hem hayvanseverleri hem de minik dostlarımızı bir araya getiriyor.

### ✨ Temel Özellikler
- **Keşfet (Ana Sayfa):** Sahiplendirilmeyi bekleyen patili dostların veya geçici bakıcı arayan ilanların modern akış sistemi.
- **Detaylı İlan Sayfası:** Hayvanın yaş, cins, kilo ve konum bilgilerini gösteren premium kart tasarımı.
- **Gerçek Zamanlı Sohbet (Messages):** WhatsApp ve iOS mesajları standartlarında `Inset Grouped` arayüze sahip özel mesajlaşma sistemi. Okundu/Okunmadı bildirimleriyle anlık iletişim imkânı.
- **Akıllı Profil Yönetimi:** Kullanıcı "Güvenlik Puanları", yorum analizleri ve tam simetrik Ayarlar/Menü entegrasyonu.
- **Güvenli PatiBak Onayı:** Sahte hesapları engelleyen ve güvenliği ön planda tutan bir "Doğrulanmış Hesap" (Verified) yapısı.
- **Şık Animasyonlar:** İlk girişte karşılayan yumuşak geçişli Splash ekran ve özel tab bar animasyonları.
- **Güvenli Altyapı:** BCrypt tabanlı şifreleme ve JWT tabanlı akıllı oturum yönetimi.

## 🛠️ Kullanılan Teknolojiler

Bu proje, güçlü ve bağımsız iki ana modülden (Frontend & Backend) oluşmaktadır:

### Frontend (Mobil Uygulama)
- **Framework:** React Native & Expo (Expo Router)
- **UI & Styling:** Native StyleSheet, Feather Icons, react-native-reanimated (Harika animasyonlar için)
- **State & Storage:** AsyncStorage
- **Ekstra:** SafeAreaContext, custom animated tab bars.

### Backend (Sunucu & Veritabanı)
- **Runtime:** Node.js & Express.js
- **Veritabanı:** MySQL & Sequelize (ORM)
- **Güvenlik:** JSON Web Tokens (JWT), Bcrypt.js
- **Middleware:** CORS, Express JSON Parser

---

## 🚀 Kurulum (Local Development)

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları sırayla izleyin:

### 1️⃣ Veritabanı Kurulumu
1. Bilgisayarınızda (MySQL) yüklü olmalıdır. XAMPP, MAMP veya doğrudan MySQL kullanabilirsiniz.
2. `phpMyAdmin` veya MySQL konsolu üzerinden `patibak` adında yeni bir veritabanı oluşturun.
3. Projedeki `backend/db.sql` dosyasını içe aktararak (import) veya `backend/seed.js` dosyasını çalıştırarak örnek tabloları oluşturun:
   ```bash
   cd backend
   node seed.js
   ```

### 2️⃣ Backend Kurulumu
```bash
cd backend
npm install
# Sunucuyu başlatmak için:
npm run dev
```
> *Sunucu varsayılan olarak `http://localhost:5000` veya makinenizin IP adresinde ayağa kalkacaktır.*

### 3️⃣ Frontend Kurulumu
> **Önemli Not:** Cep telefonunuzla test ediyorsanız bilgisayarınızın ve telefonunuzun aynı Wi-Fi ağına bağlı olduğundan emin olun.
1. `frontend/constants/api.ts` dosyasına giderek bilgisayarınızın "Yerel IP Adresini" yazın (Örn: `192.168.1.x:5000`).
```bash
cd frontend
npm install
# Expo'yu başlatmak için:
npx expo start
```
2. Terminalde çıkan QR kodu telefonunuzdaki **Expo Go** uygulaması ile okutarak projeyi test edebilirsiniz.

---

## 📸 Ekran Görüntüleri ve Arayüz
*(Screenshot/GIF buraya eklenecektir)*
- Modern ve iOS tarzı "Inset Grouped" ayarlar ekranları.
- Floating (havalı) arama çubuklu Sohbetler ana ekranı.
- Kalın tipografili, sola yaslı büyük marka logolu App Header'ı.

## 👥 Geliştirici

**Furkan Coşkun** tarafından ❤ ve özveri ile geliştirilmiştir.

---
> *"Satın Alma, Sahiplen!"* 🐾

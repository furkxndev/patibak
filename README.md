<div align="center">
  <h1>PatiBak 🐾</h1>
  <p><strong>Hayvan Dostlarımız İçin Evlat Edinme ve Geçici Yuva Platformu</strong></p>
</div>

---

## 🐶 Proje Hakkında (About the Project)

PatiBak, sahiplendirilmeyi bekleyen hayvanlara sıcak bir yuva bulmayı hedefleyen ve aynı zamanda evcil hayvan sahiplerinin seyahat, iş veya diğer durumlarda güvenilir **geçici bakıcılar (pet sitters)** bulmasını sağlayan kapsamlı bir mobil uygulamadır.

Modern, kullanıcı dostu ve duygusal bağ kuran tasarımı sayesinde hem hayvanseverleri hem de patili dostlarımızı güvenli bir platformda bir araya getirir.

---

## ✨ Temel Özellikler

- **Keşfet (Ana Sayfa)**  
  Sahiplendirilmeyi bekleyen hayvanlar ve geçici bakıcı ilanları için modern ve akıcı akış sistemi.

- **Detaylı İlan Sayfası**  
  Hayvanın yaş, cins, kilo, sağlık durumu ve konum bilgilerini içeren gelişmiş kart yapısı.

- **Gerçek Zamanlı Sohbet (Messages)**  
  WhatsApp ve iOS mesajlaşma deneyimine benzer, `Inset Grouped` tasarıma sahip mesajlaşma sistemi.  
  Okundu/okunmadı bilgisi ile anlık iletişim.

- **Akıllı Profil Yönetimi**  
  Kullanıcı güven puanı, yorumlar ve profil analizi ile güvenilirlik artırımı.

- **Doğrulanmış Hesap Sistemi**  
  Sahte hesapları engelleyen “Verified” rozetli kullanıcı yapısı.

- **Animasyonlar & UX**  
  Yumuşak geçişli splash ekran ve modern tab bar animasyonları.

- **Güvenli Altyapı**  
  BCrypt ile şifreleme ve JWT tabanlı güvenli oturum yönetimi.

---

## 📸 Ekran Görüntüleri

<div align="center">
  <img src="https://github.com/user-attachments/assets/26f3f652-5438-4a0f-95e0-645d856ebd51" width="250"/>
  <img src="https://github.com/user-attachments/assets/aa2e9735-e464-4d9d-9942-30b6c109490c" width="250"/>
  <img src="https://github.com/user-attachments/assets/ab05b027-d237-4d7b-8cdc-9cc5d15d7b3e" width="250"/>
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/cbcab355-7a60-4bd8-8cbb-b914e90aa4f3" width="250"/>
  <img src="https://github.com/user-attachments/assets/c57e9b3a-5b23-49d1-b1ed-58b726e5581b" width="250"/>
</div>

---

## 🛠️ Kullanılan Teknolojiler

### 📱 Frontend (Mobil Uygulama)
- React Native & Expo (Expo Router)
- Native StyleSheet
- Feather Icons
- React Native Reanimated (Animasyonlar için)
- AsyncStorage (Local veri yönetimi)
- SafeAreaContext

### 🌐 Backend (Sunucu & Veritabanı)
- Node.js & Express.js
- MySQL
- Sequelize (ORM)
- JSON Web Token (JWT)
- Bcrypt.js
- CORS & Express Middleware

---

## 🚀 Kurulum (Local Development)

Projeyi lokal ortamda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

### 1️⃣ Veritabanı Kurulumu

1. Bilgisayarınızda MySQL kurulu olmalıdır (XAMPP, MAMP veya native MySQL).
2. `patibak` adında yeni bir veritabanı oluşturun.
3. Aşağıdaki yöntemlerden biri ile tabloları oluşturun:

```bash
cd backend
node seed.js
```

veya `backend/db.sql` dosyasını import edin.

---

### 2️⃣ Backend Kurulumu

```bash
cd backend
npm install
npm run dev
```

> Sunucu varsayılan olarak:  
> http://localhost:5000

---

### 3️⃣ Frontend Kurulumu

📌 **Önemli:** Telefon ile test edecekseniz aynı Wi-Fi ağına bağlı olun.

1. `frontend/constants/api.ts` dosyasında API adresini güncelleyin:

```ts
192.168.1.x:5000
```

2. Uygulamayı başlatın:

```bash
cd frontend
npm install
npx expo start
```

3. QR kodu **Expo Go** ile okutun.

---

## 🎯 Projenin Amacı

- Sokak hayvanlarının sahiplendirilmesini kolaylaştırmak  
- Evcil hayvan sahiplerine güvenilir bakıcı bulma imkanı sunmak  
- Hayvanlar için güvenli ve sürdürülebilir bir ekosistem oluşturmak  

---

## 🔒 Güvenlik Yaklaşımı

- JWT tabanlı kimlik doğrulama  
- BCrypt ile parola güvenliği  
- Doğrulanmış kullanıcı sistemi  
- (Gelecek) Rol bazlı yetkilendirme sistemi  

---

## 🚧 Gelecek Geliştirmeler

- 🔍 Gelişmiş filtreleme (şehir, tür, yaş)
- 🤖 AI destekli hayvan eşleştirme sistemi
- 📍 Harita tabanlı ilanlar
- ⭐ Gelişmiş kullanıcı puanlama sistemi
- 📸 Görsel tanıma (hayvan türü analizi)

---

## 🤝 Katkıda Bulunma

Katkıda bulunmak isterseniz pull request gönderebilir veya issue açabilirsiniz.

---

## 📄 Lisans

Bu proje MIT lisansı altında sunulmaktadır.


<div align="center">
  <h1>PatiBak 🐾</h1>
  <p><strong>Hayvan Dostlarımız İçin Evlat Edinme ve Geçici Yuva Platformu</strong></p>
</div>

---

## 🐶 Proje Hakkında (About the Project)

PatiBak, evcil hayvanlarınıza yeni sahipler bulmayı hedefleyen ve aynı zamanda evcil hayvan sahiplerinin seyahat, iş veya diğer durumlarda güvenilir **geçici bakıcılar (pet sitters)** bulmasını sağlayan kapsamlı bir mobil uygulamadır.

Modern, kullanıcı dostu ve duygusal bağ kuran tasarımı sayesinde hem hayvanseverleri hem de patili dostlarımızı güvenli bir platformda bir araya getirir.

---

## ✨ Temel Özellikler

- **Keşfet (Ana Sayfa):**  
  Sahiplendirilmeyi bekleyen hayvanlar ve geçici bakıcı ilanları için modern ve akıcı bir listeleme sistemi.

- **Detaylı İlan Sayfası:**  
  Hayvanın yaş, cins, kilo, sağlık durumu ve konum bilgilerini içeren gelişmiş kart yapısı.

- **Gerçek Zamanlı Sohbet (Messages):**  
  WhatsApp ve iOS mesajlaşma deneyimine benzer, `Inset Grouped` tasarıma sahip mesajlaşma sistemi.  
  Okundu/okunmadı bilgisi ile anlık iletişim.

- **Akıllı Profil Yönetimi:**  
  Kullanıcı güven puanı, yorumlar ve detaylı profil analizi ile güvenilirlik artırımı.

- **Doğrulanmış Hesap Sistemi:**  
  Sahte hesapları engellemek için “Verified” rozetli güvenli kullanıcı yapısı.

- **Animasyonlar & UX:**  
  Yumuşak geçişli splash ekran, özel tab bar animasyonları ve modern kullanıcı deneyimi.

- **Güvenli Altyapı:**  
  BCrypt ile şifreleme ve JWT tabanlı güvenli oturum yönetimi.

---
![IMG_1469](https://github.com/user-attachments/assets/26f3f652-5438-4a0f-95e0-645d856ebd51)
![IMG_1465](https://github.com/user-attachments/assets/aa2e9735-e464-4d9d-9942-30b6c109490c)
![IMG_1466](https://github.com/user-attachments/assets/ab05b027-d237-4d7b-8cdc-9cc5d15d7b3e)
![IMG_1467](https://github.com/user-attachments/assets/cbcab355-7a60-4bd8-8cbb-b914e90aa4f3)
![IMG_1468](https://github.com/user-attachments/assets/c57e9b3a-5b23-49d1-b1ed-58b726e5581b)


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



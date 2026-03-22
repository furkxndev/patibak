-- Create Database
CREATE DATABASE IF NOT EXISTS patibak;
USE patibak;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(500),
    city VARCHAR(100),
    rating DECIMAL(2,1) DEFAULT 0.0,
    followers_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pets Table
CREATE TABLE IF NOT EXISTS pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT,
    name VARCHAR(255) NOT NULL,
    type ENUM('Kedi', 'Köpek', 'Kuş', 'Tavşan', 'Balık', 'Diğer') NOT NULL,
    breed VARCHAR(255),
    age VARCHAR(50),
    gender ENUM('Erkek', 'Dişi'),
    city VARCHAR(100),
    listing_type ENUM('Sahiplendirme', 'Emanet') NOT NULL,
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    description TEXT,
    image VARCHAR(500),
    color VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Favorites Table
CREATE TABLE IF NOT EXISTS favorites (
    user_id INT,
    pet_id INT,
    PRIMARY KEY (user_id, pet_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    pet_id INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Insert Mock Data
INSERT INTO users (name, email, password, image, city, rating, followers_count) VALUES
('Furkan Coşkun', 'furkan@example.com', 'hashed_pass_123', 'https://ui-avatars.com/api/?name=Furkan+Coskun&background=f97316&color=fff', 'İstanbul', 4.8, 142);

INSERT INTO pets (owner_id, name, type, breed, age, gender, city, listing_type, description, image, color) VALUES
(1, 'Pamuk', 'Kedi', 'Van Kedisi', '1 Yaş', 'Dişi', 'İstanbul', 'Sahiplendirme', 'Çok uysal bir kedi.', 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&h=600&fit=crop', '#FFF8E1'),
(1, 'Zeytin', 'Köpek', 'Dachshund', '2 Yaş', 'Erkek', 'Ankara', 'Emanet', 'Emanet bırakacak birini arıyorum.', 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=600&fit=crop', '#E8F5E9');

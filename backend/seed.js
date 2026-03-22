const { sequelize, User, Pet, Message } = require('./models');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced (force: true)');

        // Create Users
        const user1 = await User.create({
            name: 'Furkan Coşkun',
            email: 'furkan@example.com',
            password: 'hashed_pass_123',
            image: 'https://ui-avatars.com/api/?name=Furkan+Coskun&background=f97316&color=fff',
            city: 'İstanbul',
            rating: 4.8,
            followers_count: 142
        });

        const user2 = await User.create({
            name: 'Ayşe Yılmaz',
            email: 'ayse@example.com',
            password: 'hashed_pass_456',
            image: 'https://ui-avatars.com/api/?name=Ayse+Yilmaz&background=ec4899&color=fff',
            city: 'Ankara',
            rating: 4.9,
            followers_count: 85
        });

        // Create Pets
        await Pet.bulkCreate([
            {
                owner_id: user1.id,
                name: 'Pamuk',
                type: 'Kedi',
                breed: 'Van Kedisi',
                age: '1 Yaş',
                gender: 'Dişi',
                city: 'İstanbul',
                listing_type: 'Sahiplendirme',
                description: 'Çok uysal, çocuklarla arası iyi, bembeyaz bir Van kedisi. Aşıları tamdır.',
                image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&h=600&fit=crop',
                color: '#FFF8E1'
            },
            {
                owner_id: user1.id,
                name: 'Zeytin',
                type: 'Köpek',
                breed: 'Dachshund',
                age: '2 Yaş',
                gender: 'Erkek',
                city: 'Ankara',
                listing_type: 'Emanet',
                description: 'Seyahate çıkacağım için 2 haftalık emanet bırakacak güvenilir birini arıyorum.',
                image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=600&fit=crop',
                color: '#E8F5E9'
            },
            {
                owner_id: user2.id,
                name: 'Bulut',
                type: 'Köpek',
                breed: 'Samoyed',
                age: '3 Yaş',
                gender: 'Erkek',
                city: 'İzmir',
                listing_type: 'Sahiplendirme',
                description: 'Enerjik, oyun oynamayı çok seven ve geniş bahçeli bir yuva arayan dostumuz.',
                image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500&h=600&fit=crop',
                color: '#E3F2FD'
            },
            {
                owner_id: user2.id,
                name: 'Simba',
                type: 'Kedi',
                breed: 'Sarman',
                age: '6 Aylık',
                gender: 'Erkek',
                city: 'Bursa',
                listing_type: 'Sahiplendirme',
                description: 'Sokakta bulup sahiplendirdiğimiz minik Simba. Çok oyuncu ve meraklıdır.',
                image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=600&fit=crop',
                color: '#FBE9E7'
            },
            {
                owner_id: user1.id,
                name: 'Milo',
                type: 'Köpek',
                breed: 'Golden Retriever',
                age: '2 Yaş',
                gender: 'Erkek',
                city: 'İstanbul',
                listing_type: 'Emanet',
                description: 'Milo çok sosyal ve uysaldır. Hafta sonu için bakabilecek birini arıyoruz.',
                image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&h=600&fit=crop',
                color: '#FFFBEB'
            },
            {
                owner_id: user2.id,
                name: 'Maviş',
                type: 'Kuş',
                breed: 'Muhabbet Kuşu',
                age: '1 Yaş',
                gender: 'Dişi',
                city: 'Antalya',
                listing_type: 'Sahiplendirme',
                description: 'Konuşmaya yeni başladı, çok cana yakındır.',
                image: 'https://images.unsplash.com/photo-1552728089-57bdde30eba3?w=500&h=600&fit=crop',
                color: '#F0F9FF'
            },
            {
                owner_id: user1.id,
                name: 'Fındık',
                type: 'Tavşan',
                breed: 'Hollanda Lop',
                age: '4 Aylık',
                gender: 'Dişi',
                city: 'Ankara',
                listing_type: 'Sahiplendirme',
                description: 'Çok sakin ve sevimli bir tavşan. Yanında kafesiyle birlikte verilecektir.',
                image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&h=600&fit=crop',
                color: '#FDF2F8'
            }
        ]);

        // Create Messages
        const [pamuk] = await Pet.findAll({ where: { name: 'Pamuk' } });
        const [zeytin] = await Pet.findAll({ where: { name: 'Zeytin' } });

        await Message.bulkCreate([
            {
                sender_id: user2.id,
                receiver_id: user1.id,
                pet_id: pamuk.id,
                content: 'Pamuk hakkında detaylı bilgi alabilir miyim?'
            },
            {
                sender_id: user1.id,
                receiver_id: user2.id,
                pet_id: zeytin.id,
                content: 'Zeytin ile ilgileniyorum, müsait misiniz?'
            }
        ]);

        console.log('Database seeded successfully!');
        process.exit();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDatabase();

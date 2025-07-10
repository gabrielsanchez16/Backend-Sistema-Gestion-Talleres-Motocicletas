'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('workshop', [
      {
        id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
        name: 'Taller Los Amigos',
        phone: '3123456789',
        email: 'contacto@losamigos.com',
        logo: 'logo.png',
        password: 'hashed_password', // recuerda hashearla si es real
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b2c3d4e5-f6a1-2345-6789-abcdef123456',
        name: 'MotoFix Express',
        phone: '3012345678',
        email: 'info@motofix.com',
        logo: 'logo2.png',
        password: 'otro_hash',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    await queryInterface.bulkInsert('owner', [
      {
        id: 'a0b2c3d4-e5f6-7890-1234-56789abcdef0',
        name: 'Gabriel Sanchez',
        phone: '3123456789',
        email: 'contacto@losamigos.com',
        identification: 987654321,
        id_workshop: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b2c3d4e5-f6a1-2332-6789-abcdef123456',
        name: 'Camilo Torres',
        phone: '3012345678',
        email: 'info@motofix.com',
        identification: 123456789,
        id_workshop: 'b2c3d4e5-f6a1-2345-6789-abcdef123456',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    await queryInterface.bulkInsert('brand', [
      {
        id: 'a0b2c3d4-e5f6-7890-1234-56789abcde00',
        name: 'Akt',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b2c3d4e5-f6a1-2332-6789-abcdef123466',
        name: 'Auteco',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b2c3d4e5-f6a1-2332-1789-abcdef123466',
        name: 'Yamaha',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 'b2c3d4e5-f6a1-2332-7789-abcdef123466',
        name: 'Susuki',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    await queryInterface.bulkInsert('motorcycle', [
      {
        id: 'a0b2c3d4-e5x6-7890-1234-56789abcde00',
        model: 'TT ds 200',
        plate: 'ABC123',
        year: new Date('2020-01-01'),
        id_workshop: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
        id_brand: 'a0b2c3d4-e5f6-7890-1234-56789abcde00',
        id_owner: 'a0b2c3d4-e5f6-7890-1234-56789abcdef0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('motorcycle', null, {});
    await queryInterface.bulkDelete('brand', null, {});
    await queryInterface.bulkDelete('owner', null, {});
    await queryInterface.bulkDelete('workshop', null, {});
  }
};

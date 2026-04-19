import { faker } from '@faker-js/faker';
import { createHash } from './index.js'; 

/**
 * Genera usuarios aleatorios de forma asíncrona para esperar el hash.
 */
export const generateMockUsers = async (count) => {
    const users = [];
    const roles = ['user', 'admin'];

    for (let i = 0; i < count; i++) {
        // Esperamos la resolución de la promesa del hash
        const hashedPassword = await createHash('coder123');
        
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: roles[Math.floor(Math.random() * roles.length)],
            pets: []
        });
    }
    return users;
};

/**
 * Genera mascotas aleatorias.
 */
export const generateMockPets = (count) => {
    const pets = [];
    for (let i = 0; i < count; i++) {
        pets.push({
            name: faker.animal.dog(),
            specie: faker.animal.type(),
            birthDate: faker.date.past({ years: 10 }),
            adopted: false,
            owner: null
        });
    }
    return pets;
};
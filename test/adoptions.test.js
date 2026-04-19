import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://127.0.0.1:8080');

describe('Pruebas de Integración - AdoptMe', () => {
    let testUser;
    let testPet;

    it('Debe generar datos iniciales (Mocks) para las pruebas', async () => {
        // Generamos datos nuevos
        await requester.post('/api/mocks/generateData').send({ users: 1, pets: 1 });
        
        const users = await requester.get('/api/users');
        const pets = await requester.get('/api/pets');
        
        // Tomamos los últimos creados para evitar conflictos con datos viejos
        testUser = users.body.payload[users.body.payload.length - 1];
        testPet = pets.body.payload[pets.body.payload.length - 1];

        expect(testUser).to.have.property('_id');
        expect(testPet).to.have.property('_id');
    });

    it('POST /api/adoptions/:uid/:pid debe crear una adopción', async () => {
        // Forzamos que la mascota esté disponible por si el mock la creó mal
        testPet.adopted = false; 

        const { status, body } = await requester.post(`/api/adoptions/${testUser._id}/${testPet._id}`);
        
        // Si sale 400, imprimimos el error para debuguear
        if (status === 400) console.log("Error de la API:", body.error);

        expect(status).to.equal(200);
        expect(body.message).to.equal('Pet adopted');
    });

    it('GET /api/adoptions/:aid debe devolver una adopción existente', async () => {
        const adoptions = await requester.get('/api/adoptions');
        const aid = adoptions.body.payload[adoptions.body.payload.length - 1]._id;
        const { status } = await requester.get(`/api/adoptions/${aid}`);
        expect(status).to.equal(200);
    });

    it('Debe fallar al intentar obtener una adopción inexistente', async () => {
        const fakeAid = '64f1a2b3c4d5e6f7a8b9c0d1';
        const { status } = await requester.get(`/api/adoptions/${fakeAid}`);
        expect(status).to.equal(404);
    });
});
import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mocking.js';
import { usersService, petsService } from '../services/index.js';

const router = Router();

router.get('/mockingpets', (req, res) => {
    const pets = generateMockPets(10);
    res.send({ status: "success", payload: pets });
});

router.get('/mockingusers', async (req, res) => {
    const users = await generateMockUsers(50);
    res.send({ status: "success", payload: users });
});

router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body;
        
        const mockUsers = await generateMockUsers(users);
        const mockPets = generateMockPets(pets);

        const createdUsers = await Promise.all(mockUsers.map(user => usersService.create(user)));
        const createdPets = await Promise.all(mockPets.map(pet => petsService.create(pet)));

        res.send({
            status: "success",
            message: `Se insertaron ${users} usuarios y ${pets} mascotas correctamente.`,
            payload: { users: createdUsers.length, pets: createdPets.length }
        });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
});

export default router;
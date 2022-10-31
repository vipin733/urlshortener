import { createMocks } from 'node-mocks-http';
import handleRegister from "../pages/api/guest/create-user"

describe('testing register route /api/guest/create-user', () => {
    test('returns a message with the 422', async () => {
        const { req, res } = createMocks({
          method: 'POST'
        });
        await handleRegister(req, res);        
        expect(res._getStatusCode()).toBe(422);
    });

    test('returns a message with the 422', async () => {
        const { req, res } = createMocks({
          method: 'POST',
          body: {
            email: "vipinkumar021193@gmail.com",
            password: "password",
            name: "vipin"
          }
        });
        await handleRegister(req, res);                
        expect(res._getStatusCode()).toBe(422);
    });

    test('returns a message with the 200', async () => {
        const { req, res } = createMocks({
          method: 'POST',
          body: {
            email: "vipinkumar02119333@gmail.com",
            password: "vipin93",
            name: "Vipin"
          }
        });
        await handleRegister(req, res);                
        expect(res._getStatusCode()).toBe(201);
    });
})
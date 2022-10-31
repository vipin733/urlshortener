import { createMocks } from 'node-mocks-http';
import handleLogin from "../pages/api/guest/login"

describe('testing login route /api/guest/login', () => {
    test('returns a message with the 422', async () => {
        const { req, res } = createMocks({
          method: 'POST'
        });
        await handleLogin(req, res);        
        expect(res._getStatusCode()).toBe(422);
    });

    test('returns a message with the 400', async () => {
        const { req, res } = createMocks({
          method: 'POST',
          body: {
            email: "vipinkumar021193@gmail.com",
            password: "password"
          }
        });
        await handleLogin(req, res);                
        expect(res._getStatusCode()).toBe(400);
    });

    test('returns a message with the 200', async () => {
        const { req, res } = createMocks({
          method: 'POST',
          body: {
            email: "vipinkumar021193@gmail.com",
            password: "vipin93"
          }
        });
        await handleLogin(req, res);                
        expect(res._getStatusCode()).toBe(200);
    });
})
import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from 'data/test/mock-http-client';

describe('RemoteAuthentication', () => {
    test('should call HttpPostClient with correct URL', async () => {
        const url = 'any_url';
        const httpPostClient = new HttpPostClientSpy();
        const sut = new RemoteAuthentication(url, httpPostClient);

        await sut.auth()
        expect(httpPostClient.url).toBe(url);
    })
})

const jsonstore = require('./');

const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const token = '1359fdb9f30e564f8f7b32c3e5a0c7e67313f2c44e201abe68d2d645b8d8f7cf';
const fullUrl = `https://www.jsonstore.io/${token}`;
const randomString = generateRandomString(10);
const randomString2 = generateRandomString(10);

test('post random string to key hello', async () => {
    const db = jsonstore(token);
    await db.post('hello', randomString);
});

test('get hello and verify it matches random string', async () => {
    const db = jsonstore(token);
    expect(await db.get('hello')).toBe(randomString);
});

test('put random string in hello', async () => {
    const db = jsonstore(token);
    await db.put('hello', randomString2);
});

test('get hello and verify it matches the second random string', async () => {
    const db = jsonstore(token);
    expect(await db.get('hello')).toBe(randomString2);
});


test('delete hello', async () => {
    const db = jsonstore(token);
    await db.delete('hello');
});

test('get hello and verift it is null', async () => {
    const db = jsonstore(token);
    expect(await db.get('hello')).toBeNull();
});

test('post a random string to hello with full url', async () => {
    const db = jsonstore(fullUrl);
    await db.post('hello', randomString);
});

test('get hello from full url and verify it matches the random string', async () => {
    const db = jsonstore(fullUrl);
    expect(await db.get('hello')).toBe(randomString);
});

test('delete hello from full url', async () => {
    const db = jsonstore(fullUrl);
    await db.delete('hello');
});
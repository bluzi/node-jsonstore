const https = require('https');
const url = require('url');

const hostname = 'www.jsonstore.io';

const getAccessKey = (accessKey) => {
    const parsedUrl = url.parse(accessKey);

    if (parsedUrl.hostname) {
        return parsedUrl.path.substring(1);
    } else {
        return accessKey;
    }
}


module.exports = (accessKey) => ({
    get: (key) => new Promise((resolve, reject) =>
        https.get({
            hostname,
            port: 443,
            path: `/${getAccessKey(accessKey)}/${key}`,
            method: 'GET',
        }, (resp) => {
            let data = '';

            resp.on('data', (chunk) => data += chunk);
            resp.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    if (!response.ok) {
                        reject(response.error);
                    } else {
                        resolve(response.result);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => reject(error))
    ),

    post: (key, data) => new Promise((resolve, reject) => {
        const stringifiedData = JSON.stringify(data);

        const request = https.request({
            hostname,
            port: 443,
            path: `/${getAccessKey(accessKey)}/${key}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': stringifiedData.length
            }
        }, (resp) => {
            let data = '';

            resp.on('data', (chunk) => data += chunk);
            resp.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    response.ok ? resolve() : reject(response.error);
                } catch (error) {
                    reject(error);
                }
            });
        });

        request.on('error', (error) => reject(error));
        request.write(stringifiedData);
        request.end();
    }),

    put: (key, data) => new Promise((resolve, reject) => {
        const stringifiedData = JSON.stringify(data);

        const request = https.request({
            hostname,
            port: 443,
            path: `/${getAccessKey(accessKey)}/${key}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': stringifiedData.length
            }
        }, (resp) => {
            let data = '';

            resp.on('data', (chunk) => data += chunk);
            resp.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    response.ok ? resolve() : reject(response.error);
                } catch (error) {
                    reject(error);
                }
            });
        });

        request.on('error', (error) => reject(error));
        request.write(stringifiedData);
        request.end();
    }),

    delete: (key) => new Promise((resolve, reject) => {
        const request = https.request({
            hostname,
            port: 443,
            path: `/${getAccessKey(accessKey)}/${key}`,
            method: 'DELETE',
        }, (resp) => {
            let data = '';

            resp.on('data', (chunk) => data += chunk);
            resp.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    response.ok ? resolve() : reject(response.error);
                } catch (error) {
                    reject(error);
                }
            });
        });

        request.on('error', (error) => reject(error));
        request.end();

    }),
})
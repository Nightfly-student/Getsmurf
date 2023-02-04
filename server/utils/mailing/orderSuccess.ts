import api from 'api';
import CryptoJS from "crypto-js";

export const sendOrderSuccessEmail = async (
    email: string,
    orderId: string,
    license: any,
    productTitle: string,
    url: string,
) => {
    const correctLicense: any = [];
    const config = useRuntimeConfig()
    license.forEach((l: any) => {
        correctLicense.push(`
        <p>Username:${l.license.username}</p>
        <p>Password:${CryptoJS.AES.decrypt(l.license.password, config.aesKey).toString(CryptoJS.enc.Utf8)}</p>
        `);
    });

    const sdk = api('@bigmailer/v1.0#1ffq3b36l6uubm3y');
    sdk.auth(config.bigmailerApi);
    await sdk
        .sendTransactionalCampaign(
            {
                email: email,
                field_values: [
                    {
                        name: 'ORDER_ID',
                        string: orderId
                    },
                    {
                        name: 'LICENSE',
                        string: `<div>${correctLicense}</div>`
                    },
                    {
                        name: 'PRODUCT_TITLE',
                        string: productTitle
                    },
                    {
                        name: 'URL_LINK',
                        string: url
                    }
                ],
            },
            {
                brand_id: config.brandId,
                campaign_id: '582fc866-9f55-4341-91d3-74602c772a4b',
            },
        )
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};
import api from 'api';

export const sendOrderFailedEmail = async (email: string, orderId: string, url: string) => {
    const sdk = api('@bigmailer/v1.0#1ffq3b36l6uubm3y');
    const config = useRuntimeConfig()
    sdk.auth(config.bigMailerApi);
    await sdk
        .sendTransactionalCampaign(
            {
                email: email,
                field_values: [
                    {
                        name: 'ORDER_ID',
                        string: orderId,
                    },
                    {
                        name: 'URL_LINK',
                        string: url,
                    },
                ],
            },
            {
                brand_id: config.brandId,
                campaign_id: '61abec76-18f9-4a4e-b486-384bafa5f4ca',
            },
        )
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};
import api from 'api';

export const sendOrderProcessingEmail = async (email: string, orderId: string, url: string) => {
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
                campaign_id: '35652e00-3a47-44d4-8b53-d3977d523e5a',
            },
        )
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};
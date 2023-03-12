import api from 'api';

export const sendOrderCompletedAffiliateMail = async (
    email: string,
    name: string,
    recievingAmount: number,
) => {
    const config = useRuntimeConfig()


    const sdk = api('@bigmailer/v1.0#1ffq3b36l6uubm3y');
    sdk.auth(config.bigmailerApi);
    await sdk
        .sendTransactionalCampaign(
            {
                email: email,
                field_values: [
                    {
                        name: 'AFFILIATE_NAME',
                        string: name
                    },
                    {
                        name: 'AMOUNT',
                        string: recievingAmount.toFixed(2)
                    }
                ],
            },
            {
                brand_id: config.brandId,
                campaign_id: '6f08f96b-2312-460b-ad42-a9936c4a6f93',
            },
        )
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};
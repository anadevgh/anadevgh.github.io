export async function POST({ request }) {
    try {
        const body = await request.json();
        const email = body['sb-email'];

        if (!email) {
            return new Response(
                JSON.stringify({ success: false, message: 'Email is required' }),
                { status: 200 }
            );
        }

        const API_KEY = import.meta.env.MAILCHIMP_API_KEY;
        const LIST_ID = import.meta.env.MAILCHIMP_LIST_ID;
        const DATACENTER = API_KEY.split('-')[1];

        const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email_address: email,
                status: 'subscribed',
                /*merge_fields: {
                    FNAME: '',
                    LNAME: '',
                },*/
                tags: ['Website Subscribers']
            }),
        });

        const data = await response.json();
        //console.log(data);

        // Already subscribed
        if (data.title === 'Member Exists') {
            return new Response(
                JSON.stringify({ success: true, message: "You've already subscribed with this email" }),
                { status: 200 }
            );
        }

        if (!response.ok) {
            throw new Error(data.detail || 'Mailchimp error');
        }

        return new Response(
            JSON.stringify({ success: true, message: '' }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, message: 'Something went wrong. Please try again.', error: error.message }),
            { status: 500 }
        );
    }
}
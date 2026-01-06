import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

//const FILE_PATH = path.resolve('./submissions.json');

function saveSubmission(data){
    let submissions = [];
    if(fs.existsSync(FILE_PATH)){
        submissions = JSON.parse(fs.readFileSync(FILE_PATH,'utf-8'));
    }
    submissions.push({ ...data, created_at: new Date().toISOString() });
    fs.writeFileSync(FILE_PATH, JSON.stringify(submissions,null,2));
}

export async function POST({ request }) {
    try {
        const body = await request.json();
        const name = body['ct-name'];
        const email = body['ct-email'];
        const company = body['ct-company'];
        const message = body['ct-message'];
        const answers = body.answers;
        /*console.log(body);
        console.log(name);
        console.log(email);
        console.log(company);
        console.log(message);
        console.log(answers);
        console.log(answers[0]);*/

        if(!name || !email || !company || !answers) return new Response(
            JSON.stringify({success:false,error:'Missing fields'}),{status:400}
        );

        // Save submission (safe backup)
        //saveSubmission(body);

        const siteUrl = import.meta.env.PUBLIC_SITE_URL;
        const smtpUser = import.meta.env.SMTP_USER;
        const smtpPass = import.meta.env.SMTP_PASS;

        // Email transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for 587
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        });

        // Admin email
        const adminEmailHtml = `<html>
            <body>
                <p style="font-family: Verdana;font-size: 13px;margin: 10px 0;">Dear <strong>Admin</strong>,</p>
                <p style="font-family: Verdana;font-size: 13px;margin: 15px 0 20px 0;">Kindly note that a new <strong>Contact Us</strong> form submission has been received. Please find details below:</p>
                <p style="font-family: Verdana;font-size: 13px;margin: 5px 0 0 0;"><strong style="color:#181a23;">Name:</strong> ${name}</p>
                <p style="font-family: Verdana;font-size: 13px;margin: 5px 0 0 0;"><strong style="color:#181a23;">E-mail Address:</strong> <a href="mailto:${email}" style="color:#181a23;">${email}</a></p>
                <p style="font-family: Verdana;font-size: 13px;margin: 5px 0 0 0;"><strong style="color:#181a23;">Company:</strong> ${company}</p>
                <p style="font-family: Verdana;font-size: 13px;margin: 5px 0 0 0;white-space: pre-wrap;"><strong style="color:#181a23;">Message:</strong> ${message || '-'}</p>
                <p style="font-family: Verdana;font-size: 13px;margin: 5px 0 0 0;"><strong style="color:#181a23;">Where is your business today?</strong> ${answers[0]}</p>
                <p style="font-family: Verdana;font-size: 13px;margin: 5px 0 0 0;"><strong style="color:#181a23;">What's your priority right now?</strong> ${answers[1]}</p>
                <p style="font-family: Verdana;font-size: 13px;margin: 5px 0 0 0;"><strong style="color:#181a23;">When are you looking to take action?</strong> ${answers[2]}</p>
                <p style="font-family: Verdana;font-size: 13px;margin: 5px 0 0 0;"><strong style="color:#181a23;">What's the biggest obstacle you're facing?</strong> ${answers[3]}</p>
                <p style="font-family: Verdana;font-size: 13px;margin: 5px 0 0 0;"><strong style="color:#181a23;">What level of investment are you ready to make?</strong> ${answers[4]}</p><br/>
                <p><a href="https://ipoint.com.mt/" target="_blank"><img src="${siteUrl}/ipoint-black-logo.png" width="60" height="60" alt="IPOINT INT logo"></a></p>
            </body>
        </html>`;

        await transporter.sendMail({
            from:'"IPOINT INT Ltd." <info@ipoint.com.mt>',
            to:'aida@ipoint.com.mt',
            subject:`New CONTACT US form submission`,
            //text:htmlToText(adminEmailHtml),
            html:adminEmailHtml
        });


        // User email
        const userEmailHtml = `<html>
            <body>
                <p style="font-family: Verdana;font-size: 13px;margin: 10px 0;">Dear <strong>${name}</strong>,</p>
                <p style="font-family: Verdana;font-size: 13px;margin: 15px 0 20px 0;">Thank you for contacting IPOINT INT. We will contact you shortly.</p>
                <p><a href="https://ipoint.com.mt/" target="_blank"><img src="${siteUrl}/ipoint-black-logo.png" width="60" height="60" alt="IPOINT INT logo"></a></p>
            </body>
        </html>`;

        await transporter.sendMail({
            from:'"IPOINT INT Ltd." <info@ipoint.com.mt>',
            to: email,
            subject:'Thank you for your submission',
            text:`Hi ${name},\n\Thank you for contacting IPOINT INT. We will contact you shortly.`,
            html:userEmailHtml
        });

        return new Response(JSON.stringify({success:true}), {status:200});

    } catch(err){
        console.error(err);
        return new Response(JSON.stringify({success:false,error:'Failed to send email'}),{status:500});
    }
}
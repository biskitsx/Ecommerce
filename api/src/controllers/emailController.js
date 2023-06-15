import nodemailer from 'nodemailer'

export const sendEmail = async (data, req, res, next) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: { // ข้อมูลการเข้าสู่ระบบ
                user: process.env.MAIL_ID, // email user ของเรา
                pass: process.env.MP // email password
            }
        });
        // เริ่มทำการส่งอีเมล
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <me@gmail.com>', // อีเมลผู้ส่ง
            to: data.to, // อีเมลผู้รับ สามารถกำหนดได้มากกว่า 1 อีเมล โดยขั้นด้วย ,(Comma)
            subject: data.subject, // หัวข้ออีเมล
            text: data.text, // plain text body
            html: data.html // html body
        });
        // log ข้อมูลการส่งว่าส่งได้-ไม่ได้
        console.log('Message sent: %s', info.messageId);
    } catch(e) {
        console.log(e)
    }
}
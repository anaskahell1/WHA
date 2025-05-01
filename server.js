const venom = require('venom-bot');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// إعدادات السيرفر
const app = express();
const port = 3000;

// تفعيل body parser و CORS
app.use(bodyParser.json());
app.use(cors());

// إعداد المتغير لجلسة WhatsApp
let client;

// تفعيل WhatsApp Web عبر venom
venom
  .create({
    session: 'whatsapp-session',
    multidevice: true, // تفعيل التعددية للأجهزة
    headless: true, // تشغيل بدون واجهة (ممكن تغيرها لو عندك مشكلة)
  })
  .then((clientInstance) => {
    client = clientInstance;
    console.log('WhatsApp session started...');
  })
  .catch((error) => {
    console.error('Error starting WhatsApp session:', error);
  });

// نقطة الإرسال عبر السيرفر
app.post('/send', (req, res) => {
  const { number, message } = req.body;

  // التأكد من وجود الرقم والرسالة
  if (!number || !message) {
    return res.status(400).send({ message: 'رقم الهاتف والرسالة مطلوبان!' });
  }

  // إرسال الرسالة عبر WhatsApp
  client
    .sendText(`${number}@c.us`, message)
    .then((response) => {
      res.send({ message: 'تم إرسال الرسالة بنجاح!', response });
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      res.status(500).send({ message: 'فشل في إرسال الرسالة' });
    });
});

// بدء السيرفر
app.listen(port, () => {
  console.log(`السيرفر شغال على http://localhost:${port}`);
});

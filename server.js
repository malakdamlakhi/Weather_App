const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// تقديم الملفات الثابتة من المجلد الحالي
app.use(express.static(__dirname));

let projectData = {};

// استقبال البيانات من العميل وتخزينها
app.post('/add', (req, res) => {
    const { date, temp, feelings } = req.body;

    if (!date || !temp || !feelings) {
        return res.status(400).send({ message: 'Invalid data. Please provide date, temp, and feelings.' });
    }

    projectData = { date, temp, feelings };
    console.log('✅ Updated projectData:', projectData);

    res.send({ message: 'Data added successfully', data: projectData });
});

// إرجاع البيانات إلى الواجهة
app.get('/all', (req, res) => {
    console.log('📤 Sending projectData:', projectData);
    res.send(projectData);
});

// تقديم ملف HTML الرئيسي
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// تشغيل الخادم
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
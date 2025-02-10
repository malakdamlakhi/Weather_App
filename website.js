const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const apiKey = 'f05c9f8856426fc4b2580b9ede8188f3&units=imperial';

const getDate = () => {
    const date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

// إضافة حدث النقر على زر "Generate"
document.getElementById('generate').addEventListener('click', handleGenerate);

// الدالة الرئيسية للتعامل مع النقر على الزر
async function handleGenerate() {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if (!zip) {
        alert('Please enter a zip code');
        return;
    }

    try {
        // جلب بيانات الطقس
        const weatherData = await getWeather(zip);
        const date = getDate();
        const tempInCelsius = weatherData.main.temp - 273.15; // تحويل درجة الحرارة إلى مئوية

        // إرسال البيانات إلى السيرفر
        const dataToSend = { date, temp: tempInCelsius.toFixed(2), feelings };
        console.log('Data to send:', dataToSend);
        await postData('/add', dataToSend);

        // تحديث واجهة المستخدم بعد إرسال البيانات
        await updateUI();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

// دالة لجلب بيانات الطقس
async function getWeather(zip) {
    const response = await fetch(`${baseUrl}?zip=${zip},us&appid=${apiKey}`);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
}

// دالة لإرسال البيانات إلى السيرفر
async function postData(url = '', data = {}) {
    console.log('Sending data:', data);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Error posting data: ${response.statusText}`);
    }

    return await response.json();
}

// جلب البيانات من الخادم
const updateUI = async () => {
    const request = await fetch('/all'); // استخدم المسار الصحيح
    try {
        const allData = await request.json();
        document.getElementById('date').textContent = allData.date || 'No date available';
        document.getElementById('temp').textContent = allData.temp + '°C' || 'No temperature available';
        document.getElementById('content').textContent = allData.feelings || 'No feelings available';
    } catch (error) {
        console.log('Error:', error);
    }
};
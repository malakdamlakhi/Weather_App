const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js', // المسار إلى ملف JavaScript الأساسي
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(), // تنظيف مجلد الإخراج عند كل عملية بناء
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // يستهدف ملفات .js و .jsx
                exclude: /node_modules/, // يستثني مجلد node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // استخدام الإعداد المسبق لتحويل الكود
                    },
                },
            },
        ],
    },


};

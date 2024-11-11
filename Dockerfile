# Sử dụng hình ảnh Node.js
FROM node:16

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép package.json và cài đặt phụ thuộc
COPY package*.json ./
RUN npm install

# Sao chép mã nguồn Vue.js vào container
COPY . .

# Biên dịch ứng dụng Vue
RUN npm run serve

# Cung cấp ứng dụng
EXPOSE 3000
CMD ["npm", "run", "serve"]
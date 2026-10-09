# NestJS Users CRUD (Prisma + PostgreSQL)

## Yêu cầu
- Node.js 20 trở lên
- PostgreSQL

## Cách chạy
npm install
Copy-Item .env.example .env      
npx prisma migrate dev
npx prisma generate
npm run start:dev

Server chạy tại http://localhost:3000

## API
| Method | Endpoint | Mô tả |
|---|---|---|
| GET | /hello | Lời chào |
| POST | /users | Tạo user |
| GET | /users | Danh sách user |
| GET | /users/:id | Lấy user theo ID |
| PUT | /users/:id | Cập nhật user |
| DELETE | /users/:id | Xóa user |
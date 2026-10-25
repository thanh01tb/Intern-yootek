week5
# NestJS Backend (Prisma + PostgreSQL + JWT)

REST API quản lý User và Post, có đăng ký/đăng nhập bằng JWT, Passport, Guard và phân quyền theo role (ADMIN / USER).
=======
 week2
# NestJS Users CRUD (Prisma + PostgreSQL)
main

## Yêu cầu
- Node.js 20 trở lên
- Docker Desktop (hoặc PostgreSQL cài sẵn)

## Cách chạy

```powershell
npm install

# Chạy PostgreSQL bằng Docker (mật khẩu và tên DB phải khớp với DATABASE_URL trong .env)
docker run --name pg -e POSTGRES_PASSWORD=<mat_khau> -e POSTGRES_DB=mydb -p 5432:5432 -d postgres

Copy-Item .env.example .env      # rồi mở .env điền giá trị thật
npx prisma migrate dev
npx prisma generate
# NestJS Users CRUD Tuan 1

## Yêu cầu
- Node.js 20 trở lên

## Cách chạy
npm install
main
npm run start:dev
```

Server chạy tại http://localhost:3000

## Biến môi trường (.env)

| Biến | Ý nghĩa |
|---|---|
| `DATABASE_URL` | Chuỗi kết nối PostgreSQL |
| `JWT_SECRET` | Khóa bí mật dùng để ký JWT |

## API
week5

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| GET | /hello | Công khai | Lời chào |
| POST | /auth/register | Công khai | Đăng ký (role mặc định USER) |
| POST | /auth/login | Công khai | Đăng nhập, trả `access_token` |
| GET | /users | Đăng nhập | Danh sách user |
| GET | /users/:id | Đăng nhập | Lấy user theo ID (kèm profile, posts) |
| PUT | /users/:id | Đăng nhập | Cập nhật user và profile |
| DELETE | /users/:id | Đăng nhập | Xóa user |
| POST | /posts | USER, ADMIN | Tạo bài viết |
| GET | /posts, /posts/:id | USER, ADMIN | Xem bài viết |
| PUT | /posts/:id | ADMIN | Sửa bài viết |
| DELETE | /posts/:id | ADMIN | Xóa bài viết |

API có bảo vệ cần header: `Authorization: Bearer <access_token>`

## Phân quyền
- Đăng ký luôn tạo tài khoản role `USER`.
- Tạo ADMIN: chạy `npx prisma studio` → bảng `User` → đổi `role` thành `ADMIN` → login lại để lấy token mới.
- Thiếu/sai token: 401. Đủ token nhưng không đủ quyền: 403.
=======
| Method | Endpoint | Mô tả |
|---|---|---|
 week2
| GET | /hello | Lời chào |
| POST | /users | Tạo user |
| GET | /users | Danh sách user |
| GET | /users/:id | Lấy user theo ID |
| PUT | /users/:id | Cập nhật user |
| DELETE | /users/:id | Xóa user |
=======
| GET | /hello | Trả về lời chào |
| POST | /users | Tạo user |
| GET | /users | Lấy danh sách user |
| GET | /users/:id | Lấy user theo ID |
| PUT | /users/:id | Cập nhật user |
| DELETE | /users/:id | Xóa user |
main
main

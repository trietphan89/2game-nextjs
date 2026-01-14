# Hướng Dẫn Setup Google Sign-In

## Bước 1: Enable Google Sign-In trong Firebase Console

1. Truy cập Firebase Console: https://console.firebase.google.com/
2. Chọn project **game-demo-c2462**
3. Vào menu **Authentication** (biểu tượng khóa bên trái)
4. Click tab **Sign-in method**
5. Tìm dòng **Google** trong danh sách providers
6. Click vào dòng **Google**
7. Bật switch **Enable** (màu xanh)
8. Điền **Project support email** (email của bạn)
9. Click **Save**

## Bước 2: Kiểm Tra Google Sign-In Hoạt Động

### Test trên trang Register:
1. Mở: http://localhost:3002/register
2. Scroll xuống, click nút **"Đăng ký với Google"**
3. Chọn tài khoản Google của bạn
4. Nếu thành công:
   - Sẽ thấy alert "✅ Đăng nhập Google thành công!"
   - Được chuyển về trang chủ
   - User mới được tạo trong Firebase Authentication và Firestore

### Test trên trang Login:
1. Mở: http://localhost:3002/login
2. Click nút **"Đăng nhập với Google"**
3. Chọn tài khoản Google
4. Sẽ được đăng nhập và chuyển về trang chủ

## Cách Hoạt Động

### Khi đăng ký/đăng nhập với Google:

1. **Popup Google Sign-In** mở ra
2. User chọn tài khoản Google
3. Firebase Authentication tự động tạo/đăng nhập user
4. App kiểm tra user đã có trong Firestore chưa
5. Nếu chưa có → Tạo document mới trong collection `users`:
   ```javascript
   {
     uid: "google_user_id",
     email: "user@gmail.com",
     username: "user",  // Lấy từ email
     displayName: "User Name",  // Từ Google profile
     avatar: "https://photo_url",  // Từ Google profile
     role: "USER",
     provider: "google",
     createdAt: timestamp,
     updatedAt: timestamp
   }
   ```

6. Redirect user về trang chủ hoặc trang được chỉ định

## Các Lỗi Thường Gặp

### "Google Sign-In chưa được bật trong Firebase Console"
**Nguyên nhân**: Chưa enable Google provider (Bước 1)
**Giải pháp**: Làm theo Bước 1 ở trên

### "Popup bị chặn"
**Nguyên nhân**: Trình duyệt chặn popup
**Giải pháp**:
- Click vào icon "Popup blocked" trên thanh địa chỉ
- Cho phép popup từ localhost
- Thử lại

### "Bạn đã đóng cửa sổ đăng nhập"
**Nguyên nhân**: User đóng popup trước khi hoàn thành đăng nhập
**Giải pháp**: Click nút Google Sign-In lại

### Popup không mở
**Nguyên nhân**: Ad blocker hoặc extension chặn
**Giải pháp**:
- Tắt Ad blocker
- Thử trình duyệt khác
- Kiểm tra Console (F12) xem có lỗi gì

## Verify Setup Thành Công

Sau khi enable Google Sign-In và test:

1. **Firebase Console → Authentication → Users**:
   - Sẽ thấy user mới với provider "google.com"
   - Email từ tài khoản Google

2. **Firestore Database → Data → users collection**:
   - Có document mới với ID = Google UID
   - Chứa đầy đủ thông tin user

3. **Trong app**:
   - User được đăng nhập
   - Có thể thấy avatar và tên từ Google account

## Security Notes

### ⚠️ Quan trọng cho Production:

1. **Thêm authorized domains**:
   - Firebase Console → Authentication → Settings
   - Add domain production của bạn

2. **Configure OAuth consent screen** (nếu cần):
   - Google Cloud Console
   - APIs & Services → OAuth consent screen
   - Add logo, privacy policy, terms of service

3. **Firestore Rules**:
   - Tighten security rules
   - Chỉ cho phép user read/write data của chính họ

## Debug

Nếu gặp vấn đề:

1. **Mở Console (F12)** để xem logs:
   ```
   🔥 Starting Google Sign-In...
   ✅ Google Sign-In successful: user_id
   ✅ User data saved to Firestore
   ```

2. **Check Firebase Console**:
   - Authentication tab → Xem users mới được tạo chưa
   - Firestore Database → Xem data được lưu chưa

3. **Common errors trong Console**:
   - `auth/popup-closed-by-user` → User đóng popup
   - `auth/popup-blocked` → Popup bị chặn
   - `auth/operation-not-allowed` → Chưa enable Google provider

## Next Steps

Sau khi Google Sign-In hoạt động:

- [ ] Test đăng nhập trên nhiều trình duyệt
- [ ] Test với nhiều tài khoản Google khác nhau
- [ ] Verify data trong Firestore đúng format
- [ ] Setup Firestore security rules
- [ ] Add thêm providers khác nếu cần (Facebook, Apple, etc.)

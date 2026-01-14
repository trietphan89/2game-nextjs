# Hướng Dẫn Setup Firebase

## Bước 1: Enable Firebase Authentication

1. Truy cập Firebase Console: https://console.firebase.google.com/
2. Chọn project **game-demo-c2462**
3. Vào menu **Authentication** (biểu tượng khóa bên trái)
4. Click tab **Sign-in method**
5. Click vào **Email/Password**
6. Bật switch **Enable** (màu xanh)
7. Click **Save**

## Bước 2: Setup Firestore Database Rules

1. Vẫn ở Firebase Console
2. Vào menu **Firestore Database** (biểu tượng database bên trái)
3. Click tab **Rules**
4. Thay đổi rules thành (cho development):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Test collection - for development only
    match /test_posts/{document=**} {
      allow read, write: if true;
    }

    // For production, tighten these rules!
  }
}
```

5. Click **Publish**

## Bước 3: Kiểm Tra Config

1. Mở trang đăng ký: http://localhost:3004/register
2. Scroll xuống dưới form
3. Kiểm tra "Firebase Config Status" - tất cả phải có dấu ✅

Nếu có ❌:
- Kiểm tra file `.env` có đầy đủ biến môi trường
- Restart development server: `npm run dev`

## Bước 4: Test Đăng Ký

1. Điền form với:
   - Email: test@example.com
   - Username: testuser
   - Password: test123 (ít nhất 6 ký tự)
   - Confirm Password: test123

2. Click "Create Account"

3. Mở Console trình duyệt (F12) để xem logs:
   - ✅ Nếu thành công, bạn sẽ thấy:
     ```
     🔥 Starting Firebase registration...
     ✅ User created in Firebase Auth: xxx
     ✅ Display name updated
     ✅ User data saved to Firestore
     ```
   - ❌ Nếu có lỗi, bạn sẽ thấy error message chi tiết

4. Kiểm tra Firebase Console:
   - **Authentication** → **Users**: Sẽ thấy user mới
   - **Firestore Database** → **Data**: Sẽ thấy collection `users` với document mới

## Các Lỗi Thường Gặp

### "Firebase: Error (auth/operation-not-allowed)"
→ Bạn chưa enable Email/Password authentication (Bước 1)

### "Missing or insufficient permissions"
→ Firestore rules chưa được setup đúng (Bước 2)

### "Firebase Config Status" có ❌
→ Environment variables chưa load, cần restart server

### "Network error"
→ Kiểm tra internet connection
→ Kiểm tra Firebase project ID đúng chưa

## Debug Commands

```bash
# Restart development server
npm run dev

# Check environment variables loaded
echo $NEXT_PUBLIC_FIREBASE_API_KEY

# Test Firebase connection
# Open: http://localhost:3004/test-firebase
```

## Production Notes

⚠️ **Quan trọng**: Rules hiện tại cho phép tất cả users read/write - chỉ dùng cho development!

Khi deploy production, cần:
1. Tighten Firestore rules
2. Add security validations
3. Implement proper access control
4. Enable App Check

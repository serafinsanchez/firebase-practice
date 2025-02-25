# Firebase Setup Guide

This document provides instructions on how to set up Firebase for the blog platform.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on "Add project" and follow the prompts to create a new project.
3. Give your project a name (e.g., "Next.js Blog Platform").
4. Choose whether to enable Google Analytics (recommended).
5. Click "Create Project".

## 2. Set Up Firebase Authentication

1. In the Firebase Console, navigate to your project.
2. Go to "Authentication" in the left sidebar.
3. Click on "Get started".
4. Enable the "Email/Password" sign-in method.
5. Optionally, enable Google sign-in or other providers as needed.

## 3. Set Up Firestore Database

1. In the Firebase Console, go to "Firestore Database".
2. Click "Create database".
3. Choose "Start in production mode" or "Start in test mode" (for development).
4. Select a location for your database.
5. Click "Enable".

## 4. Set Up Firebase Storage

1. In the Firebase Console, go to "Storage".
2. Click "Get started".
3. Choose "Start in production mode" or "Start in test mode" (for development).
4. Click "Next" and then "Done".

## 5. Register a Web App

1. In the Firebase Console, go to "Project settings" (gear icon).
2. Scroll down to "Your apps" and click the web icon (</>) to add a web app.
3. Register your app with a nickname (e.g., "Next.js Blog").
4. Optionally, set up Firebase Hosting if you plan to use it.
5. Click "Register app".
6. Copy the Firebase configuration object.

## 6. Configure Environment Variables

1. In your project, create a `.env.local` file in the root directory (if not already created).
2. Add the following environment variables with values from your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

3. Save the file.

## 7. Set Up Firebase Security Rules

### Firestore Rules

In the Firebase Console, go to "Firestore Database" > "Rules" and set up appropriate security rules. For example:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read all posts
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
    
    // Allow users to read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to create comments
    match /comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
  }
}
```

### Storage Rules

In the Firebase Console, go to "Storage" > "Rules" and set up appropriate security rules. For example:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload images
    match /images/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow users to upload their profile pictures
    match /users/{userId}/profile.jpg {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 8. Test the Firebase Configuration

After setting up Firebase and configuring the environment variables, you can test the configuration by running the application and checking the console for any Firebase-related errors. 
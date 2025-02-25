const { execSync } = require('child_process');
const fs = require('fs');

console.log('Installing required dependencies...');
execSync('npm install firebase-admin dotenv --save', { stdio: 'inherit' });

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

console.log('Creating a service account key...');
console.log('Please follow these steps to enable authentication:');
console.log('1. Go to the Firebase Console: https://console.firebase.google.com/project/next-firebase-blog-e8cf2/overview');
console.log('2. Navigate to Authentication > Sign-in method');
console.log('3. Enable the Email/Password provider');
console.log('4. Enable the Google provider');
console.log('5. For Google provider, configure the OAuth consent screen if prompted');

// Create a simple web page to test authentication
console.log('Creating a test authentication page...');

execSync('mkdir -p public', { stdio: 'inherit' });

const testAuthHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Firebase Authentication Test</title>
  <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js"></script>
  <script>
    // Your Firebase configuration
    const firebaseConfig = {
      apiKey: "${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}",
      authDomain: "${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}",
      projectId: "${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}",
      storageBucket: "${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}",
      messagingSenderId: "${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}",
      appId: "${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    function signUp() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log('User created:', userCredential.user);
          document.getElementById('status').textContent = 'User created successfully!';
        })
        .catch((error) => {
          console.error('Error creating user:', error);
          document.getElementById('status').textContent = 'Error: ' + error.message;
        });
    }

    function signIn() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log('User signed in:', userCredential.user);
          document.getElementById('status').textContent = 'User signed in successfully!';
        })
        .catch((error) => {
          console.error('Error signing in:', error);
          document.getElementById('status').textContent = 'Error: ' + error.message;
        });
    }

    function signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          console.log('Google sign in successful:', result.user);
          document.getElementById('status').textContent = 'Google sign in successful!';
        })
        .catch((error) => {
          console.error('Error signing in with Google:', error);
          document.getElementById('status').textContent = 'Error: ' + error.message;
        });
    }

    function signOut() {
      firebase.auth().signOut()
        .then(() => {
          console.log('User signed out');
          document.getElementById('status').textContent = 'User signed out successfully!';
        })
        .catch((error) => {
          console.error('Error signing out:', error);
          document.getElementById('status').textContent = 'Error: ' + error.message;
        });
    }

    // Listen for auth state changes
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        document.getElementById('user-info').textContent = 'Logged in as: ' + user.email;
      } else {
        document.getElementById('user-info').textContent = 'Not logged in';
      }
    });
  </script>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }
    button {
      padding: 10px 15px;
      background-color: #4285F4;
      color: white;
      border: none;
      cursor: pointer;
      margin-right: 10px;
    }
    button:hover {
      background-color: #3367D6;
    }
    #status {
      margin-top: 20px;
      padding: 10px;
      background-color: #f0f0f0;
    }
    #user-info {
      margin-bottom: 20px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>Firebase Authentication Test</h1>
  
  <div id="user-info">Not logged in</div>
  
  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" id="email" placeholder="Enter your email">
  </div>
  
  <div class="form-group">
    <label for="password">Password:</label>
    <input type="password" id="password" placeholder="Enter your password">
  </div>
  
  <div class="form-group">
    <button onclick="signUp()">Sign Up</button>
    <button onclick="signIn()">Sign In</button>
    <button onclick="signInWithGoogle()">Sign In with Google</button>
    <button onclick="signOut()">Sign Out</button>
  </div>
  
  <div id="status"></div>
</body>
</html>
`;

fs.writeFileSync('public/auth-test.html', testAuthHtml);

console.log('Test authentication page created at public/auth-test.html');
console.log('After enabling authentication in the Firebase Console, you can serve this page to test authentication:');
console.log('npx serve public'); 
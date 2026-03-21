@echo off
title JARVIS AI - Complete Deploy Solution
color 0E

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                                                              ║
echo  ║     🤖 JARVIS AI - COMPLETE DEPLOY SOLUTION 🤖              ║
echo  ║                                                              ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

echo  🚀 JARVIS AI - One Click Deploy System
echo  =====================================
echo.

echo  📋 SELECT DEPLOY OPTION:
echo  1️⃣  First Time Setup (Create GitHub Repository)
echo  2️⃣  Update Existing Repository
echo  3️⃣  Quick Deploy (Already Setup)
echo  4️⃣  Exit
echo.

set /p choice="Select option (1-4): "

if "%choice%"=="1" goto FIRST_TIME
if "%choice%"=="2" goto UPDATE_REPO
if "%choice%"=="3" goto QUICK_DEPLOY
if "%choice%"=="4" goto END

:FIRST_TIME
echo.
echo  📝 FIRST TIME SETUP
echo  ===================
echo.
echo  📋 STEP 1: Enter Your GitHub Username
set /p username="GitHub Username: "

echo.
echo  📋 STEP 2: Setting up Git Remote...
git remote add origin https://github.com/%username%/jarvis-ai.git
if errorlevel 1 goto REMOTE_ERROR

echo.
echo  📋 STEP 3: Setting Main Branch...
git branch -M main

echo.
echo  📋 STEP 4: Adding Files...
git add .

echo.
echo  📋 STEP 5: Committing Changes...
git commit -m "Initial deploy: JARVIS AI with Auto Mic and iPhone support - %date%"

echo.
echo  📋 STEP 6: Pushing to GitHub...
git push -u origin main
if errorlevel 1 goto PUSH_ERROR

goto SUCCESS

:UPDATE_REPO
echo.
echo  🔄 UPDATE EXISTING REPOSITORY
echo  ============================
echo.
echo  📋 STEP 1: Adding All Changes...
git add .

echo.
echo  📋 STEP 2: Committing Changes...
git commit -m "Update: JARVIS AI with Auto Mic and iPhone support - %date%"

echo.
echo  📋 STEP 3: Pushing to GitHub...
git push origin main
if errorlevel 1 goto PUSH_ERROR

goto SUCCESS

:QUICK_DEPLOY
echo.
echo  ⚡ QUICK DEPLOY
echo  ==============
echo.
echo  📋 STEP 1: Adding Files...
git add .

echo.
echo  📋 STEP 2: Committing Changes...
git commit -m "Quick deploy: JARVIS AI update - %date%"

echo.
echo  📋 STEP 3: Pushing to GitHub...
git push origin main
if errorlevel 1 goto PUSH_ERROR

goto SUCCESS

:SUCCESS
echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                                                              ║
echo  ║     ✅ DEPLOY SUCCESSFUL!                                   ║
echo  ║                                                              ║
echo  ║     🌐 Your JARVIS AI is now on GitHub!                    ║
echo  ║                                                              ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

if "%choice%"=="1" (
    echo  🎯 Your Repository: https://github.com/%username%/jarvis-ai
    echo  🌐 Your Pages URL: https://%username%.github.io/jarvis-ai/
) else (
    echo  🌐 Your Pages URL: https://[YOUR-USERNAME].github.io/jarvis-ai/
)

echo.
echo  📋 NEXT STEPS:
echo  ============
echo  1. Go to your GitHub repository
echo  2. Settings → Pages
echo  3. Source: Deploy from a branch
echo  4. Branch: main
echo  5. Folder: / (root)
echo  6. Click Save
echo.

echo  📱 IPHONE SETUP:
echo  ================
echo  1. Open URL in iPhone Safari
echo  2. Tap Share → Add to Home Screen
echo  3. Name: "JARVIS AI"
echo  4. Tap Add
echo  5. Allow microphone permissions
echo  6. Tap AUTO button (green)
echo  7. Start talking! "Hai JARVIS"
echo.

goto END

:REMOTE_ERROR
echo.
echo  ❌ ERROR: Git remote already exists or invalid username
echo.
echo  💡 SOLUTION:
echo  - Check your GitHub username
echo  - Make sure repository doesn't exist yet
echo  - Try: git remote remove origin
echo.
goto END

:PUSH_ERROR
echo.
echo  ❌ ERROR: Failed to push to GitHub
echo.
echo  💡 SOLUTION:
echo  - Check internet connection
echo  - Verify GitHub repository exists
echo  - Check GitHub credentials
echo  - Try: git config --global user.name "Your Name"
echo  - Try: git config --global user.email "your@email.com"
echo.
goto END

:END
echo.
echo  🎉 JARVIS AI Deploy System
echo  ========================
echo.
echo  📞 Need help? Check README_DEPLOY.md
echo  🌐 GitHub: https://github.com
echo  📱 iPhone Guide: README_IPHONE.md
echo.
echo  🔥 Your JARVIS AI is ready to go LIVE! 🚀
echo.
pause

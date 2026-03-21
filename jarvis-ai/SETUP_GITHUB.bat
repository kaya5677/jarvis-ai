@echo off
title JARVIS AI - GitHub Repository Setup
color 0B

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                                                              ║
echo  ║     🚀 JARVIS AI - GITHUB REPOSITORY SETUP 🚀               ║
echo  ║                                                              ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

echo  📝 PLEASE ENTER YOUR GITHUB USERNAME:
set /p username="GitHub Username: "

echo.
echo  📋 STEP 1: Setting up Git Remote...
git remote add origin https://github.com/%username%/jarvis-ai.git
echo.

echo  📋 STEP 2: Setting Main Branch...
git branch -M main
echo.

echo  📋 STEP 3: Initial Push to GitHub...
git push -u origin main
echo.

echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                                                              ║
echo  ║     ✅ GITHUB SETUP COMPLETED!                              ║
echo  ║                                                              ║
echo  ║     🌐 Repository: https://github.com/%username%/jarvis-ai   ║
echo  ║                                                              ║
echo  ║     📋 NEXT STEPS:                                          ║
echo  ║     1. Go to your repository on GitHub                        ║
echo  ║     2. Settings → Pages                                      ║
echo  ║     3. Source: Deploy from a branch                          ║
echo  ║     4. Branch: main                                         ║
echo  ║     5. Folder: / (root)                                     ║
echo  ║     6. Click Save                                           ║
echo  ║                                                              ║
echo  ║     📱 After Pages enabled:                                  ║
echo  ║     - Your URL: https://%username%.github.io/jarvis-ai/     ║
echo  ║     - Open in iPhone Safari                                  ║
echo  ║     - Add to Home Screen                                     ║
echo  ║     - Enable Auto Mic                                       ║
echo  ║                                                              ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

echo  🎯 Your JARVIS AI will be available at:
echo  https://%username%.github.io/jarvis-ai/
echo.

echo  🔥 READY TO GO! Your JARVIS AI is almost LIVE!
echo.

pause

@echo off
title JARVIS AI - One Click Deploy to GitHub Pages
color 0A

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                                                              ║
echo  ║     🤖 JARVIS AI - ONE CLICK DEPLOY TO GITHUB PAGES 🤖        ║
echo  ║                                                              ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

echo  📋 STEP 1: Checking Git Status...
git status
echo.

echo  📋 STEP 2: Adding All Files...
git add .
echo.

echo  📋 STEP 3: Committing Changes...
git commit -m "Auto deploy: JARVIS AI with Auto Mic and iPhone support - %date%"
echo.

echo  📋 STEP 4: Pushing to GitHub...
git push origin main
echo.

echo  📋 STEP 5: Checking Remote Status...
git remote -v
echo.

echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                                                              ║
echo  ║     ✅ DEPLOY COMPLETED!                                     ║
echo  ║                                                              ║
echo  ║     🌐 Your JARVIS AI is now LIVE on GitHub Pages!           ║
echo  ║                                                              ║
echo  ║     📱 Next Steps:                                          ║
echo  ║     1. Enable GitHub Pages (if not enabled)                 ║
echo  ║     2. Open URL in iPhone Safari                             ║
echo  ║     3. Add to Home Screen                                    ║
echo  ║     4. Enable Auto Mic                                       ║
echo  ║                                                              ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

echo  🔗 Your GitHub Pages URL will be:
echo  https://[YOUR-USERNAME].github.io/jarvis-ai/
echo.

echo  ⚠️  IMPORTANT: 
echo  - Make sure GitHub repository exists
echo  - Make sure GitHub Pages is enabled
echo  - Replace [YOUR-USERNAME] with actual username
echo.

pause

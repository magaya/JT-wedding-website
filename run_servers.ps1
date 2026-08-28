# One-Click Runner for Joseph & Thea Wedding Website (FastAPI Backend + Next.js Frontend)

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "💍 Starting Joseph & Thea Wedding Invitation Servers" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan

$env:Path = "C:\Program Files\nodejs;" + $env:Path

# Start Python FastAPI Backend
Write-Host "`n[1/2] Starting Python FastAPI Backend on http://127.0.0.1:8000..." -ForegroundColor Green
$BackendProcess = Start-Process -FilePath "python" -ArgumentList "-m uvicorn main:app --app-dir backend --host 127.0.0.1 --port 8000 --reload" -PassThru

# Start Frontend Next.js App
Write-Host "[2/2] Starting Next.js Website on http://localhost:3000..." -ForegroundColor Green

Write-Host "`n✨ Local Browser: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📱 Mobile Wi-Fi: http://192.168.110.146:3000" -ForegroundColor Cyan
Write-Host "📊 Admin RSVP Dashboard: http://localhost:3000/admin (Passcode: 2027)`n" -ForegroundColor Yellow

& "C:\Program Files\nodejs\npm.cmd" run dev

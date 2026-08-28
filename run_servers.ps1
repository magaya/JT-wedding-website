# One-Click Runner for Joseph & Thea Wedding Website (FastAPI Backend + Next.js Frontend)

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "Starting Joseph & Thea Wedding Invitation Servers" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan

$env:Path = "C:\Program Files\nodejs;" + $env:Path

# Check if Backend VirtualEnv / Python is ready
Write-Host "`n[1/2] Starting Python FastAPI Backend on http://127.0.0.1:8000..." -ForegroundColor Green
$BackendProcess = Start-Process -FilePath "python" -ArgumentList "-m uvicorn main:app --app-dir backend --host 127.0.0.1 --port 8000 --reload" -PassThru

# Start Frontend Next.js App
Write-Host "[2/2] Starting Next.js Frontend on http://localhost:3000..." -ForegroundColor Green
Set-Location -Path "$PSScriptRoot\frontend"

Write-Host "`nOpening browser at http://localhost:3000" -ForegroundColor Cyan
Write-Host "Admin RSVP Dashboard available at http://localhost:3000/admin (Passcode: 2027)`n" -ForegroundColor Yellow

npm.cmd run dev

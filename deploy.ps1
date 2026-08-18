$ErrorActionPreference = "Stop"

$repoRoot     = $PSScriptRoot
$frontendDir  = Join-Path $repoRoot "frontend"
$stagingDir   = Join-Path $repoRoot ".deploy-staging"
$viteConfig   = Join-Path $frontendDir "vite.config.ts"
$distDir      = Join-Path $frontendDir "dist"

$branch = "Purple&Pink-Com"
$base   = "/YardStack/"

function Write-Step($msg) {
    Write-Host ""
    Write-Host "  > $msg" -ForegroundColor Cyan
    Write-Host ("  " + "-" * ($msg.Length + 2)) -ForegroundColor DarkGray
}

function Write-Ok($msg) {
    Write-Host "    v $msg" -ForegroundColor Green
}

function Write-Warn($msg) {
    Write-Host "    ! $msg" -ForegroundColor Yellow
}

$originalBranch = (git -C $repoRoot rev-parse --abbrev-ref HEAD).Trim()
Write-Host ""
Write-Host "  +--------------------------------------------------+" -ForegroundColor Magenta
Write-Host "  |   YardStack - Deploy Purple&Pink-Com Theme       |" -ForegroundColor Magenta
Write-Host "  +--------------------------------------------------+" -ForegroundColor Magenta
Write-Host ""
Write-Host "  Current branch: $originalBranch" -ForegroundColor DarkGray

Write-Step "Preparing staging directory"
if (Test-Path $stagingDir) {
    Remove-Item $stagingDir -Recurse -Force
}
New-Item -ItemType Directory -Path $stagingDir -Force | Out-Null
Write-Ok "Staging directory created at: .deploy-staging/"

Write-Step "Building theme (branch: $branch)"

Write-Host "    Checking out branch '$branch'..." -ForegroundColor DarkGray
git -C $repoRoot checkout $branch --force 2>&1 | Out-Null
Write-Ok "Checked out '$branch'"

$originalViteContent = Get-Content $viteConfig -Raw

$newViteContent = $originalViteContent -replace "base:\s*'[^']*'", "base: '$base'"
Set-Content -Path $viteConfig -Value $newViteContent -NoNewline
Write-Ok "Updated vite.config.ts base to '$base'"

if (-not (Test-Path (Join-Path $frontendDir "node_modules"))) {
    Write-Host "    Installing dependencies..." -ForegroundColor DarkGray
    Push-Location $frontendDir
    npm ci 2>&1 | Out-Null
    Pop-Location
    Write-Ok "Dependencies installed"
} else {
    Write-Ok "node_modules exists, skipping install"
}

Write-Host "    Building..." -ForegroundColor DarkGray
Push-Location $frontendDir
npx vite build 2>&1 | ForEach-Object { Write-Host "      $_" -ForegroundColor DarkGray }
Pop-Location
Write-Ok "Build complete"

if (Test-Path $distDir) {
    Copy-Item -Path "$distDir\*" -Destination $stagingDir -Recurse -Force
    Write-Ok "Copied dist -> staging root"
} else {
    Write-Warn "dist/ not found for branch '$branch'! Skipping."
}

Set-Content -Path $viteConfig -Value $originalViteContent -NoNewline
Write-Ok "Restored vite.config.ts"

New-Item -ItemType File -Path (Join-Path $stagingDir ".nojekyll") -Force | Out-Null
Write-Ok ".nojekyll file created"

Write-Step "Deploying to gh-pages branch"

Push-Location $frontendDir
npx gh-pages -d $stagingDir --dotfiles 2>&1 | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }
Pop-Location
Write-Ok "Deployed to gh-pages branch!"

Write-Step "Cleaning up"
git -C $repoRoot checkout $originalBranch --force 2>&1 | Out-Null
Write-Ok "Restored to branch '$originalBranch'"

Remove-Item $stagingDir -Recurse -Force -ErrorAction SilentlyContinue
Write-Ok "Staging directory cleaned up"

Write-Host ""
Write-Host "  +--------------------------------------------------+" -ForegroundColor Green
Write-Host "  |   v Deploy complete!                             |" -ForegroundColor Green
Write-Host "  +--------------------------------------------------+" -ForegroundColor Green
Write-Host ""
Write-Host "  Your site will be live at:" -ForegroundColor White
Write-Host "  * https://testingdesign.github.io/YardStack/" -ForegroundColor DarkGray
Write-Host ""

$ErrorActionPreference = "Stop"

$ProjectRoot = (Get-Item $PSScriptRoot).Parent.FullName
$OutputDir = Join-Path $ProjectRoot "release"
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$ReleaseName = "sustainamotion-cms-release_$Timestamp"
$TempDir = Join-Path $OutputDir $ReleaseName

Write-Host "========================================="
Write-Host " SUSTAINAMOTION CMS Release Packaging"
Write-Host "========================================="

if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
}
if (Test-Path $TempDir) {
    Remove-Item -Path $TempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $TempDir | Out-Null

Write-Host "`n[1/4] Copying project files..."

$ItemsToCopy = @(
    "bin",
    "config",
    "custom",
    "db",
    "docker",
    "docs",
    "lib",
    "locale",
    "tasks",
    "tools",
    "vendor",
    "views",
    "web",
    "deploy",
    "Dockerfile.dev",
    "docker-compose.yml",
    ".env.example",
    "package.json",
    "phinx.php",
    "README.md"
)

foreach ($item in $ItemsToCopy) {
    $srcPath = Join-Path $ProjectRoot $item
    if (Test-Path $srcPath) {
        $destPath = Join-Path $TempDir $item
        Copy-Item -Path $srcPath -Destination $destPath -Recurse -Force
    }
}

Write-Host "[2/4] Setting up customer deployment defaults..."

$envExample = Join-Path $TempDir ".env.example"
$envTarget = Join-Path $TempDir ".env"
if (Test-Path $envExample) {
    Copy-Item -Path $envExample -Destination $envTarget -Force
}

$startBatSrc = Join-Path $ProjectRoot "deploy\START_CMS.bat"
$stopBatSrc = Join-Path $ProjectRoot "deploy\STOP_CMS.bat"

if (Test-Path $startBatSrc) {
    Copy-Item -Path $startBatSrc -Destination (Join-Path $TempDir "START_CMS.bat") -Force
}
if (Test-Path $stopBatSrc) {
    Copy-Item -Path $stopBatSrc -Destination (Join-Path $TempDir "STOP_CMS.bat") -Force
}

Write-Host "[3/4] Creating ZIP archive..."
$ZipPath = Join-Path $OutputDir "$ReleaseName.zip"
if (Test-Path $ZipPath) {
    Remove-Item -Path $ZipPath -Force
}

Compress-Archive -Path "$TempDir\*" -DestinationPath $ZipPath -CompressionLevel Optimal

Write-Host "[4/4] Cleaning temporary files..."
Remove-Item -Path $TempDir -Recurse -Force

Write-Host ""
Write-Host "========================================="
Write-Host " [SUCCESS] Release package created successfully!"
Write-Host " Output file: $ZipPath"
Write-Host "========================================="

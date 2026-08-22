$srcLogo = "C:\Users\ETHEREAL浪岡\.gemini\antigravity-ide\brain\54c6f3f4-b5c6-4656-8d74-db86876195aa\.user_uploaded\media_1787383912371.png"
$srcIcon = "C:\Users\ETHEREAL浪岡\.gemini\antigravity-ide\brain\54c6f3f4-b5c6-4656-8d74-db86876195aa\.user_uploaded\media_1787383912553.png"

# 1. library/brand
Copy-Item $srcLogo -Destination "d:\develop\xibo4.5.1\library\brand\logo.png" -Force
Copy-Item $srcLogo -Destination "d:\develop\xibo4.5.1\library\brand\logo-dark.png" -Force
Copy-Item $srcIcon -Destination "d:\develop\xibo4.5.1\library\brand\logo-icon.png" -Force
Copy-Item $srcIcon -Destination "d:\develop\xibo4.5.1\library\brand\favicon.ico" -Force
Copy-Item $srcIcon -Destination "d:\develop\xibo4.5.1\library\brand\favicon.png" -Force
Copy-Item $srcIcon -Destination "d:\develop\xibo4.5.1\library\brand\192x192.png" -Force
Copy-Item $srcIcon -Destination "d:\develop\xibo4.5.1\library\brand\512x512.png" -Force

Remove-Item "d:\develop\xibo4.5.1\library\brand\logo.svg" -ErrorAction SilentlyContinue
Remove-Item "d:\develop\xibo4.5.1\library\brand\logo-dark.svg" -ErrorAction SilentlyContinue
Remove-Item "d:\develop\xibo4.5.1\library\brand\logo-icon.svg" -ErrorAction SilentlyContinue

# 2. docker/brand
Copy-Item $srcLogo -Destination "d:\develop\xibo4.5.1\docker\brand\logo.png" -Force
Copy-Item $srcLogo -Destination "d:\develop\xibo4.5.1\docker\brand\logo-dark.png" -Force
Copy-Item $srcIcon -Destination "d:\develop\xibo4.5.1\docker\brand\logo-icon.png" -Force
Copy-Item $srcIcon -Destination "d:\develop\xibo4.5.1\docker\brand\favicon.ico" -Force
Copy-Item $srcIcon -Destination "d:\develop\xibo4.5.1\docker\brand\favicon.png" -Force
Copy-Item $srcIcon -Destination "d:\develop\xibo4.5.1\docker\brand\192x192.png" -Force
Copy-Item $srcIcon -Destination "d:\develop\xibo4.5.1\docker\brand\512x512.png" -Force

Remove-Item "d:\develop\xibo4.5.1\docker\brand\logo.svg" -ErrorAction SilentlyContinue
Remove-Item "d:\develop\xibo4.5.1\docker\brand\logo-dark.svg" -ErrorAction SilentlyContinue
Remove-Item "d:\develop\xibo4.5.1\docker\brand\logo-icon.svg" -ErrorAction SilentlyContinue

# 3. web & frontend
if (Test-Path "d:\develop\xibo4.5.1\web\favicon.ico") {
    Copy-Item $srcIcon -Destination "d:\develop\xibo4.5.1\web\favicon.ico" -Force
}
Copy-Item $srcIcon -Destination "d:\develop\xibo4.5.1\frontend\public\favicon.ico" -Force

Write-Host "Branding assets replaced successfully!"

$ErrorActionPreference = 'Stop'
$previewRoot = Split-Path -Parent $PSScriptRoot
$projectRoot = (Resolve-Path (Join-Path $previewRoot '../..')).Path
$source = Join-Path $projectRoot 'content/main-copy.id.json'
$tempDir = Join-Path $PSScriptRoot ('.tmp-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $tempDir | Out-Null
$inputPath = Join-Path $tempDir 'input.json'
$outputPath = Join-Path $tempDir 'output.html'
function Fresh-Content { Get-Content -Raw $source | ConvertFrom-Json }
function Build-Test($data) {
    $data | ConvertTo-Json -Depth 20 | Set-Content -Encoding utf8 $inputPath
    & (Join-Path $previewRoot 'build-preview.ps1') -ContentPath $inputPath -OutputPath $outputPath | Out-Null
}
try {
    $data=Fresh-Content; $data.ui.text_software='Label edited in content'; Build-Test $data
    if (-not (Get-Content -Raw $outputPath).Contains('Label edited in content')) { throw 'JSON label edit not rendered' }
    'PASS: navigation label can change through JSON alone'
    $data=Fresh-Content; $data.home.intro='<img src=x onerror="alert(1)"> & text'; Build-Test $data
    $html=Get-Content -Raw $outputPath
    if ($html.Contains('<img src=x') -or -not $html.Contains('&lt;img')) { throw 'Unsafe copy not escaped' }
    'PASS: HTML supplied in copy is escaped'
    $data=Fresh-Content; $data.faq[0].answer='{{home.intro}}'; Build-Test $data
    if (-not (Get-Content -Raw $outputPath).Contains('{{home.intro}}')) { throw 'Inserted text was recursively expanded' }
    'PASS: inserted content cannot trigger template expansion'
    $before=(Get-FileHash $outputPath).Hash
    $data=Fresh-Content; $data.home.PSObject.Properties.Remove('intro')
    $failed=$false;try{Build-Test $data}catch{$failed=$true}
    if(-not $failed -or (Get-FileHash $outputPath).Hash -ne $before){throw 'Invalid content overwrote last valid output'}
    'PASS: missing content fails before overwriting output'
    $data=Fresh-Content; $data.locale='en';$failed=$false;try{Build-Test $data}catch{$failed=$true}
    if(-not $failed){throw 'Unreviewed translation was relabeled'}
    'PASS: Indonesian draft cannot be relabeled as English'
} finally {
    foreach($file in @($inputPath,$outputPath)){if(Test-Path -LiteralPath $file){Remove-Item -LiteralPath $file}}
    Remove-Item -LiteralPath $tempDir
}

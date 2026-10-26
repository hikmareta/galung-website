param([string]$ContentPath, [string]$OutputPath)
$ErrorActionPreference = 'Stop'
$rootPath = (Resolve-Path (Join-Path $PSScriptRoot '../..')).Path
if (-not $ContentPath) { $ContentPath = Join-Path $rootPath 'content/main-copy.id.json' }
if (-not $OutputPath) { $OutputPath = Join-Path $PSScriptRoot 'index.html' }
$data = Get-Content -Raw -LiteralPath $ContentPath | ConvertFrom-Json
if ($data.locale -ne 'id') { throw 'Only the Indonesian draft is available; do not relabel it as a translation.' }
$template = Get-Content -Raw (Join-Path $PSScriptRoot 'template.html')
function Encode-Text([string]$value) { [System.Net.WebUtility]::HtmlEncode($value) }
$faqHtml = foreach ($item in $data.faq) {
    if (-not $item.question -or -not $item.answer) { throw 'FAQ question and answer are required.' }
    '<details><summary>' + (Encode-Text $item.question) + '</summary><p>' + (Encode-Text $item.answer) + '</p></details>'
}
# Single substitution pass: inserted copy can never become executable template input.
$result = [regex]::Replace($template, '\{\{([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*)\}\}', {
    param($match)
    if ($match.Groups[1].Value -eq 'FAQ') { return ($faqHtml -join "`n") }
    $value = $data
    foreach ($part in $match.Groups[1].Value.Split('.')) {
        $property = $value.PSObject.Properties[$part]
        if ($null -eq $property) { throw "Missing content: $($match.Groups[1].Value)" }
        $value = $property.Value
    }
    if ($value -isnot [string]) { throw "Content token must resolve to text: $($match.Groups[1].Value)" }
    Encode-Text $value
})
$target = [System.IO.Path]::GetFullPath($OutputPath)
$temp = $target + '.tmp-' + [guid]::NewGuid().ToString('N')
try {
    [System.IO.File]::WriteAllText($temp, $result.TrimEnd() + "`n", [System.Text.UTF8Encoding]::new($false))
    [System.IO.File]::Move($temp, $target, $true)
} finally {
    if (Test-Path -LiteralPath $temp) { Remove-Item -LiteralPath $temp }
}
'Preview regenerated from localized draft content and template.'

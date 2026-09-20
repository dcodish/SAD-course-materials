# SAD course MCP - installer for Claude Desktop
#
#   irm https://dcodish.github.io/SAD-course-materials/install.ps1 | iex
#
# Adds one entry to Claude Desktop's config that runs the course server through
# npx with the @latest tag, so every restart picks up the newest published version
# and the student never reinstalls.
#
# Deliberately ASCII-only. This is fetched over HTTP and executed as a string, so
# its encoding depends on the charset the host happens to send; Hebrew here turned
# into mojibake that broke the PowerShell parser. The Hebrew instructions live on
# the course page next to the command instead.
#
# Nothing is deleted: the existing config is backed up and only the course entry is
# added or replaced, alongside whatever else is configured.

$ErrorActionPreference = 'Stop'
$PKG  = 'sad-mcp'
$NAME = 'sad-mcp'

function Say($t, $c = 'Gray') { Write-Host $t -ForegroundColor $c }

Say ''
Say '  SAD course MCP' 'Cyan'
Say '  --------------' 'Cyan'

# --- 1. Node -----------------------------------------------------------------
# npx is what makes this self-updating, and npx ships with Node. Without it there
# is nothing worth configuring, so stop with something actionable rather than
# writing a config that silently fails on the next restart.
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Say ''
    Say '  Node.js is not installed. It is the only prerequisite.' 'Yellow'
    Say ''
    Say '     https://nodejs.org   ->  download the LTS version' 'White'
    Say ''
    Say '  Then close this window, open a new PowerShell, and run this again.' 'Yellow'
    Say ''
    return
}
Say "  [ok] Node $(node --version)" 'Green'

# --- 2. where Claude Desktop keeps its config --------------------------------
# Two installers, two locations, and a machine can have both. Writing to every one
# that exists avoids asking the student which they installed - a question they
# cannot reasonably answer - and costs nothing when only one is real.
$targets = @(
    (Join-Path $env:LOCALAPPDATA 'Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json'),
    (Join-Path $env:APPDATA      'Claude\claude_desktop_config.json')
) | Where-Object { Test-Path (Split-Path $_ -Parent) }

if (-not $targets) {
    Say ''
    Say '  Claude Desktop was not found on this machine.' 'Yellow'
    Say '  Install it from https://claude.ai/download and run this again.' 'Yellow'
    Say ''
    return
}

# --- 3. merge -----------------------------------------------------------------
foreach ($cfg in $targets) {
    $data = $null
    if (Test-Path $cfg) {
        $backup = "$cfg.bak-$(Get-Date -Format yyyyMMdd-HHmmss)"
        Copy-Item $cfg $backup
        try { $data = Get-Content $cfg -Raw -Encoding UTF8 | ConvertFrom-Json }
        catch {
            Say "  [!] Existing config is not valid JSON. Backup: $backup" 'Yellow'
            $data = $null
        }
    }
    if (-not $data) { $data = [pscustomobject]@{} }
    if (-not $data.PSObject.Properties['mcpServers']) {
        $data | Add-Member -NotePropertyName mcpServers -NotePropertyValue ([pscustomobject]@{})
    }

    # @latest is the entire point: npx re-resolves it on every launch, so a new
    # publish reaches the student on their next restart with no reinstall.
    $entry = [pscustomobject]@{ command = 'npx'; args = @('-y', "$PKG@latest") }
    if ($data.mcpServers.PSObject.Properties[$NAME]) { $data.mcpServers.$NAME = $entry }
    else { $data.mcpServers | Add-Member -NotePropertyName $NAME -NotePropertyValue $entry }

    $json = $data | ConvertTo-Json -Depth 10
    [System.IO.File]::WriteAllText($cfg, $json, (New-Object System.Text.UTF8Encoding $false))
    Say "  [ok] configured: $cfg" 'Green'
}

# --- 4. warm the npx cache ----------------------------------------------------
# In a job with a hard timeout, and never allowed to decide whether the install
# succeeded. Versions before 2.12.0 do not understand --version and would start the
# stdio server instead, waiting for input that never arrives - a hang here would
# look like a broken installer when the config is already written and correct.
Say ''
Say '  Downloading the server (once, up to a minute)...' 'Gray'
$job = Start-Job { param($p) & npx -y "$p@latest" --version 2>&1 } -ArgumentList $PKG
if (Wait-Job $job -Timeout 90) {
    $out = (Receive-Job $job | Select-Object -Last 1)
    if ($out -match 'sad-mcp@') { Say "  [ok] $out" 'Green' } else { Say '  [ok] ready' 'Green' }
} else {
    Say '  (it will download on your first question - this is fine)' 'Gray'
}
Stop-Job   $job -ErrorAction SilentlyContinue
Remove-Job $job -Force -ErrorAction SilentlyContinue

Say ''
Say '  --------------' 'Cyan'
Say '  Done. Now:' 'Cyan'
Say ''
Say '   1. Quit Claude Desktop completely' 'White'
Say '      (right-click the tray icon -> Quit, not just closing the window)' 'Gray'
Say '   2. Open it again' 'White'
Say '   3. Ask it:  what version of sad-mcp is running?' 'White'
Say ''
Say '  From now on it updates itself. You will not need to install again.' 'Green'
Say ''

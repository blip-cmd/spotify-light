==========================================================================
                     SPOTIFY-LIGHT - SPICETIFY THEME PROFILE
                                USER GUIDE
==========================================================================

Thank you for downloading Spotify-Light, a premium glassmorphic light theme
for your desktop Spotify client. Follow these simple steps to apply the theme
manually to your PC.

--------------------------------------------------------------------------
PREREQUISITES: Standalone Desktop Spotify (Non-Windows Store App)
--------------------------------------------------------------------------
Spicetify cannot patch Microsoft Store packages. If you are using the UWP
Store app, follow these steps first:

1. Open PowerShell and run:
   Get-AppxPackage *SpotifyMusic* | Remove-AppxPackage

2. Download and silently install the official desktop standalone client:
   Invoke-WebRequest -Uri "https://download.spotify.com/SpotifyFullSetup.exe" -OutFile "SpotifyFullSetup.exe"; .\SpotifyFullSetup.exe /silent

3. Install Spicetify-cli by running:
   iwr -useb https://raw.githubusercontent.com/spicetify/cli/main/install.ps1 | iex

--------------------------------------------------------------------------
THEME APPLICATION INSTRUCTIONS (Offline Manual Package)
--------------------------------------------------------------------------
Once the standalone Spotify client and Spicetify-cli are set up:

1. Locate your Spicetify Themes folder. In PowerShell, you can find/open
   it using:
   explorer "$env:APPDATA\spicetify\Themes"

2. Create a new folder named "Spotify-Light" inside that directory.

3. Extract the contents of this ZIP file ("color.ini", "user.css", and
   "README.txt") directly into your newly created "Spotify-Light" folder.

4. Open PowerShell and run the following commands to configure and apply 
   the theme:
   spicetify config current_theme Spotify-Light color_scheme light
   spicetify apply

--------------------------------------------------------------------------
SUPPORT & LICENSE
--------------------------------------------------------------------------
- Licensed under the GNU GPLv3 Copyleft license.
- Visit the public GitHub repository to open issues or contribute:
  https://github.com/blip-cmd/spotify-light
- Visit our Live Website:
  https://spotify-light-eight.vercel.app

Enjoy the modern lavender light mode aesthetic! 💜
==========================================================================

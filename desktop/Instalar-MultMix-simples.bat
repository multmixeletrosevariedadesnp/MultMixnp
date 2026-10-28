@echo off
setlocal
rem MultMix - instalador simples (sem programa extra): cria atalhos na area de trabalho que abrem
rem o Sistema, o Catalogo e/ou o PDV como aplicativo, no Chrome ou Edge. O cupom sai DIRETO na
rem impressora padrao do Windows (deixe a termica como impressora padrao). Funciona sem internet
rem depois da primeira abertura com internet.
set "BASE=https://multmixeletrosevariedadesnp.github.io/MultMixnp/"
set "BROWSER="
for %%P in ("%ProgramFiles%\Google\Chrome\Application\chrome.exe" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" "%LocalAppData%\Google\Chrome\Application\chrome.exe" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe") do if not defined BROWSER if exist %%P set "BROWSER=%%~P"
if not defined BROWSER (
  echo Nao encontrei o Google Chrome nem o Microsoft Edge neste computador.
  echo Instale o Chrome e rode este arquivo de novo.
  pause
  exit /b 1
)
echo.
echo  MultMix - o que voce quer neste computador?
echo.
set "A="
set "B="
set "C="
set /p A=" Instalar o PDV do vendedor? (S/N): "
set /p B=" Instalar o Sistema da loja (administrador)? (S/N): "
set /p C=" Instalar o Catalogo? (S/N): "
if /i "%A%"=="S" call :mk "MultMix PDV" "pdv/" "pdv"
if /i "%B%"=="S" call :mk "MultMix Sistema" "sistema/" "sistema"
if /i "%C%"=="S" call :mk "MultMix Catalogo" "catalogo/" "catalogo"
echo.
echo Pronto. Abra o atalho na area de trabalho. Na primeira vez precisa de internet.
echo Dica: deixe a impressora do cupom como "Impressora padrao" do Windows.
pause
exit /b 0

:mk
set "VBS=%TEMP%\mmlnk.vbs"
> "%VBS%" echo Set s = CreateObject("WScript.Shell")
>> "%VBS%" echo Set l = s.CreateShortcut(s.SpecialFolders("Desktop") ^& "\%~1.lnk")
>> "%VBS%" echo l.TargetPath = "%BROWSER%"
>> "%VBS%" echo l.Arguments = "--kiosk-printing --app=%BASE%%~2 --user-data-dir=""%LocalAppData%\MultMix\%~3"""
>> "%VBS%" echo l.Description = "%~1"
>> "%VBS%" echo l.Save
cscript //nologo "%VBS%"
del "%VBS%" >nul 2>&1
echo  Atalho criado: %~1
exit /b 0

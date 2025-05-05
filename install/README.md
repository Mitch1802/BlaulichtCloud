# Workflow ab BlaulichtCloud V1.0.0

Schritt 1: Herunterladen des Install/Update Skriptes
```
curl -sSL -o app_manager.sh "https://raw.githubusercontent.com/Mitch1802/BlaulichtCloud/main/install/app_manager.sh"
```
Schritt2: Schreibrechte vergeben
```
chmod +x app_manager.sh
```
Schritt3 Var1: Installationskript ausführen mit übergebenen Version, Domain, Port
```
./app_manager.sh install 1.0.0 blaulichtcloud.michael-web.at
```
Schritt3 Var2: Updateskript ausführen mit übergebenen Version
```
./app_manager.sh update 1.0.0 
```

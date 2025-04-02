# Workflow ab BlaulichtCloud V1.0.0

Schritt 1: Verhindere das Token im History Log landen
```
unset HISTFILE
```
Schritt2: Setze die Umgebungsvaribalen für den Zugriff auf die Repos
```
export GITHUB_TOKEN="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"
export DOCKER_TOKEN="dckr_pat_4_cVZgoCf_1l0YatblpjAsWa68A"
```
Schritt3: Herunterladen des Install/Update Skriptes
```
curl -sSL -H "Authorization: token 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" -o app_manager.sh "https://raw.githubusercontent.com/Mitch1802/BlaulichtCloud/main/install/app_manager.sh"
```
Schritt4: Schreibrechte vergeben
```
chmod +x app_manager.sh
```
Schritt5 Var1: Installationskript ausführen mit übergebenen Version, Domain, Port
```
./app_manager.sh install 1.0.0 blaulichtcloud.michael-web.at
```
Schritt5 Var2: Updateskript ausführen mit übergebenen Version
```
./app_manager.sh update 1.0.0 
```

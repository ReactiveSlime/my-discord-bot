## How to run

First of all clone the repo and find a host you can host this your self or pay for hosting

## Needed Plugins and Systems
Minecraft [ServerTap](https://servertap.io)

## Config
Rename or copy the config-template.json file and name it config.json

```json
{
    "token": "",// you discord bots token
    "prefix": "",// your bots token
    "url": "",// the URL for your API
    "key":"",// your password you set in ServerTap plugin config file
    "world_uuid":"",// the UUID on The world can get from ServerTap endpoint (optional)
    "world_nether":"",// the UUID on The Nether can get from ServerTap endpoint (optional)
    "world_the_end":"",// the UUID on The End can get from ServerTap endpoint (optional)
    "developerid": ["", ""],// your discord ID
    "server_ip": "",// your MC server IP (optional)
    "rcon_port": "",// your MC server Rcon port (optional)
    "rcon_pw": ""// your MC server Rcon password (optional)
}
```

## How to use

if all working you can go to the URL http://YOUR-SERVER-IP:4567/swagger
this should take you so the Endpoints site for everything the API can do

## License
[GPL](https://www.gnu.org/licenses/gpl-3.0.en.html)

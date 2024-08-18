# well Come To Ghorer Bazar

* live link : https://ghorer-bazar.web.app/
* client site github : https://github.com/Masudur400/ghorer-bazar-client
* server site github : https://github.com/Masudur400/ghorer-bazar-server



# impotent for server
{
    "version": 2,
    "builds": [
      {
        "src": "index.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "index.js",
        "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
      }
    ]
  }
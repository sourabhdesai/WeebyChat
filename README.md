# WeebyChat
This is a basic web-chat app made for the Weeby coding challenge.

The basic idea is that you can share a simple link to your chatroom and start talking. This is the same idea as the appear.in video chat service.

You can visit a chatroom by just typing the url `/chat/<roomname>`. If it doesn't already exist, it will be created.

## Instructions
Running this on your local machine should be straightforward. Here are the steps:

- Install latest verion of `node`
  - My machine has `v4.0.0`
- Install `grunt` with `npm install -g grunt-cli`
- `cd` into project's root directory *(same level as package.json)*
- run webapp with `grunt serve`
  - This should start the Web App server on port `9000` and also open the web page on your browser.

# WRI-back-nodejs

Back-end application of WRI app system. This is the API system, there is no authentification needed to connect to the system, you just have to download the API and launch it.

## Requirements

To download the API you must have some requirements installed on your device:

- NodeJS - Version 7.*
- NPM - Last Version
- Visual Studio Code
- Postman to test routes (By downloading files on [link]())

## Download

To download the API, git clone the project:

```shell
git clone https://github.com/WebResearchIntegration/WRI-back-nodejs.git
```

## Install

To install all the depedencies needed for the project, you must execute the following command lines:

```shell
sudo npm install
```

## Launch the project

To launch the project, install nodemon in global on your machine.

```shell
sudo npm instlal -g nodemon
```

And next to launch the program:

```shell
nodemon server.js
```

**Now the app is available on port http://localhost:3000.**

## Deploy the app

[NOT YET IMPLEMENTED]


---

# API - Usage

We work in an API system. In this API no need to use a token or auth service. You can directly use the API.
Here are the routes you can work with:

1. ARTICLES
    1. Relationships
1. NOTES
1. QUESTIONS
1. AUTHORS
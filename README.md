# ARIA: Accessible Refugee Information Assistant




https://github.com/geraldyywang/ARIA/assets/152770271/adba8220-f923-44e3-b6f9-4f6687e2dacb
![aria phones (1)](https://github.com/geraldyywang/ARIA/assets/152770271/2c2c4ed8-fc44-4e01-9c86-f3da7e35dfe5)
![Architecture (1)](https://github.com/geraldyywang/ARIA/assets/152770271/88a32b2d-93da-4f68-9f6e-4d0443abc3f9)

Accessible Refugee Information Assistant. Helping refugees understand the claimant process in Canada, with the help of a multilingual voice assistant, and fine tuned large language model.

## Table of Contents

- ARIA: Accessible Refugee Information Assistant
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
  - [License](#license)

## Introduction

Provide a more detailed introduction to your project here. Explain its motivation, background, and any relevant information that users or contributors might need to know.

## Features

List the main features of your project. This could include functionalities, tools, technologies, or anything else that sets your project apart.

## Installation

Prerequisites: 
1. Google ADC authentication
2. Google Cloud Platform project with TTS and Translation APIs enabled
3. OpenAI key
   
Dependencies:
1. Node.js
2. [Expo](https://docs.expo.dev/get-started/installation/)
3. ts-node
   
Setup requirements:
1. Create 2 .env files, one in /backend and one in /frontend/aria. In both, create an environment variable named ```OPENAI_API_KEY``` and set it to your OpenAI key. In the backend, move your GCP project key to the root folder, name it "aria_google.json" and set up the environment variable ```GOOGLE_APPLICATION_CREDENTIALS='aria_google.json'```. In the frontend, create and set ```BACKEND_URL``` to your IPv4 address at port 3000.

```bash
# Installation steps
git clone https://github.com/geraldyywang/ARIA.git
cd ARIA/frontend/aria
npm install
cd ..
cd ..
cd backend
yarn install

```
```bash
# Running in dev
# in frontend/aria
npx expo start
# in backend
npm run dev
```

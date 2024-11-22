# Sportify

![](./sportify/public/logo.png#pic_left)

## Screenshot

![](./sportify/public/post.png)

## Project Description
In alignment with Singapore's Smart Nation Movement, Sportify is an innovative application designed to revolutionize the way individuals engage in fitness activities, directly catering to people who are interested in keeping fit in Singapore.

Sportify aims to leverage publicly available government data to promote an active lifestyle by providing users with real-time information on weather conditions, and transportation options for sports locations.

By offering recommendations, Sportify seeks to enhance user convenience and promote regular exercise.

## Set Up Instruction

#### Skeleton

- Front-end framework: React
- Back-end framework: Firebase (BaaS)

The project directory is under the [./sportify](./sportify) folder. The file structure of the project is shown as follow:

```powershell
└── sportify
	├── .env
    ├── README.md
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── processCSV.py
    ├── processLocationType.py
    ├── public
    ├── removeDup.py
    ├── requirements.txt
    └── src
        ├── App.js
        ├── App.test.js
        ├── assets
        ├── components
        ├── contextProviders
        ├── data
        ├── helperFunctions
        ├── index.js
        ├── pages
        ├── reportWebVitals.js
        └── setupTests.js
```

Note that here is a `.env` file under the directory. It is only for demonstration purpose only, since it contains the [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) we need. In order to successfully run the project, you need to create and replace with your own API key by overwriting: 

```
REACT_APP_GOOGLE_MAPS_API_KEY=[YOUR_API_KEY_HERE]
```

In order to run the project, you need to run the following commands:

1. Clone the repository:

   ```powershell
   git clone https://github.com/StevenShen3641/2006-SCEC-HAAGEN-DAZ
   ```

2. Go to the project directory:

   ```powershell
   cd sportify
   ```

3. Install dependencies (need to force installation):

   ```powershell
   npm install --force
   ```

4. Start the app in the development mode:

   ```powershell
   npm start
   ```

## Web App Demo

[Click here to see the demo!](https://youtu.be/couJMGCY0mY)

## Contributors


- [@GeneralR3d](https://github.com/GeneralR3d)
- [@randallctc](https://github.com/randallctc)
- [@StevenShen3641](https://github.com/StevenShen3641)
- [@potatopotati](https://github.com/potatopotati)
- [@nk714-sd](https://github.com/nk714-sd)


# MapMyPlaces

## Description

MapMyPlaces is a full-stack MERN application that allows users to explore and save their favorite places on a map.  
The app features an interactive map with custom pins, a list view of all saved places, and the option to add new places  
by providing location details (name, latitude, longitude, and description).  

## Table of Contents

- [Features](#features)
- [Technologies Used](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Status](#project-status)
- [Future Improvements](#future-improvements)
<!-- - [Screenshots](#screenshots) -->
<!-- - [Acknowledgements](#acknowledgements) -->
<!-- - [Contact](#contact) -->

## Features

✅ Interactive map with custom location pins.  
✅ View and manage a list of saved places.  
✅ Add new places with location details and descriptions.  
✅ User authentication (optional) to save places.  

## Tech Stack

🖥️ **Frontend**: React.js (Vite, Bootstrap, Leaflet.js for maps)  
🖥️ **Backend**: Node.js, Express.js  
💾 **Database**: MongoDB (via Mongoose)  
☁️ **Cloud Services**: AWS S3 (for image storage)  

## Installation

### Prerequisites  
Ensure you have the following installed:  
- **Node.js** (v18+) → [Download Node.js](https://nodejs.org/)  
- **MongoDB** (local or cloud-based like [MongoDB Atlas](https://www.mongodb.com/atlas))  
- **Git**  

### Steps to Set Up the Project  

1️⃣ **Clone the repository**  
```sh
git clone https://github.com/your-username/MapMyPlaces.git
cd MapMyPlaces/Backend
cd MapMyPlaces/Frontend
```

2️⃣ **Install dependencies for FE and BK**  
```sh
npm install
```

3️⃣ **Set up environment variables**  
Create a `.env` file in the root directory and add the following for Frontend and Backend:
```env
PORT=your-prefered-port
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=prefered-time
JWT_REFRESH_EXPIRES_IN=prefered-expiry

AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=prefered-aws-region
AWS_BUCKET_NAME=your-bucket-name

SALT_ROUNDS=your-prefered-number-of-salt

```

3️⃣ **Run the development server**  
```sh
npm run dev
```

## Future Improvements

Planned roadmap:

- Create basic Homepage Layout - DONE
- Set Sections for Main Map and List of Places Below - DONE
- Refactor App.jsx to Components - DONE
- Switch/Connect LeafLet Maps / Geocoding API - REVERTED
- Set Listener to retrieve coordinates data - DONE
- Integrate Google Maps API for place Name search - DONE
- Make Adding New Places functionality - DONE
- Make Fav Places Functionality - IN PROGRESS
- Add Places details - DONE
- Add Authentication - IN PROGRESS
- Add page for User Fav Maps
- Think of Map Layers and other features to implement



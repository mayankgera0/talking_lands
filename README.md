# React Mapping App

An interactive map application built with React that displays Indian cities and states using GeoJSON data. Users can view details about cities and states by clicking on map markers and polygons.

## Features

- Interactive map with clickable city markers and state polygons
- Sidebar displays details about selected features or clicked locations
- Loads GeoJSON data for points (cities) and polygons (states) from the `public/data` folder
- Shows loading indicators while fetching data

## Folder Structure

```
react-mapping-app/
├── public/
│   └── data/
│       ├── points.geojson
│       └── polygons.geojson
├── src/
│   ├── components/
│   │   ├── MapView.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── FeatureCard.jsx
│   │   ├── StatusCard.jsx
│   │   ├── ClickCard.jsx
│   │   └── WelcomeCard.jsx
│   ├── styles/
│   │   └── App.css
│   └── App.jsx
└── README.md
```

## Getting Started

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Start the development server:**
   ```
   npm start
   ```

3. **Open your browser:**  
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Data Files

- Place your GeoJSON files in `public/data/points.geojson` and `public/data/polygons.geojson`.
- The app fetches these files at runtime.

## Customization

- To add more cities or states, edit the respective GeoJSON files
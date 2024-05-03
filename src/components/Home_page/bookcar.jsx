import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DistanceMatrixService, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './bookcar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Bookcar = () => {
  const [selectedCar, setSelectedCar] = useState('');
  const [location, setLocation] = useState(null);
  const [locationAddress, setLocationAddress] = useState('');
  const [destination, setDestination] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [distance, setDistance] = useState('');
  const [price, setPrice] = useState('');
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const navigate = useNavigate();
  const axios = require('axios').default;

  const handleCarButtonClick = (brand) => {
    setSelectedCar(brand);
  };

  const [mapClicked, setMapClicked] = useState(false);

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    if (!selectedLocation) {
      setSelectedLocation({ lat, lng });
      getAddressFromLatLng(lat, lng)
        .then((address) => setLocationAddress(address)) // This is the correct function
        .catch((error) => console.error('Error getting location address:', error));
    } else if (!destination) {
      setDestination({ lat, lng });
      getAddressFromLatLng(lat, lng)
        .then((address) => setDestinationAddress(address)) // This is for destination
        .catch((error) => console.error('Error getting destination address:', error));
    }
    setMapClicked(true);
  };

  const handleReset = () => {
    setLocation(null);
    setLocationAddress('');
    setDestination(null);
    setDestinationAddress('');
    window.location.reload();
  };

  const getAddressFromLatLng = (lat, lng) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      const latLng = new window.google.maps.LatLng(lat, lng);
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject(new Error('No address found'));
          }
        } else {
          reject(new Error(`Geocoder failed due to: ${status}`));
        }
      });
    });
  };

  const calculateDistance = () => {
    if (selectedLocation && destination) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [selectedLocation],
          destinations: [destination],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === 'OK') {
            const result = response.rows[0].elements[0];
            setDistance(result.distance.text); // Save the distance in state
            const distanceInMeters = result.distance.value; // Get the distance in meters
            let calculatedPrice = calculatePrice(distanceInMeters); // Calculate the base price
            calculatedPrice = calculateBrandPrice(selectedCar, calculatedPrice); // Adjust price based on the selected car
            setPrice(calculatedPrice.toFixed(2)); // Save the price in state
            console.log("Calculated Distance:", result.distance.text); // Log the distance for debugging
            console.log("Calculated Price:", calculatedPrice); // Log the price for debugging
          } else {
            console.error('Error with DistanceMatrixService:', status);
          }
        }
      );
    }
  };

  const calculatePrice = (distanceMeters) => {
    const baseFare = 30; // Base fare for the first 2 km
    const ratePer200m = 1.9; // Rate for every subsequent 200 meters
    const baseDistance = 2000; // Base distance for the base fare (2 km in meters)
    const rateDistance = 200; // Distance increment for the rate (200 meters)

    if (distanceMeters <= baseDistance) {
      return baseFare;
    } else {
      const additionalDistance = distanceMeters - baseDistance;
      const additionalFareIncrements = Math.ceil(additionalDistance / rateDistance);
      const additionalFare = additionalFareIncrements * ratePer200m;
      return baseFare + additionalFare;
    }
  };

  const brandMultiplier = {
    brand1: 1.0,
    brand2: 1.75,
    brand3: 2.25,
    brand4: 45.0,
  };

  const calculateBrandPrice = (selectedCar, basePrice) => {
    const multiplier = brandMultiplier[selectedCar] || 1.0;
    return basePrice * multiplier;
  };

  const fetchDirections = (origin, destination) => {
    if (!origin || !destination) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  useEffect(() => {
    if (selectedLocation && destination) {
      fetchDirections(selectedLocation, destination);
    }
  }, [selectedLocation, destination]);

  useEffect(() => {
    calculateDistance();
  }, [selectedLocation, destination, selectedCar]);



  useEffect(() => {
    // Get user's location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);


  const handleSubmit = async () => {
    const postData = {
      locationAddress,
      destinationAddress,
      price
    };

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      console.log(`Selected car brand: ${selectedCar}`);
      console.log('Location:', location);
      console.log('Destination:', destination);
      console.log('Price', price)

      navigate(`/payment?price=${price}`);
    } else {
      throw new Error('Failed to submit order');
    }
  };

  const handleLocationChange = (event) => {
    setLocationAddress(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestinationAddress(event.target.value);
  };


  return (
    <>
      <h1 className='Bookcar_header'>Book A Transportation For Your Journey</h1>
      <div className='bookcarpage'>
        <div className='bookcar-container1'>
          <div className='boxforapi'>
            {userLocation && (
              <GoogleMap
                onClick={handleMapClick}
                center={userLocation}
                zoom={13}
                mapContainerStyle={{ height: '100%', width: '100%' }}
              >
                {mapClicked && selectedLocation && (
                  <Marker
                    position={selectedLocation}
                    icon={{
                      url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}
                  />
                )}
                {mapClicked && destination && (
                  <Marker
                    position={destination}
                    icon={{
                      url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}
                  />
                )}
                {directionsResponse && (
                  <DirectionsRenderer
                    directions={directionsResponse}
                  />
                )}
              </GoogleMap>
            )}
          </div>
          <div className='inputlocations'>
            <p>Location:</p>
            <input
              type="text"
              placeholder="Enter location"
              value={locationAddress}
              onChange={handleLocationChange}
              style={{ color: 'black' }}
            />
            <p>Destination:</p>
            <input
              type="text"
              placeholder="Enter destination"
              value={destinationAddress}
              onChange={handleDestinationChange}
              style={{ color: 'black' }}
            />

          </div>
          <div className='book-btn-group'>
            <button className='Payment' onClick={handleSubmit}>To Payment</button>
            <button className='Reset' onClick={handleReset}>Reset</button>
          </div>
        </div>
        <div className='bookcarbtn'>
          <div id="carButtons">
            <button
              className={`car-button ${selectedCar === 'brand1' ? 'selected' : ''}`}
              onClick={() => handleCarButtonClick('brand1')}
            >
              <img src={'image/car1.jpg'} alt="4 person car" className='bookbtn-img' />
              4 Person Car
            </button>
            <button
              className={`car-button ${selectedCar === 'brand2' ? 'selected' : ''}`}
              onClick={() => handleCarButtonClick('brand2')}
            >
              <img src={'/image/car2.jpg'} alt="6 person car" className='bookbtn-img' />
              6 Person Car
            </button>
            <button
              className={`car-button ${selectedCar === 'brand3' ? 'selected' : ''}`}
              onClick={() => handleCarButtonClick('brand3')}
            >
              <img src={"/image/car3.png"} className='bookbtn-img' />
              Sports Car
            </button>
            <button
              className={`car-button ${selectedCar === 'brand4' ? 'selected' : ''}`}
              onClick={() => handleCarButtonClick('brand4')}
            >
              <img src={'/image/bus.png'} className='bookbtn-img' />
              Bus
            </button>
          </div>
          <div className='price'>Price: ${price}</div>
          <div className='distance'>
            Distance: {distance ? distance : 'Unknown'}
          </div>
        </div>
      </div>
    </>
  );
};
export default Bookcar;
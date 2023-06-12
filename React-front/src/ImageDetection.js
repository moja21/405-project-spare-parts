import React, { useState } from 'react';
import axios from 'axios';
import './ImageDetection.css';
const ImageDetection = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [apiImage, setApiImage] = useState(null);
  const [detections, setDetections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const options = {
    method: 'POST',
    url: 'https://vehicle-damage-assessment.p.rapidapi.com/run',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '1827ee75a6msh688da8bb5d1d46fp17d3bejsn9020a7831e64',
      'X-RapidAPI-Host': 'vehicle-damage-assessment.p.rapidapi.com'
    },
    data: {
      draw_result: true,
      remove_background: false,
      image: imageUrl
    }
  };

  const performImageDetection = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.request(options);
      const { output } = response.data;
      setDetections(output.elements);
      setApiImage(response.data.output_url);
    } catch (error) {
      console.error('Error detecting image:', error);
      setErrorMessage('An error occurred while detecting the image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetectClick = () => {
    if (imageUrl) {
      setUserImage(imageUrl);
      performImageDetection();
    } else {
      setErrorMessage('Please enter a valid image URL.');
    }
  };

  const handleInputChange = (event) => {
    setImageUrl(event.target.value);
  };

  return (
    <div className="image-detection-container">
      <input
        type="text"
        value={imageUrl}
        onChange={handleInputChange}
        placeholder="Image URL"
        className="image-input"
      />
      <button onClick={handleDetectClick} className="detect-button">
        Detect
      </button>

      {isLoading && <p>Connecting to API...</p>}

      {userImage && (
        <div>
          <h2>User Image:</h2>
          <img src={userImage} alt="User" className="image-preview" />
        </div>
      )}

      {apiImage && (
        <div>
          <h2>API Result Image:</h2>
          <img src={apiImage} alt="API Result" className="image-preview" />
        </div>
      )}

      {errorMessage && <p>{errorMessage}</p>}

      {detections.length > 0 ? (
        <div>
          <h2>Image Detections:</h2>
          <ul>
            {detections.map((element, index) => (
              <li key={index}>
                <p>Bounding Box: {element.bbox}</p>
                <p>Damage Category: {element.damage_category}</p>
                <p>Damage Location: {element.damage_location}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No detections found.</p>
      )}
    </div>
  );
};

export default ImageDetection;

import { useState } from "react";

import { useHistory } from "react-router-dom";

const Create = () => {
  const [car_manufacture, setCar_manufacture] = useState('');
  const [type, setType] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [spare_part, setSpare_part] = useState('');
  const [extra_details, setExtra_details] = useState('');
  const [price_range, setPrice_range] = useState('');
  
  const url = 'https://spare-parts-php.herokuapp.com/create_order.php';
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("userid")
    console.log(user_id)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, car_manufacture, type, model, year, spare_part, extra_details, price_range }),
      });

      
      if (response.ok) {
        console.log('Data posted successfully!');
        history.go(-1);
      } else {
        console.error('Error posting data to the PHP API');
      }

    } catch (error) {
      console.error('Error:', error);
    }

  };
  return (
    
    <div className="create">
      <h2>Create New Order</h2>
      <form onSubmit={handleSubmit}>
        <label>Car Manufacture</label>
        <input
          type="text"
          required
          value={car_manufacture}
          onChange={(e) => setCar_manufacture(e.target.value)}
        />
        <label>Type</label>
        <input
          type="text"
          required
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <label>Model</label>
        <input
          type="text"
          required
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <label>Year</label>
        <input
          type="text"
          required
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <label>Spare part</label>
        <input
          type="text"
          required
          value={spare_part}
          onChange={(e) => setSpare_part(e.target.value)}
        />
        <label>Extra details</label>
        <textarea
          required
          value={extra_details}
          onChange={(e) => setExtra_details(e.target.value)}
        ></textarea>
        <label>Price range (eg 1000-1500)</label>
        <input
          type="text"
          required
          value={price_range}
          onChange={(e) => setPrice_range(e.target.value)}
        />
        <button>Submit Order</button>

      </form>
    </div>
  );
}

export default Create;
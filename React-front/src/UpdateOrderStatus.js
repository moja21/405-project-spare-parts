import React, { useState } from 'react';

const UpdateOrderStatus = ({ orderId }) => {
  const [newStatus, setNewStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleStatusUpdate = async () => {
    const url = 'https://spare-parts-php.herokuapp.com/update_status.php';
   
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id:orderId,new_status:newStatus }),
      });
      
      if (response.ok) {
        const responseData = await response.json();
        window.location.reload(true)
        setMessage(response);
        
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setMessage('Failed to update order status.');
    }
  };

  return (
    <div className='update-status'>
      <div>
        <label htmlFor="status-select">Update Status:</label>
        <select id="status-select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
          <option value="">Select status</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="closed">Closed</option>
          <option value="canceled">Canceled</option>
          <option value="on_hold">On Hold</option>
        </select>
        <button disabled={!newStatus} onClick={handleStatusUpdate}>
          Update
        </button>
      </div>
      
    </div>
  );
};

export default UpdateOrderStatus;

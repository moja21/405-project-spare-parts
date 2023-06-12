import React, { useEffect, useState } from 'react';
import UpdateOrderStatus from './UpdateOrderStatus';

const UserOrders = () => {
  const [orderdata, setOrderdata] = useState(null);
  const url = 'https://spare-parts-php.herokuapp.com/user_orders.php';

  useEffect(() => {
    const fetchData = async () => {
      const user_id = localStorage.getItem('userid');

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id }),
        });

        if (response.ok) {
          const responseData = await response.json();
          const { data } = responseData;
          setOrderdata(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {orderdata ? (
        <div>
          <div className="user_Orders">
            <h2>Total Orders: {orderdata.length}</h2>
          </div>

          {orderdata.map((order) => (
            <div className="OrderPreview" key={order.id}>
              <h2>Order Number {order.id}</h2>
              <p>Type: {order.type}</p>
              <p>Model: {order.model}</p>
              <p>Spare part: {order.spare_part}</p>
              <p>Created at: {order.created_at}</p>
              <p>Status: {order.status}</p>
              <UpdateOrderStatus orderId={order.id} />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default UserOrders;

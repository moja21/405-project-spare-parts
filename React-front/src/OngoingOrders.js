import React, { useEffect, useState } from 'react';
import './ongoing.css';

const OngoingOrders = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const url = 'https://spare-parts-php.herokuapp.com/ongoing_orders.php';

  const fetchData = async (pageNumber) => {
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page: pageNumber }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { ongoing_orders, message } = responseData;

        if (message === 'No ongoing orders found.') {
          setData([]);
          setHasMore(false);
        } else {
          setData(ongoing_orders);
          setHasMore(true);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setIsLoading(false);
  };

  const loadMoreOrders = () => {
    if (isLoading || !hasMore) return;
    setPage((prevPage) => prevPage + 1);
  };

  const loadPreviousOrders = () => {
    if (isLoading || page <= 1) return;
    setPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div>
      <div className="Total_Orders">
        <h2>Total Orders: {data.length}</h2>
      </div>

      {data.length > 0 ? (
        <div>
          {data.map((order) => (
            <div className="OrderPreview" key={order.id}>
              <h2>Order Number {order.id}</h2>
              <p>Type: {order.type}</p>
              <p>Model: {order.model}</p>
              <p>Spare part: {order.spare_part}</p>
              <p>Created at: {order.created_at}</p>
              <p>Status: {order.status}</p>
              <p>Phone number: {order.phone_number}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}

      {isLoading && <p>Loading more orders...</p>}
      {!isLoading && !hasMore && (
        <p>No more orders to load. You are on the last page.</p>
      )}

      <div className="PaginationButtons">
        <button onClick={loadPreviousOrders} disabled={isLoading || page <= 1}>
          Previous Page
        </button>
        <p>Page: {page}</p>
        <button onClick={loadMoreOrders} disabled={isLoading || !hasMore}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default OngoingOrders;
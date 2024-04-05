import React, { useEffect, useState } from 'react'

export const Summary = () => {
  const [selectedMethod, setSelectedMethod] = useState<any>(null);

  useEffect(() => {
    const storedValue = localStorage.getItem('deliveryMethod');
    if (storedValue !== null) {
      setSelectedMethod(JSON.parse(storedValue));
    }
  }, []);

  return (
    <div>
      <h1>Summary</h1>
      <div>
        <p>{selectedMethod?.title}</p>
        <img src={selectedMethod?.icon} alt="" />
      </div>
    </div>
  )
}

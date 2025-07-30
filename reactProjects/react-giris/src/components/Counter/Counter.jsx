import { useState } from 'react';


function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Sayacım</h1>
      <h2>{count}</h2>
      <button onClick={handleIncrease}>Artır</button>
      <button onClick={handleDecrease}>Azalt</button>
      <button onClick={handleReset}>Sıfırla</button>
    </div>
  );
}

export default Counter;

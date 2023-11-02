import { useState, useEffect } from 'react';

function ButtonError() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (count === 2) {
      throw new Error('The error button has been clicked!');
    }
  }, [count]);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <button className="error-button" onClick={handleClick}>
      Throw Error
    </button>
  );
}

export default ButtonError;

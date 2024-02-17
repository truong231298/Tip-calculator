import iconDolla from '/images/icon-dollar.svg';
import iconUser from '/images/icon-person.svg';
import iconLogo from '/images/logo.svg';
import { useState } from 'react';

export default function App() {
  const [val, setVal] = useState('');
  const [number, setNumber] = useState('');
  const [tip, setTip] = useState('0.00');
  const [total, setTotal] = useState('0.00');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // Update the state based on the input name
    if (name === 'bill') {
      setVal(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleTipButtonClick = (percentage) => {
    if (number.trim().length === 0) {
      setError(true);
    } else {
      setError(false);

      const tipAmount = (parseFloat(val) * percentage) / 100;
      const tipPerPerson = tipAmount / parseFloat(number || 1);

      setTip(tipPerPerson.toFixed(2));
      setTotal(((parseFloat(val) + tipAmount) / parseFloat(number || 1)).toFixed(2));
    }
  };

  const handleCustomTip = () => {
    const customTipPercentage = prompt("Enter custom tip percentage:");
    if (customTipPercentage !== null && !isNaN(customTipPercentage)) {
      handleTipButtonClick(parseFloat(customTipPercentage));
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setTip('0.00');
    setTotal('0.00');
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-Light-grayish-cyan">
      <img src={iconLogo} alt="" className="mb-8" />
      <section className="sm:max-w-xl bg-White flex flex-col sm:flex-row rounded-lg p-4">

        {/* Info Bill */}
        <div className="flex flex-col w-72 gap-1 p-2">
          <h1>Bill</h1>
          <div>
            <input
              type="text"
              name="bill"
              value={val}
              onChange={handleChange}
            />
            <span className="flex justify-between items-center -mt-10 p-2 -z-1">
              <img src={iconDolla} alt="" />
              <p className={val.trim().length === 0 ? 'text-xl text-Light-grayish-cyan italic' : 'hidden'}>0</p>
            </span>
          </div>

          <h1>Select Tip %</h1>
          <div className="flex flex-row flex-wrap gap-2 font-semibold text-White my-4">
            {[5, 10, 15, 25, 50].map((percentage) => (
              <button key={percentage} onClick={() => handleTipButtonClick(percentage)}>
                {percentage}%
              </button>
            ))}
            <button className="bg-White text-gray-500 border-none" onClick={handleCustomTip}>
              Custom
            </button>
          </div>

          <span className="flex justify-between">
            <h1>Number of people</h1>
            {error && <p className="text-red-500 italic font-medium">can't be zero</p>}
          </span>

          <div>
            <input
              type="text"
              name="number"
              value={number}
              onChange={handleChange}
            />
            <span className="flex justify-between items-center -mt-10 p-2 -z-1">
              <img src={iconUser} alt="" />
              <p className={number.trim().length === 0 ? 'text-xl text-Light-grayish-cyan italic' : 'hidden'}>0</p>
            </span>
          </div>
        </div>

        {/* Account */}
        <div className="flex flex-col gap-4 w-72 p-4 bg-Very-dark-cyan rounded-lg">
          <div className="flex justify-between items-center">
            <span>
              <p>Tip Amount</p>
              <h1>/ person</h1>
            </span>
            <span className="text-Strong-cyan font-semibold text-4xl">${parseFloat(tip).toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span>
              <p>Total</p>
              <h1>/ person</h1>
            </span>
            <span className="text-Strong-cyan font-semibold text-4xl">${parseFloat(total).toLocaleString()}</span>
          </div>

          <button
            type="reset"
            onClick={handleReset}
            className="mt-36 font-semibold bg-Very-dark-cyan text-Grayish-cyan hover:bg-Strong-cyan"
          >
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}

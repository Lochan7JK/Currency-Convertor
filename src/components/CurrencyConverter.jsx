// src/components/CurrencyConverter.jsx

import {useEffect} from "react";
import {useState} from "react";
import CurrencyDropdown from "./Dropdown";
import {HiArrowsRightLeft} from "react-icons/hi2";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["INR", "EUR"]
  );

  // Currencies -> https://api.frankfurter.app/currencies
 //  Currencies -> https://api.frankfurter.dev/v1/currencies
  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.dev/v1/currencies");
      const data = await res.json();

      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error Fetching currencies: ", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

//   console.log(currencies);

  // Conversion -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        // `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();

      setConvertedAmount(data.rates[toCurrency]);
    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setConverting(false);
    }
  };

  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];

    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    } else {
      updatedFavorites.push(currency);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

     return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-cyan-900 p-4">
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-emerald-900 to-teal-700 p-4">

        

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 text-white">
        
        <h1 className="text-4xl font-bold text-center mb-2">
          Currency Converter
        </h1>

        <p className="text-center text-white/70 mb-8">
            Get Real-time exchange rates 
         </p>

        {/* Currency Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          
          <CurrencyDropdown
            favorites={favorites}
            currencies={currencies}
            title="From: "
            currency={fromCurrency}
            setCurrency={setFromCurrency}
            handleFavorite={handleFavorite}
          />

          {/* Swap Button */}
          <div className="flex justify-center pt-4 md:pt-0">
            <button
              onClick={swapCurrencies}
              className="bg-white/20 hover:bg-white/30 transition-all duration-300 p-4 rounded-full shadow-lg"
            >
              <HiArrowsRightLeft className="text-2xl" />
            </button>
          </div>

          <CurrencyDropdown
            favorites={favorites}
            currencies={currencies}
            title="To: "
            currency={toCurrency}
            setCurrency={setToCurrency}
            handleFavorite={handleFavorite}
          />
        </div>

        {/* Amount Input */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium">
            Amount:
          </label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-4 rounded-xl bg-white/20 border border-white/20 outline-none placeholder-white/60 text-white focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Convert Button */}
        <button
          onClick={convertCurrency}
          className={`w-full mt-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300
          bg-white text-teal-700 hover:scale-105 hover:shadow-xl
          ${converting ? "animate-pulse" : ""}
          `}
        >
          {converting ? "Converting..." : "Convert Currency"}
        </button>

        {/* Result */}
        {convertedAmount && (
          <div className="mt-8 bg-white/20 rounded-2xl p-6 text-center">
            <p className="text-lg text-white/70 mb-2">
              Converted Amount
            </p>

            <h2 className="text-4xl font-bold">
              {convertedAmount} {toCurrency}
            </h2>
          </div>
        )}
      </div>
    </div>
  );

};

export default CurrencyConverter;
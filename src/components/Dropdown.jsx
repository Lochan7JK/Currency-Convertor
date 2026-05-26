// /* eslint-disable react/prop-types */
// // src/components/Dropdown.jsx

import {HiOutlineStar, HiStar} from "react-icons/hi2";

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = "",
}) => {
  const isFavorite = (curr) => favorites.includes(curr);


   return (
    <div>
      <label className="block mb-2 text-sm font-medium text-white">
        {title}
      </label>

      <div className="relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/20 border border-white/20 text-white outline-none focus:ring-2 focus:ring-white appearance-none"
        >
          {favorites.map((fav) => (
            <option key={fav} value={fav} className="text-black">
              ⭐ {fav}
            </option>
          ))}

          {currencies
            .filter((c) => !favorites.includes(c))
            .map((curr) => (
              <option key={curr} value={curr} className="text-black">
                {curr}
              </option>
            ))}
        </select>

        {/* Favorite Button */}
        <button
          onClick={() => handleFavorite(currency)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
        >
          {isFavorite ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;



// import Select from "react-select";
// import { HiOutlineStar, HiStar } from "react-icons/hi2";

// const currencyToCountry = {
//   USD: "US",
//   INR: "IN",
//   EUR: "EU",
//   GBP: "GB",
//   JPY: "JP",
//   AUD: "AU",
//   CAD: "CA",
//   CNY: "CN",
//   CHF: "CH",
//   NZD: "NZ",
//   RUB: "RU",
//   SGD: "SG",
//   AED: "AE",
// };

// const CurrencyDropdown = ({
//   currencies,
//   currency,
//   setCurrency,
//   favorites,
//   handleFavorite,
//   title = "",
// }) => {

//   const isFavorite = favorites.includes(currency);

//   // Convert currencies into react-select options
//   const options = currencies.map((curr) => ({
//     value: curr,
//     label: (
//       <div className="flex items-center gap-3">
        
//         {/* FLAG */}
//         <img
//           src={`https://flagsapi.com/${
//             currencyToCountry[curr] || "US"
//           }/flat/64.png`}
//           alt={curr}
//           className="w-6 h-4 object-cover rounded-sm"
//         />

//         {/* Currency Code */}
//         <span>{curr}</span>

//         {/* Favorite Star */}
//         {favorites.includes(curr) && (
//           <span className="text-yellow-400">⭐</span>
//         )}
//       </div>
//     ),
//   }));

//   // Find currently selected option
//   const selectedOption = options.find(
//     (option) => option.value === currency
//   );

//   return (
//     <div>
//       {/* Label */}
//       <label className="block mb-2 text-sm font-medium text-white">
//         {title}
//       </label>

//       <div className="relative">

//         {/* React Select */}
//         {/* <Select
//           options={options}
//           value={selectedOption}
//           onChange={(selected) => setCurrency(selected.value)}

//           styles={{
//             control: (base) => ({
//               ...base,
//               background: "rgba(255,255,255,0.15)",
//               border: "1px solid rgba(255,255,255,0.2)",
//               backdropFilter: "blur(10px)",
//               padding: "8px",
//               borderRadius: "16px",
//               boxShadow: "none",
//             }),

//             menu: (base) => ({
//               ...base,
//               background: "#1e1e2f",
//               color: "white",
//               borderRadius: "12px",
//               overflow: "hidden",
//             }),

//             singleValue: (base) => ({
//               ...base,
//               color: "white",
//             }),

//             option: (base, state) => ({
//               ...base,
//               backgroundColor: state.isFocused
//                 ? "#4338ca"
//                 : "#1e1e2f",
//               color: "white",
//               padding: 12,
//               cursor: "pointer",
//             }),
//           }}
//         /> */}


//         <Select
//           options={currencies.map((curr) => ({
//             value: curr,
//             label: curr,
//           }))}

//           value={{
//             value: currency,
//             label: currency,
//           }}

//           onChange={(selected) => setCurrency(selected.value)}

//           formatOptionLabel={(option) => (
//             <div className="flex items-center gap-3">

//               {/* FLAG */}
//               <img
//                 src={`https://flagsapi.com/${
//                   currencyToCountry[option.value] || "US"
//                 }/flat/64.png`}
//                 alt={option.value}
//                 className="w-7 h-5 rounded-sm object-cover"
//               />

//               {/* Currency Code */}
//               <span>{option.value}</span>

//               {/* Favorite */}
//               {favorites.includes(option.value) && (
//                 <span className="text-yellow-400">⭐</span>
//               )}
//             </div>
//           )}

//           styles={{
//             control: (base) => ({
//               ...base,
//               background: "rgba(255,255,255,0.12)",
//               border: "1px solid rgba(255,255,255,0.15)",
//               backdropFilter: "blur(12px)",
//               borderRadius: "16px",
//               padding: "6px",
//               minHeight: "58px",
//               boxShadow: "none",
//               color: "white",
//             }),

//             menu: (base) => ({
//               ...base,
//               background: "#131a36",
//               borderRadius: "14px",
//               overflow: "hidden",
//             }),

//             option: (base, state) => ({
//               ...base,
//               background: state.isFocused
//                 ? "#243b73"
//                 : "#131a36",
//               color: "white",
//               padding: 14,
//               cursor: "pointer",
//             }),

//             singleValue: (base) => ({
//               ...base,
//               color: "white",
//             }),

//             input: (base) => ({
//               ...base,
//               color: "white",
//             }),
//           }}
//         />


//         {/* Favorite Button */}
//         <button
//           onClick={() => handleFavorite(currency)}
//           className="absolute right-12 top-1/2 -translate-y-1/2 text-xl text-yellow-300"
//         >
//           {isFavorite ? <HiStar /> : <HiOutlineStar />}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CurrencyDropdown;
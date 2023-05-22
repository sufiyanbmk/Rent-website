/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';

function Selector(props) {
  const {type,url,callback}= props
  const [text,settext]=useState('')
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      {type==="country"?setCountries(data.data):setCountries(data.states)}
      {settext(type==='country'?"Select Catagory":"Select Location")}
      });
  }, []);
  return (
    <div className="md:w-72 font-medium md:h-80">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          !selected && 'text-gray-700'
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + '...'
            : selected
            :text}
         
        <BiChevronDown size={20} className={`${open && 'rotate-180'}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? 'max-h-60' : 'max-h-0'
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder={type==='country'?"Enter the Catagory":"Enter the State"}
            className='placeholder:text-gray-700 p-2 outline-none'
          />
        </div>
        {countries.map((country) => (
          <li
            key={type==='country'?country.lastName:country.state_id}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              type==="country"?country.lastName?.toLowerCase() === selected?.toLowerCase() &&
            'bg-sky-600 text-white':country.state_name.toLowerCase() === selected?.toLowerCase() && 'bg-sky-600 text-white'
            }
            ${
              type==="country"?country?.lastName?.toLowerCase().startsWith(inputValue)
                ? 'block'
                : 'hidden':country.state_name?.toLowerCase().startsWith(inputValue)
                ? 'block': 'hidden'
            }`}
            onClick={() => {
              if (country?.lastName?.toLowerCase() !== selected.toLowerCase()) {
                type==="country"?setSelected(country?.lastName):setSelected(country.state_name)               
                setOpen(false);
                callback(type==="country"?country?.lastName:country.state_name)
                setInputValue();
              }
            }}
          >
            {type==="country"?country.firstName:country.state_name}
           </li>
          // <li>{type==="country"?country.lastName:country.state_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
import React, { useState, useEffect } from 'react';


function MyDropdown() {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/data');
        const data = await response.json();
        setOptions(data); // expecting: [{ LookupType: "AddressType" }, ...]
        console.log("Fetched data:", data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    const fetchData = async () => {
      try {
        //let selectedValue = 'HAL'
        const response = await fetch('http://localhost:5001/api/detailsData?id='+event.target.value);
        const data = await response.json();
        setData(data); // expecting: [{ LookupType: "AddressType" }, ...]
        console.log("selectedValue:", event.target.value)
        console.log("Fetched data:", data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  };

  return (
    <div>
      <select value={selectedValue} onChange={handleChange}>
        <option value="" disabled>Select a Lookup Type</option>
        {options.map((option, index) => (
          <option key={index} value={option.LookupType}>
            {option.LookupType}
          </option>
        ))}
      </select>

      {selectedValue && (
        <p style={{ marginTop: "10px" }}>
          Selected value: <strong>{selectedValue}</strong>
        </p>
      )}
      <label htmlFor="lookup-type">Lookup result</label>
    
      
      {selectedValue && (
      <table>
      <thead>
        <tr>
          {data.length > 0 &&
            Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
      )}
    </div>
  
   
  );
}

export default MyDropdown;

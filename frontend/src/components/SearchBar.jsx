import React, { useState } from 'react';
import Select from 'react-select';

export default function SearchBar(props) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOpt) => {
    if (selectedOpt) {
      setSelectedOption(selectedOpt);
      props.onSearchName(selectedOpt.value);
    } else {
      setSelectedOption(selectedOpt);
    }
  };

  const searchList = props.names.map((name) => ({
    value: name,
    label: name,
  }));
  return (
    <div>
      <Select
        className="required"
        value={selectedOption}
        options={searchList}
        onChange={handleChange}
        placeholder="Search..."
        openMenuOnClick={false}
        classNamePrefix="select"
        isClearable
        isSearchable
      />
    </div>
  );
}

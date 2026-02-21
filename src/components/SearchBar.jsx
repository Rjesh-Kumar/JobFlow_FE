import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <Form className="mb-4">
      <InputGroup>
        <InputGroup.Text>
          <BsSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search by job title..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
import React, { useState } from 'react';

const Search = (props) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchInputChanges = event => {
        setSearchValue(event.target.value);
    };

    const resetInputField = () => {
        setSearchValue('');
    };

    const callSearchFunction = event => {
        event.preventDefault();
        props.search(searchValue);
        resetInputField();
    };

    const callReset = (event) => {
        event.preventDefault();
        props.reset();
    };

    return (
        <form className="search">
            <input
                value={searchValue}
                onChange={handleSearchInputChanges}
                type="text"
            />
            <input onClick={callSearchFunction} type="submit" value="SEARCH" />
            <input onClick={callReset} type="submit" value="RESET" />
        </form>
    );
};

export default Search;
import React from 'react'
import TextField from "@mui/material/TextField";
import './Header.css';

const SearchBar = () => {

  return (
        <div className="header--container--right">
          <div className="search">
              <TextField
                id="outlined-input"
                variant="outlined"
                fullWidth
                label="Find Advocate via Name, Username, Company, Techology"
                sx={{ input: { color: 'rgb(127, 255, 112);' } }}
                color="secondary"
                focused
                name="query"
              />
            </div>
          </div>
  )
}

export default SearchBar
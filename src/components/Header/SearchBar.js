import React from 'react'
import TextField from "@mui/material/TextField";
import { styled } from '@mui/material/styles';
import './Header.css';
import { Grid } from '@mui/material';

const SearchBar = () => {

  return (
    // <Grid container>
    //   <Grid item>
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
    //   </Grid>
    // </Grid>
  )
}

export default SearchBar
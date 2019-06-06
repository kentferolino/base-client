import React from 'react';
import TextField from '@material-ui/core/TextField';

const ChangePW = () => {
  return (
    <div>
      <TextField
        required
        id="current-password-input"
        label="Old Password"
        type="password"
        margin="normal"
        placeholder="***"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        required
        id="new-password-input"
        label="New Password"
        type="password"
        margin="normal"
        placeholder="***"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        required
        id="repeat-current-password-input"
        label="Repeat New Password"
        type="password"
        margin="normal"
        placeholder="***"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};

export default ChangePW;

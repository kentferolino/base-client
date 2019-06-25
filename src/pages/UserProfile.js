import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { updateUserInfo } from '../actions/authActions';


const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1)
  },
  paper: {
    marginTop: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))


const UserProfile = ({ updateUserInfoAction, auth }) => {


  const classes = useStyles();

  const [formValues, setFormValues] = useState({ name: auth.user.name, email: auth.user.email });
  const { name, email } = formValues;

  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const onSubmit = async () => {
    updateUserInfoAction({ name, email })
  }

  return (
    <>
      <Container maxWidth="xs" className={classes.root}>
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                fullWidth
                label="Name"
                name="name"
                onChange={onChange}
                required
                type="text"
                value={name}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={onChange}
                required
                type="email"
                value={email}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Save
          </Button>
        </div>
      </Container>
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});


export default connect(
  mapStateToProps,
  { updateUserInfoAction: updateUserInfo },
)(UserProfile);

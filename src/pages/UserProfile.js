import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import moment from 'moment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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

const formatDate = value => {
  return moment(new Date(value)).format('YYYY-MM-DD');
}

const UserProfile = ({ updateUserInfoAction, auth }) => {

  const classes = useStyles();

  const [formValues, setFormValues] = useState({
    name: auth.user.name,
    email: auth.user.email,
    birthdate: formatDate(auth.user.birthdate),
    gender: auth.user.gender
  });
  const { name, email, birthdate = formatDate(), gender = 'male' } = formValues;

  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const onSubmit = async () => {
    updateUserInfoAction({ name, email, birthdate, gender })
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Birthdate"
                name="birthdate"
                onChange={onChange}
                type="date"
                value={birthdate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {birthdate.toString()}
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="Gender"
                  name="gender"
                  value={gender}
                  onChange={onChange}
                >
                  <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                  <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                  <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" />
                </RadioGroup>
              </FormControl>
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

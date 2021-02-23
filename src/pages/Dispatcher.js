import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      position: 'absolute',
      top: theme.spacing(8),
    },
    grids:{
        position: 'absolute',
        bottom: theme.spacing(6),
        top: theme.spacing(8),
    }
  }));

function Dispatcher() {
    const classes = useStyles();
    return (
        <div style={{
            backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
            backgroundImage:
              "url(" + "https://image.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1108.jpg" + ")",
          }}>
              <React.Fragment>
      <CssBaseline />
      
      <Container maxWidth="sm">
      <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
      Available Dispatchers
      </Typography>
      <br/>

      <Grid container spacing={1} >
      <Grid item xs={2}>

      </Grid>
        <Grid item xs={10}>
        <Button variant="contained" style={{width:250}} color="primary">
        Call Name
      </Button>
      </Grid>
      </Grid>
<br/>

     


     

          </div>
      </Container>
      </React.Fragment>
        </div>
    )
}

export default Dispatcher

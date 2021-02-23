import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import CallEndIcon from '@material-ui/icons/CallEnd';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
   
    fab: {
      position: 'absolute',
      bottom: theme.spacing(6),
      right: theme.spacing(20),
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        top: theme.spacing(6),
      },
  }));
function Calling() {
    const classes = useStyles();
  const theme = useTheme();

    return (
        <div  style={{
            backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
            backgroundImage:
              "url(" + "https://image.freepik.com/free-vector/abstract-blurred-gradient-mesh-background_1159-3175.jpg" + ")",
          }}>
            <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">

      <Grid container spacing={1}>
      <Grid item xs={4}></Grid>
        <Grid item xs={5}>
      <Avatar alt="Remy Sharp" src="https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" className={classes.large} />
<br/><br/>
<Typography >Name</Typography>
      </Grid>
      </Grid>


      <Grid container spacing={3}>
      <Grid item xs={3}></Grid>
        <Grid item xs={5}>
   
      <LinearProgress color="secondary" />
      </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          
        <Fab color="secondary" aria-label="add" className={classes.fab}>
        <CallEndIcon />
      </Fab>
      

        </Grid>
        </Grid>
      </Container>
    </React.Fragment>
        </div>
    )
}

export default Calling

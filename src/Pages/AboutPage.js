import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: '100vw',
  },
  backgroundImage: {
    position: "fixed",
    top: 0,
    backgroundImage: theme.palette.background.default,
    zIndex: -1,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },

  container: {
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 0 8px 0 rgba(0,0,0,0.5)',
  },
  aboutText: {
    color: theme.palette.primary.main,
    fontSize: '18px',
  },
  title: {
    color: theme.palette.primary.main,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    boxShadow: '0 0 8px 0 rgba(0,0,0,0.5)',
  },
}));

const AboutPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.backgroundImage}> 
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h2" gutterBottom className={classes.title}>About Us</Typography>
            <Typography variant="body1" className={classes.aboutText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in pulvinar lectus, non tempus lectus.
              Nulla suscipit tincidunt libero sit amet eleifend. Sed porttitor urna vel enim posuere vestibulum.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>Lorem Ipsum</Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut sapien eget ligula eleifend vulputate.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
    </div>
  );
};

export default AboutPage;

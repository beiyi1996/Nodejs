import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Footer from "./Footer";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: 30
  },
  grid: {
    width: "100%",
    margin: "0 auto",
    paddingTop: 10,
    display: "flex"
  },
  searchBar: {
    fontSize: 16,
    color: "#3D405B",
    border: "1px solid #B8B9C3",
    borderRadius: 20,
    width: "100%",
    padding: "5px 15px 5px",

    "&:focus": {
      outline: "none"
    }
  },
  searchIcon: {
    marginLeft: "-40px"
  },
  searchBtn: {
    borderRadius: 50,
    height: 40,
    minWidth: 40,
    padding: 5
  },
  icon: {
    verticalAlign: "text-bottom",
    marginTop: 3
  },
  restaurantImage: {
    width: "100%",
    height: "100%",
    "& > img": {
      width: "100%",
      borderRadius: 10
    }
  },
  restaurantName: {
    paddingLeft: 10,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    fontFamily: "Microsoft JhengHei",
    fontSize: 17,
    margin: "0 0 5px"
  },
  paperGrid: {
    position: "relative",
    marginBottom: 50,
    "&::after": {
      content: "''",
      width: "100%",
      position: "absolute",
      bottom: "-35px",
      border: "0.5px dashed #B8B9C3"
    }
  },
  paperRoot: {
    position: "absolute",
    width: "80%",
    left: 30,
    bottom: -15,
    minHeight: 70,
    padding: 5,
    borderRadius: 4
  },
  paperFooter: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 5px"
  },
  chipDiv: {
    display: "flex",
    fontFamily: "Microsoft JhengHei",
    justifyContent: "space-between",
    padding: 3
  },
  chip: {
    display: "inline-block",
    backgroundColor: "#E07A5F",
    color: "#fff",
    padding: "5px 0px",
    fontFamily: "Microsoft JhengHei",
    marginRight: 3
  },
  restaurantMore: {
    width: "35%",
    borderRadius: 10
  },
  divider: {
    position: "absolute"
  }
}));

function Search() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid item xs={12} className={classes.container}>
        <Grid item xs={12} className={classes.grid}>
          <input type="text" name="searchbar" className={classes.searchBar} />
          <div className={classes.searchIcon}>
            <Button className={classes.searchBtn}>
              <SearchIcon className={classes.icon} />
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            search word
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.paperGrid}>
            <div className={classes.restaurantImage}>
              <img src="http://fakeimg.pl/100x100?font=lobster" alt="" />
            </div>
            <Paper className={classes.paperRoot}>
              <p className={classes.restaurantName}>Restaurant Name.....</p>
              <div className={classes.paperFooter}>
                <Typography component="div" className={classes.chipDiv}>
                  <Chip label="北部" className={classes.chip} />
                  <Chip label="甜點" className={classes.chip} />
                  {/* <span className={classes.badge}>北區</span>
                <span className={classes.badge}>甜點</span> */}
                </Typography>
                <Button className={classes.restaurantMore}>more</Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.paperGrid}>
            <div className={classes.restaurantImage}>
              <img src="http://fakeimg.pl/100x100?font=lobster" alt="" />
            </div>
            <Paper className={classes.paperRoot}>
              <p className={classes.restaurantName}>Restaurant Name.....</p>
              <div className={classes.paperFooter}>
                <Typography component="div" className={classes.chipDiv}>
                  <Chip label="中部" className={classes.chip} />
                  <Chip label="飲料" className={classes.chip} />
                  {/* <span className={classes.badge}>北區</span>
                <span className={classes.badge}>甜點</span> */}
                </Typography>
                <Button className={classes.restaurantMore}>more</Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.paperGrid}>
            <div className={classes.restaurantImage}>
              <img src="http://fakeimg.pl/100x100?font=lobster" alt="" />
            </div>
            <Paper className={classes.paperRoot}>
              <p className={classes.restaurantName}>Restaurant Name.....</p>
              <div className={classes.paperFooter}>
                <Typography component="div" className={classes.chipDiv}>
                  <Chip label="南部" className={classes.chip} />
                  <Chip label="米食" className={classes.chip} />
                  {/* <span className={classes.badge}>北區</span>
                <span className={classes.badge}>甜點</span> */}
                </Typography>
                <Button className={classes.restaurantMore}>more</Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.paperGrid}>
            <div className={classes.restaurantImage}>
              <img src="http://fakeimg.pl/100x100?font=lobster" alt="" />
            </div>
            <Paper className={classes.paperRoot}>
              <p className={classes.restaurantName}>Restaurant Name.....</p>
              <div className={classes.paperFooter}>
                <Typography component="div" className={classes.chipDiv}>
                  <Chip label="北部" className={classes.chip} />
                  <Chip label="麵食" className={classes.chip} />
                  {/* <span className={classes.badge}>北區</span>
                <span className={classes.badge}>甜點</span> */}
                </Typography>
                <Button className={classes.restaurantMore}>more</Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}

export default Search;

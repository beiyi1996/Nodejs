import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import productService from "../services/productService";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Footer from "./Footer";
import { param } from "express-validator";

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
  }
}));

function Search() {
  const classes = useStyles();
  const [restaurant, setRestaurant] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState("");

  useEffect(() => {
    if (!restaurant) {
      getRestaurant();
      setIsSearching(true);
    }
  });

  const getRestaurant = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const kind = urlParams.get("kind");
    console.log("kind", kind);
    let res = await productService.searchByKind(kind);
    console.log("111", res.restaurants);
    setRestaurant(res.restaurants);
    setIsSearching(false);
  };

  const handleChange = e => {
    setSearchKeyWord(e.target.value);
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid item xs={12} className={classes.container}>
        <Grid item xs={12} className={classes.grid}>
          <input
            type="text"
            name="searchbar"
            className={classes.searchBar}
            value={searchKeyWord}
            onChange={handleChange}
          />
          <div className={classes.searchIcon}>
            <Link to={`/search?${param}=${paramValue}`}>
              <Button className={classes.searchBtn}>
                <SearchIcon className={classes.icon} />
              </Button>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            search word
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {restaurant && restaurant.length !== 0 && isSearching === false ? (
            restaurant.map(item => (
              <Grid item xs={12} className={classes.paperGrid} key={item._id}>
                <div className={classes.restaurantImage}>
                  <img src="http://fakeimg.pl/100x100?font=lobster" alt="" />
                </div>
                <Paper className={classes.paperRoot}>
                  <p className={classes.restaurantName}>{item.name}</p>
                  <div className={classes.paperFooter}>
                    <Typography component="div" className={classes.chipDiv}>
                      <Chip label={item.category.area} className={classes.chip} />
                      <Chip label={item.category.kind} className={classes.chip} />
                    </Typography>
                    <Button className={classes.restaurantMore}>more</Button>
                  </div>
                </Paper>
              </Grid>
            ))
          ) : (
            <p>今天吃點別的吧!!!</p>
          )}
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}

export default Search;

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import productService from "../services/productService";
import classNames from "classnames";
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
    fontFamily: "Microsoft JhengHei",

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
  keyWord: {
    fontFamily: "Microsoft JhengHei",
    padding: "10px 10px 0px",
    color: "#3D405B",
    fontSize: 16
  },
  searchResultGrid: {
    position: "absolute",
    zIndex: 1,
    width: "87%"
  },
  saerchListItem: {
    padding: 10,
    backgroundColor: "#FEFDFC",
    border: "1px solid #B8B9C3",
    borderTop: "none",
    width: "90%",
    margin: "0 auto",

    "& > p": {
      padding: 10,
      margin: "5px 0",
      fontFamily: "Microsoft JhengHei",
      color: "#4E5169",
      "&:hover": {
        fontWeight: "bold",
        backgroundColor: "#F6DAD3",
        cursor: "pointer"
      }
    }
  },
  searchNone: {
    padding: 10,
    margin: "5px 0",
    fontFamily: "Microsoft JhengHei",
    color: "#4E5169",
    fontWeight: "normal",
    "&:hover": {
      fontWeight: "inherit",
      backgroundColor: "#FEFDFC",
      cursor: "default"
    }
  },
  urlParams: {
    color: "#E07A5F",
    fontWeight: "bold"
  }
}));

function Search() {
  const classes = useStyles();
  const [restaurant, setRestaurant] = useState(null);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [category, setCategory] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [urlParams, setURLParams] = useState("");
  const [blur, setBlur] = useState(true);
  const history = useHistory();
  useEffect(() => {
    if (!restaurant) {
      getRestaurant();
      getAllCategory();
    }
  }, []);

  useEffect(() => {
    if (searchKeyWord) {
      console.log("in if");
      async function fetching() {
        let res = await productService.searchByKeyWord(searchKeyWord);
        console.log(123, res, res.restaurants.length);
        if (res.restaurants.length > 0) {
          console.log("res 有資料");
          await setSearchResult(res.restaurants);
        }
      }
      fetching();
    }
  }, [searchKeyWord]);

  const getRestaurant = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const keyWord = urlParams.get("searchKeyWord");
    setURLParams(keyWord);
    let res = await productService.searchByKeyWord(keyWord);
    console.log("111", res.restaurants);
    setRestaurant(res.restaurants);
  };

  const getAllCategory = async () => {
    let res = await productService.getAllCatrgory();
    setCategory(res.all_category);
  };

  const handleSubmit = async () => {
    let res = await productService.searchByKeyWord(searchKeyWord);
    setURLParams(searchKeyWord);
    setRestaurant(res.restaurants);
    setBlur(true);
    history.push(`/search?searchKeyWord=${searchKeyWord}`);
  };

  const handleChange = e => {
    setSearchResult([]);
    setBlur(false);
    setSearchKeyWord(e.target.value);
  };

  const handleClickItem = item => {
    setSearchKeyWord(item.name);
    setURLParams(item.name);
    setRestaurant([item]);
    setBlur(true);
  };

  const renderSearchResult = () => {
    console.log("list item", searchResult);
    if (searchKeyWord.length > 0 && blur === false) {
      if (searchResult.length > 0) {
        const list = searchResult.map((item, idx) => (
          <p key={idx} onClick={() => handleClickItem(item)}>
            {item.name}
          </p>
        ));
        return <div className={classes.saerchListItem}>{list}</div>;
      } else {
        return (
          <h4 className={classNames(classes.searchNone, classes.saerchListItem)}>抱歉, 沒有您想要搜尋的餐廳資訊!!</h4>
        );
      }
    }
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
            <Button className={classes.searchBtn} onClick={handleSubmit}>
              <SearchIcon className={classes.icon} />
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.searchResultGrid}>
          {renderSearchResult()}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom className={classes.keyWord}>
            為您推薦 <span className={classes.urlParams}>{urlParams}</span> 相關的餐廳 ..
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {restaurant && restaurant.length !== 0 ? (
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
                    <Link to={`/detail?name=${item.name}&_id=${item._id}`}>
                      <Button
                        className={classes.restaurantMore}
                        onClick={() => productService.getRestaurantDetail(item.name, item._id)}
                      >
                        more
                      </Button>
                    </Link>
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

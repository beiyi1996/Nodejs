import React, { useEffect, useRef, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import productService from "../services/productService";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Footer from "./Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { googleMapKey } from "../password";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: 30,

    "& > *": {
      fontFamily: "Microsoft JhengHei"
    }
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
    borderRadius: 10,
    "& > img": {
      width: "100%",
      height: 200
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
    fontSize: 20,
    margin: "0 0 5px"
  },
  paperGrid: {
    position: "relative",
    marginBottom: 50
  },
  paperRoot: {
    minHeight: 70,
    padding: 5,
    borderRadius: 4,
    marginTop: 10
  },
  detailList: {
    listStyle: "none",
    paddingLeft: 10,
    fontFamily: "Microsoft JhengHei",

    "& > li": {
      margin: "5px 0"
    }
  },
  title: {
    display: "inline-block",
    width: "100%",
    color: "#838596"
  },
  content: {
    paddingLeft: 15,
    display: "inline-block",
    color: "#4E5169"
  },
  googleMap: {
    padding: "0 5px",
    minHeight: 150,
    border: "1px solid #B8B9C3",
    marginTop: 15,
    position: "relative"
  },
  map: {
    height: "30vh",
    width: "100%"
  },
  paperFooter: {
    display: "flex",
    justifyContent: "center",
    padding: "0 5px",
    margin: "10px 0 5px"
  },
  booking: {
    width: "100%",
    borderRadius: 10,
    fontFamily: "Microsoft JhengHei"
  },
  slider: {
    "& > button::before": {
      color: "#838596",

      "&:hover": {
        color: "#3D405B"
      }
    },
    "& > button:first-child": {
      left: 0,
      zIndex: 1
    },
    "& > button:first-child ~ button": {
      right: 0
    },
    "& > ul": {
      display: "none !important"
    }
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
    width: "100%",
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
  }
}));

const SimpleSlider = () => {
  const classes = useStyles();
  let settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings} className={classes.slider}>
      <div className={classes.restaurantImage}>
        <img src="http://fakeimg.pl/100x100?text=pic1&font=lobster" alt="" />
      </div>
      <div className={classes.restaurantImage}>
        <img src="http://fakeimg.pl/100x100?text=pic2&font=lobster" alt="" />
      </div>
      <div className={classes.restaurantImage}>
        <img src="http://fakeimg.pl/100x100?text=pic3&font=lobster" alt="" />
      </div>
      <div className={classes.restaurantImage}>
        <img src="http://fakeimg.pl/100x100?text=pic4&font=lobster" alt="" />
      </div>
      <div className={classes.restaurantImage}>
        <img src="http://fakeimg.pl/100x100?text=pic5&font=lobster" alt="" />
      </div>
      <div className={classes.restaurantImage}>
        <img src="http://fakeimg.pl/100x100?text=pic6&font=lobster" alt="" />
      </div>
    </Slider>
  );
};

var times = 0;
function Detail() {
  const classes = useStyles();
  const [form, setForm] = useState(null);
  const [queryName, setQueryName] = useState("");
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [blur, setBlur] = useState(true);
  const [searching, setIsSearching] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (searchKeyWord) {
      console.log("search key word change...");
      setIsSearching(true);
      async function fetching() {
        let res = await productService.searchByKeyWord(searchKeyWord);
        console.log(123, res, res.restaurants.length);
        if (res.restaurants.length > 0) {
          console.log("res 有資料");
          setSearchResult(res.restaurants);
        }
      }
      fetching();
    }
  }, [searchKeyWord]);

  const getRestaurantDetail = async () => {
    console.log("[getRestaurantDetail]取得資料開始");
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const _id = urlParams.get("_id");
    const res = await productService.getRestaurantDetail(name, _id);
    console.log("res", res);
    setQueryName(name);
    setForm({
      name: name,
      address: res.restaurant.address,
      phone: res.restaurant.phone
    });

    console.log("[getRestaurantDetail]取得資料結束");
  };
  const MemoMap = useCallback(<Map className={classes.map} />, []);
  function Map({ options, onMount, className }) {
    console.log("Map function is working!!", onMount);
    const ref = useRef();
    useEffect(() => {
      const onLoad = async () => {
        console.log("onLoad??????");
        const map = new window.google.maps.Map(ref.current, options);
        console.log("map", map);
        if (form) {
          console.log("in if.....");
          onMount(map);
        }
      };

      const script = document.createElement(`script`);
      if (!window.google) {
        const testPromise = new Promise((resolve, reject) => {
          script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}`;
          document.head.append(script);
          async function oo() {
            if (!form) {
              console.log("!form??????????");
              await getRestaurantDetail();
              console.log("await ???????????????");
              script.addEventListener(`load`, onLoad);
              resolve(true);
            }
          }
          oo();
        });

        testPromise.then(value => {
          console.log("2ed then????????????", value);
          onLoad();
          script.removeEventListener(`load`, onLoad);
        });

        console.log("testPromise", testPromise);
        // const script = document.createElement(`script`);
        // script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}`;
        // document.head.append(script);
        // if (!form) {
        //   console.log("!form??????????");
        //   getRestaurantDetail();
        // } else {
        //   script.addEventListener(`load`, onLoad);
        //   return () => script.removeEventListener(`load`, onLoad);
        // }
        console.log("form 有資料了");
      } else {
        console.log("else ???????");
      }
    }, []);
    return <div {...{ ref, className }} />;
  }

  const createMarker = () => map => {
    console.log("form", form);
    const { address } = form;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        address: address
      },
      (results, status) => {
        if (status === "OK") {
          console.log("OK???", results[0].geometry.location);
          map.setCenter(results[0].geometry.location);
          const marker = new window.google.maps.Marker({
            map,
            position: results[0].geometry.location,
            title: "",
            visible: true
          });
          return marker;
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      }
    );
  };

  Map.defaultProps = {
    options: {
      zoom: 15
    },
    onMount: createMarker()
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

  const handleSubmit = async () => {
    history.push(`/search?searchKeyWord=${searchKeyWord}`);
    setQueryName(searchKeyWord);
    setBlur(true);
  };

  const handleClickItem = item => {
    setSearchKeyWord(item.name);
    setQueryName(item.name);
    setBlur(true);
  };

  const handleChange = e => {
    setSearchResult([]);
    setBlur(false);
    setSearchKeyWord(e.target.value);
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      {console.log(googleMapKey)}
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
            <Button className={classes.searchBtn}>
              <SearchIcon className={classes.icon} onClick={handleSubmit} />
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.searchResultGrid}>
          {renderSearchResult()}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom className={classes.restaurantName}>
            {form ? form.name : queryName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.paperGrid}>
            <div className={classes.restaurantImage}>
              <SimpleSlider />
            </div>
            <Paper className={classes.paperRoot}>
              <ul className={classes.detailList}>
                <li>
                  <span className={classes.title}>店家名稱 : </span>
                  <span className={classes.content}>{form ? form.name : ""}</span>
                </li>
                <li>
                  <span className={classes.title}>地址 : </span>
                  <span className={classes.content}>{form ? form.address : ""}</span>
                </li>
                <li>
                  <span className={classes.title}>電話 : </span>
                  <span className={classes.content}>{form ? form.phone : ""}</span>
                </li>
                <li>
                  <span className={classes.title}>用餐時間 : </span>
                  <span className={classes.content}>11:00 – 21:30</span>
                </li>
                <li>
                  <span className={classes.title}>保留資訊 : </span>
                  <span className={classes.content}>將為您保留訂位10分鐘, 若10分鐘過後仍未到場, 即取消訂位!</span>
                </li>
                <li>
                  <span className={classes.title}>最低消費 : </span>
                  <span className={classes.content}>每位顧客最低消費為180元。</span>
                </li>
              </ul>
              <div className={classes.googleMap} id="map">
                {/* <Map className={classes.map} /> */}
                {MemoMap}
              </div>
              <div className={classes.paperFooter}>
                <Link to="/booking">
                  <Button className={classes.booking}>我要訂位</Button>
                </Link>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}

export default Detail;

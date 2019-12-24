import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    fontSize: 17,
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

function Detail() {
  const classes = useStyles();
  const [from, setFrom] = useState({
    name: "大心新泰式麵食 - 台北微風南京店",
    address: "台北市松山區南京東路三段337號B2美食街",
    phone: "02-2719-8369"
  });

  function Map({ options, onMount, className }) {
    const ref = useRef();

    useEffect(() => {
      const onLoad = () => {
        const map = new window.google.maps.Map(ref.current, options);
        if (typeof onMount === `function`) onMount(map);
      };
      if (!window.google) {
        const script = document.createElement(`script`);
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}`;
        document.head.append(script);
        script.addEventListener(`load`, onLoad);
        return () => script.removeEventListener(`load`, onLoad);
      } else onLoad();
    }, [onMount, options]);

    return <div {...{ ref, className }} />;
  }

  const addMarkers = () => map => {
    const { address } = from;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        address: address
      },
      (results, status) => {
        if (status === "OK") {
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
      center: { lat: 25.033671, lng: 121.564427 },
      zoom: 15
    },
    onMount: addMarkers()
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      {console.log(googleMapKey)}
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
              <SimpleSlider />
            </div>
            <Paper className={classes.paperRoot}>
              <ul className={classes.detailList}>
                <li>
                  <span className={classes.title}>店家名稱 : </span>
                  <span className={classes.content}>大心新泰式麵食 - 台北微風南京店</span>
                </li>
                <li>
                  <span className={classes.title}>地址 : </span>
                  <span className={classes.content}>台北市松山區南京東路三段337號B2美食街</span>
                </li>
                <li>
                  <span className={classes.title}>電話 : </span>
                  <span className={classes.content}>02-2719-8369</span>
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
                <Map className={classes.map} />
              </div>
              <div className={classes.paperFooter}>
                <Button className={classes.booking}>我要訂位</Button>
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

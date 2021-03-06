import React from "react";
import { Box, Paper, Grid, Typography } from "@material-ui/core";
import Header from "../Headers&Footers/Header";
import BreadCrumps from "../Headers&Footers/BreadCrumps";

// import PremiumAd from "./components/PremiumAds/";
import Categories from "./components/categoriesCard";
import classes from "./styles";
import routes from "../../Config/routes";
import Something from "../../Assets/Rentalhouse.jpg";
import PremiumAds from "./components/PremiumAds";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import GrainIcon from "@material-ui/icons/Grain";
import { subCategories, categories } from "./data";

const CategoriesView = ({ location, history }) => {
  return (
    <>
      <Box style={classes.root}>
        <Header history={history} />
        <Box style={{ height: 80 }} />
        <Grid xs={12} align="center">
          <BreadCrumps />
        </Grid>
        <PremiumAds />
        <Typography style={classes.Headertext2} glutterBottom>
          {categories[location.state.type]}
        </Typography>
        {<Categories type={location.state.type} />}
      </Box>
    </>
  );
};

export default CategoriesView;

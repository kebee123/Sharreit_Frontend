import React from "react";
import { Typography, Paper, Box, Grid, List, Zoom } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import image from "../../../Assets/Rental_house.jpg";
import image2 from "../../../Assets/Rentalhouse.jpg";
import image3 from "../../../Assets/SomeCar.jpg";
import routes from "../../../Config/routes";
import fetchAllItems from '../functions/fetchAllItems'
import { statusCodes } from '../../../Config/config'
import preLoader from '../../../Assets/circle_loading_1.gif'

const classes = {
  root: {
    paddingLeft: 30,
    paddingRight: 30,
    maxHeight: 860,
    overflow: "auto",

    // backgroundColor: '#FFFFFF'
  },
  card: {
    padding: 10,
    maxWidth: 260,
    minWidth: 260,
    borderRadius: 10,
    minHeight: 230,
    maxHeight: 240,
  },
  media: {
    height: 140,
    borderRadius: 10,
  },
  cardTitle: {
    fontWeight: 600,
    color: "#004C3F",
    fontSize: 15,
  },
  cardBody: {
    fontSize: 15,
  },
};

export default class ItemsView extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      waitingContent: [],
      content: []
    }

    this.preLoaders = this.preLoaders.bind(this)
    this.mappedItems = this.mapItems.bind(this)
  }

  async componentDidMount() {
    this.setState({ waitingContent: this.preLoaders() })
    const { status, data } = await fetchAllItems()
    if (status === statusCodes.SUCCESS) {
      const { posts } = data
      this.mapItems(posts)
    }
  }

  preLoaders = () => {
    const loader = (
      <Grid item>
        <Card style={classes.card}>
          <CardActionArea>
            <CardMedia style={classes.media} image={preLoader} title="" />
            <CardContent>
              <Typography style={classes.cardTitle}>
                Loading...
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    )

    return Array(4).fill(loader)
  }

  mapItems = (items) => {
    var mappedItems = []
    items.forEach((value, index) => {
      var { post } = value
      if (post.postImage.length > 0) {
        mappedItems.push(
          <Grid item>
            <Card style={classes.card}>
              <CardActionArea>
                <CardMedia style={classes.media} image={post.postImage[0]} title="" />
                <CardContent>
                  <Typography style={classes.cardTitle}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.price}$/Day
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        )
      }
    })
    this.setState({ loading: false })
    this.setState({ content: mappedItems })
  }

  render() {
    return (
      <Box style={classes.root}>
        <List>
        <Grid container xs={12} spacing={5}>
          
          {
            this.state.loading? this.state.waitingContent : this.state.content
          }

        </Grid>
        </List>
      </Box>
    );
  }
}

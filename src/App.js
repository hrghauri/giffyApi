import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";

const api = {
  baseUrl: "http://api.giphy.com/v1/gifs/trending",
  api_key: "Your Api Key Here"
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gifsData: [],
      hasMoreItems: true,
      offset: 0,
      limit: 5
    };

    this.loadItems = this.loadItems.bind(this);
  }

  async loadItems() {
    let url =
      api.baseUrl +
      "?api_key=" +
      api.api_key +
      "&limit=" +
      this.state.limit +
      "&offset=" +
      this.state.offset;

    try {
      console.log(url);
      let newGifsData = await axios.get(url);
      newGifsData = newGifsData.data.data;
      console.log(newGifsData);
      if (newGifsData) {
        let currentGifsData = this.state.gifsData;
        newGifsData.forEach(gifData => {
          currentGifsData.push(gifData);
        });
        let newOffset = this.state.offset + this.state.limit;
        this.setState({
          gifsData: currentGifsData,
          offset: newOffset
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;

    var items = [];
    this.state.gifsData.map((gifData, i) => {
      items.push(
        <div className="gifData" key={i}>
          <img src={gifData.images.original.url} />
        </div>
      );
    });

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadItems.bind(this)}
        hasMore={this.state.hasMoreItems}
        loader={loader}
      >
        <div className="gifs">{items}</div>
      </InfiniteScroll>
    );
  }
}
export default App;

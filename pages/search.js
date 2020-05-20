import React from "react";
import axios from "axios";
import ProductSearch from "../components/Index/ProductSearch";
import baseUrl from "../utils/baseUrl";

function Search({ products, user }) {
  return (
      <ProductSearch user={user} products={products} />
  );
}

Search.getInitialProps = async () => {
  const url = `${baseUrl}/api/search`;
  // fetch data on server
  const response = await axios.get(url);
  /* console.log(response); */
  // return response data as an object
  return response.data;
  // note: this object will be merged with existing props
};

export default Search;
import React from "react";
import axios from "axios";
import ProductSearch from "../components/Index/ProductSearch";
import baseUrl from "../utils/baseUrl";

function Search({ products }) {
  return (
    <>
      <ProductSearch products={products} />
    </>
  );
}

Search.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 27;
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  // fetch data on server
  const response = await axios.get(url, payload);
  /* console.log(response); */
  // return response data as an object
  return response.data;
  // note: this object will be merged with existing props
};

export default Search;
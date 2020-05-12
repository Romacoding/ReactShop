import React from "react";
import axios from "axios";
import ProductSearch from "../components/Index/ProductSearch"
import ProductList from "../components/Index/ProductList";
import ProductPagination from "../components/Index/ProductPagination";
import baseUrl from "../utils/baseUrl";

function Home({ products, totalPages }) {
  return (
    <>
      {/* <ProductSearch products={products} /> */}
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  );
}

Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 18;
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  // fetch data on server
  const response = await axios.get(url, payload);
  // return response data as an object
  return response.data;
  // note: this object will be merged with existing props
};

export default Home;

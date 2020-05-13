import React from 'react';
import { Card, Checkbox, Container } from "semantic-ui-react";

function ProductList({ products }) {
  const [showPics, setShowPics] = React.useState(true);
  function handleToggleChange() {
    setShowPics(!showPics);
}
  function mapProductsToItems(products) {
    return products.map(product => ({
      header: product.name,
      image: showPics?product.mediaUrl:"",
      meta: `${product.price} Грн.`,
      color: "teal",
      fluid: true,
      childKey: product._id,
      key: product._id,
      href: `/product?_id=${product._id}`
    }));
  }

  return (
    <>
    <Container textAlign="center" style={{ margin: "2em" }}>
    <Checkbox
        toggle
        label="Показувати фото товарів"
        checked={showPics}
        onClick={handleToggleChange}
    />
    </Container>
    <Card.Group
      stackable
      itemsPerRow="3"
      centered
      items={mapProductsToItems(products)}
    />
    </>
  );
}

export default ProductList;

import React from 'react';
import { Input, Card, Container } from "semantic-ui-react";


function ProductSearch({ products }) {
    const [searchTerm, setTerm] = React.useState({ searchTerm: '' });
    /* const [searchProducts, setProds] = React.useState(products); */
    const [searchLoading, setLoading] = React.useState({ searchLoading: false });
    function handleSearchChange(event) {
        setTerm({ searchTerm: event.target.value });
        setLoading({ searchLoading: true });
        setTimeout(() => setLoading({ searchLoading: false}), 1000);
    }
    const searchTermToLower = searchTerm.searchTerm.toLowerCase();
    /* console.log('lower case', searchTermToLower); */
    const filteredProducts = () => {
        return products.filter(product => {
            return (
                product.name.toLowerCase().includes(searchTermToLower) || product.description.toLowerCase().includes(searchTermToLower)
            )
        }
        )
    }
    const result = filteredProducts();
    /* console.log(result); */
    
        function mapProductsToItems(products) {
            return products.map(product => ({
                header: product.name,
                image: product.mediaUrl,
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
                <Input
                    label='Пошук'
                    icon='search'
                    name='searchTerm'
                    size='large'
                    placeholder='Введіть назву товару'
                    onChange={handleSearchChange}
                    loading={searchLoading.searchLoading}
                />
            </Container>
            <Container>
                <Card.Group
                    stackable
                    itemsPerRow="3"
                    centered
                    items={mapProductsToItems(result)}
                />
            </Container>
        </>

    );
}
export default ProductSearch;
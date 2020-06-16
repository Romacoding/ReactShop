import React from 'react';
import { Input, Card, Icon, Table, Button, Container } from "semantic-ui-react";
import AddProductToCart from "../Product/AddProductToCart";
import baseUrl from "../../utils/baseUrl";

function ProductSearch({ products, user }) {
    const [searchTerm, setTerm] = React.useState({ searchTerm: "...." });
    /* const [searchProducts, setProds] = React.useState(products); */
    const [searchLoading, setLoading] = React.useState({ searchLoading: false });
    function handleSearchChange(event) {
        if (event.target.value.length > 3) {
            setTerm({ searchTerm: event.target.value });
            setLoading({ searchLoading: true });
            setTimeout(() => setLoading({ searchLoading: false }), 1000);
        }
    }
    const searchTermToLower = searchTerm.searchTerm.toLowerCase();
    const filteredProducts = () => {
        return products.filter(product => {
            return (
                product.name.toLowerCase().includes(searchTermToLower) || product.description.toLowerCase().includes(searchTermToLower) || product.sku.includes(searchTermToLower)
            )
        }
        )
    }
    const result = filteredProducts();

    /*     function mapProductsToItems(products) {
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
        } */

    function mapProductsToCells(products) {
        return products.map(product => ({
            name: product.name,
            _id: product._id,
            price: product.price,
            sku: product.sku
        }));
    }
    const cellArray = mapProductsToCells(result);
    return (
        <>
                <Input
                    fluid
                    label='Пошук'
                    icon='search'
                    name='searchTerm'
                    size='large'
                    placeholder='Введіть назву товару'
                    onChange={handleSearchChange}
                    loading={searchLoading.searchLoading}
                />
                <Container>
            <Table fixed size={'small'} columns={3} color={"blue"}>
                <Table.Body>
                    {cellArray.map(product => {
                        return (
                            <Table.Row key={product._id}>
                                {/* <Table.Cell>{product.sku}</Table.Cell> */}
                                <Table.Cell width='5'> <Container href={`${baseUrl}/product?_id=${product._id}`} style={{textDecoration: "none", color: "#000000"}} >{product.name}</Container></Table.Cell>
                                <Table.Cell width='2'>{`Ціна ${product.price} Грн.`}</Table.Cell>
                                {/* <Table.Cell><Button color='blue' size='medium'>Додати в кошик</Button></Table.Cell> */}
                                <Table.Cell width='4'><AddProductToCart user={user} productId={product._id} price={product.price}/></Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            </Container>
        </>

    );
}

export default ProductSearch;
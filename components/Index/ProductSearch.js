import React from 'react';
import { Input, Card, Icon, Table, Button, Container } from "semantic-ui-react";


function ProductSearch({ products }) {
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
    /* console.log(result); */

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
            price: `${product.price} Грн.`,
            sku: product.sku
        }));
    }
    const cellArray = mapProductsToCells(result);
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
            {/*  <Container>
                <Card.Group
                    stackable
                    itemsPerRow="3"
                    centered
                    items={mapProductsToItems(result)}
                />
            </Container> */}
            <Table stackable columns={3} color={"blue"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Код товару</Table.HeaderCell>
                        <Table.HeaderCell>Назва товару</Table.HeaderCell>
                        <Table.HeaderCell>Ціна товару</Table.HeaderCell>
                        <Table.HeaderCell>Замовити</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {cellArray.map(product => {
                        return (
                            <Table.Row key={product._id}>
                                <Table.Cell>{product.sku}</Table.Cell>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>{product.price}</Table.Cell>
                                <Table.Cell><Button color='blue' size='medium'>Додати в кошик</Button></Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </>

    );
}
export default ProductSearch;
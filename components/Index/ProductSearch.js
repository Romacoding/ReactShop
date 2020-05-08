import { Input, Container } from "semantic-ui-react";

function ProductSearch({ products }) {
    const [searchTerm, setTerm] = React.useState({ searchTerm: '' });
    const [searchProducts, setProds] = React.useState(products);
    const [searchLoading, setLoading] = React.useState({ searchLoading: false });
    function handleSearchChange(event) {
        setTerm({ searchTerm: event.target.value });
        setLoading({ searchLoading: true })
    }
    /*     const filteredProducts = () => {
            console.log(searchTerm)
            console.log(searchProducts)
            return searchProducts.filter(product => {
                return (
                    product.name.toLowerCase().includes(searchTerm.searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.searchTerm.toLowerCase())
                );
            });
        } */
    const searchTermToLower = searchTerm.searchTerm.toLowerCase();
    /* console.log('lower case', searchTermLoweTor); */
    const filteredProducts = () => {
        return products.filter(product => {
            return (
                product.name.toLowerCase().includes(searchTermToLower) || product.description.toLowerCase().includes(searchTermToLower)
            )
        }
        )
    }

    //console.log(filteredProducts);
    /* setTimeout(() => setLoading({ searchLoading: false}), 1000); */

    return (
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
    );
}

export default ProductSearch;
import {
  Header,
  Segment,
  Button,
  Icon,
  Item,
  Message
} from "semantic-ui-react";
import { useRouter } from "next/router";

function CartItemList({ products, user, handleRemoveFromCart, success }) {
  const router = useRouter();

  function mapCartProductsToItems(products) {
    return products.map(p => ({
      childKey: p.product._id,
      key: p.product._id,
      header: (
        <Item.Header
          as="a"
          onClick={() => router.push(`/product?_id=${p.product._id}`)}
        >
          {p.product.name}
        </Item.Header>
      ),
      image: p.product.mediaUrl,
      meta: `${p.quantity} x ${p.product.price} Грн.`,
      fluid: "true",
      extra: (
        <Button
          basic
          icon="remove"
          floated="right"
          onClick={() => handleRemoveFromCart(p.product._id)}
        />
      )
    }));
  }

  if (success) {
    return (
      <Message
        success
        header="Вітаємо з купівлею!"
        content="Платіж успішно проведено."
        icon="star outline"
      />
    );
  }

  if (products.length === 0) {
    return (
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          У вашому кошику немає товару!
        </Header>
        <div>
          {user ? (
            <Button color="orange" onClick={() => router.push("/")}>
              Подивитись товар
            </Button>
          ) : (
            <Button color="blue" onClick={() => router.push("/login")}>
              Увійдіть щоб додати товар
            </Button>
          )}
        </div>
      </Segment>
    );
  }

  return <Item.Group divided items={mapCartProductsToItems(products)} />;
}

export default CartItemList;

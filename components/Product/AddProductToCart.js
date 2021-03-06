import React from "react";
import { Input, Button, Label, Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import cookie from "js-cookie";

function AddProductToCart({ user, productId, price }) {
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => setSuccess(false), 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  async function handleAddProductToCart() {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/cart`;
      const payload = { quantity, productId };
      const token = cookie.get("token");
      const headers = { headers: { Authorization: token } };
      await axios.put(url, payload, headers);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Input
        fluid
        size="mini"
        type="number"
        min="1"
        placeholder="Quantity"
        value={quantity}
        onChange={event => setQuantity(Number(event.target.value))}
        action={
          user && success
            ? {
              color: "blue",
              content: "Додано!",
              icon: "plus cart",
              disabled: true
            }
            : user
              ? {
                color: "orange",
                content: "Додати",
                icon: "plus cart",
                loading,
                disabled: loading,
                onClick: handleAddProductToCart
              }
              : {
                color: "blue",
                content: "Зареєструватись",
                icon: "signup",
                onClick: () => router.push("/signup")
              }
        }
        >
      </Input>
      <Container>
      <Button.Group style={{ marginTop: "0.5em" }} size='mini'>
      <Button circular color='blue' icon='plus' onClick={() => setQuantity(quantity + 1)}/>
      <Button circular color='blue' icon='minus' onClick={() => {quantity==1 ? setQuantity(1):setQuantity(quantity - 1)}}/>
      </Button.Group>
      <Label basic color='blue' style={{ marginLeft: "1em", marginTop: "0.5em" }}>{`Всього ${(Number(price) * quantity).toFixed(2)} Грн.`}</Label>
      </Container>
    </>
  );
}

export default AddProductToCart;

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://reactshop1c.herokuapp.com"
    : "http://localhost:3000";

export default baseUrl;

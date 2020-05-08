import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";
import axios from "axios";

connectDb();

export default async (req, res) => {
    const serchTerm = await axios.get()
    const result = await Product.find(searchTerm);
}
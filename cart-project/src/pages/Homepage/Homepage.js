import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import AddProductForm from "./components/AddProductForm/AddProductForm";
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import CartModal from "./components/CartModal/CartModal";
import { initialProducts } from "./utils/mockData";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Homepage() {
  // States
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);

  // Functions
  const onAddNewProductToProductList = (product) => {
    const newProduct = {
      ...product,
      id: uuidv4(),
    };

    const newProductList = [...products, newProduct];

    setProducts(newProductList);
  };

  const onAddProductToCart = (productId) => {
    // console.log("Add new product:", productId);

    const existingProduct = products.find(
      (product) => product.id === productId
    );

    const indexOfAddingProductInCart = cart.findIndex(
      (cartItem) => cartItem.id === productId
    );

    if (indexOfAddingProductInCart === -1) {
      const newCartItem = {
        ...existingProduct,
        quantity: 1,
      };

      setCart([...cart, newCartItem]);
    } else {
      const clonedCart = [...cart];
      clonedCart[indexOfAddingProductInCart].quantity += 1;
      setCart(clonedCart);
    }
  };

  const onIncreaseCartQuantity = (productId) => {
    const existingCartItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === productId
    );
    const updatingCart = [...cart];
    updatingCart[existingCartItemIndex].quantity += 1;

    setCart(updatingCart);
  };

  const onDecreaseCartQuantity = (productId) => {
    const existingCartItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === productId
    );

    const updatingCart = [...cart];
    const currentCartItemQuantity =
      updatingCart[existingCartItemIndex].quantity;

    if (currentCartItemQuantity === 1) {
      // return;
      // Thêm logic xoá sản phẩm
      onDeleteCartItem(productId);
    } else {
      updatingCart[existingCartItemIndex].quantity -= 1;
      setCart(updatingCart);
    }
  };

  const onDeleteCartItem = (productId) => {
    const newCartAfterRemovedItem = cart.filter(
      (cartItem) => cartItem.id !== productId
    );

    setCart(newCartAfterRemovedItem);
  };
  return (
    <main className="container py-3">
      <div className="row">
        <ProductList products={products} onAddToCart={onAddProductToCart} />
      </div>
      <div className="row mt-4">
        <AddProductForm onAddNewProduct={onAddNewProductToProductList} />
      </div>
    </main>
  );
}

export default Homepage;
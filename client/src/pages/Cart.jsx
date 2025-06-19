import { useCart } from '../context/CartContex';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b py-2">
              <div>
                <h4 className="font-bold">{item.name}</h4>
                <p>${item.price} x {item.quantity}</p>
              </div>
              <button
                className="text-red-600"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 text-right font-bold text-lg">
            Total: ${total.toFixed(2)}
          </div>
          <div className="mt-4 flex gap-2 justify-end">
            <button onClick={clearCart} className="bg-gray-300 px-4 py-1 rounded">Clear</button>
            <button className="bg-green-600 text-white px-4 py-1 rounded">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

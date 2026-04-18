'use client';

import React, {
	createContext,
	ReactNode,
	useContext,
	useState
} from 'react';

// Cart item type
interface CartItem {
	id: string;
	title: string;
	price: number;
	quantity: number;
	image: string;
}

interface CartContextType {
	cartItems: CartItem[];
	addToCart: (product: CartItem) => void;
	removeFromCart: (productId: string) => void;
	clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(
	undefined
);

// Custom hook to access the cart context
export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};

interface CartProviderProps {
	children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const addToCart = (product: CartItem) => {
		setCartItems(prev => {
			const existingItem = prev.find(item => item.id === product.id);
			if (existingItem) {
				return prev.map(item =>
					item.id === product.id
						? { ...item, quantity: item.quantity + product.quantity }
						: item
				);
			} else {
				return [...prev, product];
			}
		});
	};

	const removeFromCart = (productId: string) => {
		setCartItems(prev => prev.filter(item => item.id !== productId));
	};

	const clearCart = () => {
		setCartItems([]);
	};

	return (
		<CartContext.Provider
			value={{ cartItems, addToCart, removeFromCart, clearCart }}
		>
			{children}
		</CartContext.Provider>
	);
};

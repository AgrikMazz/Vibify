"use client";

import { Price, ProductWithPrice } from "@/types";
import Modal from "./modal";
import Button from "./button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";

interface SubscribeModalProps {
    products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({
    products
}) => {
    const { user, subscription, isLoading } = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id);

        if (!user) {
            setPriceIdLoading(undefined);
            return toast.error('Must be logged in');
        }

        if (!subscription) {
            setPriceIdLoading(undefined);
            return toast.error('Already subscribed');
        }
        /*
        try {
            const { sessionId } = await postData ({
                url: '/api/create-checkout-session',
                data: { price }
            });
            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setPriceIdLoading(undefined);
        };
        */
    }

    let content = (
        <div>
            No products available.
        </div>
    );

    if (products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if (!product.prices?.length) {
                        return (
                            <div key={product.id}>
                                No prices available
                            </div>
                        )
                    }

                    return product.prices.map((price) => {
                        return (
                            <Button
                                key={price.id}
                                onClick={() => handleCheckout(price)}
                                disabled={isLoading || priceIdLoading === price.id || price?.id === priceIdLoading}
                            >
                                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                            </Button>
                        )
                    })                    
                })}
            </div>
        )
    }

    if (subscription) {
        content = (
            <div>
                Already subscribed
            </div>
        )
    }

    return (
        <Modal
            title="Only for premium users"
            description="Listen to music with Spotify Premium"
            isOpen
            onChange={() => {}}
        >
            {content}
        </Modal>
    );
}
 
export default SubscribeModal;
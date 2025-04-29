import React, { useState, useEffect } from 'react';
import { useTokens } from '../hooks/useTokens';
import LoadingSpinner from './ui/LoadingSpinner';

export default function TokenPrice({ inputToken, outputToken, amount }) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getTokenPrice } = useTokens();

  useEffect(() => {
    const fetchPrice = async () => {
      if (!inputToken || !outputToken || !amount) {
        setPrice(null);
        return;
      }

      setLoading(true);
      const priceData = await getTokenPrice(inputToken.address, outputToken.address, amount);
      setPrice(priceData);
      setLoading(false);
    };

    fetchPrice();
  }, [inputToken, outputToken, amount]);

  if (loading) return <LoadingSpinner />;
  if (!price) return null;

  return (
    <div className="text-sm text-gray-600">
      1 {inputToken.symbol} = {price.price} {outputToken.symbol}
    </d
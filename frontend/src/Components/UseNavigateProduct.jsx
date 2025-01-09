// hooks/useNavigateToProduct.js

import { useNavigate } from 'react-router-dom';

const useNavigateToProduct = () => {
  const navigate = useNavigate();
  
  const navigateToProduct = (productId) => {
    navigate(`/items/${productId}`);
  };
  
  return navigateToProduct;
};

export default useNavigateToProduct;

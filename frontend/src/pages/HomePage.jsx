// pages/HomePage.jsx
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductList from './ProductList';
import { useProductStore } from '../store/product'; // 👈 import the store

// Chakra-compatible motion components
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

export default function HomePage() {
  const products = useProductStore((state) => state.products); // 👈 fetch product list

  return (
    <Box>
      {/* Show Hero only if no products exist */}
      {products.length === 0 && (
        <Box
          minH="60vh"
          w="100%"
          bgGradient="linear(to-r, blue.900, purple.800, pink.700)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={4}
        >
          <Box
            bg="whiteAlpha.200"
            backdropFilter="blur(10px)"
            boxShadow="xl"
            p={10}
            borderRadius="2xl"
            maxW="lg"
            textAlign="center"
            color="white"
          >
            <VStack spacing={6}>
              <MotionHeading
                size="2xl"
                fontWeight="bold"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Welcome to <Text as="span" color="blue.300">Product Store</Text>
              </MotionHeading>

              <MotionText
                fontSize="lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Easily manage your products with our modern interface.
                Click below to add a new product!
              </MotionText>

              <MotionButton
                as={Link}
                to="/create"
                colorScheme="blue"
                size="lg"
                px={8}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                Add Product
              </MotionButton>
            </VStack>
          </Box>
        </Box>
      )}

      {/* Product List Section */}
      <Box py={10} px={4}>
        <Heading textAlign="center" mb={6}>
        </Heading>
        <ProductList />
      </Box>
    </Box>
  );
}

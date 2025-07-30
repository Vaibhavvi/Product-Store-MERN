import { Box, Container, Heading, Input, Button, VStack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '../store/product';

export default function CreateProduct() {
  const [product, setProduct] = useState({ name: '', price: '', imageUrl: '' });
  const createProduct = useProductStore((state) => state.createProduct);
  const toast = useToast();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!product.name || !product.price || !product.imageUrl) {
      toast({
        title: "Missing Fields",
        description: "Please fill all fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const { success, message } = await createProduct({
      name: product.name.trim(),
      price: parseFloat(product.price),
      image: product.imageUrl.trim(),
    });

    toast({
      title: success ? "Product Added" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });

    if (success) {
      setProduct({ name: '', price: '', imageUrl: '' });
    }
  };

  return (
    <Container maxW="container.sm" mt={12}>
      <VStack spacing={6}>
        <Heading>Create Product</Heading>
        <Input
          placeholder="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <Input
          placeholder="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          type="number"
        />
        <Input
          placeholder="Image URL"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
        />
        <Button colorScheme="teal" onClick={handleSubmit} width="full">
          Add Product
        </Button>
      </VStack>
    </Container>
  );
}

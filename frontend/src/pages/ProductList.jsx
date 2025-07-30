import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useProductStore } from '../store/product';

export default function ProductList() {
  const { products, fetchProducts, deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    toast({
      title: success ? 'Deleted' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct({ ...product });
    onOpen();
  };

  const handleUpdateSubmit = async () => {
    const { _id, ...updatedFields } = selectedProduct;
    const { success, message } = await updateProduct(_id, updatedFields);

    toast({
      title: success ? 'Updated' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });

    if (success) {
      onClose();
      setSelectedProduct(null);
    }
  };

  // Motion variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, type: 'spring' } },
  };

  return (
    <Box maxW="7xl" mx="auto" mt={10} px={4}>
      <Heading textAlign="center" mb={6} color="black">
        All Products
      </Heading>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {products.map((product) => (
            <motion.div
              key={product._id}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
            >
              <Box
                bg="gray.800"
                p={4}
                borderRadius="2xl"
                boxShadow="lg"
                color="white"
                transition="all 0.3s"
                _hover={{ boxShadow: '2xl', bg: 'gray.700' }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  borderRadius="xl"
                  objectFit="cover"
                  h="200px"
                  w="full"
                  mb={4}
                />
                <VStack align="start" spacing={3}>
                  <Text fontSize="2xl" fontWeight="bold">
                    {product.name}
                  </Text>
                  <Box
                    bg="blue.500"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="semibold"
                  >
                    ₹{product.price}
                  </Box>
                  <Box w="full" display="flex" justifyContent="space-between">
                    <Button
                      size="sm"
                      colorScheme="yellow"
                      onClick={() => handleUpdateClick(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </VStack>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>
      </motion.div>

      {/* Update Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.900" color="white">
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Name"
                value={selectedProduct?.name || ''}
                onChange={(e) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Image URL"
                value={selectedProduct?.image || ''}
                onChange={(e) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    image: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Price"
                type="number"
                value={selectedProduct?.price || ''}
                onChange={(e) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

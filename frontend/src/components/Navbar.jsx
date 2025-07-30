// components/Navbar.jsx
import {
  Box,
  Flex,
  Text,
  Icon,
  Spacer,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  VStack,
} from '@chakra-ui/react';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="gray.900" px={6} py={4} color="white">
        <Flex align="center">
          <Flex align="center">
            <Icon as={FaShoppingCart} boxSize={6} color="blue.400" mr={2} />
            <Text fontSize="2xl" fontWeight="bold" color="blue.400">
              PRODUCT STORE
            </Text>
          </Flex>

          <Spacer />

          {/* Desktop Nav */}
          <Flex gap={4} display={{ base: 'none', md: 'flex' }}>
            <Button as={Link} to="/" variant="outline" colorScheme="blue">
              Home
            </Button>
            <Button as={Link} to="/create" variant="solid" colorScheme="blue">
              Add Product
            </Button>
          </Flex>

          {/* Mobile Nav Button */}
          <IconButton
            icon={<FaBars />}
            aria-label="Open menu"
            variant="outline"
            colorScheme="blue"
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
          />
        </Flex>
      </Box>

      {/* Drawer for Mobile Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800" color="white">
          <DrawerBody>
            <VStack spacing={4} mt={10}>
              <Button
                as={Link}
                to="/"
                w="100%"
                onClick={onClose}
                variant="outline"
                colorScheme="blue"
              >
                Home
              </Button>
              <Button
                as={Link}
                to="/create"
                w="100%"
                onClick={onClose}
                colorScheme="blue"
              >
                Add Product
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

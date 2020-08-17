import { Box, Button, Flex, Heading, Icon } from "@chakra-ui/core";
import Router from "next/router";
import React from "react";



const Header = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      py={5}
      color="red.400"
      mb={10}
      {...props}
    >
      <Flex align="center" mr={5}>
        <Icon name="triangle-up" mr={3} fontSize={20} />

        <Heading as="h3" fontSize={30} cursor='pointer' onClick={() => Router.push('/')}>
          Picturesque
        </Heading>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>



      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button variant='ghost' fontWeight={400} onClick={() => Router.push('/plans')}>
          Pricing
        </Button>
        <Button variant='ghost' fontWeight={400} onClick={() => Router.push('/settings')}>
          Settings
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
import React from "react";
import { Button, ButtonProps } from "@chakra-ui/core";

interface Props {
  children?: any;
  props?: ButtonProps;
  onClick?: any;
}

export const buttonProps = {
  color: "white",
  _hover: { bg: "red.300" },
  _active: { bg: "red.300" },
  _focus: { outline: 0 },
  variant: "solid",
  bg: "red.400"
} as const

function ActionButton({ children, ...props }: Props) {
  return (
    <Button
      type="submit"
      width="100%"
      height={55}
      mt={3}
      {...props}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}

export default ActionButton;

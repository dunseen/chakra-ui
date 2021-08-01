import { Button } from "@chakra-ui/button";
import { Box, Stack } from "@chakra-ui/layout";

export default function Pagination() {
  return (
    <Stack
      direction="row"
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>5</strong> de <strong>10</strong>
      </Box>
      <Stack spacing="2" direction="row">
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          colorScheme="pink"
          disabled
          _disabled={{
            bgColor: "pink.500",
            cursor: "default",
          }}
        >
          1
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bgColor="gary.700"
          _hover={{
            bg: "gray.500",
          }}
        >
          2
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          bgColor="gary.700"
          _hover={{
            bg: "gray.500",
          }}
        >
          3
        </Button>
      </Stack>
    </Stack>
  );
}

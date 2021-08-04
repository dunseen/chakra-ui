import { Box, Stack } from "@chakra-ui/layout";
import PaginationItem from "./PaginationItem";

export default function Pagination() {
  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>5</strong> de <strong>10</strong>
      </Box>
      <Stack spacing="2" direction="row">
        <PaginationItem isCurrent number={1} />
        <PaginationItem number={2} />
      </Stack>
    </Stack>
  );
}

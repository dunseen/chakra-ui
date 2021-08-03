import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export default function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Davys Lima</Text>
        <Text color="gray.300" fontSize="small">
          dlima@direto.tech
        </Text>
      </Box>

      <Avatar size="md" name="Davys Lima" />
    </Flex>
  );
}

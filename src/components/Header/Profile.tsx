import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export default function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Davys Lima</Text>
          <Text color="gray.300" fontSize="small">
            dlima@direto.tech
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Davys Lima" />
    </Flex>
  );
}

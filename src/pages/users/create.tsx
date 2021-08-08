import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { SubmitHandler, useForm } from "react-hook-form";

interface CreteUserFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório."),
  email: yup.string().required("E-mail obrigatório.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Senha obrigatória.")
    .min(6, "Minimo de 6 Caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas não são iguais."),
});

export default function CreateUser() {
  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(createUserSchema),
  });

  const { errors } = formState;

  const handleUserFormSubmit: SubmitHandler<CreteUserFormData> = async (
    formData
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(formData);
  };
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleUserFormSubmit)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuários
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                error={errors.name}
                name="name"
                label="Name"
                {...register("name")}
              />
              <Input
                error={errors.email}
                name="email"
                type="email"
                label="E-mail"
                {...register("email")}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                error={errors.password}
                name="password"
                type="password"
                label="Password"
                {...register("password")}
              />
              <Input
                error={errors.password_confirmation}
                name="password_confirmation"
                type="password"
                {...register("password_confirmation")}
                label="Password confirmation"
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

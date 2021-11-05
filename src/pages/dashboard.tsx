import { useEffect } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import { apiAuth } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";
import { setupAPICliente } from "../services/apiAuth";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2021-07-18T00:00:00.000Z",
      "2021-07-19T00:00:00.000Z",
      "2021-07-20T00:00:00.000Z",
      "2021-07-21T00:00:00.000Z",
      "2021-07-22T00:00:00.000Z",
      "2021-07-23T00:00:00.000Z",
      "2021-07-24T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};
const series = [{ name: "Notificações", data: [31, 120, 10, 28, 61, 18, 109] }];

export default function Dashboard() {
  useEffect(() => {
    apiAuth
      .get("/me")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <Chart type="area" options={options} series={series} height={160} />
          </Box>
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Chart type="area" options={options} series={series} height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPICliente(ctx);

  const response = await apiClient.get("/me");

  console.log(response.data);
  return {
    props: {},
  };
});

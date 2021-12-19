import { setupAPICliente } from "../services/apiAuth";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Automation() {
  return <h1>Automation</h1>;
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiCLient = setupAPICliente(ctx);
    const response = await apiCLient.get("/me");

    return {
      props: {},
    };
  },
  {
    permissions: ["metrics.list"],
    roles: ["administrator"],
  }
);

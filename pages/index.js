import { useState } from "react";
import Router from "next/router";

import Layout from "../components/Layout";
import Row from "../components/prebuilt/Row";
import DonutShop from "../components/prebuilt/DonutShop";
import CheckoutForm from "../components/CheckoutForm";
import getDonutPrice from "../utils/get-donut-price";
import QueryCodeForm from "../components/QueryCodeForm";



const MainPage = props => {
  const [numDonuts, setNumDonuts] = useState(1);

  const addDonut = () => setNumDonuts(num => Math.min(12, num + 1));
  const remDonut = () => setNumDonuts(num => Math.max(1, num - 1));

  return (
    <Layout title="Donut Shop">
          <Row>
              HOWDY
        <DonutShop
          onAddDonut={addDonut}
          onRemoveDonut={remDonut}
          numDonuts={numDonuts}
        />
      </Row>
      <CheckoutForm
        price={getDonutPrice(numDonuts)}
        onSuccessfulCheckout={() => Router.push("/success")}
      />
      <QueryCodeForm></QueryCodeForm>
    </Layout>

    
  );
};

export default MainPage;

import Container from "@mui/material/Container";
import Layout from "layouts/Default";

import SwapCard from "components/organisms/SwapCard";

export default function SwapPage() {
  return (
    <Layout>
      <Container component="main" maxWidth={false}>
        <Container maxWidth="sm">
          <SwapCard />
        </Container>
      </Container>
    </Layout>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Checkout } from "@/components/store/Checkout";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your MOLLIS reservation. Free and non-binding until launch.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <Container wide>
      <Checkout />
    </Container>
  );
}

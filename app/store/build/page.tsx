import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Builder } from "@/components/store/Builder";

export const metadata: Metadata = {
  title: "Build your tool",
  description: "Configure a MOLLIS stack: choose Link, Tool and Fingers around one Core, then reserve it.",
};

export default function BuildPage() {
  return (
    <Container wide>
      <Builder />
    </Container>
  );
}

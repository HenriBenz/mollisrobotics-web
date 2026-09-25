import { Container } from "@/components/ui/Container";
import { Eyebrow, Headline, Lede } from "@/components/ui/Section";
import { ButtonLink, Arrow } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container>
      <div className="max-w-[60ch] py-28 sm:py-40">
        <Eyebrow>404</Eyebrow>
        <Headline as="h1" size="h1">
          Nothing to grip here.
        </Headline>
        <Lede className="mt-6">The page you asked for does not exist or has moved.</Lede>
        <div className="mt-10">
          <ButtonLink href="/">
            Back to start <Arrow />
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}

export const site = {
  name: "MOLLIS",
  fullName: "MOLLIS Robotics",
  tagline: "Tools for robots that touch the world.",
  description:
    "MOLLIS builds affordable, modular and adaptive end effectors for the next generation of robots. From flange to fingertip.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mollyrobotics.com",
  locale: "en",
  email: "hello@mollyrobotics.com",
  location: "Germany",
} as const;

/** Primary navigation, kept short. Secondary pages are linked from the footer. */
export const nav = [
  { href: "/store", label: "shop" },
  { href: "/platform", label: "platform" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
] as const;

/** All pages, for the footer. */
export const footerNav = [
  { href: "/store", label: "Shop" },
  { href: "/store/build", label: "Build your tool" },
  { href: "/platform", label: "Platform" },
  { href: "/applications", label: "Applications" },
  { href: "/developers", label: "Developers" },
  { href: "/about", label: "About" },
  { href: "/updates", label: "Updates" },
  { href: "/contact", label: "Contact" },
] as const;

export const ctas = {
  store: { href: "/store", label: "Reserve a kit" },
  primary: { href: "/early-access", label: "Join early access" },
  secondary: { href: "/contact", label: "Talk to us" },
} as const;

/**
 * Product maturity. Used everywhere a module or capability is shown so that
 * vision, concepts and work in progress are never confused with shipping products.
 */
export type Status = "concept" | "development" | "prototype" | "available";

export const statusLabel: Record<Status, string> = {
  concept: "Concept",
  development: "In development",
  prototype: "Prototype",
  available: "Available",
};

export const architecture = [
  {
    id: "robot",
    index: "00",
    name: "Robot",
    role: "Any arm, any flange",
    detail:
      "Industrial arms, cobots, humanoids, mobile manipulators. MOLLIS does not care which one.",
  },
  {
    id: "link",
    index: "01",
    name: "Link",
    role: "Robot interface",
    detail:
      "A thin, robot-specific adapter. Mechanical pattern, power and data on one side. The MOLLIS interface on the other.",
  },
  {
    id: "core",
    index: "02",
    name: "Core",
    role: "Actuation and electronics",
    detail:
      "The expensive part, and the part you keep. Motor, drive, controller and communication in one sealed unit.",
  },
  {
    id: "tool",
    index: "03",
    name: "Tool",
    role: "Task module",
    detail:
      "Grip, Soft, Hand, Pick. The mechanism that turns motion into a task. Swapped in seconds, without tools.",
  },
  {
    id: "fingers",
    index: "04",
    name: "Fingers",
    role: "Contact geometry",
    detail:
      "The only part that touches the world. Rigid, compliant or custom. Printable, replaceable, yours.",
  },
] as const;

export const modules: {
  id: string;
  name: string;
  layer: "Link" | "Core" | "Tool" | "Add-on";
  role: string;
  status: Status;
}[] = [
  { id: "link", name: "MOLLIS Link", layer: "Link", role: "Robot interface", status: "development" },
  { id: "core", name: "MOLLIS Core", layer: "Core", role: "Actuation and electronics", status: "development" },
  { id: "grip", name: "MOLLIS Grip", layer: "Tool", role: "General-purpose gripping", status: "prototype" },
  { id: "soft", name: "MOLLIS Soft", layer: "Tool", role: "Compliant gripping", status: "prototype" },
  { id: "hand", name: "MOLLIS Hand", layer: "Tool", role: "Humanoid manipulation", status: "concept" },
  { id: "pick", name: "MOLLIS Pick", layer: "Tool", role: "Agricultural manipulation", status: "concept" },
  { id: "sense", name: "MOLLIS Sense", layer: "Add-on", role: "Force and tactile sensing", status: "concept" },
];

export type ApplicationId = "humanoid" | "agriculture" | "industry";

export const applications: {
  id: ApplicationId;
  name: string;
  headline: string;
  copy: string;
  tool: string;
  fingers: string;
  object: string;
}[] = [
  {
    id: "industry",
    name: "Industry",
    headline: "A robust general-purpose gripper.",
    copy: "Affordable tools for pick-and-place, machine tending, assembly and SME automation.",
    tool: "Grip",
    fingers: "Rigid, replaceable pads",
    object: "Machined part",
  },
  {
    id: "agriculture",
    name: "Agriculture",
    headline: "Compliant fingers for delicate crops.",
    copy: "Soft, adaptive tools for irregular geometries, greenhouse automation and food handling.",
    tool: "Soft",
    fingers: "Compliant elastomer",
    object: "Strawberry",
  },
  {
    id: "humanoid",
    name: "Humanoid",
    headline: "A simple adaptive hand, not a copy of yours.",
    copy: "Capable manipulation without recreating the complexity of the human hand.",
    tool: "Hand",
    fingers: "Three adaptive fingers",
    object: "Bottle",
  },
];

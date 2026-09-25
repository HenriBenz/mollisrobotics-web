import type { Status } from "./site";

/**
 * Product catalogue. This is the shape a future headless commerce backend
 * (or a CMS) will feed. Prices are EUR and `null` until announced; the store
 * then shows "price on launch" and the checkout becomes a free reservation.
 */
export type Category = "kits" | "link" | "core" | "tools" | "fingers" | "accessories";

export const categories: { id: Category; label: string }[] = [
  { id: "kits", label: "developer kits" },
  { id: "link", label: "link" },
  { id: "core", label: "core" },
  { id: "tools", label: "tool modules" },
  { id: "fingers", label: "fingers" },
  { id: "accessories", label: "accessories" },
];

export type FigureId =
  | "kit-grip"
  | "kit-soft"
  | "kit-research"
  | "link"
  | "link-blank"
  | "core"
  | "grip"
  | "soft"
  | "hand"
  | "pick"
  | "fingers-rigid"
  | "fingers-soft"
  | "fingers-blank"
  | "sense"
  | "cable";

export type Availability = "reserve" | "coming-soon";

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Product {
  slug: string;
  code: string;
  name: string;
  category: Category;
  layer?: "Link" | "Core" | "Tool" | "Fingers" | "Kit" | "Add-on";
  status: Status;
  availability: Availability;
  price: number | null;
  short: string;
  description: string[];
  specs: [string, string][];
  includes?: string[];
  figure: FigureId;
  options?: ProductOption[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    slug: "developer-kit-grip",
    code: "MK–01",
    name: "developer kit · grip",
    category: "kits",
    layer: "Kit",
    status: "development",
    availability: "reserve",
    price: null,
    short: "link, core, grip tool and a rigid finger pair. everything to put a MOLLIS on a robot.",
    description: [
      "The first complete MOLLIS stack. A Link for your flange, one Core, the Grip tool module and a pair of rigid fingers with replaceable pads.",
      "Built for integrators and labs who want a general-purpose gripper today and a platform tomorrow. Every part in the kit is a product on its own and can be swapped later.",
    ],
    specs: [
      ["robot interface", "ISO 9409-1-50-4-M6 (other Links on request)"],
      ["stroke", "up to 80 mm (target)"],
      ["grip force", "adjustable, target 20–120 N"],
      ["tool change", "tool-less, seconds"],
      ["power / data", "24 V, industrial fieldbus + USB (planned)"],
      ["mass", "target < 900 g complete"],
    ],
    includes: ["1× Link ISO 50", "1× Core", "1× Grip tool module", "1× rigid finger pair", "cable set", "quick-start card"],
    figure: "kit-grip",
    options: [{ name: "link", values: ["ISO 50 (UR, Doosan, TM)", "Franka / FR3", "custom, tell us"] }],
    featured: true,
  },
  {
    slug: "developer-kit-soft",
    code: "MK–02",
    name: "developer kit · soft",
    category: "kits",
    layer: "Kit",
    status: "development",
    availability: "reserve",
    price: null,
    short: "link, core, soft tool and a compliant finger pair for delicate and irregular objects.",
    description: [
      "The same Link and Core, with the Soft tool module and a pair of compliant elastomer fingers.",
      "For produce, food, lab ware and anything that varies in shape. The fingers do the adapting; no force control required.",
    ],
    specs: [
      ["robot interface", "ISO 9409-1-50-4-M6 (other Links on request)"],
      ["finger material", "food-safe elastomer (target)"],
      ["object range", "ø 20–110 mm, irregular"],
      ["tool change", "tool-less, seconds"],
      ["wash-down", "fingers, yes; core, no"],
      ["mass", "target < 800 g complete"],
    ],
    includes: ["1× Link ISO 50", "1× Core", "1× Soft tool module", "1× compliant finger pair", "cable set", "quick-start card"],
    figure: "kit-soft",
    options: [{ name: "link", values: ["ISO 50 (UR, Doosan, TM)", "Franka / FR3", "custom, tell us"] }],
    featured: true,
  },
  {
    slug: "research-kit",
    code: "MK–03",
    name: "research kit",
    category: "kits",
    layer: "Kit",
    status: "development",
    availability: "reserve",
    price: null,
    short: "one core, both tool modules, three finger pairs and blanks to print your own.",
    description: [
      "For labs. One Link and Core, the Grip and Soft tool modules, rigid and compliant finger pairs plus printable blanks.",
      "Comes with the mechanical interface specification and the reference finger CAD.",
    ],
    specs: [
      ["robot interface", "ISO 9409-1-50-4-M6 (other Links on request)"],
      ["tool modules", "Grip, Soft"],
      ["fingers", "rigid pair, compliant pair, 4× blank"],
      ["documentation", "interface spec, CAD, ROS 2 driver (planned)"],
    ],
    includes: ["1× Link", "1× Core", "1× Grip", "1× Soft", "3× finger pairs", "cable set", "documentation"],
    figure: "kit-research",
    options: [{ name: "link", values: ["ISO 50 (UR, Doosan, TM)", "Franka / FR3", "custom, tell us"] }],
    featured: true,
  },

  {
    slug: "link-iso-50",
    code: "ML–50",
    name: "link · ISO 50",
    category: "link",
    layer: "Link",
    status: "development",
    availability: "reserve",
    price: null,
    short: "robot-side adapter for the ISO 9409-1-50-4-M6 flange. UR, Doosan, Techman and most cobots.",
    description: [
      "Link is the only robot-specific part of MOLLIS. This one matches the 50 mm ISO pattern used by most collaborative arms.",
      "It carries the mechanical lock, power and data to the Core. Swap the Link, keep everything else.",
    ],
    specs: [
      ["robot side", "ISO 9409-1-50-4-M6, 4× M6, ø 6 H7 pin"],
      ["MOLLIS side", "MOLLIS interface v1"],
      ["material", "anodised aluminium, polymer"],
      ["height", "≈ 18 mm"],
    ],
    figure: "link",
    options: [{ name: "flange", values: ["ISO 9409-1-50-4-M6 (UR, Doosan, TM)", "ISO 9409-1-31.5-4-M5", "Franka / FR3", "custom, tell us"] }],
  },
  {
    slug: "link-blank",
    code: "ML–00",
    name: "link · blank",
    category: "link",
    layer: "Link",
    status: "concept",
    availability: "coming-soon",
    price: null,
    short: "an un-drilled link for your own flange pattern, with the drawing to machine it.",
    description: [
      "For humanoid wrists, mobile manipulators and arms we have not met yet. A blank Link with the MOLLIS side finished and the robot side left for you.",
    ],
    specs: [
      ["robot side", "blank, ø 80 mm face"],
      ["MOLLIS side", "MOLLIS interface v1"],
      ["material", "aluminium"],
    ],
    figure: "link-blank",
  },

  {
    slug: "core",
    code: "MC–01",
    name: "core",
    category: "core",
    layer: "Core",
    status: "development",
    availability: "reserve",
    price: null,
    short: "actuation, drive, controller and communication in one sealed unit. the part you keep.",
    description: [
      "Core holds the single motor, the backdrivable drive, the controller and the communication. It is the most expensive part of the stack and the one that never has to change.",
      "Every tool module docks onto the same Core interface.",
    ],
    specs: [
      ["actuation", "1 DOF, backdrivable"],
      ["control", "position, force-limited"],
      ["interface", "industrial fieldbus + USB (planned)"],
      ["supply", "24 V DC"],
      ["housing", "sealed polymer, aluminium interface rings"],
      ["status LED", "one, signal orange"],
    ],
    figure: "core",
    featured: true,
  },

  {
    slug: "grip",
    code: "MT–G1",
    name: "grip",
    category: "tools",
    layer: "Tool",
    status: "prototype",
    availability: "reserve",
    price: null,
    short: "parallel gripper module for pick-and-place, machine tending and assembly.",
    description: [
      "A robust parallel mechanism on a linear rail. Takes any MOLLIS finger pair.",
      "Working prototype. Geometry and force range are being finalised with pilot partners.",
    ],
    specs: [
      ["mechanism", "parallel, linear rail"],
      ["stroke", "up to 80 mm (target)"],
      ["finger interface", "MOLLIS finger interface v1"],
      ["material", "aluminium body, polymer carriages"],
    ],
    figure: "grip",
  },
  {
    slug: "soft",
    code: "MT–S1",
    name: "soft",
    category: "tools",
    layer: "Tool",
    status: "prototype",
    availability: "reserve",
    price: null,
    short: "compliant gripping module for delicate, irregular and variable objects.",
    description: [
      "Drives compliant fingers that wrap around whatever they meet. Strawberries, tomatoes, bread, lab tubes.",
      "Working prototype, in test with greenhouse partners.",
    ],
    specs: [
      ["mechanism", "compliant, single input"],
      ["object range", "ø 20–110 mm"],
      ["finger interface", "MOLLIS finger interface v1"],
      ["material", "aluminium manifold, polymer mounts"],
    ],
    figure: "soft",
  },
  {
    slug: "hand",
    code: "MT–H1",
    name: "hand",
    category: "tools",
    layer: "Tool",
    status: "concept",
    availability: "coming-soon",
    price: null,
    short: "a simple adaptive hand for humanoids. three fingers, one input, no copy of yours.",
    description: [
      "Two fingers and an opposing thumb, all compliant, all driven by the Core. Enough for household objects and tools, without the complexity of an anthropomorphic hand.",
      "Concept stage. Designed with humanoid partners.",
    ],
    specs: [
      ["fingers", "3, adaptive"],
      ["actuation", "1 DOF from Core"],
      ["palm", "aluminium, replaceable pad"],
    ],
    figure: "hand",
  },
  {
    slug: "pick",
    code: "MT–P1",
    name: "pick",
    category: "tools",
    layer: "Tool",
    status: "concept",
    availability: "coming-soon",
    price: null,
    short: "agricultural module for stem handling and harvest. built on soft.",
    description: [
      "A Soft module with a cutting or stem-holding feature for harvest tasks. Concept stage, defined with agricultural partners.",
    ],
    specs: [
      ["base", "Soft mechanism"],
      ["feature", "stem hold / cut (tbd)"],
      ["wash-down", "yes (target)"],
    ],
    figure: "pick",
  },

  {
    slug: "fingers-rigid",
    code: "MF–R1",
    name: "rigid finger pair",
    category: "fingers",
    layer: "Fingers",
    status: "prototype",
    availability: "reserve",
    price: null,
    short: "polymer fingers with replaceable elastomer pads. for grip.",
    description: ["Straight fingers with a replaceable pad. The default for machine tending and parts handling."],
    specs: [
      ["length", "150 mm"],
      ["pad", "elastomer, replaceable"],
      ["interface", "MOLLIS finger interface v1"],
    ],
    figure: "fingers-rigid",
    options: [{ name: "pad", values: ["standard", "high friction", "soft"] }],
  },
  {
    slug: "fingers-soft",
    code: "MF–S1",
    name: "compliant finger pair",
    category: "fingers",
    layer: "Fingers",
    status: "prototype",
    availability: "reserve",
    price: null,
    short: "elastomer fingers that wrap around the object. for soft and pick.",
    description: ["Moulded compliant fingers. Choose the durometer for the objects you handle."],
    specs: [
      ["length", "170 mm"],
      ["material", "elastomer, food-safe (target)"],
      ["interface", "MOLLIS finger interface v1"],
    ],
    figure: "fingers-soft",
    options: [{ name: "durometer", values: ["shore A 30 · very soft", "shore A 50 · medium", "shore A 70 · firm"] }],
  },
  {
    slug: "fingers-blank",
    code: "MF–00",
    name: "finger blanks · 4",
    category: "fingers",
    layer: "Fingers",
    status: "development",
    availability: "reserve",
    price: null,
    short: "printable finger bases with the MOLLIS interface. design your own contact geometry.",
    description: ["Four finger bases with the interface moulded in. Print or machine your own tip and bolt it on. Comes with the CAD."],
    specs: [
      ["quantity", "4"],
      ["interface", "MOLLIS finger interface v1"],
      ["files", "STEP, STL"],
    ],
    figure: "fingers-blank",
  },

  {
    slug: "sense",
    code: "MA–S1",
    name: "sense",
    category: "accessories",
    layer: "Add-on",
    status: "concept",
    availability: "coming-soon",
    price: null,
    short: "force and tactile sensing pad that sits between core and tool.",
    description: ["A thin sensing layer for when compliance alone is not enough. Concept stage."],
    specs: [
      ["sensing", "6-axis force / torque, tactile (tbd)"],
      ["position", "between Core and Tool"],
    ],
    figure: "sense",
  },
  {
    slug: "cable-set",
    code: "MA–C1",
    name: "cable set",
    category: "accessories",
    status: "development",
    availability: "reserve",
    price: null,
    short: "power and data cable, 3 m, M8 to open end.",
    description: ["Spare or extra cable set for a second robot."],
    specs: [
      ["length", "3 m"],
      ["connector", "M8, 8-pin"],
    ],
    figure: "cable",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number | null) {
  if (price === null) return "price on launch";
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price);
}

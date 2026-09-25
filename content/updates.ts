/**
 * Updates / news. Kept as typed data for now so it can move to a CMS or MDX
 * without changing the page. Newest first.
 */
export interface Update {
  slug: string;
  date: string; // ISO date
  title: string;
  summary: string;
  body: string[]; // paragraphs
}

export const updates: Update[] = [
  {
    slug: "early-access-open",
    date: "2026-09-25",
    title: "MOLLIS is public. Early access is open.",
    summary:
      "We are introducing the MOLLIS platform: affordable, modular and adaptive end effectors, built around one architecture from flange to fingertip.",
    body: [
      "Today we are sharing what we are building for the first time. MOLLIS is a modular platform for robotic end effectors: a robot-specific Link, a shared Core with actuation and electronics, interchangeable Tool modules and application-specific Fingers.",
      "Nothing is for sale yet. Link and Core are in development, Grip and Soft exist as working prototypes, Hand and Pick are concepts we are validating with partners. We will keep the status of every module visible on this site.",
      "If you build robots, run automation, grow crops or research manipulation, join early access. The first development kits go to people with real tasks.",
    ],
  },
];

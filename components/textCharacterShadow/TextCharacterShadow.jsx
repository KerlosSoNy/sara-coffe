"use client";
// import Character from "@modules/textCharacterShadow/character";
import Character from "./character/Character";

const paragraph =
  "Sara Alkhoori stands as a distinguished figure in the coffee industry, her journey marked by a series of remarkable achievements and a deep-seated passion for coffee. Certified as a Sensory Judge by the World Coffee Events (WCE) for Brewers Cup and Barista Championships, Sara has also played pivotal roles as the Head Judge for the UAE National Championships and as a Championships Coordinator. Her expertise is backed by a comprehensive Coffee Diploma from the Specialty Coffee Association (SCA) with professional certifications in Brewing, Barista, and Sensory skills.In her professional role, Sara is the co-owner and COO of Caliber Café in Abu Dhabi, where she oversees the roastery and quality control, ensuring the highest standards are met. Her academic prowess is equally impressive, with a Masters of Science in Chemical Engineering – Nano-Science from The Petroleum Institute Abu Dhabi, supplemented by a Hospitality and Restaurant Management Certificate Diploma from Dubai SME.";

const paragraph2 = "this is paragraph2";

export default function TextCharacterShadow() {
  const words = paragraph.split(" ");
  return <Character paragraph={paragraph} />;
}

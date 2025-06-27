import { About3 } from "../ui/about-ui";

const About = () => {
  return (
    <About3
      title="About Us"
      description="Coders Battle Ground — Solve. Prove. Earn. Compete in a Web3-powered coding ecosystem."
      mainImage={{
        src: "#",
        alt: "placeholder",
      }}
      secondaryImage={{
        src: "#",
        alt: "placeholder",
      }}
      breakout={{
        src: "#",
        alt: "logo",
        title: "Thousands of skill proofs minted at CodersBattleGround.com",
        description:
          "Solve challenges, earn blockchain-verified badges, and build a skill profile that actually means something. Whether you’re grinding problems, climbing the leaderboard, or prepping for your next big job — this is your battleground.",
        buttonText: "Discover more",
        buttonUrl: "#",
      }}
      companiesTitle="Valued by clients worldwide"
      companies={[
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
          alt: "Google",
        },
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
          alt: "Microsoft",
        },
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
          alt: "Amazon",
        },
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
          alt: "Facebook",
        },
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
          alt: "Apple",
        },
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
          alt: "IBM",
        }
      ]}
      achievementsTitle="Our Achievements in Numbers"
      achievementsDescription="Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth."
      achievements={
        [
          { label: "Companies Supported", value: "300+" },
          { label: "Projects Finalized", value: "800+" },
          { label: "Happy Customers", value: "99%" },
          { label: "Recognized Awards", value: "10+" },
        ]
      }
    />
  );
};

export { About };

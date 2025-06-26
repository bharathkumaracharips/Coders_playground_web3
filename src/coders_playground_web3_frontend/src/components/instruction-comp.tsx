import { FeatureSteps } from "../ui/instructions-ui"

const features = [
  { 
    step: 'Step 1', 
    title: 'Create an Account',
    content: 'Sign up or log in to access all features and save your progress.', 
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    step: 'Step 2',
    title: 'Explore Features',
    content: 'Browse through the available tools and resources to understand what you can do.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'
  },
  { 
    step: 'Step 3',
    title: 'Start Building',
    content: 'Begin your project or interact with the platform using the provided tools.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  { 
    step: 'Step 4',
    title: 'Get Support',
    content: 'Reach out to our support team or visit the help center if you need assistance.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80'
  },
]

export function InstructionComp() {
  return (
      <FeatureSteps 
        features={features}
        title="How to Use the Platform"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
      />
  )
}
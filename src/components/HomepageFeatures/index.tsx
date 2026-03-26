import type {ReactNode} from 'react';
import Heading from '@theme/Heading';

type FeatureItem = {
  title: string;
  description: ReactNode;
  icon: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Deploy in Minutes',
    icon: '🚀',
    description: (
      <>
        Get up and running with a single <code>docker compose up</code> command.
        Pull pre-built images from Docker Hub and start managing tickets right away.
      </>
    ),
  },
  {
    title: 'Self-Hosted & Private',
    icon: '🔒',
    description: (
      <>
        Your data stays on your infrastructure. No third-party cloud dependencies,
        no vendor lock-in. Full control over your helpdesk environment.
      </>
    ),
  },
  {
    title: 'Modern Stack',
    icon: '⚡',
    description: (
      <>
        Built with React, .NET, and MongoDB. A modern, responsive SPA with a
        powerful API backend and background job processing.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className="tw-flex-1 tw-min-w-[280px] tw-text-center tw-px-6 tw-py-8">
      <div className="tw-text-5xl tw-mb-4">{icon}</div>
      <Heading as="h3" className="tw-text-xl tw-font-semibold tw-mb-2">{title}</Heading>
      <p className="tw-text-gray-600 dark:tw-text-gray-300">{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className="tw-py-16">
      <div className="tw-container tw-mx-auto tw-px-4">
        <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-8">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

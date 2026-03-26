import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

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
        Pull pre-built images and start managing tickets right away.
      </>
    ),
  },
  {
    title: 'Self-Hosted & Private',
    icon: '🔒',
    description: (
      <>
        Your data stays on your infrastructure. No third-party cloud dependencies,
        no vendor lock-in. Full control over your helpdesk.
      </>
    ),
  },
  {
    title: 'Modern Stack',
    icon: '⚡',
    description: (
      <>
        Built with React, .NET, and MongoDB. A modern, responsive dashboard with a
        powerful API and background email processing.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className="col col--4">
      <div className="text--center padding-horiz--md padding-vert--lg">
        <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>{icon}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

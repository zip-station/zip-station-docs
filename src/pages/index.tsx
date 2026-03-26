import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            href="https://demo.zipstation.dev">
            Try the Demo
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/setup-guide/quick-start">
            Get Started
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/intro">
            Learn More
          </Link>
        </div>
        <p style={{marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7}}>
          Demo login: <code>demo@zipstation.dev</code> / <code>TestAccount</code>
        </p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Zip Station - A modern, self-hosted helpdesk solution. Deploy with Docker in minutes.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

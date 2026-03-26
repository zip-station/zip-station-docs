import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="tw-bg-gradient-to-br tw-from-blue-600 tw-to-indigo-800 tw-text-white tw-py-24 tw-text-center">
      <div className="tw-container tw-mx-auto tw-px-4">
        <Heading as="h1" className="tw-text-5xl tw-font-bold tw-mb-4">
          {siteConfig.title}
        </Heading>
        <p className="tw-text-xl tw-mb-8 tw-opacity-90">{siteConfig.tagline}</p>
        <div className="tw-flex tw-gap-4 tw-justify-center">
          <Link
            className="tw-bg-white tw-text-blue-700 tw-font-semibold tw-px-6 tw-py-3 tw-rounded-lg tw-no-underline hover:tw-bg-gray-100 tw-transition-colors"
            to="/docs/user-guide/getting-started">
            Get Started
          </Link>
          <Link
            className="tw-border-2 tw-border-white tw-text-white tw-font-semibold tw-px-6 tw-py-3 tw-rounded-lg tw-no-underline hover:tw-bg-white/10 tw-transition-colors"
            to="/docs/intro">
            Learn More
          </Link>
        </div>
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

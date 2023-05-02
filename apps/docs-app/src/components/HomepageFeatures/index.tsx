import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Seamless Integration',
    Svg: require('@site/static/img/undraw_dev_focus.svg').default,
    description: (
      <>
        <code>ngx-flagr</code> is built as a drop-in solution for feature flag management.
      </>
    ),
  },
  {
    title: 'Highly Configurable',
    Svg: require('@site/static/img/undraw_options.svg').default,
    description: (
      <>
        With a lot of options, you can opt-in for the features you want or
        benefit of the default one without the burden of managing them.
      </>
    ),
  },
  {
    title: 'Open Source',
    Svg: require('@site/static/img/undraw_programming.svg').default,
    description: (
      <>
        Hosted on GitHub and licensed under the MIT license, you are free to use
        this library and benefit from the community's improvements.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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

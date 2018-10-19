import * as React from 'react';
import Link from 'next/link';

const Index = () => (
  <>
    <h1>My Test</h1>
    <ul>
      <li>
        <Link href={'/test'}>
          <a>Test</a>
        </Link>
      </li>
      <li>
        <Link href={'/planets'}>
          <a>Planets</a>
        </Link>
      </li>
      <li>
        <Link href={'/posts'}>
          <a>Posts</a>
        </Link>
      </li>
    </ul>
  </>
);

export default Index;

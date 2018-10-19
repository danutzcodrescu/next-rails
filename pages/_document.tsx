import * as React from 'react';
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext
} from 'next/document';

export default class MyDocument extends Document {
  static getInitialProps(ctx: NextDocumentContext) {
    const initialProps = Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <html>
        <Head>
          <link
            rel='stylesheet'
            href='https://use.fontawesome.com/releases/v5.1.0/css/all.css'
            integrity='sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt'
            crossOrigin='anonymous'
          />
          <link
            rel='stylesheet'
            href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
            integrity='sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO'
            crossOrigin='anonymous'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

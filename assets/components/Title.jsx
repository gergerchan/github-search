import Head from "next/head";

const Title = ({ pageTitle }) => {
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta
        name='description'
        content='Application to find github user and see public repositories of the uesr'
      />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default Title;

import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Head from 'next/head'
import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';
import { render } from 'react-dom';
// import { getStaticProps } from 'next'

// let resultsA = [];
// const unsplash = createApi({
//   accessKey: 'K4ZFq6v5ja8e8pXEJDI_X7v1aQS82VClS8nQCDhkIGo',
//   fetch: nodeFetch,
// });


// let images = unsplash.photos.list()
//   .then(result => {
//     // console.log(result);
//     const feed = result.response;

//     const { total, results } = feed;

//     // extract total and results array from response
//     // return results;
//   });


// console.log(images);

export async function getStaticProps(context) {
  const unsplash = createApi({
    accessKey: 'K4ZFq6v5ja8e8pXEJDI_X7v1aQS82VClS8nQCDhkIGo',
    fetch: nodeFetch,
  });

  const res = await unsplash.search.getPhotos({
    page: 4,
    perPage: 16,
    query: 'cat'
  });
  const images = await res.response;

  // console.log(images);

  return {
    props: {
      images,
    }
  }

}

export default function Home({images}) {
  return (

    <div className={styles.container}>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h2>Hello</h2>

      {images.results.map((post) => (
        <Image src={post.urls.full} alt={post.alt_description} width={post.width} height={post.height} key={post.id} />
      ))}
    </div>
  )
}

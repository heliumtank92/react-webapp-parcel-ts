const HOME_IMAGE = [
  {
    src: new URL('~/public/assets/images/home.png?as=webp', import.meta.url)
      .href,
    alt: 'Home Image',
    as: 'image/webp'
  },
  {
    src: new URL('~/public/assets/images/home.png', import.meta.url).href,
    alt: 'Home Image',
    as: 'image/png'
  }
]

export default HOME_IMAGE

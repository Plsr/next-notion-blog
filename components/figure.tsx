type ImageProps = {
  src: string
  caption?: JSX.Element[]
}

export const Figure = ({ src, caption }: ImageProps) => {
  if (!!caption) {
    return (
      <figure className="mb-2">
        <img src={src} loading="lazy" />
        <figcaption className="text-center text-sm text-slate-600 mt-2">
          {caption}
        </figcaption>
      </figure>
    )
  }

  return <img src={src} loading="lazy" className="mb-2" />
}

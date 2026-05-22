export default function TeamTemplate({
  title,
  paragraphs = [],
  imageSrc,
  imageAlt,
}) {
  return (
    <>
      <section className="bg-[#111111] px-6 pb-28 md:px-16 lg:px-24 lg:pb-36">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mx-auto mb-10 text-3xl leading-tight opacity-90 md:text-5xl">
            {title}
          </h1>

          <div className="mx-auto max-w-3xl space-y-6 text-center text-base leading-relaxed opacity-90 md:text-lg">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111111] px-6 pb-28 md:pl-24 md:pr-16 lg:pl-32 lg:pr-24 lg:pb-36">
        <div className="mx-auto w-full max-w-[1220px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0C0C0C] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-auto w-full object-cover"
          />
        </div>
      </section>
    </>
  );
}
const CONTACTS = [
  { role: "PR Head", name: "Nandish Vyas", phone: "+91 70399 66655" },
  { role: "PR Head", name: "Lavisha Boliya", phone: "+91 93244 68782" },
  {
    role: "COMMAND · Chairperson",
    name: "Dhruv Thakur",
    phone: "+91 90763 17135",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="arya-body relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_15%,#48230b_0%,#1c0e06_58%,#0d0603_100%)] px-4 py-20 text-amber-50 sm:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-5 border border-amber-200/10 sm:inset-8"
      />

      <div className="relative z-10 w-full max-w-6xl">
        <header className="mb-10 text-center sm:mb-14">
          <p className="arya-display text-xs tracking-[0.4em] text-amber-200/65 sm:text-sm">
            THE COUNCIL OF ARYAVARTA
          </p>
          <h2
            id="contact-title"
            className="arya-display mt-4 text-3xl text-amber-200 sm:text-5xl"
            style={{ textShadow: "0 3px 24px rgba(255,170,60,0.3)" }}
          >
            Contact Us
          </h2>
          <div className="mx-auto mt-5 flex max-w-xs items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-300/50" />
            <span aria-hidden="true" className="text-amber-300">✦</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-300/50" />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-amber-100/75 sm:text-lg">
            Have a question about Aryavarta 5.0? Reach out to our organizing
            council—we&apos;re here to help.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTACTS.map(({ role, name, phone }) => (
            <article
              key={name}
              className="flex min-h-52 flex-col items-center justify-center border border-amber-200/20 bg-[#130b07]/75 p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-colors hover:border-amber-300/60 sm:p-8"
            >
              <span className="arya-display text-[11px] tracking-[0.24em] text-amber-300/75">
                {role}
              </span>
              <h3 className="arya-display mt-4 text-xl text-amber-100 sm:text-2xl">
                {name}
              </h3>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="mt-5 text-base tracking-wide text-amber-100/80 transition-colors hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                {phone}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:djsce.express@gmail.com"
            className="group border border-amber-200/20 bg-[#130b07]/75 p-6 text-center transition-colors hover:border-amber-300/60 sm:p-7"
          >
            <span className="arya-display block text-[11px] tracking-[0.24em] text-amber-300/75">
              GENERAL DISPATCH
            </span>
            <span className="mt-3 block break-all text-base text-amber-100/85 transition-colors group-hover:text-amber-300 sm:text-lg">
              djsce.express@gmail.com
            </span>
          </a>
          <a
            href="https://djsceecell.com"
            target="_blank"
            rel="noreferrer"
            className="group border border-amber-200/20 bg-[#130b07]/75 p-6 text-center transition-colors hover:border-amber-300/60 sm:p-7"
          >
            <span className="arya-display block text-[11px] tracking-[0.24em] text-amber-300/75">
              VISIT OUR WEBSITE
            </span>
            <span className="mt-3 block text-base text-amber-100/85 transition-colors group-hover:text-amber-300 sm:text-lg">
              djsceecell.com ↗
            </span>
          </a>
        </div>

        <p className="arya-display mt-10 text-center text-[11px] tracking-[0.28em] text-amber-200/50">
          #eXpressToInspire
        </p>
      </div>
    </section>
  );
}

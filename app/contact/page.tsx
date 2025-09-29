import PageTitle from "../components/PageTitle";

export default function ContactPage() {
  return (
    <section className="container-page mx-auto py-16 flex flex-col items-center justify-center prose">
      <PageTitle title="Let’s work together" />
      <div className="flex flex-col gap-4 items-center mt-8">
        <a href="mailto:your.email@example.com" className="pill text-base font-semibold">Email me</a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener" className="pill text-base font-semibold">LinkedIn</a>
        <a href="#calendar" className="pill text-base font-semibold">Book a call (coming soon)</a>
      </div>
    </section>
  );
}

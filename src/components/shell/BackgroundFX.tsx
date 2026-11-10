const BackgroundFX = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <div className="absolute inset-0 bg-dots" />
    <div className="anim-drift absolute -left-40 -top-48 h-[30rem] w-[30rem] rounded-full bg-accent/15 blur-[110px]" />
    <div className="anim-drift-slow absolute -right-36 top-1/4 h-[28rem] w-[28rem] rounded-full bg-purple/15 blur-[120px]" />
    <div className="anim-drift absolute -bottom-48 left-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan/10 blur-[120px]" />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(88,166,255,0.06),transparent_60%)]" />
  </div>
);

export default BackgroundFX;
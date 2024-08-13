const Background = () => {
  return (
    <div className="fixed top-0 -z-10 h-screen w-full overflow-hidden bg-muted">
      <video
        src="/assets/images/background-video.mp4"
        className="min-h-screen w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Background;

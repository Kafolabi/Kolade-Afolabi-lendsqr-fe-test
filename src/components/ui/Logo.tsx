type logoProps = {
    className?: string
}

function Logo({ className }: logoProps) {
  return (
    <div>
      <img
        src="/logo.png"
        alt="Logo"
        // width={150}
        
        className={className}
      />
    </div>
  );
}

export default Logo;

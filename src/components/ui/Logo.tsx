type logoProps = {
    className?: string
}

function Logo({ className }: logoProps) {
  return (
    <div>
      <img
        src="/logo.png"
        alt="Logo"    
        className={className}
      />
    </div>
  );
}

export default Logo;

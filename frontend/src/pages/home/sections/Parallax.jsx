const Parallax = () => {
  return (
    <div 
      className="relative w-full h-[350px] sm:h-[300px] md:h-[350px] lg:h-[500px]"
      style={{ 
        backgroundImage:`url("https://res.cloudinary.com/dyt7drhch/image/upload/v1744285125/xploride/images/kn4gqtoauhm7lkrzpndd.jpg")`,
        backgroundAttachment: 'fixed',
        backgroundSize: "cover",
        backgroundPosition: "center",
        
      }}
    >
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          Explore the Adventure
        </h2>
      </div>
    </div>
  );
};

export default Parallax;

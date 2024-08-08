import React from "react";

function ContentBoxSection({
  children,
  className = "max-w-[1000px]",
  headerClass = "text-5xl ",
  ...props
}) {
  return (
    <section
      className={`h-full flex justify-center  w-full my-10  items-center`}
      {...props}
    >
      <article
        className={` flex justify-center items-center   gap-5 flex-col w-full  ${className} `}
      >
        <header className={` text-center ${headerClass}`}>
          <h1>Explore ideas,reade stories and Learn things</h1>
        </header>
        <div className=" hover:shadow-sky-400 shadow-sm  relative flex justify-center items-center transition-all duration-300  p-10 bg-sky-200 min-h-[10rem] h-[20rem] sm:h-[40rem] w-full  rounded-2xl  shadow-white">
          {children}
        </div>
      </article>
    </section>
  );
}

export default ContentBoxSection;

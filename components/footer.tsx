import mIcon from "../../assets/Micon.png";

const Footer = () => {
  return (
    <footer className="mt-[30px] pt-12 pb-12 bg-[#16161616]">
      {/* top */}
      <div className="container">
        <div className=" flex flex-col sm:flex-row items-center justify-between">
          <div className=" flex flex-col  justify-center">
            <div className="flex flex-row items-center justify-center sm:justify-start ">
              <div className="leading-[20px]">
                <h2 className="text-[25px] text-slate-500 font-semibold tracking-widest">
                  Business<span className="text-indigo-500">GO</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-0 flex flex-col items-center justify-center">
            <p className="text-indigo-500">created by Marroos</p>
            <p className="text-slate-500 text-center text-[14px] mt-2 pb-3">
              @2023, All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

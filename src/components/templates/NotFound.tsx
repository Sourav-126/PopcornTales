import notfound from "../../assets/mouxy-cotorep.gif";

const NotFound = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-black">
      <img className="h-[70%] object-cover" src={notfound} alt="" />
    </div>
  );
};

export default NotFound;

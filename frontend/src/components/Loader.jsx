const Loader = ({ small }) => {
	return (
	  <div className={`flex justify-center ${small ? "" : "mt-10"}`}>
		<div className={`animate-spin rounded-full border-t-2 border-b-2 border-indigo-500 ${small ? "w-5 h-5" : "w-12 h-12"}`}></div>
	  </div>
	);
  };
  
  export default Loader;
  
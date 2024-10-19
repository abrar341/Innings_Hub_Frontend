const Input = ({ icon: Icon, error, ...props }) => {
	return (
		<div className={`relative mb-6 ${error ? 'pb-1' : ''}`}>
			<div className='absolute max-h-10 inset-y-0 left-0  flex justify-center items-center pl-3 pointer-events-none'>
				{Icon && <Icon className='h-5 w-5 text-green-500' />}
			</div>
			<input
				{...props}
				className={`w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500'} text-white placeholder-gray-400 transition duration-200`}
			/>
			{error && <p className="text-red-500 text-xs font-semibold px-1 mt-2">{error}</p>}
		</div>
	);
};

export default Input;



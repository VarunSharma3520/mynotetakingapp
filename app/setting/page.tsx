import SettingCard from "@/components/shared/SettingCard";

export default function Setting() {
	return (
		<main className="min-h-[80vh] mx-auto p-6">
			<h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl mb-8">
				Settings
			</h1>
			<p>Settings content goes here.</p>
			<SettingCard
				title="Username"
				description="Enter your username"
				action={
					<input
						type="text"
						className="border border-gray-300 rounded-md px-2 py-1"
						placeholder="Enter username"
					/>
				}
			/>

			{/* Example with Switch */}
			<SettingCard
				title="Enable Notifications"
				description="Toggle notifications on/off"
				action={<input type="checkbox" className="w-5 h-5" />}
			/>

			{/* Example with Button */}
			<SettingCard
				title="Reset Password"
				description="Click to reset your password"
				action={
					<button className="bg-blue-500 text-white px-3 py-1 rounded-md">
						Reset
					</button>
				}
			/>
		</main>
	);
}

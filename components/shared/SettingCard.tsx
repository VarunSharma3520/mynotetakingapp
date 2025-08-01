import { SettingCardProps } from "@/types";

export default function SettingCard({ title, description, action }: SettingCardProps) {
	return (
		<div className="flex items-center justify-between border border-gray-300 rounded-lg p-4">
			<div>
				<h2 className="font-semibold text-lg">{title}</h2>
				<p className="text-sm text-gray-600">{description}</p>
			</div>
			<div className="ml-4">{action}</div>
		</div>
	);
}

type StickyNoteCardProps = {
	title?: string;
	description?: string;
	content?: string;
	footer?: string;
	image?: string;
	video?: string;
	audio?: string;
	cardBackgroundColor?: string;
	cardBorderColor?: string;
	cardTitleColor?: string;
	cardContentColor?: string;
	cardFooterColor?: string;
	cardPosition?: string;
};

type SettingCardProps = {
	title: string;
	description: string;
	action: React.ReactNode;
};

export type { StickyNoteCardProps, SettingCardProps };

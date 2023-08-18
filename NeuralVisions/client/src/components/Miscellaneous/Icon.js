const Icon = (props) => {
	const { link, to, src, alt, iconClassName, linkClassName } = props;

	return link === true ? (
		<a
			href={to}
			target="_blank"
			rel="noopener noreferrer"
			className={`icon-link ${linkClassName}`}>
			<img
				src={src}
				alt={alt}
				className={`white-icon ${iconClassName}`}
			/>
		</a>
	) : (
		<img src={src} alt={alt} className={`white-icon ${iconClassName}`} />
	);
};

export default Icon;

import Image from "next/image";

const SERVICES = [
    { label: "Client Work", active: false },
    { label: "Solutions", active: false },
    { label: "SaaS Work", active: false },
    { label: "Dev Products", active: true },
];

const ServicesText = () => {
    return (
        <div className="flex gap-16 items-start mt-32 relative">
            {/* Left: image + sub-tags */}
            <div className="relative shrink-0">
                <Image
                    src="https://placehold.co/500x500/webp"
                    alt="Services"
                    width={500}
                    height={500}
                    className="rounded-sm object-cover"
                />
                {/* Tag list â€” bottom-right of image */}
                <div className="absolute bottom-0 right-0 translate-x-full pl-6 pb-2 flex flex-col gap-1">
                    <p className="text-foreground font-medium text-body leading-body">
                        Developer Tools
                    </p>
                    <p className="text-foreground font-medium text-body leading-body">
                        Infrastructure Platforms
                    </p>
                    <p className="text-foreground font-medium text-body leading-body">
                        Analytics
                    </p>
                </div>
            </div>

            {/* Right: label + stacked service names */}
            <div className="flex flex-1  flex-col gap-2 absolute top-0 right-0 mt-12">
                <span className="text-foreground font-medium text-body-lg leading-body-lg">
                    (03) SERVICES
                </span>
                {/* Service name list */}
                {SERVICES.map(({ label, active }) => (
                    <p
                        key={label}
                        className={`test max-w-fit font-medium text-heading leading-heading tracking-tight ${active ? "text-foreground" : "text-muted text-black"
                            }`}
                    >
                        {label}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default ServicesText;

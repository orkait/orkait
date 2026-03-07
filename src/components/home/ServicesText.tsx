import Image from "next/image";
import { SERVICES } from "@/constants";

const ServicesText = () => {
    return (
        <div className="flex flex-col laptop:flex-row justify-between items-start mt-32 gap-16 w-full">
            {/* Left: image + sub-tags */}
            <div className="flex flex-col phone:flex-row phone:items-end gap-6 shrink-0">
                <div className="relative w-full phone:w-[500px] max-w-full aspect-square">
                    <Image
                        src="https://placehold.co/500x500/webp"
                        alt="Services"
                        fill
                        className="rounded-sm object-cover"
                    />
                </div>
                {/* Tag list */}
                <div className="flex flex-col gap-1 pb-2 shrink-0">
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
            <div className="flex flex-col gap-2 mt-0 laptop:mt-12 items-start laptop:items-end w-full">
                <span className="text-foreground font-medium text-body-lg leading-body-lg self-start">
                    (03) SERVICES
                </span>
                {/* Service name list */}
                {SERVICES.map(({ label, active }) => (
                    <p
                        key={label}
                        className={`max-w-fit font-medium text-title-1 phone:text-heading leading-title-1 phone:leading-heading tracking-tight ${
                            active ? "text-foreground" : "text-muted-foreground"
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
